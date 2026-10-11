document.addEventListener('DOMContentLoaded', () => {
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const nav = document.querySelector('#site-nav');
  const toggle = document.querySelector('.menu-toggle');
  const closeMenu = () => { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); nav.classList.remove('is-open'); };
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('is-open', open); });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => { if (!event.target.closest('.header-inner')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
  window.matchMedia('(min-width: 1001px)').addEventListener('change', closeMenu);
  document.querySelector('#component-grid').innerHTML = CONFIG.COMPONENTS.map(component => `
    <article class="component-card"><div class="component-top"><span class="component-number">${component.number}</span><span class="component-domain">${escapeHTML(component.short)}</span><span class="component-mark" aria-hidden="true">${['◈', '✳', '⌖', '≋'][Number(component.number) - 1]}</span></div><h3>${escapeHTML(component.title)}</h3><p class="component-description">${escapeHTML(component.description)}</p><dl class="component-io"><div><dt>INPUT</dt><dd>${escapeHTML(component.input)}</dd></div><div><dt>OUTPUT</dt><dd>${escapeHTML(component.output)}</dd></div></dl><details class="component-details"><summary>Methods &amp; evaluation <span aria-hidden="true">+</span></summary><div><p class="method-label">${escapeHTML(component.methods)}</p><span class="evidence-label">${escapeHTML(component.status)}</span><p>${escapeHTML(component.evidence)}</p><p class="evidence-limit">${escapeHTML(component.limit)}</p></div></details><p class="component-owner">RESEARCHER <span>${escapeHTML(component.owner)}</span></p></article>`).join('');
  document.querySelector('#team-grid').innerHTML = CONFIG.COMPONENTS.map(component => `<article class="team-card"><span class="team-avatar" aria-hidden="true">${component.initials}</span><span class="team-component">COMPONENT ${component.number}</span><h3>${escapeHTML(component.owner)}</h3><p>${escapeHTML(component.short)}</p><span class="student-id">${component.studentId}</span></article>`).join('');
  let filter = 'all';
  const search = document.querySelector('#document-search');
  const renderDocuments = () => {
    const query = search.value.trim().toLocaleLowerCase();
    const entries = CONFIG.DELIVERABLES.filter(item => (filter === 'all' || item.category === filter) && `${item.title} ${item.description}`.toLocaleLowerCase().includes(query));
    document.querySelector('#document-list').innerHTML = entries.map(item => `<article class="document-row"><span class="file-icon" aria-hidden="true">${item.category === 'presentation' ? '▤' : '▧'}</span><div><h4>${escapeHTML(item.title)}</h4><p>${escapeHTML(item.description)}</p></div>${item.url ? `<a class="document-download" href="${escapeHTML(item.url)}" download>Download <span aria-hidden="true">↓</span></a>` : '<span class="upload-status">Awaiting upload</span>'}</article>`).join('');
    document.querySelector('#document-count').textContent = `${entries.length} deliverables shown`;
    document.querySelector('#document-empty').hidden = entries.length > 0;
  };
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); renderDocuments(); }));
  search.addEventListener('input', renderDocuments);
  renderDocuments();
  const screenTabs = [...document.querySelectorAll('[data-screen]')];
  const screenImage = document.querySelector('#screen-image');
  let currentScreen = 'wellness';
  const selectScreen = button => {
    currentScreen = button.dataset.screen;
    const screen = CONFIG.SCREENS[currentScreen];
    screenTabs.forEach(tab => { tab.setAttribute('aria-selected', String(tab === button)); tab.tabIndex = tab === button ? 0 : -1; });
    screenImage.src = screen.src; screenImage.alt = screen.alt;
    document.querySelector('#screen-caption').textContent = screen.caption;
    document.querySelector('#screen-panel').setAttribute('aria-labelledby', button.id);
  };
  screenTabs.forEach((button, index) => {
    button.addEventListener('click', () => selectScreen(button));
    button.addEventListener('keydown', event => { let target; if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = (index + 1) % screenTabs.length; if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = (index + screenTabs.length - 1) % screenTabs.length; if (event.key === 'Home') target = 0; if (event.key === 'End') target = screenTabs.length - 1; if (target !== undefined) { event.preventDefault(); selectScreen(screenTabs[target]); screenTabs[target].focus(); } });
  });
  const dialog = document.querySelector('#image-dialog');
  document.querySelector('#screen-expand').addEventListener('click', () => { const screen = CONFIG.SCREENS[currentScreen]; document.querySelector('#dialog-image').src = screen.src; document.querySelector('#dialog-image').alt = screen.alt; document.querySelector('#dialog-caption').textContent = `${screen.caption} Interface concept; values are illustrative.`; dialog.showModal(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  if ('IntersectionObserver' in window) {
    const links = [...nav.querySelectorAll('a')];
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => { if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); }); }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    links.forEach(link => observer.observe(document.querySelector(link.getAttribute('href'))));
  }
});
