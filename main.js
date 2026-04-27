const c = document.getElementById('bg-canvas');
const ctx = c.getContext('2d');
let W, H;
const dots = [];
const N = 50;
function resize() { W = c.width = innerWidth; H = c.height = innerHeight; }
addEventListener('resize', resize); resize();
for (let i = 0; i < N; i++) dots.push({
  x: Math.random() * W, y: Math.random() * H,
  vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
  r: Math.random() * 1.5 + .5, a: Math.random() * .3 + .08
});
(function loop() {
  ctx.clearRect(0, 0, W, H);
  dots.forEach(d => {
    d.x += d.vx; d.y += d.vy;
    if (d.x < 0 || d.x > W) d.vx *= -1;
    if (d.y < 0 || d.y > H) d.vy *= -1;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, 6.28);
    ctx.fillStyle = `rgba(96,165,250,${d.a})`;
    ctx.fill();
  });
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
    const dist = Math.hypot(dx, dy);
    if (dist < 110) {
      ctx.beginPath();
      ctx.moveTo(dots[i].x, dots[i].y);
      ctx.lineTo(dots[j].x, dots[j].y);
      ctx.strokeStyle = `rgba(96,165,250,${.05 * (1 - dist / 110)})`;
      ctx.stroke();
    }
  }
  requestAnimationFrame(loop);
})();
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .15 });
document.querySelectorAll('.step, .arrow').forEach((el, i) => {
  el.style.transitionDelay = `${i * .15}s`;
  obs.observe(el);
});
