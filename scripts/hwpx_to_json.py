#!/usr/bin/env python3
"""
hwpx_to_json.py — HWPX 본문의 모든 표를 JSON으로 추출

OWPML 표 모델:
  <hp:tbl rowCnt="N" colCnt="M">
    <hp:tr>
      <hp:tc>
        <hp:cellAddr colAddr=".." rowAddr=".."/>
        <hp:cellSpan colSpan=".." rowSpan=".."/>
        <hp:subList>
          <hp:p><hp:run><hp:t>텍스트</hp:t></hp:run>...</hp:p> ...
        </hp:subList>
      </hp:tc> ...
    </hp:tr> ...
  </hp:tbl>

병합 셀은 (rowAddr, colAddr) + (rowSpan, colSpan)을 사용해
N×M 매트릭스에 정확히 평탄화한다.

표 캡션은 표를 포함한 paragraph 직전의 paragraph 텍스트를 후보로 추출한다.
"""
from __future__ import annotations
import argparse, json, sys, re, zipfile
from pathlib import Path
from datetime import date
from lxml import etree

NS = {
    'hp': 'http://www.hancom.co.kr/hwpml/2011/paragraph',
    'hs': 'http://www.hancom.co.kr/hwpml/2011/section',
}
HP = '{%s}' % NS['hp']
TBL = HP + 'tbl'
TR  = HP + 'tr'
TC  = HP + 'tc'
P   = HP + 'p'
T   = HP + 't'
LINE_BREAK = HP + 'lineBreak'

ZWS = '​'  # zero-width space, just in case


# -------------------- 유틸 --------------------

def slugify(s: str, max_len: int = 32) -> str:
    """파일명 안전한 슬러그(한글 그대로 유지, 특수문자 제거)."""
    s = re.sub(r'\s+', ' ', s).strip()
    s = re.sub(r'[\\/:*?"<>|\r\n\t]+', '', s)
    s = re.sub(r'\s+', '_', s)
    return s[:max_len] or 'untitled'

def text_of_paragraph(p_elem) -> str:
    """<hp:p> 안의 모든 텍스트 노드를 순서대로 합침. lineBreak는 \n으로."""
    parts = []
    # 깊이우선 순회
    for elem in p_elem.iter():
        tag = elem.tag
        if tag == T and elem.text:
            parts.append(elem.text)
        elif tag == LINE_BREAK:
            parts.append('\n')
    return ''.join(parts)

def cell_text(tc_elem) -> str:
    """셀 내부의 모든 paragraph 텍스트를 \n으로 join. 양끝 trim."""
    paras = tc_elem.findall('.//' + P)
    out = []
    for p in paras:
        t = text_of_paragraph(p)
        if t:
            out.append(t)
    return '\n'.join(out).strip()

def normalize_cell(s: str) -> str:
    """셀 텍스트 정규화: 연속 공백 단일화. 줄바꿈은 보존."""
    if not s: return ''
    # 줄별로 trim 후 공백 정규화
    lines = [re.sub(r'[ \t]+', ' ', ln).strip() for ln in s.split('\n')]
    return '\n'.join(ln for ln in lines if ln)

def normalize_inline(s: str) -> str:
    """헤더/단어 비교용: 줄바꿈도 공백으로."""
    return re.sub(r'\s+', ' ', s).strip()


# -------------------- 표 추출 --------------------

def extract_tables(section_xml: bytes, source_file: str) -> list[dict]:
    """section XML에서 모든 hp:tbl을 발견 순서대로 추출."""
    parser = etree.XMLParser(huge_tree=True, recover=False)
    root = etree.fromstring(section_xml, parser=parser)

    # 모든 hp:tbl을 문서 순서대로 수집
    tables = root.findall('.//' + TBL)
    out = []
    for idx, tbl in enumerate(tables, 1):
        try:
            entry = parse_table(tbl, idx, source_file)
            out.append(entry)
        except Exception as e:
            out.append({
                '_error': True, 'index': idx, 'reason': str(e),
                'source_file': source_file
            })
    return out


def parse_table(tbl_elem, idx: int, source_file: str) -> dict:
    row_cnt = int(tbl_elem.get('rowCnt') or 0)
    col_cnt = int(tbl_elem.get('colCnt') or 0)
    if row_cnt == 0 or col_cnt == 0:
        # 메타 없으면 추정
        rows = tbl_elem.findall(TR)
        row_cnt = len(rows) or 1
        col_cnt = max((sum(int((tc.find(HP+'cellSpan') or _empty()).get('colSpan') or 1)
                           for tc in tr.findall(TC))
                       for tr in rows), default=1)

    # N×M 매트릭스 초기화 (None은 미채움 표시 — 병합 보조 셀로 채워질 자리)
    matrix = [[None] * col_cnt for _ in range(row_cnt)]

    for tr in tbl_elem.findall(TR):
        for tc in tr.findall(TC):
            addr = tc.find(HP + 'cellAddr')
            span = tc.find(HP + 'cellSpan')
            if addr is None:
                continue
            r = int(addr.get('rowAddr', 0))
            c = int(addr.get('colAddr', 0))
            rs = int(span.get('rowSpan', 1)) if span is not None else 1
            cs = int(span.get('colSpan', 1)) if span is not None else 1
            txt = normalize_cell(cell_text(tc))
            if r < 0 or c < 0 or r >= row_cnt or c >= col_cnt:
                continue
            # 주 셀에 텍스트 채우기, 병합 영역에는 빈 문자열로 마킹
            for dr in range(rs):
                for dc in range(cs):
                    rr, cc = r + dr, c + dc
                    if rr >= row_cnt or cc >= col_cnt:
                        continue
                    if dr == 0 and dc == 0:
                        matrix[rr][cc] = txt
                    else:
                        matrix[rr][cc] = ''   # 병합된 보조 셀 (시각적으로 같은 텍스트지만 데이터로는 빈칸 처리)

    # None은 빈 문자열로
    matrix = [[(cell if cell is not None else '') for cell in row] for row in matrix]

    # 캡션 후보: 표가 속한 paragraph 직전의 paragraph 텍스트
    caption = find_caption(tbl_elem)

    return {
        'index': idx,
        'row_count': row_cnt,
        'col_count': col_cnt,
        'caption': caption,
        'rows': matrix,
        'source_file': source_file,
    }

def _empty():
    """find가 None을 반환했을 때 .get을 써도 안전하도록 더미."""
    class E: get = staticmethod(lambda k, d=None: d)
    return E()

def find_caption(tbl_elem) -> str:
    """표를 포함하는 paragraph(p)의 직전 형제 p에서 텍스트 추출."""
    container_p = tbl_elem
    while container_p is not None and container_p.tag != P:
        container_p = container_p.getparent()
    if container_p is None:
        return ''
    prev = container_p.getprevious()
    while prev is not None:
        if prev.tag == P:
            t = normalize_inline(text_of_paragraph(prev))
            if t:
                return t
        prev = prev.getprevious()
    return ''


# -------------------- 카테고리 분류(휴리스틱) --------------------

# PLAN 2.2의 4개 대분류와 매칭하는 키워드. 캡션·표 첫 셀 텍스트로 매칭.
# 순서가 중요: 더 좁은 키워드(III, IV)가 더 넓은 키워드(I)보다 먼저 와야 함.
CATEGORY_RULES = [
    ('III','III. 최초합격자 현황',
     ['최초합격', '최초 합격']),
    ('II', 'II. 대학별 고사(면접·실기) 결시율 현황',
     ['결시율', '결시', '면접', '실기']),
    ('IV', 'IV. 수시모집 합격 및 등록 현황',
     ['합격', '등록', '충원', '추가합격', '사정']),
    ('I',  'I. 수시 모집 지원 현황',
     ['지원 현황', '지원율', '지원자', '지원횟수', '지원 횟수', '지원',
      '경쟁률', '석차등급', '중복지원', '학생부', '모집단위']),
]

def classify(caption: str, first_cell: str) -> tuple[str, str]:
    text = ' '.join([caption or '', first_cell or ''])
    for cat_id, cat_title, keywords in CATEGORY_RULES:
        for kw in keywords:
            if kw in text:
                return cat_id, cat_title
    return 'Z', '미분류'


# -------------------- JSON 산출 --------------------

_NUMERIC_RE = re.compile(r'^[+\-]?\d[\d,.  ]*%?$|^[+\-]?\d[\d,.]*\s*[:%/]\s*\d?[\d,.]*$')

def is_numeric_cell(s: str) -> bool:
    s = (s or '').strip()
    if not s: return False
    return bool(_NUMERIC_RE.match(s))

def is_data_row(row: list[str]) -> bool:
    """행의 비어있지 않은 셀 중 숫자성 셀이 50% 이상이면 데이터 행."""
    cells = [c for c in row if (c or '').strip()]
    if not cells: return False
    numeric = sum(1 for c in cells if is_numeric_cell(c))
    return numeric / len(cells) >= 0.5

def detect_header_rows(rows: list[list[str]], max_check: int = 3) -> int:
    """선행 행들 중 데이터 행이 아닌 행 수를 헤더 행 수로 본다 (최소 1)."""
    n = 0
    for i in range(min(max_check, len(rows))):
        if is_data_row(rows[i]):
            break
        n += 1
    return max(1, n)

def fill_left_in_row(row: list[str]) -> list[str]:
    """병합으로 빈 셀이 된 자리에 직전 비어있지 않은 값 채우기."""
    out, last = [], ''
    for c in row:
        v = (c or '').strip()
        if v:
            last = v
            out.append(v)
        else:
            out.append(last)
    return out

def merge_multi_headers(header_rows: list[list[str]]) -> list[str]:
    """여러 헤더 행을 컬럼별로 ' · '로 합침 (병합으로 빈 칸은 좌측 fill 후)."""
    if not header_rows: return []
    cols = max(len(r) for r in header_rows)
    filled = [fill_left_in_row(r + [''] * (cols - len(r))) for r in header_rows]
    out = []
    for c in range(cols):
        seen = []
        for r in filled:
            v = r[c]
            if v and v not in seen:
                seen.append(v)
        out.append(' · '.join(seen))
    return out

def split_totals(body: list[list[str]]) -> tuple[list[list[str]], list[str] | None]:
    """마지막 행 첫 셀이 '계' / '합계' / '소계' 등이면 totals로 분리."""
    if not body: return body, None
    last = body[-1]
    head = (last[0] if last else '').strip()
    if head in ('계', '합계', '총계', '소계'):
        return body[:-1], last
    return body, None


def to_table_json(t: dict, year: int) -> dict:
    rows_raw = t['rows']
    first_cell = rows_raw[0][0] if rows_raw and rows_raw[0] else ''
    title = t['caption'] or first_cell or f'표 {t["index"]}'

    # 1) 헤더 행 수 자동 감지
    n_header = detect_header_rows(rows_raw)
    header_rows = rows_raw[:n_header]
    body_raw = rows_raw[n_header:]

    # 2) 헤더 평탄화
    headers = merge_multi_headers(header_rows)

    # 3) 합계 행 분리
    body, totals = split_totals(body_raw)

    cat_id, cat_title = classify(t['caption'], first_cell)
    table_id = f'{cat_id}-{t["index"]:03d}'

    return {
        'id': table_id,
        'year': year,
        'category': cat_title,
        'subcategory': '',
        'title': normalize_inline(title)[:120],
        'subtitle': None,
        'headers': [normalize_inline(h) for h in headers],
        'rows': body,
        'totals': totals,
        'chart_hint': 'bar_simple',
        'meta': {
            'source_file': t['source_file'],
            'table_index': t['index'],
            'row_count': t['row_count'],
            'col_count': t['col_count'],
            'caption': t['caption'],
            'header_rows_detected': n_header,
            'updated_at': str(date.today()),
            'status': 'auto-extracted',
            'note': 'hwpx_to_json.py 자동 변환. 헤더 행 수는 자동 감지(숫자 비율 기반). 오감지 가능성 있음.'
        }
    }


# -------------------- CLI --------------------

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--input',   default='2026학년도 수시모집 통계작업.hwpx')
    ap.add_argument('--out-dir', default='data/2026/hwpx')
    ap.add_argument('--year',    type=int, default=2026)
    ap.add_argument('--limit',   type=int, default=0,
                    help='첫 N개 표만 추출 (0=전체)')
    ap.add_argument('--summary-only', action='store_true',
                    help='JSON 파일 생성 없이 요약만 출력 (검증용)')
    args = ap.parse_args()

    src = Path(args.input)
    if not src.exists():
        sys.exit(f'not found: {src}')

    out_dir = Path(args.out_dir)
    if not args.summary_only:
        out_dir.mkdir(parents=True, exist_ok=True)

    # 1) hwpx 안의 모든 section*.xml 읽기
    sections = []
    with zipfile.ZipFile(src) as z:
        for n in sorted(z.namelist()):
            if n.startswith('Contents/section') and n.endswith('.xml'):
                sections.append((n, z.read(n)))
    if not sections:
        sys.exit('no Contents/section*.xml in hwpx')

    # 2) 모든 section의 표를 통합 인덱스로 추출
    all_tables = []
    for sname, sxml in sections:
        ts = extract_tables(sxml, src.name)
        # 글로벌 인덱스로 재번호
        all_tables.extend(ts)
    # 글로벌 idx 다시 매김
    for new_i, t in enumerate(all_tables, 1):
        t['index'] = new_i

    print(f'표 총 {len(all_tables)}개 발견. (limit={args.limit or "전체"})')

    # 3) 한도 적용 + 출력
    target = all_tables if not args.limit else all_tables[:args.limit]
    success, failed = 0, 0
    log_lines = []
    index_entries = []

    for t in target:
        if t.get('_error'):
            failed += 1
            log_lines.append(f'[{t["index"]:>3}] ERROR: {t["reason"]}')
            continue

        out = to_table_json(t, args.year)
        slug = slugify(out['title'], 30)
        fname = f'T{t["index"]:03d}_{slug}.json'

        if not args.summary_only:
            (out_dir / fname).write_text(
                json.dumps(out, ensure_ascii=False, indent=2),
                encoding='utf-8'
            )
        success += 1
        log_lines.append(f'[{t["index"]:>3}] {out["category"][:8]:<8} {t["row_count"]:>3}x{t["col_count"]:>3}  {out["title"][:60]}')
        index_entries.append({
            'id': out['id'],
            'index': t['index'],
            'category': out['category'],
            'title': out['title'],
            'file': fname,
            'row_count': t['row_count'],
            'col_count': t['col_count'],
            'caption': t['caption'],
        })

    print(f'\n성공: {success}, 실패: {failed}')

    if not args.summary_only:
        # build.log
        log_path = out_dir / 'build.log'
        log_path.write_text('\n'.join(log_lines), encoding='utf-8')
        # 인덱스 요약 (PLAN 카테고리 매핑은 사람이 보강)
        idx_path = out_dir / '_extracted_index.json'
        idx_path.write_text(
            json.dumps({
                'source_file': src.name,
                'year': args.year,
                'total_tables': len(all_tables),
                'extracted': len(index_entries),
                'tables': index_entries,
            }, ensure_ascii=False, indent=2),
            encoding='utf-8'
        )
        print(f'  → {out_dir}\\  ({success} JSON files)')
        print(f'  → {idx_path}')
        print(f'  → {log_path}')
    else:
        # 콘솔 요약 (cp949 안전을 위해 ascii-friendly로)
        for line in log_lines:
            print(line)

if __name__ == '__main__':
    main()
