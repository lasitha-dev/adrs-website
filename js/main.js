document.addEventListener('DOMContentLoaded', () => {
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const assetURL = path => path.split('/').map(encodeURIComponent).join('/');
  const researchDialog = document.querySelector('#research-dialog');
  let researchTrigger;
  document.querySelectorAll('[data-research]').forEach(button => button.addEventListener('click', () => {
    const topic = CONFIG.RESEARCH_TOPICS[button.dataset.research];
    researchTrigger = button;
    document.querySelector('#research-dialog-title').textContent = topic.title;
    document.querySelector('#research-dialog-intro').textContent = topic.intro;
    const listTag = topic.ordered ? 'ol' : 'ul';
    document.querySelector('#research-dialog-content').innerHTML = `<${listTag} class="research-points${topic.ordered ? ' research-steps' : ''}">${topic.items.map(item => `<li><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.text)}</p>${item.tag ? `<p class="research-response">${escapeHTML(item.tag)}</p>` : ''}</li>`).join('')}</${listTag}><p class="research-takeaway">${escapeHTML(topic.takeaway)}</p><div class="research-sources"><h3>Read the source documents</h3>${topic.sources.map(source => `<a href="${escapeHTML(assetURL(source.url))}#page=${source.page}" target="_blank" rel="noopener">${escapeHTML(source.label)} <span aria-hidden="true">↗</span><span class="sr-only"> (PDF, opens in a new tab)</span></a>`).join('')}</div>`;
    researchDialog.showModal();
    researchDialog.scrollTop = 0;
  }));
  researchDialog.addEventListener('close', () => researchTrigger?.focus({ preventScroll: true }));
  researchDialog.addEventListener('click', event => {
    if (event.target !== researchDialog) return;
    const rect = researchDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) researchDialog.close();
  });

  const techGroups = [...new Set(CONFIG.TECH_STACK.map(tech => tech.group))];
  document.querySelector('#tech-groups').innerHTML = techGroups.map(group => `<div class="tech-group"><h3>${escapeHTML(group)}</h3><ul>${CONFIG.TECH_STACK.filter(tech => tech.group === group).map(tech => `<li class="tech-item"><span class="tech-logo"><img src="${escapeHTML(assetURL(`Images/tech/${tech.logo}`))}" alt="${escapeHTML(tech.name)} logo" width="36" height="36" loading="lazy"></span><div><h4>${escapeHTML(tech.name)}</h4><p>${escapeHTML(tech.role)}</p></div></li>`).join('')}</ul></div>`).join('');

  const contactForm = document.querySelector('#contact-form');
  const contactSubmit = document.querySelector('#contact-submit');
  const contactStatus = document.querySelector('#contact-status');
  contactForm.elements.namedItem('access_key').defaultValue = CONFIG.CONTACT.accessKey.trim();
  contactForm.elements.namedItem('subject').defaultValue = CONFIG.CONTACT.subject;
  contactSubmit.disabled = false;
  let sending = false;
  const showContactStatus = (message, state) => {
    contactStatus.textContent = message;
    contactStatus.dataset.state = state;
  };
  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !contactForm.reportValidity()) return;
    const payload = Object.fromEntries(new FormData(contactForm));
    if (payload.botcheck) return;
    if (!payload.access_key) {
      showContactStatus('The contact form is not available yet. Please try again later.', 'error');
      return;
    }
    // The recipient is determined by the Web3Forms key, never by a visitor field.
    payload.replyto = payload.email;
    sending = true;
    contactSubmit.disabled = true;
    contactSubmit.textContent = 'Sending…';
    contactForm.setAttribute('aria-busy', 'true');
    showContactStatus('Sending your message…', 'pending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Submission rejected');
      contactForm.reset();
      showContactStatus('Thank you! Your message has been sent to the ADRS research team.', 'success');
    } catch (error) {
      showContactStatus(error.name === 'AbortError'
        ? 'The request timed out. Your message is still here. Please check your connection before trying again.'
        : 'We could not confirm that your message was sent. Your message is still here; please try again later.', 'error');
    } finally {
      clearTimeout(timeout);
      sending = false;
      contactSubmit.disabled = false;
      contactSubmit.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
      contactForm.removeAttribute('aria-busy');
    }
  });
  const nav = document.querySelector('#site-nav');
  const toggle = document.querySelector('.menu-toggle');
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => { if (!event.target.closest('.header-inner')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
  });
  window.matchMedia('(min-width: 1001px)').addEventListener('change', closeMenu);

  document.querySelector('#component-grid').innerHTML = CONFIG.COMPONENTS.map(component => {
    const thesis = CONFIG.DELIVERABLES.find(item => item.id === component.thesis);
    const proposal = CONFIG.DELIVERABLES.find(item => item.id === component.proposal);
    return `<article class="component-card">
      <div class="component-top"><span class="component-number">${component.number}</span><span class="component-domain">${escapeHTML(component.short)}</span><span class="component-mark" aria-hidden="true">${['◈', '✳', '⌖', '≋'][Number(component.number) - 1]}</span></div>
      <h3>${escapeHTML(component.title)}</h3><p class="component-description">${escapeHTML(component.description)}</p>
      <dl class="component-io"><div><dt>INPUT</dt><dd>${escapeHTML(component.input)}</dd></div><div><dt>OUTPUT</dt><dd>${escapeHTML(component.output)}</dd></div></dl>
      <details class="component-details"><summary>Methods &amp; evaluation <span aria-hidden="true">+</span></summary><div><p class="method-label">${escapeHTML(component.methods)}</p><span class="evidence-label">${escapeHTML(component.status)}</span><p>${escapeHTML(component.evidence)}</p><p class="evidence-limit">${escapeHTML(component.limit)}</p></div></details>
      <p class="component-owner">RESEARCHER <span>${escapeHTML(component.owner)}</span></p>
      <div class="component-links"><a href="#application" data-dashboard="${component.screen}" aria-label="View ${escapeHTML(component.short)} dashboard">View dashboard <span aria-hidden="true">↗</span></a><a href="${escapeHTML(assetURL(thesis.url))}" target="_blank" rel="noopener" aria-label="Read ${escapeHTML(component.short)} thesis PDF (opens in a new tab)">Read thesis</a><a href="${escapeHTML(assetURL(proposal.url))}" target="_blank" rel="noopener" aria-label="Read ${escapeHTML(component.short)} proposal PDF (opens in a new tab)">Read proposal</a></div>
    </article>`;
  }).join('');
  const profilePhoto = (person, name) => `<img class="team-avatar" src="${escapeHTML(assetURL(person.photo))}" alt="Portrait of ${escapeHTML(name)}" width="96" height="96" loading="lazy" decoding="async">`;
  const profileLinks = (person, name) => `<div class="profile-links"><a href="${escapeHTML(person.linkedin)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(name)} on LinkedIn (opens in a new tab)">LinkedIn <span aria-hidden="true">↗</span></a><a class="profile-email" href="mailto:${escapeHTML(person.email)}">${escapeHTML(person.email)}</a></div>`;
  document.querySelector('#team-grid').innerHTML = CONFIG.COMPONENTS.map(component => `<article class="team-card">${profilePhoto(component, component.owner)}<span class="team-component">COMPONENT ${component.number}</span><h3>${escapeHTML(component.owner)}</h3><p>${escapeHTML(component.short)}</p><span class="student-id">${component.studentId}</span>${profileLinks(component, component.owner)}</article>`).join('');
  document.querySelector('#supervisor-grid').innerHTML = CONFIG.SUPERVISORS.map(person => `<article class="supervisor-card">${profilePhoto(person, person.name)}<div><h3>${escapeHTML(person.name)}</h3><p class="supervisor-role">${escapeHTML(person.role)}</p>${profileLinks(person, person.name)}</div></article>`).join('');

  let filter = 'all';
  const search = document.querySelector('#document-search');
  const normalize = value => String(value).toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const matches = item => {
    const component = CONFIG.COMPONENTS.find(entry => entry.number === item.component);
    const haystack = normalize([item.title, item.description, item.author, item.stage, item.format, item.url, item.date, component?.title, component?.short, component?.studentId, component ? `component ${component.number} ${Number(component.number)}` : ''].filter(Boolean).join(' '));
    return (filter === 'all' || item.category === filter) && normalize(search.value).split(' ').filter(Boolean).every(word => haystack.includes(word));
  };
  const fileSize = bytes => `${(bytes / 1048576).toFixed(2)} MiB`;
  const renderRow = item => {
    const href = escapeHTML(assetURL(item.url));
    const meta = [item.format, item.pages ? `${item.pages} pages` : `${item.slides} slides`, fileSize(item.bytes), item.date].filter(Boolean).join(' · ');
    return `<article class="document-row${item.category === 'paper' ? ' paper-row' : ''}" id="${item.id}">
      <span class="file-icon" aria-hidden="true">${item.format}</span>
      <div class="document-copy">${item.component ? `<span class="document-component">COMPONENT ${item.component}</span>` : ''}<h4>${escapeHTML(item.title)}</h4><p class="document-author">${escapeHTML(item.author)}</p><p class="document-description">${escapeHTML(item.description)}</p><p class="document-meta">${escapeHTML(meta)}</p>${item.note ? `<p class="document-version">${escapeHTML(item.note)}</p>` : ''}</div>
      <div class="document-actions">${item.format === 'PDF' ? `<a href="${href}" target="_blank" rel="noopener" aria-label="View ${escapeHTML(item.stage)}: ${escapeHTML(item.title)} PDF (opens in a new tab)">View PDF <span aria-hidden="true">↗</span></a>` : ''}<a href="${href}" download aria-label="Download ${escapeHTML(item.stage)}: ${escapeHTML(item.title)} (${item.format})">Download ${item.format} <span aria-hidden="true">↓</span></a></div>
    </article>`;
  };
  const renderDocuments = () => {
    const entries = CONFIG.DELIVERABLES.filter(matches);
    const showGroup = matches(CONFIG.GROUP_REPORT);
    document.querySelector('#group-report').hidden = !showGroup;
    document.querySelector('#document-list').innerHTML = CONFIG.CATEGORIES.map(category => {
      const documents = entries.filter(item => item.category === category.id);
      return documents.length ? `<section class="document-group" aria-labelledby="group-${category.id}"><div class="document-group-heading"><h3 id="group-${category.id}">${escapeHTML(category.title)}</h3><span>${documents.length} ${documents.length === 1 ? 'document' : 'documents'}</span></div>${documents.map(renderRow).join('')}</section>` : '';
    }).join('');
    const count = entries.length + Number(showGroup);
    document.querySelector('#document-count').textContent = `${count} of ${CONFIG.DELIVERABLES.length + 1} research documents shown`;
    document.querySelector('#document-empty').hidden = count > 0;
  };
  const setFilter = value => {
    filter = value;
    document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
    renderDocuments();
  };
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
  search.addEventListener('input', renderDocuments);
  document.querySelector('#document-reset').addEventListener('click', () => { search.value = ''; setFilter('all'); search.focus(); });
  renderDocuments();

  const screenTabs = [...document.querySelectorAll('[data-screen]')];
  const screenImage = document.querySelector('#screen-image');
  const screenPanel = document.querySelector('#screen-panel');
  let currentScreen = screenTabs.find(tab => tab.getAttribute('aria-selected') === 'true').dataset.screen;
  const selectScreen = button => {
    currentScreen = button.dataset.screen;
    const screen = CONFIG.SCREENS[currentScreen];
    screenTabs.forEach(tab => { tab.setAttribute('aria-selected', String(tab === button)); tab.tabIndex = tab === button ? 0 : -1; });
    screenImage.width = screen.width; screenImage.height = screen.height;
    screenImage.src = assetURL(screen.src); screenImage.alt = screen.alt;
    document.querySelector('#screen-caption').textContent = screen.caption;
    document.querySelector('#screen-expand').setAttribute('aria-label', `Open full-size ${screen.title} dashboard`);
    screenPanel.setAttribute('aria-labelledby', button.id);
  };
  screenTabs.forEach((button, index) => {
    button.addEventListener('click', () => selectScreen(button));
    button.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (index + 1) % screenTabs.length;
      if (event.key === 'ArrowLeft') target = (index + screenTabs.length - 1) % screenTabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = screenTabs.length - 1;
      if (target !== undefined) { event.preventDefault(); selectScreen(screenTabs[target]); screenTabs[target].focus(); }
    });
  });
  document.querySelectorAll('[data-dashboard]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    selectScreen(screenTabs.find(tab => tab.dataset.screen === link.dataset.dashboard));
    screenPanel.focus({ preventScroll: true });
    document.querySelector('#application').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }));
  selectScreen(screenTabs.find(tab => tab.dataset.screen === currentScreen));

  const dialog = document.querySelector('#image-dialog');
  const dialogImage = document.querySelector('#dialog-image');
  const zoom = document.querySelector('#dialog-zoom');
  const resetZoom = () => { dialog.classList.remove('is-zoomed'); zoom.setAttribute('aria-pressed', 'false'); zoom.textContent = 'Actual size'; };
  document.querySelector('#screen-expand').addEventListener('click', () => {
    const screen = CONFIG.SCREENS[currentScreen];
    resetZoom();
    dialogImage.src = assetURL(screen.src); dialogImage.alt = screen.alt;
    dialogImage.width = screen.width; dialogImage.height = screen.height;
    dialog.style.setProperty('--image-width', `${screen.width}px`);
    document.querySelector('#dialog-title').textContent = screen.title;
    document.querySelector('#dialog-caption').textContent = `${screen.caption} Screen outputs are examples, not performance metrics or current advisories.`;
    dialog.showModal();
    document.querySelector('.dialog-image-wrap').scrollTo(0, 0);
  });
  zoom.addEventListener('click', () => {
    const enlarged = dialog.classList.toggle('is-zoomed');
    zoom.setAttribute('aria-pressed', String(enlarged)); zoom.textContent = enlarged ? 'Fit to view' : 'Actual size';
  });
  dialog.addEventListener('close', resetZoom);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  if ('IntersectionObserver' in window) {
    const links = [...nav.querySelectorAll('a')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => { if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    links.forEach(link => observer.observe(document.querySelector(link.getAttribute('href'))));
  }
});
