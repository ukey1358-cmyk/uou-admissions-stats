#!/usr/bin/env python3
"""
build_index.py — 사이트용 카테고리 트리(index.json) 생성

입력:
  - data/2026/hwpx/_extracted_index.json   (hwpx_to_json.py 산출)
  - data/2026/*.json                       (xlsx_to_json.py 산출 실데이터)

출력:
  - data/2026/index.json   (사이트의 사이드바가 읽는 트리)
  - data/2025/index.json   (2025는 작은 단일 표 — xlsx 결과만)
"""
from __future__ import annotations
import argparse, json, sys
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).resolve().parent.parent

CATEGORY_TITLES = {
    'I':   'I. 수시 모집 지원 현황',
    'II':  'II. 대학별 고사(면접·실기) 결시율 현황',
    'III': 'III. 최초합격자 현황',
    'IV':  'IV. 수시모집 합격 및 등록 현황',
    'X':   'X. XLSX 추가 산출(개인정보 집계)',
    'Z':   'Z. 미분류 / 보고서 장식',
}
CATEGORY_ORDER = ['I', 'II', 'III', 'IV', 'X', 'Z']


def cat_id_from_full(category_full: str) -> str:
    if category_full.startswith('I.'):    return 'I'
    if category_full.startswith('II.'):   return 'II'
    if category_full.startswith('III.'):  return 'III'
    if category_full.startswith('IV.'):   return 'IV'
    return 'Z'


def clean_title(s: str) -> str:
    """캡션의 머리 기호 (◦, □, ※) 제거 + 공백 정리."""
    s = (s or '').strip()
    while s and s[0] in '◦□※*•▪○●◆◇':
        s = s[1:].lstrip()
    return s or '(제목 없음)'


def build_2026() -> dict:
    """hwpx 자동 추출 + xlsx 외부 산출을 통합. schema/category_map_2026.json
    이 존재하면 4단계 트리(대분류 → 중분류 → 소분류 → 표)로 재구성합니다."""
    hwpx_index_path = ROOT / 'data' / '2026' / 'hwpx' / '_extracted_index.json'
    if not hwpx_index_path.exists():
        sys.exit(f'not found: {hwpx_index_path} — hwpx_to_json.py를 먼저 실행하세요')

    hidx = json.loads(hwpx_index_path.read_text(encoding='utf-8'))

    # 표 ID → entry 메타 dict 구성 (hwpx + xlsx 외부 산출 모두 포함)
    entries: dict[str, dict] = {}
    for t in hidx['tables']:
        tid = f'T{t["index"]:03d}'
        entries[tid] = {
            'id': tid,
            'index': t['index'],
            'title': clean_title(t['title']),
            'file': f'hwpx/{t["file"]}',
            'status': 'auto-extracted',
            'shape': f'{t["row_count"]}×{t["col_count"]}',
            '_cid_auto': cat_id_from_full(t['category']),
        }
    external_meta = [
        ('IV-1-01_최종등록.json',     '모집단위별 합격구분 집계 (최초·충원·예비순위·1단계 불합격) — XLSX 집계', 'X'),
        ('I-3-01_석차등급분포.json',  '지역교과 모집단위별 석차등급 분포(2026 등록자) — XLSX 집계',           'X'),
    ]
    external_files = []
    for fname, title, cid in external_meta:
        p = ROOT / 'data' / '2026' / fname
        if not p.exists():
            continue
        tid = fname.split('_')[0]
        entries[tid] = {
            'id': tid,
            'title': title,
            'file': fname,
            'status': 'final',
            '_cid_auto': cid,
        }
        external_files.append(fname)

    # 카테고리 맵 로드 (있으면 4단계 구조, 없으면 단일 서브카테고리로 폴백)
    cmap_path = ROOT / 'schema' / 'category_map_2026.json'
    if cmap_path.exists():
        cmap = json.loads(cmap_path.read_text(encoding='utf-8'))
        categories, used_ids = _apply_category_map(cmap, entries)
        unused = [tid for tid in entries.keys() if tid not in used_ids]
        if unused:
            # 매핑에 빠진 표는 "기타(미분류)" 중분류에 모아둠
            misc = {
                'id': 'M', 'title': 'M. 기타 (매핑 누락)',
                'subcategories': [{
                    'id': 'M-1', 'title': '1. 매핑되지 않은 표',
                    'groups': [{
                        'id': 'M-1-1', 'title': '1.1 매핑 누락',
                        'tables': sorted([entries[t] for t in unused],
                                         key=lambda x: x.get('index', 9999))
                    }]
                }]
            }
            categories.append(misc)
    else:
        categories = _fallback_flat(entries)

    return {
        'year': 2026,
        'generated_at': '2026-05-06',
        'status': 'auto-extracted',
        'source': {
            'hwpx': hidx['source_file'],
            'hwpx_total_tables': hidx['total_tables'],
            'xlsx_external': external_files,
            'category_map': str(cmap_path.relative_to(ROOT)) if cmap_path.exists() else None,
        },
        'note': '4단계 트리(대분류 → 중분류 → 소분류 → 표)는 schema/category_map_2026.json 기준 — 표 배치 변경 시 해당 파일만 수정 후 build_index.py 재실행.',
        'categories': categories,
    }


def _strip_internal(entry: dict) -> dict:
    return {k: v for k, v in entry.items() if not k.startswith('_')}


def _apply_category_map(cmap: dict, entries: dict[str, dict]):
    categories = []
    used = set()
    for cat in cmap.get('categories', []):
        sub_out = []
        for sub in cat.get('subcategories', []):
            grp_out = []
            for grp in sub.get('groups', []):
                tables = []
                for tid in grp.get('table_ids', []):
                    if tid in entries:
                        tables.append(_strip_internal(entries[tid]))
                        used.add(tid)
                if tables:
                    grp_out.append({
                        'id': grp['id'], 'title': grp['title'], 'tables': tables
                    })
            if grp_out:
                sub_out.append({
                    'id': sub['id'], 'title': sub['title'], 'groups': grp_out
                })
        if sub_out:
            categories.append({
                'id': cat['id'], 'title': cat['title'], 'subcategories': sub_out
            })
    return categories, used


def _fallback_flat(entries: dict[str, dict]):
    """category_map 미존재 시: 자동 분류 결과를 단일 서브카테고리로 묶는 기존 동작."""
    cat_tables: dict[str, list[dict]] = defaultdict(list)
    for tid, e in entries.items():
        cat_tables[e.get('_cid_auto', 'Z')].append(_strip_internal(e))
    categories = []
    for cid in CATEGORY_ORDER:
        tables = cat_tables.get(cid, [])
        if not tables:
            continue
        tables.sort(key=lambda x: x.get('index', 9999))
        categories.append({
            'id': cid, 'title': CATEGORY_TITLES[cid],
            'subcategories': [{
                'id': f'{cid}-1',
                'title': '1. 자동 추출(검토 필요)' if cid != 'X' else '1. XLSX 추가 산출',
                'tables': tables
            }]
        })
    return categories


def build_2025() -> dict:
    """2025는 xlsx에서 추출한 석차등급 분포만 존재."""
    p = ROOT / 'data' / '2025' / 'I-3-01_석차등급분포.json'
    cats = []
    if p.exists():
        cats.append({
            'id': 'I', 'title': CATEGORY_TITLES['I'],
            'subcategories': [{
                'id': 'I-3', 'title': '3. 학생부 석차등급 분포',
                'tables': [{
                    'id': 'I-3-01',
                    'title': '지역교과 모집단위별 석차등급 분포(2025 등록자)',
                    'file': 'I-3-01_석차등급분포.json',
                    'status': 'final'
                }]
            }]
        })
    return {
        'year': 2025, 'generated_at': '2026-05-06',
        'status': 'partial',
        'note': '2025학년도 입시결과 통계_작업중.hwp 변환 후 채워집니다.',
        'categories': cats
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--year', type=int, choices=[2025, 2026, 0], default=0,
                    help='특정 연도만 (0=둘 다)')
    args = ap.parse_args()

    out_dirs = []
    def _count_tables(idx):
        n = 0
        for c in idx['categories']:
            for s in c['subcategories']:
                if 'groups' in s:
                    n += sum(len(g['tables']) for g in s['groups'])
                else:
                    n += len(s.get('tables', []))
        return n

    if args.year in (0, 2026):
        idx = build_2026()
        p = ROOT / 'data' / '2026' / 'index.json'
        p.write_text(json.dumps(idx, ensure_ascii=False, indent=2), encoding='utf-8')
        print(f'  → {p}  ({len(idx["categories"])} 대분류, 표 {_count_tables(idx)}개)')
        out_dirs.append(p)
    if args.year in (0, 2025):
        idx = build_2025()
        p = ROOT / 'data' / '2025' / 'index.json'
        p.write_text(json.dumps(idx, ensure_ascii=False, indent=2), encoding='utf-8')
        print(f'  → {p}  ({len(idx["categories"])} 대분류, 표 {_count_tables(idx)}개)')


if __name__ == '__main__':
    main()
