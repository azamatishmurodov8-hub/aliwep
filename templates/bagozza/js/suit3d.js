/**
 * BAGOZZA 3D Photorealistic Hero Showcase Engine
 * True 3D orbital turntable of real full-body Bagozza bespoke suit cutouts
 * standing seamlessly on pure white directly over the monumental BAGOZZA logo,
 * with 60fps inertia drag-to-orbit, 3D perspective depth, gold turntable ring,
 * mouse parallax, live body-build scaling, and zoom.
 */
window.BagozzaSuit3D = (function () {
  const PRESETS = {
    ivory: {
      id: 'ivory',
      index: 0,
      suitId: 'suit_02',
      name_tr: 'Ivory Gala Kruvaze Smokin',
      name_en: 'Ivory Gala Double-Breasted Tuxedo',
      price: 41500,
      hex: '#f2ede3',
      label: 'Ivory Gala',
      img: 'assets/cutouts/cut_02.png',
      fabric_tr: '%100 Fildişi İnce İtalyan Yünü & Siyah Smokin Pantolonu',
      fabric_en: '100% Ivory Fine Italian Wool & Jet Black Tuxedo Trousers'
    },
    tuxedo: {
      id: 'tuxedo',
      index: 1,
      suitId: 'suit_01',
      name_tr: 'Milano Black-Tie Smokin',
      name_en: 'Milano Black-Tie Tuxedo',
      price: 42000,
      hex: '#111216',
      label: 'Black-Tie',
      img: 'assets/cutouts/hero_tux_full.png',
      fabric_tr: '%100 Super 160s Barathea Yünü & İpek Saten Klapa',
      fabric_en: '100% Super 160s Barathea Wool & Silk Satin Lapel'
    },
    navy: {
      id: 'navy',
      index: 2,
      suitId: 'suit_03',
      name_tr: 'Napoli Royal Navy 3-Piece',
      name_en: 'Napoli Royal Navy 3-Piece Suit',
      price: 37800,
      hex: '#152340',
      label: 'Royal Navy',
      img: 'assets/cutouts/cut_03.png',
      fabric_tr: '%100 Super 160s Loro Piana Lacivert Saf Yün',
      fabric_en: '100% Super 160s Loro Piana Royal Navy Wool'
    },
    sand: {
      id: 'sand',
      index: 3,
      suitId: 'suit_04',
      name_tr: 'Firenze Sand 3-Piece Takım',
      name_en: 'Firenze Sand 3-Piece Suit',
      price: 36200,
      hex: '#b99d79',
      label: 'Firenze Sand',
      img: 'assets/cutouts/cut_04.png',
      fabric_tr: '%85 İtalyan Yünü, %15 Kaşmir, Yelekli Tam Kalıp',
      fabric_en: '85% Italian Wool, 15% Cashmere, 3-Piece Tailored Fit'
    },
    charcoal: {
      id: 'charcoal',
      index: 4,
      suitId: 'suit_08',
      name_tr: 'Torino Antrasit Klasik',
      name_en: 'Torino Anthracite Tailored Suit',
      price: 35400,
      hex: '#3b3e44',
      label: 'Antrasit',
      img: 'assets/cutouts/cut_08.png',
      fabric_tr: '%100 Super 150s İtalyan Flanel Yünü, El Dikimi',
      fabric_en: '100% Super 150s Italian Flannel Wool, Hand-Finished'
    },
    burgundy: {
      id: 'burgundy',
      index: 5,
      suitId: 'suit_09',
      name_tr: 'Bologna Mor Kadife Smokin',
      name_en: 'Bologna Velvet Gala Tuxedo',
      price: 44500,
      hex: '#4e163b',
      label: 'Kadife Gala',
      img: 'assets/cutouts/cut_09.png',
      fabric_tr: '%100 İtalyan İpek Kadife & Kontrast Siyah Saten Klapa',
      fabric_en: '100% Italian Silk Velvet & Contrast Black Satin Lapel'
    }
  };

  const ORDER = ['ivory', 'tuxedo', 'navy', 'sand', 'charcoal', 'burgundy'];
  const STEP_RAD = (Math.PI * 2) / ORDER.length;

  const BODY_SCALE_X = {
    athletic: 1.055,
    classic: 1.00,
    comfort: 1.125
  };

  let container = null;
  let stageEl = null;
  let ringEl = null;
  let figureEls = [];
  let onChangeCb = null;

  let currentPreset = 'ivory';
  let currentBody = 'classic';
  let autoRotate = true;

  let targetAngle = 0; // radians around the 360° carousel
  let currentAngle = 0;
  let targetTiltX = 0;
  let currentTiltX = 0;
  let targetZoom = 1.0;
  let currentZoom = 1.0;

  let isDragging = false;
  let startX = 0;
  let prevX = 0;
  let isVisible = true;
  let animRunning = false;

  function renderDOM() {
    if (!container) return;
    container.innerHTML = `
      <div class="hero3d-scene relative w-full h-full flex items-end justify-center select-none overflow-visible" style="perspective: 1400px;">
        <!-- Subtle 3D Rotating Champagne-Gold & Carrara Studio Turntable Floor Ring -->
        <div class="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 w-[310px] sm:w-[440px] h-[96px] flex items-center justify-center">
          <div id="hero3dFloorRing" class="w-full h-full rounded-full border border-[#c9a86a]/60 bg-[radial-gradient(ellipse_at_center,rgba(246,244,238,0.92)_0%,rgba(255,255,255,0.65)_62%,rgba(255,255,255,0)_100%)] shadow-[0_22px_50px_-14px_rgba(0,0,0,0.12)]" style="transform: rotateX(74deg);">
            <div class="w-full h-full rounded-full border border-dashed border-[#c9a86a]/45 scale-[0.84]"></div>
          </div>
          <!-- Soft grounded shoe contact shadow -->
          <div class="absolute bottom-6 w-44 sm:w-56 h-7 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.05)_55%,transparent_78%)]"></div>
        </div>

        <!-- 3D Cylindrical Orbit Stage of Real Full-Body Cutouts -->
        <div id="hero3dFigures" class="relative w-full h-full flex items-end justify-center" style="transform-style: preserve-3d;">
          ${ORDER.map((key, idx) => {
            const p = PRESETS[key];
            return `
              <div class="hero3d-figure absolute bottom-7 flex items-end justify-center will-change-transform" data-h3d-idx="${idx}" data-h3d-key="${key}">
                <img src="${p.img}" alt="${p.name_tr}" draggable="false"
                  class="h-[395px] sm:h-[470px] w-auto max-w-none object-contain object-bottom drop-shadow-[0_24px_28px_rgba(0,0,0,0.15)] pointer-events-none select-none" />
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    stageEl = document.getElementById('hero3dFigures');
    ringEl = document.getElementById('hero3dFloorRing');
    figureEls = Array.from(container.querySelectorAll('.hero3d-figure'));
  }

  function syncActiveFromAngle() {
    // Find which preset is closest to front (angle mod 2pi == 0)
    const n = ORDER.length;
    let raw = (-currentAngle / STEP_RAD) % n;
    if (raw < 0) raw += n;
    const nearestIdx = Math.round(raw) % n;
    const key = ORDER[nearestIdx];
    if (key && key !== currentPreset) {
      currentPreset = key;
      if (typeof onChangeCb === 'function') onChangeCb(PRESETS[currentPreset]);
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible || !figureEls.length) return;

    if (autoRotate && !isDragging) {
      targetAngle -= 0.0042; // Smooth aristocratic 360° turntable orbit
    }

    currentAngle += (targetAngle - currentAngle) * 0.085;
    currentTiltX += (targetTiltX - currentTiltX) * 0.08;
    currentZoom += (targetZoom - currentZoom) * 0.09;

    const isMobile = (container.clientWidth || 600) < 520;
    const radiusX = isMobile ? 190 : 275;
    const radiusZ = isMobile ? 180 : 250;
    const bodySX = BODY_SCALE_X[currentBody] || 1.0;

    // Spin the 3D golden turntable ring in exact lockstep
    if (ringEl) {
      const deg = (currentAngle * 180) / Math.PI;
      ringEl.style.transform = `rotateX(74deg) rotateZ(${deg.toFixed(2)}deg)`;
    }

    figureEls.forEach((el, idx) => {
      const theta = currentAngle + idx * STEP_RAD;
      const sinT = Math.sin(theta);
      const cosT = Math.cos(theta); // 1 = front centerpiece, -1 = back

      const x = sinT * radiusX;
      const z = (cosT - 1) * radiusZ;

      const frontness = (cosT + 1) * 0.5;
      const depthScale = (0.52 + frontness * 0.48) * currentZoom;
      const opacity = frontness < (isMobile ? 0.42 : 0.20) ? 0 : Math.min(1, Math.pow(frontness, isMobile ? 2.4 : 1.7) * 1.15);
      const blurPx = frontness > 0.90 ? 0 : Math.max(0, (1 - frontness) * (isMobile ? 10 : 8));
      const rotY = sinT * -26 + currentTiltX * 14;
      const zIndex = Math.round(frontness * 40);

      // Apply subtle body-build proportion only cleanly on the foreground figure
      const sx = depthScale * (1 + (bodySX - 1) * Math.pow(frontness, 3));
      const sy = depthScale;

      el.style.zIndex = String(zIndex);
      el.style.opacity = opacity.toFixed(3);
      el.style.filter = blurPx > 0.2 ? `blur(${blurPx.toFixed(1)}px)` : 'none';
      el.style.transform = `translate3d(${x.toFixed(1)}px, 0px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(2)}deg) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
      el.style.pointerEvents = frontness > 0.75 ? 'auto' : 'none';
    });

    syncActiveFromAngle();
  }

  function bindEvents() {
    if (!container) return;

    const onDown = (clientX) => {
      isDragging = true;
      autoRotate = false;
      startX = clientX;
      prevX = clientX;
      container.style.cursor = 'grabbing';
    };

    const onMove = (clientX, clientY) => {
      if (isDragging) {
        const dx = clientX - prevX;
        targetAngle += dx * 0.0085;
        prevX = clientX;
      } else {
        const rect = container.getBoundingClientRect();
        if (rect.width > 0) {
          const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
          targetTiltX = Math.max(-1, Math.min(1, normX)) * 0.65;
        }
      }
    };

    const onUp = () => {
      if (!isDragging) return;
      isDragging = false;
      container.style.cursor = 'grab';
      // Gently snap toward nearest front look if user dragged slightly
      const snapped = Math.round(targetAngle / STEP_RAD) * STEP_RAD;
      targetAngle = snapped;
    };

    container.style.cursor = 'grab';
    container.addEventListener('mousedown', (e) => onDown(e.clientX));
    window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onUp);
    container.addEventListener('mouseleave', () => { targetTiltX = 0; });

    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) onDown(e.touches[0].clientX);
    }, { passive: true });
    container.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
    container.addEventListener('touchend', onUp);
  }

  function applyPreset(presetId) {
    const p = PRESETS[presetId] || PRESETS.ivory;
    currentPreset = p.id;
    autoRotate = false;
    // Shortest angular path to target preset index
    const desired = -p.index * STEP_RAD;
    const diff = ((desired - targetAngle + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
    targetAngle += diff;
    return p;
  }

  function setBodyType(bodyKey) {
    if (!BODY_SCALE_X[bodyKey]) return;
    currentBody = bodyKey;
  }

  function setAngle(deg) {
    autoRotate = false;
    if (deg === 0) {
      // Center active look squarely front
      const p = PRESETS[currentPreset];
      targetAngle = -p.index * STEP_RAD;
      targetTiltX = 0;
    } else if (deg === 90) {
      // Smooth 3D 3/4 turn right + step orbit slightly
      targetAngle -= STEP_RAD * 0.22;
      targetTiltX = 0.85;
    } else if (deg === 180) {
      // Orbit smoothly to next full look in 360° circle
      targetAngle -= STEP_RAD;
      targetTiltX = 0;
    } else {
      targetAngle += (deg * Math.PI) / 180;
    }
  }

  function toggleAutoRotate() {
    autoRotate = !autoRotate;
    return autoRotate;
  }

  function adjustZoom(delta) {
    // Negative delta zooms IN (matches existing + / - buttons!)
    targetZoom = Math.max(0.84, Math.min(1.22, targetZoom - delta * 0.22));
  }

  function init(elementId, onChange) {
    container = document.getElementById(elementId);
    if (!container) return false;
    onChangeCb = onChange || null;
    renderDOM();
    bindEvents();

    if (window.IntersectionObserver) {
      new IntersectionObserver((entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      }, { threshold: 0.05 }).observe(container);
    }

    if (!animRunning) {
      animRunning = true;
      animate();
    }
    return true;
  }

  return {
    init,
    PRESETS,
    ORDER,
    applyPreset,
    setBodyType,
    setAngle,
    toggleAutoRotate,
    adjustZoom,
    getActivePreset: () => PRESETS[currentPreset],
    getActiveBody: () => currentBody
  };
})();
