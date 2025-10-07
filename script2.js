document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main-content');

  // Reusable loader
  async function loadSection(section) {
    try {
      const res = await fetch(`${section}.html`, { cache: 'no-store' });
      const html = await res.text();
      main.innerHTML = html;

// ✅ Reset scroll inside .main container
main.scrollTop = 0;


// Re-run Lucide to replace <i data-lucide="...">
if (window.lucide) {
  lucide.createIcons();
}



  // After injecting new content, re-wire any internal links
      attachSectionLinks(main);
    } catch {
      main.innerHTML = `<p>Could not load ${section}.html</p>`;
    }
  }

  // Attach click handlers to links with data-section
  function attachSectionLinks(scope = document) {
    const sectionLinks = scope.querySelectorAll('a[data-section]');
    sectionLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const section = link.dataset.section;
        window.location.hash = section;
        loadSection(section);
      });
    });
  }

  // Wire up sidebar links initially
  attachSectionLinks(document);

  // Load initial section (from hash or default to home)
  const initial = window.location.hash.replace('#', '') || 'home';
  loadSection(initial);

  // ✅ Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      document.body.classList.toggle('collapsed');
    });
  }
});
