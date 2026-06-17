// app.js — 사이드바 트리, 검색, 표 로딩 라우팅
// window.App.init({ year, indexUrl, dataDir }) 로 시작.

(function (global) {
  'use strict';

  const state = { config: null, index: null, current: null };

  const cleanTitle = s =>
    (window.TableRenderer && window.TableRenderer.cleanTitle)
      ? window.TableRenderer.cleanTitle(s)
      : String(s || '').replace(/^[^\w가-힣\[\(]+/u, '').trim();

  async function init(config) {
    state.config = config;
    try {
      const r = await fetch(config.indexUrl, { cache: 'no-store' });
      if (!r.ok) throw new Error('index fetch failed: ' + r.status);
      state.index = await r.json();
    } catch (e) {
      showError('index.json을 불러오지 못했습니다. 로컬 서버로 실행해 주세요. ' +
                '(예: 프로젝트 루트에서 python -m http.server 8000 → http://localhost:8000/site/2026.html)');
      console.error(e);
      return;
    }
    buildTree();
    bindSearch();

    // URL hash로 직접 진입 가능: #I-1-01
    const initial = (location.hash || '').replace('#', '');
    if (initial) loadTableById(initial);
  }

  function buildTree() {
    const root = document.getElementById('tree-root');
    root.innerHTML = '';

    // Toolbar above the tree
    const treeToolbar = document.createElement('div');
    treeToolbar.className = 'tree-toolbar';
    treeToolbar.innerHTML =
      '<button type="button" data-act="expand-all">모두 펼치기</button>' +
      '<button type="button" data-act="collapse-all">모두 접기</button>';
    root.parentElement.insertBefore(treeToolbar, root);
    treeToolbar.addEventListener('click', e => {
      const act = e.target.closest('button')?.dataset.act;
      if (!act) return;
      // 접을 수 있는 모든 노드(.cat, .sub, .grp)에 일괄 적용
      document.querySelectorAll('#tree-root .cat, #tree-root .sub, #tree-root .grp').forEach(n => {
        n.classList.toggle('collapsed', act === 'collapse-all');
      });
    });

    const isPlaceholderSub = title => /자동\s*추출\(검토\s*필요\)/.test(title || '');

    // 그룹 제목에서 "1.1 ", "4.10 ", "1.2.3 " 같은 숫자 접두를 추출.
    const numericPrefix = title => {
      const m = String(title || '').match(/^(\d+(?:\.\d+)+)\s+/);
      return m ? m[1] + ' ' : '';
    };

    const renderTableLink = (t, displayTitle) => {
      const tLi = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'table-link';
      a.href = '#' + t.id;
      a.textContent = displayTitle != null ? displayTitle : cleanTitle(t.title);
      a.dataset.id = t.id;
      a.dataset.file = t.file;
      a.addEventListener('click', e => {
        e.preventDefault();
        location.hash = t.id;
        loadTable(t);
      });
      tLi.appendChild(a);
      return tLi;
    };

    // 접을 수 있는 가지 노드 생성기 (대분류·중분류·소분류 공통)
    const makeBranch = (cls, titleCls, title) => {
      const li = document.createElement('li');
      li.className = cls + ' collapsed';
      const t = document.createElement('div');
      t.className = titleCls;
      t.textContent = cleanTitle(title);
      t.addEventListener('click', () => li.classList.toggle('collapsed'));
      li.appendChild(t);
      const ul = document.createElement('ul');
      li.appendChild(ul);
      return { li, ul };
    };

    state.index.categories.forEach(cat => {
      const { li: catLi, ul: catUl } = makeBranch('cat', 'cat-title', cat.title);

      cat.subcategories.forEach(sub => {
        // 신 스키마: sub.groups[].tables
        if (Array.isArray(sub.groups)) {
          const { li: subLi, ul: subUl } = makeBranch('sub', 'sub-title', sub.title);
          sub.groups.forEach(grp => {
            // 소분류 안 표가 1개뿐이면 가지를 만들지 않고 "{소분류 번호} {표 제목}" 으로 평탄화
            if (grp.tables.length === 1) {
              const t = grp.tables[0];
              const display = numericPrefix(grp.title) + cleanTitle(t.title);
              const flat = renderTableLink(t, display);
              flat.firstChild.classList.add('table-link-flat');  // 소분류 레벨로 통일 스타일링
              subUl.appendChild(flat);
              return;
            }
            const { li: grpLi, ul: grpUl } = makeBranch('grp', 'grp-title', grp.title);
            grp.tables.forEach(t => grpUl.appendChild(renderTableLink(t)));
            subUl.appendChild(grpLi);
          });
          catUl.appendChild(subLi);
          return;
        }
        // 구 스키마(폴백): sub.tables — placeholder sub면 라벨 없이 평탄화
        if (isPlaceholderSub(sub.title)) {
          (sub.tables || []).forEach(t => catUl.appendChild(renderTableLink(t)));
          return;
        }
        const { li: subLi, ul: subUl } = makeBranch('sub', 'sub-title', sub.title);
        (sub.tables || []).forEach(t => subUl.appendChild(renderTableLink(t)));
        catUl.appendChild(subLi);
      });

      root.appendChild(catLi);
    });
  }

  function bindSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;
    input.addEventListener('input', e => {
      const term = e.target.value.trim().toLowerCase();
      document.querySelectorAll('#tree-root .table-link').forEach(a => {
        const li = a.parentElement;
        li.style.display = (!term || a.textContent.toLowerCase().includes(term)) ? '' : 'none';
      });
      // 검색 중에는 매칭 결과가 보이도록 부모 가지를 임시로 펼치고,
      // 매칭 자식이 0개인 가지는 숨김
      const pruneBranch = sel => {
        document.querySelectorAll(sel).forEach(node => {
          const anyVisible = Array.from(node.querySelectorAll('.table-link'))
            .some(a => a.parentElement.style.display !== 'none');
          node.style.display = anyVisible ? '' : 'none';
          if (term) node.classList.remove('collapsed');
        });
      };
      pruneBranch('#tree-root .grp');
      pruneBranch('#tree-root .sub');
      pruneBranch('#tree-root > li.cat');
    });
  }

  function findTableMeta(id) {
    for (const cat of state.index.categories) {
      for (const sub of cat.subcategories) {
        if (Array.isArray(sub.groups)) {
          for (const grp of sub.groups)
            for (const t of grp.tables)
              if (t.id === id) return t;
        } else if (Array.isArray(sub.tables)) {
          for (const t of sub.tables)
            if (t.id === id) return t;
        }
      }
    }
    return null;
  }

  async function loadTableById(id) {
    const t = findTableMeta(id);
    if (t) loadTable(t);
  }

  async function loadTable(t) {
    const url = state.config.dataDir + t.file;
    try {
      const r = await fetch(url, { cache: 'no-store' });
      if (!r.ok) throw new Error('table fetch failed: ' + r.status);
      const data = await r.json();
      state.current = data;

      const root = document.getElementById('content-root');
      root.innerHTML = '';
      TableRenderer.render(root, data);

      // active link 표시
      document.querySelectorAll('#tree-root .table-link').forEach(a => {
        a.classList.toggle('active', a.dataset.id === t.id);
      });
    } catch (e) {
      console.error(e);
      showError('표 데이터를 불러오지 못했습니다: ' + t.file);
    }
  }

  function showError(msg) {
    const root = document.getElementById('content-root');
    if (!root) return;
    root.innerHTML = '<div style="background:#FFE5E5;color:#9b1c1c;padding:14px 18px;' +
                     'border-radius:8px;font-size:14px;">' + msg + '</div>';
  }

  global.App = { init };
})(window);
