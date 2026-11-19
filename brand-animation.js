/* Plays the authentic Books Giant login video from the provided public S3 URL.
 * The existing illustration is shown if streaming fails or reduced motion is
 * requested. Also supports local images/videos or Lottie files under assets/. */
(() => {
  const slot = document.querySelector('[data-brand-animation-slot]');
  const illustration = slot?.querySelector('.hero-illustration');
  if (!slot || !illustration) return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;

  const display = (media) => {
    media.classList.add('hero-animated-media');
    media.setAttribute('aria-hidden', 'true');
    slot.append(media);
    illustration.classList.add('hero-original-hidden');
    slot.classList.add('has-original-animation');
  };

  const loadScript = (url) => new Promise((resolve, reject) => {
    const element = document.createElement('script');
    element.src = url;
    element.async = true;
    element.onload = resolve;
    element.onerror = reject;
    document.head.append(element);
  });

  async function setup() {
    let config;
    try {
      const response = await fetch('animation-config.json', { cache: 'no-store' });
      if (!response.ok) return;
      config = await response.json();
    } catch (_) { return; }
    const src = typeof config?.src === 'string' ? config.src.trim() : '';
    // Accept local assets, plus the exact original S3 video supplied by the owner.
    // Keep the URL allowlist tight: animation-config.json is not a generic script loader.
    const officialS3Video = 'https://s3-eu-west-1.amazonaws.com/school.booksgiant.com/video/bg-banner.mp4';
    const localAsset = /^assets\/[\w./%-]+\.(?:mp4|webm|ogv|gif|png|apng|webp|svg|json)(?:\?.*)?$/i.test(src)
      && !src.split('/').includes('..');
    if (!localAsset && src !== officialS3Video) return;
    const fileType = src.split('?')[0].split('.').pop().toLowerCase();

    if (['mp4', 'webm', 'ogv'].includes(fileType)) {
      const video = document.createElement('video');
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.addEventListener('loadeddata', () => {
        display(video);
        // Browser autoplay policy can vary. The illustration remains the fallback.
        video.play().catch(() => {});
      }, { once: true });
      video.src = src;
      video.load();
      return;
    }

    if (['gif', 'png', 'apng', 'webp', 'svg'].includes(fileType)) {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => display(img);
      img.src = src;
      return;
    }

    // Lottie animation: uses the original JSON plus an on-demand player.
    // If the player cannot be loaded, leave the fallback illustration in place.
    if (fileType === 'json') {
      try {
        // Don't load third-party JavaScript unless a real Lottie animation is configured.
        if (!window.lottie) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js');
        if (!window.lottie) return;
        const holder = document.createElement('div');
        holder.className = 'hero-animated-media';
        holder.style.pointerEvents = 'none';
        // Use the official asset path, so any relative image references can resolve.
        const player = window.lottie.loadAnimation({
          container: holder,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: src,
          rendererSettings: { preserveAspectRatio: 'xMidYMid meet' }
        });
        player.addEventListener('DOMLoaded', () => display(holder));
        player.addEventListener('data_failed', () => player.destroy());
      } catch (_) { /* Keep the verified illustration as a visual fallback. */ }
    }
  }

  setup();
})();
