document.querySelectorAll('[data-destination]').forEach(link => {
  link.href = window.BOSSI_WEBSITE_URL;
});
// Matrix Rain: adapted directly from the supplied example's MatrixRain component.
(() => {
  const canvas = document.getElementById('matrix-rain');
  const context = canvas.getContext('2d');
  if (!context) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0, columns = [], width = 0, height = 0, fontSize = 18, last = 0;
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    width = innerWidth;
    height = innerHeight;
    fontSize = width < 640 ? 15 : 19;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    columns = Array.from({length: Math.ceil(width / fontSize)}, () => Math.random() * -40);
    context.fillStyle = '#020806';
    context.fillRect(0, 0, width, height);
  }
  function draw(time) {
    if (time - last > 58) {
      context.fillStyle = 'rgba(0, 5, 2, 0.1)';
      context.fillRect(0, 0, width, height);
      context.font = `600 ${fontSize}px monospace`;
      columns.forEach((position, index) => {
        const character = Math.random() > 0.5 ? '1' : '0';
        const y = position * fontSize;
        context.fillStyle = Math.random() > 0.93 ? '#e8ffd6' : 'rgba(94, 255, 37, .66)';
        context.fillText(character, index * fontSize, y);
        columns[index] = y > height && Math.random() > 0.975 ? Math.random() * -20 : position + 0.62;
      });
      last = time;
    }
    frame = requestAnimationFrame(draw);
  }
  function restart() {
    cancelAnimationFrame(frame);
    resize();
    last = 0;
    if (!motion.matches && !document.hidden) frame = requestAnimationFrame(draw);
  }
  addEventListener('resize', resize, {passive: true});
  motion.addEventListener('change', restart);
  document.addEventListener('visibilitychange', restart);
  restart();
})();
