// table-renderer.js — JSON 표 데이터를 HTML로 렌더링
// 의존성 없음. window.TableRenderer 로 노출.

(function (global) {
  'use strict';

  const NUM_RE = /^-?\d+(\.\d+)?$/;
  const RATE_RE = /^-?\d+(\.\d+)?\s*:\s*1$/;
  const LEADING_SYMBOL_RE = /^[^\w가-힣\[\(]+/u;
  function cleanTitle(s) {
    return String(s || '').replace(LEADING_SYMBOL_RE, '').trim();
  }

  function isNumeric(v) {
    if (typeof v === 'number') return true;
    if (typeof v !== 'string') return false;
    return NUM_RE.test(v.trim()) || RATE_RE.test(v.trim());
  }

  function parseSortable(v) {
    if (typeof v === 'number') return v;
    if (typeof v !== 'string') return Number.NEGATIVE_INFINITY;
    const t = v.trim();
    if (RATE_RE.test(t)) return parseFloat(t.split(':')[0]);
    if (NUM_RE.test(t)) return parseFloat(t);
    return v;
  }

  function fmtCell(v) {
    if (v == null) return '';
    if (typeof v === 'number') return v.toLocaleString('ko-KR');
    return String(v);
  }

  // 석차등급 분포 표용 색상 클래스 (사양: <15% 노랑, 15~40% 옅은 주황, >40% 짙은 주황)
  function gradeClass(pct) {
    if (typeof pct !== 'number') return '';
    if (pct < 15) return 'grade-light';
    if (pct <= 40) return 'grade-mid';
    return 'grade-heavy';
  }

  // 셀 값에서 숫자 추출(+, 공백, 콤마 제거 → 부호·소수 보존)
  function parseDiff(cell) {
    if (cell == null) return NaN;
    const s = String(cell).replace(/[+,\s]/g, '');
    const v = parseFloat(s);
    return isNaN(v) ? NaN : v;
  }

  function render(container, table, opts) {
    opts = opts || {};
    const isHeatmap = (table.chart_hint === 'heatmap_grade');

    // 증감 컬럼 식별
    const diffCols = new Set();
    (table.headers || []).forEach((h, i) => { if (/증감/.test(h)) diffCols.add(i); });

    container.innerHTML = '';

    // Title block
    const titleEl = document.createElement('h2');
    titleEl.className = 'table-title';
    titleEl.textContent = cleanTitle(table.title);
    container.appendChild(titleEl);

    if (table.subtitle) {
      const sub = document.createElement('div');
      sub.className = 'subtitle';
      sub.textContent = table.subtitle;
      container.appendChild(sub);
    }

    const m = table.meta || {};

    // 컬럼 분류 — 헤더 텍스트로 (2026 / 2025 / 증감 / 라벨) 구분.
    // 같은 표 안에 2026·2025 컬럼이 모두 있으면 "비교 보기" 토글을 제공.
    const colKind = (table.headers || []).map(h => {
      if (/2026/.test(h)) return '2026';
      if (/2025/.test(h)) return '2025';
      if (/증감/.test(h)) return 'diff';
      return 'label';
    });
    const hasCompare = colKind.includes('2026') && colKind.includes('2025');
    let viewMode = hasCompare ? '2026' : 'all';   // '2026' = 단일연도, 'compare' = 비교, 'all' = 비교 대상이 아닌 표

    function computeVisible(mode) {
      if (mode === 'all') return table.headers.map(() => true);
      if (mode === 'compare') {
        return table.headers.map((h, i) => {
          const c = colKind[i];
          if (c === 'label') return true;
          if (c === 'diff')  return true;
          if ((c === '2026' || c === '2025') && /지원율/.test(h)) return true;
          return false;
        });
      }
      if (mode === '2025') return colKind.map(c => c === 'label' || c === '2025');
      // mode === '2026' (기본) : 라벨 + 2026.* 만 노출
      return colKind.map(c => c === 'label' || c === '2026');
    }

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';
    const ICON_DL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v12M6 12l6 6 6-6M4 20h16"/></svg>';
    const ICON_PR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>';
    const viewBtns = hasCompare ? `
      <div class="view-switch" role="tablist" aria-label="표시 모드">
        <button class="btn-icon" data-mode="2026"    type="button">2026</button>
        <button class="btn-icon" data-mode="2025"    type="button">2025</button>
        <button class="btn-icon" data-mode="compare" type="button">비교 보기</button>
      </div>` : '';
    toolbar.innerHTML = `
      <input type="search" class="filter" placeholder="이 표 안에서 필터…(예: 공과)" />
      ${viewBtns}
      <button class="btn-icon" data-act="csv" type="button">${ICON_DL}<span>CSV</span></button>
      <button class="btn-icon" data-act="print" type="button">${ICON_PR}<span>인쇄</span></button>
      ${m.status === 'draft' ? '<span class="draft-flag">DRAFT — 작성 중 데이터</span>' : ''}
    `;
    container.appendChild(toolbar);

    // Table
    const wrap = document.createElement('div');
    wrap.className = 'data-table-wrap';
    const tbl = document.createElement('table');
    tbl.className = 'data-table';

    const thead = document.createElement('thead');
    const trh = document.createElement('tr');
    table.headers.forEach((h, i) => {
      const th = document.createElement('th');
      th.textContent = h;
      th.dataset.col = i;
      const ind = document.createElement('span');
      ind.className = 'sort-ind';
      ind.textContent = '↕';
      th.appendChild(ind);
      trh.appendChild(th);
    });
    thead.appendChild(trh);
    tbl.appendChild(thead);

    function fillCell(td, cell, ci) {
      td.dataset.col = ci;
      // 증감 컬럼: 부호별 색·화살표
      if (diffCols.has(ci)) {
        const v = parseDiff(cell);
        if (!isNaN(v)) {
          td.classList.add('diff-cell');
          td.classList.add(v > 0 ? 'diff-pos' : v < 0 ? 'diff-neg' : 'diff-zero');
          const arrow = v > 0 ? '▲' : v < 0 ? '▼' : '–';
          // 원본 표기 유지하되 하이픈은 진짜 마이너스(U+2212)로 치환
          const raw = String(cell).trim().replace(/^-/, '−');
          td.textContent = arrow + ' ' + (v > 0 && !raw.startsWith('+') ? '+' + raw : raw);
          return;
        }
      }
      // 일반 셀
      td.textContent = fmtCell(cell);
      if (isHeatmap && ci > 0 && typeof cell === 'number') {
        td.classList.add('grade-cell', gradeClass(cell));
        td.textContent = cell.toFixed(1) + '%';
      }
    }

    const tbody = document.createElement('tbody');
    const renderRows = (rows) => {
      tbody.innerHTML = '';
      rows.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach((cell, ci) => {
          const td = document.createElement('td');
          fillCell(td, cell, ci);
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      applyVisibility(computeVisible(viewMode));
    };
    renderRows(table.rows);
    tbl.appendChild(tbody);

    if (table.totals && table.totals.length) {
      const tfoot = document.createElement('tfoot');
      const tr = document.createElement('tr');
      table.totals.forEach((c, ci) => {
        const td = document.createElement('td');
        fillCell(td, c, ci);
        tr.appendChild(td);
      });
      tfoot.appendChild(tr);
      tbl.appendChild(tfoot);
    }

    wrap.appendChild(tbl);
    container.appendChild(wrap);

    function applyVisibility(visible) {
      const setDisplay = (el, show) => { el.style.display = show ? '' : 'none'; };
      tbl.querySelectorAll('thead th').forEach((th, i) => setDisplay(th, visible[i]));
      tbl.querySelectorAll('tbody tr').forEach(tr => {
        Array.from(tr.children).forEach((td, i) => setDisplay(td, visible[i]));
      });
      const tfRow = tbl.querySelector('tfoot tr');
      if (tfRow) Array.from(tfRow.children).forEach((td, i) => setDisplay(td, visible[i]));
    }
    applyVisibility(computeVisible(viewMode));

    // === Sort ===
    let sortState = { col: -1, dir: 1 };
    thead.querySelectorAll('th').forEach(th => {
      th.addEventListener('click', () => {
        const col = parseInt(th.dataset.col, 10);
        const dir = (sortState.col === col) ? -sortState.dir : 1;
        sortState = { col, dir };
        const sorted = table.rows.slice().sort((a, b) => {
          const va = parseSortable(a[col]);
          const vb = parseSortable(b[col]);
          if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
          return String(va).localeCompare(String(vb), 'ko') * dir;
        });
        renderRows(getFiltered(sorted));
        thead.querySelectorAll('.sort-ind').forEach(s => s.textContent = '↕');
        th.querySelector('.sort-ind').textContent = dir > 0 ? '▲' : '▼';
      });
    });

    // === Filter ===
    const filterInput = toolbar.querySelector('.filter');
    let filterTerm = '';
    function getFiltered(srcRows) {
      if (!filterTerm) return srcRows;
      const t = filterTerm.toLowerCase();
      return srcRows.filter(r => r.some(c => String(c).toLowerCase().includes(t)));
    }
    filterInput.addEventListener('input', e => {
      filterTerm = e.target.value.trim();
      renderRows(getFiltered(table.rows));
    });

    // === View switch (2026 / 2025 / 비교) ===
    const switchEl = toolbar.querySelector('.view-switch');
    if (switchEl) {
      const syncActive = () => {
        switchEl.querySelectorAll('button[data-mode]').forEach(b => {
          b.classList.toggle('is-active', b.dataset.mode === viewMode);
        });
      };
      syncActive();
      switchEl.addEventListener('click', e => {
        const btn = e.target.closest('button[data-mode]');
        if (!btn) return;
        viewMode = btn.dataset.mode;
        applyVisibility(computeVisible(viewMode));
        syncActive();
      });
    }

    // === CSV / Print ===
    toolbar.querySelector('[data-act="csv"]').addEventListener('click', () => {
      exportCsv(table);
    });
    toolbar.querySelector('[data-act="print"]').addEventListener('click', () => {
      window.print();
    });

    // Chart placeholder (chart-renderer가 채움)
    const chartWrap = document.createElement('div');
    chartWrap.className = 'chart-wrap';
    chartWrap.id = 'chart-wrap';
    chartWrap.innerHTML = '<canvas id="main-chart"></canvas>';
    container.appendChild(chartWrap);
  }

  function exportCsv(table) {
    const lines = [];
    lines.push(table.headers.map(csvEscape).join(','));
    table.rows.forEach(r => lines.push(r.map(csvEscape).join(',')));
    if (table.totals) lines.push(table.totals.map(csvEscape).join(','));
    // BOM for Excel UTF-8
    const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (table.id || 'table') + '_' + (table.year || '') + '.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  function csvEscape(v) {
    if (v == null) return '';
    const s = String(v);
    return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  global.TableRenderer = { render, cleanTitle };
})(window);
