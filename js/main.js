/* =========================================
   1. 히어로 슬라이더: JS가 시간을 재고 바를 직접 채움
   ========================================= */
const hero = document.querySelector('.hero');

if (hero) {
  const slides = hero.querySelectorAll('.hero__slide');
  const bars = hero.querySelectorAll('.hero__bar');
  const timeline = hero.querySelector('.hero__timeline');
  const siteHeader = document.querySelector('.header'); 

  const INTERVAL = 6000;   // 한 장이 머무는 시간 (6초)
  let current = 0;
  let elapsed = 0;         // 지금 사진이 머문 시간
  let last = null;
  let paused = false;

  // ← 추가: 지금 사진이 어두우면 헤더·타임라인을 밝은 글씨로
  const applyTheme = () => {
    const isDark = slides[current].dataset.theme === 'dark';
    siteHeader.classList.toggle('is-on-dark', isDark);
    hero.classList.toggle('is-dark', isDark);
  };

  // 바 채우기: 0 = 비어 있음, 1 = 가득 참
  const setBar = (i, progress) => {
    bars[i].querySelector('span').style.transform = `scaleX(${progress})`;
  };

  const goTo = (index) => {
    slides[current].classList.remove('is-active');
    bars[current].classList.remove('is-active');
    setBar(current, 0);

    current = (index + slides.length) % slides.length;   // 마지막 다음은 처음으로

    slides[current].classList.add('is-active');
    bars[current].classList.add('is-active');
    elapsed = 0;
    applyTheme();   // ← 추가
  };

    applyTheme();  // ← 추가: 첫 사진에도 바로 적용

  /* 아래 tick, 클릭, 마우스 멈춤 코드는 그대로 */
  

  // 매 프레임마다 시간을 더하고 바를 채움
  const tick = (now) => {
    if (last === null) last = now;
    const delta = Math.min(now - last, 100);   // 탭을 갔다 왔을 때 한 번에 넘어가지 않게
    last = now;

    if (!paused) {
      elapsed += delta;
      setBar(current, Math.min(elapsed / INTERVAL, 1));
      if (elapsed >= INTERVAL) goTo(current + 1);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  // 바 클릭: 해당 사진으로 이동
  bars.forEach((bar, i) => {
    bar.addEventListener('click', () => {
      if (i !== current) goTo(i);
    });
  });

  // 타임라인에 마우스를 올리면 잠시 멈춤
  timeline.addEventListener('mouseenter', () => { paused = true; });
  timeline.addEventListener('mouseleave', () => { paused = false; });
}


/* =========================================
   2. 헤더: 스크롤 시 화이트 배경 전환
   ========================================= */
const header = document.querySelector('.header');

const updateHeader = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 40);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* =========================================
   3. 상품 그리드
   ========================================= */
const formatPrice = (num) => '₩' + num.toLocaleString('ko-KR');

const createCard = (p) => `
  <a href="#" class="card reveal ${p.type === 'object' ? 'card--object' : ''}">
    <div class="card__thumb">
      ${p.soldOut ? '<span class="card__badge">Out of stock</span>' : ''}
      <img src="https://picsum.photos/seed/${p.seed}a/600/800" alt="${p.name}" loading="lazy">
      <img class="is-hover" src="https://picsum.photos/seed/${p.seed}b/600/800" alt="" loading="lazy">
    </div>
    <div class="card__info">
      <span class="card__name">${p.name}</span>
      <span class="card__price">${formatPrice(p.price)}</span>
    </div>
  </a>
`;

function renderGrids() {
  if (typeof PRODUCTS === 'undefined') {
    console.warn('products.js의 PRODUCTS를 찾을 수 없어요.');
    return;
  }
  document.querySelectorAll('.grid[data-category]').forEach((grid) => {
    const items = PRODUCTS[grid.dataset.category] || [];
    grid.innerHTML = items.map(createCard).join('');
  });
}

/* =========================================
   4. 스크롤 페이드인
   ========================================= */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

renderGrids();
initReveal();   // 카드를 그린 다음에 관찰해야 새 카드에도 적용됨
