// Preloader ilustrado responsivo. Nunca bloqueia a página por mais de 4,5 segundos.
(() => {
  const html = document.documentElement;
  const loader = document.getElementById('site-preloader');
  if (!loader) { html.classList.remove('preloading'); return; }
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    loader.classList.add('is-hidden');
    html.classList.remove('preloading');
    setTimeout(() => loader.remove(), 750);
  };
  const image = loader.querySelector('img');
  if (image && !image.complete) image.addEventListener('load', () => loader.classList.add('image-ready'), { once: true });
  // Dá tempo para o primeiro frame da cena carregar, com limite rígido para evitar travamento.
  const timer = setTimeout(finish, 4500);
  addEventListener('load', () => setTimeout(() => { clearTimeout(timer); finish(); }, 350), { once: true });
  addEventListener('scene-ready', () => setTimeout(finish, 550), { once: true });
})();
