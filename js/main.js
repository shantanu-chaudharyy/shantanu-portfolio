document.documentElement.classList.add('js-enabled');


document.getElementById('year').textContent=new Date().getFullYear();

const progressLine = document.querySelector('.progress-line');
const pointerGlow = document.querySelector('.pointer-glow');
let scrollTick = false;
function updateScrollProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressLine.style.width = progress + '%';
  scrollTick = false;
}
window.addEventListener('scroll', () => {
  if (!scrollTick) {
    window.requestAnimationFrame(updateScrollProgress);
    scrollTick = true;
  }
}, { passive: true });
window.addEventListener('pointermove', (event) => {
  if (pointerGlow && event.pointerType !== 'touch') {
    pointerGlow.style.left = event.clientX + 'px';
    pointerGlow.style.top = event.clientY + 'px';
  }
}, { passive: true });
updateScrollProgress();

const items=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});items.forEach(el=>observer.observe(el));}else{items.forEach(el=>el.classList.add('visible'))}


// Background reacts smoothly to scroll position: layered parallax, shifting glow, and ambient particles.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ambience = document.querySelector('.scroll-ambience');
  const orbs = [...document.querySelectorAll('.ambient-orb')];
  const particleLayer = document.querySelector('.ambient-particles');
  if (!ambience || !particleLayer) return;

  if (!reduceMotion) {
    const count = window.innerWidth < 640 ? 18 : 32;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'ambient-particle';
      p.style.left = ((i * 37 + 11) % 100) + '%';
      p.style.top = ((i * 61 + 7) % 100) + '%';
      p.style.opacity = (0.12 + ((i * 13) % 30) / 100).toFixed(2);
      p.style.width = p.style.height = (1 + (i % 3)) + 'px';
      particleLayer.appendChild(p);
    }
  }

  let scheduled = false;
  function paint() {
    const y = window.scrollY || 0;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, y / max);
    if (!reduceMotion) {
      orbs.forEach((orb, i) => {
        const speed = [0.12, -0.085, 0.06][i] || 0.08;
        const phase = [0, 1.8, 3.4][i] || 0;
        const driftX = Math.sin(progress * Math.PI * 2 + phase) * (28 + i * 8);
        const driftY = y * speed + Math.cos(progress * Math.PI + phase) * 24;
        orb.style.transform = `translate3d(${driftX}px, ${driftY}px, 0) scale(${1 + Math.sin(progress * Math.PI * 2 + phase) * 0.08})`;
        orb.style.opacity = String(0.11 + Math.abs(Math.sin(progress * Math.PI * 2 + phase)) * 0.13);
      });
      const particles = particleLayer.children;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const drift = ((i % 2) ? -1 : 1) * (y * (0.025 + (i % 5) * 0.008));
        const bob = Math.sin(y * 0.003 + i) * 13;
        p.style.transform = `translate3d(${Math.sin(y * 0.0015 + i) * 20}px, ${drift + bob}px, 0)`;
      }
    }
    scheduled = false;
  }
  function onScroll() {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(paint);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  paint();
})();

