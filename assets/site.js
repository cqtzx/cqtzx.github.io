import { size, sample } from './signal-data.mjs';

const settings = document.documentElement;
const theme = document.querySelector('.theme');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');

function updateThemeButton() {
  const dark = settings.dataset.theme === 'dark' || (!settings.dataset.theme && systemTheme.matches);
  const label = dark ? '切换浅色模式' : '切换深色模式';
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
    status.textContent = '显示 ' + papers.filter((paper) => !paper.hidden).length + ' 篇论文';
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
        button.textContent = '已复制';
      } catch {
        const link = document.createElement('a');
        const url = URL.createObjectURL(new Blob([entry + '\n'], { type: 'text/plain' }));
        link.href = url;
        link.download = key + '.bib';
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        button.textContent = '已下载';
      }
    } catch {
      button.textContent = '请重试';
    }
    document.querySelector('.status').textContent = button.textContent + ' · BibTeX';
    clearTimeout(reset);
    reset = setTimeout(() => { button.textContent = 'BibTeX'; }, 1800);
  });
});

const canvas = document.querySelector('#signal');
if (canvas) {
  const context = canvas.getContext('2d');
  const project = (x, y, z) => [450 + 179 * x - 175 * y, 241 + 64 * x + 79 * y - 169 * z];
  const points = Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, column) => sample(row, column))
  );

  function line(coordinates, color, width) {
    context.beginPath();
    coordinates.forEach((point, index) => {
      if (index === 0) context.moveTo(...point);
      else context.lineTo(...point);
    });
    context.strokeStyle = color;
    context.lineWidth = width;
    context.stroke();
  }

  for (let index = 0; index <= 12; index += 1) {
    const edge = -1 + index / 6;
    line([project(edge, -1, -.52), project(edge, 1, -.52)], '#50618a53', 1);
    line([project(-1, edge, -.52), project(1, edge, -.52)], '#50618a53', 1);
  }

  for (let index = 0; index < size; index += 1) {
    const weight = index % 4 === 0 ? 1.9 : 1;
    const first = points[index].map(({ x, y, signal }) => project(x, y, signal));
    const second = points.map((row) => {
      const { x, y, signal } = row[index];
      return project(x, y, signal);
    });
    line(first, index % 4 === 0 ? '#9eb6ffdb' : '#7598f282', weight);
    line(second, index % 4 === 0 ? '#88a8ffd0' : '#82a7ff7b', weight);
  }

  points.flat().filter((point) => point.outlier).forEach(({ x, y, signal, observation }) => {
    const [left, top] = project(x, y, observation);
    line([project(x, y, signal), [left, top]], '#fab98e78', 1.3);
    context.beginPath();
    context.arc(left, top, 4.15, 0, Math.PI * 2);
    context.fillStyle = '#ffc69c';
    context.fill();
  });
}
