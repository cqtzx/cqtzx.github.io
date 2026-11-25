const settings = document.documentElement;
const theme = document.querySelector('.theme');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');

function updateThemeButton() {
  const dark = settings.dataset.theme === 'dark' || (!settings.dataset.theme && systemTheme.matches);
  const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
  theme.setAttribute('aria-label', label);
  theme.title = label;
  theme.firstElementChild.textContent = dark ? '☀' : '☾';
}

if (theme) {
  try {
    const preference = localStorage.getItem('zt-theme');
    if (preference === 'light' || preference === 'dark') settings.dataset.theme = preference;
  } catch {
    // Theme switching remains available when storage is disabled.
  }
  theme.hidden = false;
  updateThemeButton();
  systemTheme.addEventListener('change', updateThemeButton);
  theme.addEventListener('click', () => {
    const dark = getComputedStyle(settings).colorScheme === 'dark';
    const next = dark ? 'light' : 'dark';
    settings.dataset.theme = next;
    try { localStorage.setItem('zt-theme', next); } catch {}
    updateThemeButton();
  });
}

const filters = document.querySelector('.filters');
if (filters) {
  const buttons = [...filters.querySelectorAll('button')];
  const papers = [...document.querySelectorAll('.paper')];
  const status = document.querySelector('.status');
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const active = event.target.closest('[data-year]');
    if (!active) return;
    buttons.forEach((button) => {
      button.classList.toggle('selected', active === button);
      button.setAttribute('aria-pressed', String(active === button));
    });
    papers.forEach((paper) => {
      paper.hidden = active.dataset.year !== 'all' && active.dataset.year !== paper.dataset.year;
    });
    const count = papers.filter((paper) => !paper.hidden).length;
    status.textContent = count + (count === 1 ? ' publication shown' : ' publications shown');
  });
}

let citations;
document.querySelectorAll('.bib-copy').forEach((button) => {
  button.hidden = false;
  let reset;
  button.addEventListener('click', async () => {
    try {
      if (!citations) {
        const response = await fetch(new URL('../publications.bib', import.meta.url));
        if (!response.ok) throw new Error('Bibliography unavailable');
        citations = (await response.text()).trim().split(/\n\s*\n/);
      }
      const key = button.dataset.key;
      const entry = citations.find((item) => item.startsWith('@article{' + key + ','));
      if (!entry) throw new Error('Citation unavailable');
      try {
        await navigator.clipboard.writeText(entry + '\n');
        button.textContent = 'Copied';
      } catch {
        const link = document.createElement('a');
        const url = URL.createObjectURL(new Blob([entry + '\n'], { type: 'text/plain' }));
        link.href = url;
        link.download = key + '.bib';
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        button.textContent = 'Downloaded';
      }
    } catch {
      button.textContent = 'Try again';
    }
    document.querySelector('.status').textContent = button.textContent + ' · BibTeX';
    clearTimeout(reset);
    reset = setTimeout(() => { button.textContent = 'BibTeX'; }, 1800);
  });
});
