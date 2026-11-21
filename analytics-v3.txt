// โหลด Google Analytics เฉพาะเมื่อกำหนด Measurement ID ที่ใช้รูปแบบ GA4
(() => {
  const id = (window.BOSSI_ANALYTICS_ID || '').trim();
  if (!/^G-[A-Z0-9]+$/.test(id)) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id);
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.appendChild(tag);
})();
