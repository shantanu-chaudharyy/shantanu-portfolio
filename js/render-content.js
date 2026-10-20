/* Renders repeatable content from js/portfolio-data.js. Keep presentation in assets/css/styles.css. */
(() => {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  };
  const safeExternalLink = (link, url, label) => {
    if (!url) return;
    link.href = url;
    link.setAttribute('aria-label', label || 'Open link');
    if (/^https?:/i.test(url)) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  };

  const skillsRoot = document.querySelector('#skills .technical-skills');
  if (skillsRoot) {
    data.skills.forEach(skill => {
      const row = make('div', 'technical-skill-row');
      row.append(make('strong', '', `${skill.category}:`), make('span', '', skill.items));
      skillsRoot.append(row);
    });
  }

  const projectsRoot = document.querySelector('#work .projects-grid');
  if (projectsRoot) {
    data.projects.forEach((project, index) => {
      const article = make('article', 'card project');
      const art = make('div', `project-art ${project.artClass || ''}`.trim());
      art.append(make('span', 'art-label', project.label));
      const word = make('div', 'art-word');
      word.append(document.createTextNode(project.artLead || ''));
      if (project.artAccent) {
        const accent = make(project.accentItalic ? 'em' : 'span', project.accentClass || '', project.artAccent);
        word.append(accent);
      }
      art.append(word, make('span', 'art-index', project.artIndex || `${String(index+1).padStart(2,'0')} / PROJECT`));
      const content = make('div', 'project-content');
      const heading = make('div', 'project-heading');
      heading.append(make('h3', '', project.title));
      const open = make('a', '', '↗');
      safeExternalLink(open, project.url, project.ariaLabel || `Open ${project.title}`);
      if (project.url) heading.append(open);
      content.append(heading, make('p', '', project.description));
      const tags = make('div', 'tags');
      (project.tags || []).forEach(tag => tags.append(make('span', 'tag', tag)));
      content.append(tags);
      if (project.cta && project.ctaUrl) {
        const links = make('div', 'project-links');
        const cta = make('a', 'text-link', project.cta);
        safeExternalLink(cta, project.ctaUrl, `${project.cta} for ${project.title}`);
        links.append(cta); content.append(links);
      }
      article.append(art, content); projectsRoot.append(article);
    });
  }

  const credentialsRoot = document.querySelector('#credentials .credentials');
  if (credentialsRoot) {
    data.certifications.forEach(cert => {
      const article = make('article', 'card credential');
      const logoBox = make('div', 'issuer-logo');
      const img = make('img', 'issuer-logo-img');
      img.alt = `${cert.issuer} logo`;
      img.loading = 'lazy';
      const fallback = make('span', 'issuer-logo-fallback', cert.fallback || cert.issuer.slice(0,2).toUpperCase());
      fallback.hidden = true;
      if (cert.logo) {
        img.addEventListener('error', () => { img.hidden = true; fallback.hidden = false; }, { once: true });
        img.src = cert.logo;
      } else {
        img.hidden = true;
        fallback.hidden = false;
      }
      logoBox.append(img, fallback);
      const copy = make('div', 'credential-copy');
      copy.append(make('div', 'issuer', cert.date ? `${cert.issuer} · ${cert.date}` : cert.issuer));
      copy.append(make('h3', '', cert.title), make('p', '', cert.detail));
      article.append(logoBox, copy); credentialsRoot.append(article);
    });
  }
})();
