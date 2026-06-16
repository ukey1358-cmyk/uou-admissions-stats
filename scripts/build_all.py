#!/usr/bin/env python3
"""
build_all.py — 전체 데이터 변환 오케스트레이터

현재 단계: xlsx 변환만 호출 (hwpx_to_json.py는 다음 단계에서 추가 예정).
"""
from __future__ import annotations
import subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = ROOT / 'scripts'

STEPS = [
    [sys.executable, str(SCRIPTS / 'xlsx_to_json.py'),
     '--input', str(ROOT / '최근 2년 모집인원 및 지원자.xlsx'),
     '--out-dir', str(ROOT / 'data')],
    [sys.executable, str(SCRIPTS / 'hwpx_to_json.py'),
     '--input', str(ROOT / '2026학년도 수시모집 통계작업.hwpx'),
     '--out-dir', str(ROOT / 'data' / '2026' / 'hwpx'),
     '--year', '2026'],
    [sys.executable, str(SCRIPTS / 'build_index.py')],
]

def main():
    print(f'== build_all.py ==')
    print(f'project root: {ROOT}')
    rc_total = 0
    for cmd in STEPS:
        print('\n$ ' + ' '.join(f'"{c}"' if ' ' in c else c for c in cmd))
        r = subprocess.run(cmd, cwd=ROOT)
        if r.returncode != 0:
            rc_total = r.returncode
            print(f'  ✗ exit {r.returncode}')
        else:
            print(f'  ✓ ok')
    sys.exit(rc_total)

if __name__ == '__main__':
    main()
