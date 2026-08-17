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
const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.slider-dots button')];
let currentSlide = 0;
function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}
dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
setInterval(() => showSlide(currentSlide + 1), 5000);
