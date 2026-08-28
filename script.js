const body = document.body;
const theme = document.getElementById('theme-toggle');
const menu = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
document.querySelectorAll('a:not([data-legal]):not([data-contact])').forEach(link => link.setAttribute('href', '#'));
let size = Number(localStorage.getItem('ver-font-size') || 16);

function setSize(value) {
  size = Math.min(20, Math.max(14, value));
  document.documentElement.style.fontSize = `${size}px`;
  localStorage.setItem('ver-font-size', size);
}
setSize(size);

if (localStorage.getItem('ver-theme') === 'dark') body.classList.add('dark');
theme.addEventListener('click', () => { body.classList.toggle('dark'); localStorage.setItem('ver-theme', body.classList.contains('dark') ? 'dark' : 'light'); });
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); menu.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>'; });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.innerHTML = '<i class="fa-solid fa-bars"></i>'; }));
document.getElementById('font-minus').addEventListener('click', () => setSize(size - 1));
document.getElementById('font-reset').addEventListener('click', () => setSize(16));
document.getElementById('font-plus').addEventListener('click', () => setSize(size + 1));
const track = document.getElementById('product-track');
document.getElementById('prev').addEventListener('click', () => track.scrollBy({ left: -260, behavior: 'smooth' }));
document.getElementById('next').addEventListener('click', () => track.scrollBy({ left: 260, behavior: 'smooth' }));
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchFeedback = document.getElementById('search-feedback');
const products = [...document.querySelectorAll('.product')];
function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();
  let matches = 0;
  products.forEach(product => { const match = !query || product.dataset.search.includes(query); product.classList.toggle('is-hidden', !match); if (match) matches++; });
  searchFeedback.textContent = query ? `${matches} produto${matches === 1 ? '' : 's'} encontrado${matches === 1 ? '' : 's'} para “${searchInput.value.trim()}”.` : '';
}
searchForm.addEventListener('submit', event => { event.preventDefault(); filterProducts(); document.getElementById('destaques').scrollIntoView({ behavior: 'smooth' }); });
searchInput.addEventListener('input', filterProducts);
const parallaxHero = document.querySelector('.parallax-hero');
const parallaxProducts = [...document.querySelectorAll('.parallax-product')];
if (parallaxHero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  parallaxHero.addEventListener('pointermove', event => {
    const bounds = parallaxHero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    parallaxProducts.forEach((product, index) => {
      const depth = (index + 1) * 9;
      product.style.setProperty('--parallax-x', `${x * depth}px`);
      product.style.setProperty('--parallax-y', `${y * depth}px`);
    });
  });
  parallaxHero.addEventListener('pointerleave', () => parallaxProducts.forEach(product => { product.style.setProperty('--parallax-x', '0px'); product.style.setProperty('--parallax-y', '0px'); }));
  let scrollFrame;
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      const bounds = parallaxHero.getBoundingClientRect();
      const offset = Math.max(-65, Math.min(65, -bounds.top * .18));
      parallaxHero.style.setProperty('--scroll-y', `${offset}px`);
      scrollFrame = null;
    });
  }, { passive: true });
}
