// chart-renderer.js — Chart.js 래퍼. table.chart_hint 에 따라 차트 종류 자동 선택.

(function (global) {
  'use strict';

  // UOU 디자인 그래머: UOU Green 단일 브랜드 + ink/gray 모노크롬
  const UOU_GREEN       = '#006B3C';   // primary (DIC 643)
  const UOU_GREEN_DEEP  = '#004D2B';   // primary-deep
  const UOU_GREEN_LIGHT = '#A6D2B5';   // light tint of UOU Green (≈40%)
  const UOU_GREEN_MID   = '#2E8B57';   // primary-light
  const UOU_YELLOW      = '#F2A900';   // accent (emphasis only)
  const INK             = '#1A1A1A';
  const INK_MUTED       = '#666666';
  // 다중 시리즈 팔레트: UOU Green 그라데이션 → secondary gray → 옐로우/레드(강조)
  const PALETTE = [
    '#006B3C', '#2E8B57', '#A6D2B5', '#58595B',
    '#9EA0A2', '#F2A900', '#FFD966', '#1A1A1A',
    '#666666', '#C5221F'
  ];
  if (typeof Chart !== 'undefined') {
    Chart.defaults.font.family = '"Pretendard", "Pretendard Variable", "Noto Sans KR", "Malgun Gothic", -apple-system, sans-serif';
    Chart.defaults.font.size = 13;
    Chart.defaults.color = INK;
    Chart.defaults.borderColor = '#E5E5E5';
  }
  // Backwards-compat alias (used in YoY/compare bars below)
  const NAVY       = UOU_GREEN;
  const NAVY_LIGHT = UOU_GREEN_LIGHT;

  let currentChart = null;

  function destroy() {
    if (currentChart) { currentChart.destroy(); currentChart = null; }
  }

  function getCtx() {
    const canvas = document.getElementById('main-chart');
    return canvas ? canvas.getContext('2d') : null;
  }

  function parseRate(v) {
    if (typeof v === 'number') return v;
    if (typeof v !== 'string') return 0;
    const t = v.trim();
    if (t.includes(':')) return parseFloat(t.split(':')[0]) || 0;
    return parseFloat(t) || 0;
  }

  function render(table) {
    destroy();
    const ctx = getCtx();
    if (!ctx) return;
    const hint = table.chart_hint;

    if (hint === 'heatmap_grade') {
      renderStackedGrade(ctx, table);
    } else if (hint === 'bar_yoy') {
      renderYoYBar(ctx, table);
    } else if (hint === 'bar_yoy_applicants') {
      renderYoYApplicants(ctx, table);
    } else if (hint === 'bar_registration_rate') {
      renderRegistrationBar(ctx, table);
    } else if (hint === 'bar_pass_rate') {
      renderPassRate(ctx, table);
    } else if (hint === 'bar_simple') {
      renderSimpleBar(ctx, table);
    } else {
      renderCompetitionBar(ctx, table);
    }
  }

  // 2025 vs 2026 지원자 비교 (좌2, 우3 컬럼이 단위·연도·연도)
  function renderYoYApplicants(ctx, table) {
    // 컬럼 가정: 단과대학, 모집단위, 2025, 2026, 변동, 변동률
    const labels = table.rows.map(r => r[1]);
    const v25 = table.rows.map(r => Number(r[2]) || 0);
    const v26 = table.rows.map(r => Number(r[3]) || 0);
    currentChart = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [
        { label: '2025 지원자', data: v25, backgroundColor: NAVY_LIGHT },
        { label: '2026 지원자', data: v26, backgroundColor: NAVY }
      ]},
      options: {
        indexAxis: 'y',
        responsive: true, maintainAspectRatio: false,
        plugins: { title: { display: true, text: '모집단위별 지원자 수 (2025 vs 2026)' } },
        scales: { x: { beginAtZero: true } }
      }
    });
  }

  // 합격구분 집계 표 → 합격률(%) 막대
  function renderPassRate(ctx, table) {
    const labels = table.rows.map(r => r[1]);
    const passRate = table.rows.map(r => Number(r[r.length - 1]) || 0);
    currentChart = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [{ label: '합격률(%)', data: passRate, backgroundColor: NAVY }]},
      options: {
        indexAxis: 'y',
        responsive: true, maintainAspectRatio: false,
        plugins: { title: { display: true, text: '모집단위별 합격률(=합격자/지원자)' } },
        scales: { x: { beginAtZero: true, suggestedMax: 100 } }
      }
    });
  }

  function renderCompetitionBar(ctx, table) {
    const labels = table.rows.map(r => r[0]);
    const data = table.rows.map(r => parseRate(r[3]));
    currentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label: '경쟁률(:1)', data, backgroundColor: NAVY }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { title: { display: true, text: '모집단위별 경쟁률' } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  function renderYoYBar(ctx, table) {
    const labels = table.rows.map(r => r[0]);
    const cur  = table.rows.map(r => parseRate(r[3]));
    const prev = table.rows.map(r => parseRate(r[4]));
    currentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: '2026 경쟁률', data: cur,  backgroundColor: NAVY },
          { label: '2025 경쟁률', data: prev, backgroundColor: NAVY_LIGHT }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { title: { display: true, text: '전년 대비 경쟁률 비교' } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  function renderRegistrationBar(ctx, table) {
    const labels = table.rows.map(r => r[0]);
    const rate = table.rows.map(r => parseFloat(r[5]));
    currentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label: '등록률(%)', data: rate, backgroundColor: UOU_GREEN_MID }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { title: { display: true, text: '모집단위별 최종 등록률' } },
        scales: { y: { beginAtZero: true, suggestedMax: 100 } }
      }
    });
  }

  function renderSimpleBar(ctx, table) {
    // 마지막 수치 컬럼을 자동 선택
    const lastCol = table.headers.length - 1;
    const labels = table.rows.map(r => r[0]);
    const data = table.rows.map(r => parseFloat(r[lastCol]) || 0);
    currentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label: table.headers[lastCol], data, backgroundColor: NAVY }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { title: { display: true, text: (window.TableRenderer && window.TableRenderer.cleanTitle ? window.TableRenderer.cleanTitle(table.title) : table.title) } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  function renderStackedGrade(ctx, table) {
    const labels = table.rows.map(r => r[0]);
    const grades = table.headers.slice(1); // 1등급~6등급
    const datasets = grades.map((g, i) => ({
      label: g,
      data: table.rows.map(r => r[i + 1]),
      backgroundColor: PALETTE[i % PALETTE.length]
    }));
    currentChart = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { title: { display: true, text: '석차등급 분포(누적 %)' } },
        scales: {
          x: { stacked: true },
          y: { stacked: true, beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } }
        }
      }
    });
  }

  global.ChartRenderer = { render, destroy };
})(window);
