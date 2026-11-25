/**
 * BAGOZZA Milano & Istanbul — Main Interactive Storefront, Runway Stylist,
 * 60-Item Bluemint Catalog, Paket Cart -> WhatsApp Checkout, Settings & Phone-Locked Admin CMS.
 */
window.BagozzaApp = (function () {
  const I18N = {
    tr: {
      nav_catalog: 'Koleksiyon',
      nav_3d: '3D Kostüm',
      nav_runway: 'Sanal Stilist',
      nav_maps: 'Mağaza',
      paket: 'Paket',
      hero_badge: 'MİLANO • ŞİŞLİ / OSMANBEY • 1970',
      hero_sub: 'İtalyan terzilik mirası, 3D interaktif kostüm deneyimi ve 60 parçalık özel koleksiyon.',
      hero_cta_3d: '3D Kostümü İncele',
      hero_cta_runway: 'Sanal Stilist (Giydir)',
      hero_cta_shop: '60 Parça Koleksiyon',
      reel_label: '5 SANİYELİK CANLI LOOKBOOK',
      s3d_eyebrow: 'MİLANO MERMER GALERİ • 360° WEBGL',
      s3d_title: '3D ÖZEL DİKİM KOSTÜM',
      s3d_desc: 'Kostümü parmağınızla veya farenizle 360° çevirin, İtalyan kumaşlarını ve vücut tipinizi canlı değiştirin.',
      s3d_drag_hint: '360° Çevirmek İçin Sürükleyin',
      s3d_add_btn: 'Bu 3D Kostümü Pakete Ekle',
      rw_eyebrow: 'MAISON RUNWAY • SANAL GİYİNME ODASI',
      rw_title: 'CANLI MODEL ÜZERİNDE KOMBİN YAP',
      rw_desc: 'Vücut tipinizi seçin, 20 takım elbise, 20 pantolon ve 20 ayakkabıdan dilediğinizi gerçek modele giydirip açıları döndürün.',
      rw_add_all: 'Tüm 3\'lü Kombini Pakete Ekle',
      cat_eyebrow: 'BAGOZZA ŞİŞLİ • 60 PARÇA ÖZEL ARŞİV',
      cat_title: 'KOLEKSİYON',
      cat_suits: 'Takım Elbise',
      cat_trousers: 'Pantolon',
      cat_shoes: 'Ayakkabı',
      cat_all: 'Tümü',
      body_athletic: 'Atletik / Geniş Omuz',
      body_classic: 'Klasik / Slim',
      body_comfort: 'Büyük Beden / Comfort',
      view_product: 'Ürün Gör',
      view_model: 'Modelde Gör',
      add_to_bag: 'PAKETE EKLE',
      size_guide: 'BEDEN TABLOSU',
      try_runway: 'Modele Giydir',
      empty_bag: 'Paketiniz şu an boş. Beğendiğiniz kostüm, pantolon veya ayakkabıları pakete ekleyebilirsiniz.',
      checkout_wa: 'WHATSAPP İLE SİPARİŞ VER',
      total_label: 'Toplam Tutar',
      added_toast: 'Pakete eklendi',
      settings_title: 'Ayarlar & Tercihler',
      admin_title: 'Mağaza Yönetici Paneli',
      maps_cta: 'Google Maps\'te Aç',
      ang_front: 'Ön (0°)',
      ang_side: '3/4 Sol',
      ang_back: '3/4 Sağ',
      ang_detail: 'Yakın Detay'
    },
    en: {
      nav_catalog: 'Collection',
      nav_3d: '3D Suit',
      nav_runway: 'Virtual Stylist',
      nav_maps: 'Boutique',
      paket: 'Bag',
      hero_badge: 'MILAN • ŞİŞLİ / OSMANBEY • EST. 1970',
      hero_sub: 'Italian sartorial heritage, real-time 3D interactive suit studio, and 60-piece curated menswear collection.',
      hero_cta_3d: 'Explore 3D Suit',
      hero_cta_runway: 'Virtual Stylist',
      hero_cta_shop: '60-Piece Collection',
      reel_label: '5-SECOND LIVE LOOKBOOK REEL',
      s3d_eyebrow: 'MILANESE MARBLE GALLERY • 360° WEBGL',
      s3d_title: '3D BESPOKE SUIT STUDIO',
      s3d_desc: 'Drag to orbit 360° around the bespoke suit, switch pure Italian wool fabrics, and morph body proportions live.',
      s3d_drag_hint: 'Drag to Rotate 360°',
      s3d_add_btn: 'Add This 3D Suit to Bag',
      rw_eyebrow: 'MAISON RUNWAY • VIRTUAL DRESSING ROOM',
      rw_title: 'DRESS THE RUNWAY MODEL LIVE',
      rw_desc: 'Choose your body build, mix & match from 20 suits, 20 trousers, and 20 shoes on a real model, and turn angles live.',
      rw_add_all: 'Add Complete 3-Piece Look to Bag',
      cat_eyebrow: 'BAGOZZA ŞİŞLİ • 60-PIECE ARCHIVE',
      cat_title: 'COLLECTION',
      cat_suits: 'Suits',
      cat_trousers: 'Trousers',
      cat_shoes: 'Shoes',
      cat_all: 'All',
      body_athletic: 'Athletic / Broad',
      body_classic: 'Classic / Slim',
      body_comfort: 'Tall & Broad / Comfort',
      view_product: 'Product View',
      view_model: 'On Model',
      add_to_bag: 'ADD TO BAG',
      size_guide: 'SIZE GUIDE',
      try_runway: 'Try on Model',
      empty_bag: 'Your bag is currently empty. Add suits, trousers, or shoes to build your Bagozza order.',
      checkout_wa: 'ORDER VIA WHATSAPP',
      total_label: 'Total Amount',
      added_toast: 'Added to bag',
      settings_title: 'Settings & Preferences',
      admin_title: 'Boutique Admin Panel',
      maps_cta: 'Open in Google Maps',
      ang_front: 'Front (0°)',
      ang_side: '3/4 Left',
      ang_back: '3/4 Right',
      ang_detail: 'Close-Up'
    }
  };

  // UI Runtime State
  const ui = {
    activeCat: 'suits',
    activeBodyFilter: 'all',
    searchQuery: '',
    forceModelView: false,
    page: 1,
    perPage: 8,

    // 3D Suit Selected Size
    suit3dSize: '50',

    // Maison Vell Runway State
    runwayTab: 'suits',
    runwayBody: 'classic',
    runwayAngle: 'front', // front | side | back | detail
    equippedSuitId: 'suit_01',
    equippedTrouserId: 'tr_01',
    equippedShoeId: 'sh_01',

    // Product Detail Modal State
    pdpId: null,
    pdpSlide: 0, // 0=card, 1=model, 2=alt
    pdpColorIdx: 0,
    pdpSize: '50',
    pdpBody: 'classic',
    pdpAngleDeg: 0,

    // Admin State
    adminUnlocked: false,
    adminTab: 'products',
    adminSearch: '',
    adminCatFilter: 'all',
    newCardDataUrl: '',
    newModelDataUrl: ''
  };

  function lang() {
    return BagozzaStore.getSettings().lang || 'tr';
  }

  function t(key) {
    const l = lang();
    return (I18N[l] && I18N[l][key]) || I18N.tr[key] || key;
  }

  function fmtPrice(num) {
    const n = Number(num) || 0;
    return n.toLocaleString('tr-TR') + '₺';
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  let toastTimer = null;
  function showToast(msg, icon = '✓') {
    const el = document.getElementById('luxuryToast');
    if (!el) return;
    document.getElementById('toastIcon').textContent = icon;
    document.getElementById('toastText').textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
  }

  /* ========================================================================
     1. TRANSLATION & SETTINGS APPLICATION
     ======================================================================== */
  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
    });
    const langBtn = document.getElementById('navLangLabel');
    if (langBtn) langBtn.textContent = lang().toUpperCase();

    const s = BagozzaStore.getSettings();
    document.body.classList.toggle('reduced-motion', Boolean(s.reducedMotion));
    BagozzaAudio.setEnabled(Boolean(s.sound));

    // Sync Google Maps links
    document.querySelectorAll('.js-maps-link').forEach((a) => {
      a.href = s.mapsUrl || 'https://maps.app.goo.gl/U2z7qZpVpbjofQgu7';
    });
    const addrEl = document.getElementById('footerAddressText');
    if (addrEl) addrEl.textContent = s.storeAddress;
  }

  /* ========================================================================
     2. 3D BESPOKE SUIT HERO STAGE BINDINGS
     ======================================================================== */
  function init3DSection() {
    BagozzaSuit3D.init('suit3dCanvasWrap', () => {
      render3DFabricButtons();
      update3DInfoPanel();
    });
    render3DFabricButtons();
    update3DInfoPanel();
  }

  function render3DFabricButtons() {
    const wrap = document.getElementById('suit3dPresets');
    if (!wrap) return;
    const active = BagozzaSuit3D.getActivePreset().id;
    const swatches = BagozzaSuit3D.ORDER.map((id) => BagozzaSuit3D.PRESETS[id]);
    wrap.innerHTML = swatches.map((sw) => `
      <button onclick="BagozzaApp.select3DPreset('${sw.id}')" class="btn-motion flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-medium ${active === sw.id ? 'border-black bg-black text-white shadow-md' : 'border-neutral-200 bg-white text-neutral-800 hover:border-black'}">
        <span class="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0" style="background:${sw.hex}"></span>
        <span>${sw.label}</span>
      </button>
    `).join('');
  }

  function update3DInfoPanel() {
    const p = BagozzaSuit3D.getActivePreset();
    const l = lang();
    const nameEl = document.getElementById('s3dPresetName');
    const fabEl = document.getElementById('s3dPresetFabric');
    const priceEl = document.getElementById('s3dPresetPrice');
    if (nameEl) nameEl.textContent = l === 'en' ? p.name_en : p.name_tr;
    if (fabEl) fabEl.textContent = l === 'en' ? p.fabric_en : p.fabric_tr;
    if (priceEl) priceEl.textContent = fmtPrice(p.price);

    // Highlight active body type pills in 3D section
    const activeBody = BagozzaSuit3D.getActiveBody();
    document.querySelectorAll('[data-3d-body]').forEach((btn) => {
      const isA = btn.getAttribute('data-3d-body') === activeBody;
      btn.className = `btn-motion px-3.5 py-2 rounded-full text-xs font-medium border ${isA ? 'bg-black text-white border-black' : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'}`;
    });

    // Highlight active 3D size pills
    document.querySelectorAll('[data-3d-size]').forEach((btn) => {
      const isA = btn.getAttribute('data-3d-size') === ui.suit3dSize;
      btn.classList.toggle('active', isA);
    });
  }

  function select3DPreset(id) {
    BagozzaAudio.play('fabric');
    BagozzaSuit3D.applyPreset(id);
    render3DFabricButtons();
    update3DInfoPanel();
  }

  function select3DBody(bodyKey) {
    BagozzaAudio.play('tap');
    BagozzaSuit3D.setBodyType(bodyKey);
    update3DInfoPanel();
  }

  function select3DSize(sz) {
    BagozzaAudio.play('tap');
    ui.suit3dSize = sz;
    update3DInfoPanel();
  }

  function rotate3D(deg) {
    BagozzaAudio.play('fabric');
    BagozzaSuit3D.setAngle(deg);
    const btn = document.getElementById('s3dAutoBtn');
    if (btn) btn.classList.remove('bg-black', 'text-white');
  }

  function toggle3DAuto() {
    BagozzaAudio.play('tap');
    const on = BagozzaSuit3D.toggleAutoRotate();
    const btn = document.getElementById('s3dAutoBtn');
    if (btn) {
      btn.classList.toggle('bg-black', on);
      btn.classList.toggle('text-white', on);
    }
  }

  function zoom3D(delta) {
    BagozzaAudio.play('tap');
    BagozzaSuit3D.adjustZoom(delta);
  }

  async function add3DSuitToBag() {
    const p = BagozzaSuit3D.getActivePreset();
    const l = lang();
    const matched = BagozzaStore.getProductById(p.suitId) || BagozzaStore.getProducts()[0];
    await BagozzaStore.addToCart({
      productId: matched ? matched.id : 'suit_01',
      name: l === 'en' ? p.name_en : p.name_tr,
      price: p.price,
      size: ui.suit3dSize,
      color: l === 'en' ? p.name_en : p.name_tr,
      bodyType: BagozzaSuit3D.getActiveBody(),
      img: matched ? matched.imgCard : p.img,
      qty: 1
    });
    BagozzaAudio.play('bag');
    renderCartBadge();
    showToast(`${l === 'en' ? p.name_en : p.name_tr} (${ui.suit3dSize}) — ${t('added_toast')}`, '🛍');
  }

  /* ========================================================================
     4. MAISON VELL RUNWAY VIRTUAL DRESSING ROOM (Dress Real Model + Rotate + Mix & Match)
     ======================================================================== */
  function getEquipped() {
    const all = BagozzaStore.getProducts();
    const suits = all.filter((p) => p.category === 'suits');
    const trousers = all.filter((p) => p.category === 'trousers');
    const shoes = all.filter((p) => p.category === 'shoes');

    const suit = all.find((p) => p.id === ui.equippedSuitId) || suits[0];
    const trouser = all.find((p) => p.id === ui.equippedTrouserId) || trousers[0];
    const shoe = all.find((p) => p.id === ui.equippedShoeId) || shoes[0];
    return { suit, trouser, shoe, suits, trousers, shoes };
  }

  function renderRunway() {
    const { suit, trouser, shoe, suits, trousers, shoes } = getEquipped();
    if (!suit) return;
    const l = lang();

    // Sync body type pills
    document.querySelectorAll('[data-rw-body]').forEach((b) => {
      const active = b.getAttribute('data-rw-body') === ui.runwayBody;
      b.className = `btn-motion px-3 py-1.5 rounded-full text-[11px] font-medium border ${active ? 'bg-black text-white border-black' : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'}`;
    });

    // Sync angle pills
    document.querySelectorAll('[data-rw-angle]').forEach((b) => {
      const active = b.getAttribute('data-rw-angle') === ui.runwayAngle;
      b.className = `btn-motion px-2.5 py-1.5 rounded-full text-[11px] font-medium border ${active ? 'bg-black text-white border-black' : 'bg-white/90 text-neutral-700 border-neutral-200 hover:border-black'}`;
    });

    // Use pure-white transparent cutout full-body real model (exact Maison Vell aesthetic!)
    const mainCutout = suit.imgCutout || suit.imgModel;
    const sIdx = Math.max(0, suits.findIndex((x) => x.id === suit.id));
    const prev1 = suits[(sIdx + 1) % suits.length];
    const prev2 = suits[(sIdx + 2) % suits.length];

    const g1 = document.getElementById('rwGhost1');
    const g2 = document.getElementById('rwGhost2');
    if (g1 && prev1) g1.src = prev1.imgCutout || prev1.imgModel;
    if (g2 && prev2) g2.src = prev2.imgCutout || prev2.imgModel;

    const mainEl = document.getElementById('rwMainModelImg');
    if (mainEl) {
      mainEl.src = ui.runwayAngle === 'detail' ? suit.imgCard : mainCutout;
      mainEl.alt = suit.name;
      mainEl.className = ui.runwayAngle === 'detail'
        ? 'h-[420px] sm:h-[490px] w-[310px] sm:w-[360px] rounded-2xl object-cover object-top shadow-2xl border border-neutral-200 pointer-events-none'
        : 'h-[420px] sm:h-[490px] w-auto max-w-full object-contain object-bottom drop-shadow-[0_24px_28px_rgba(0,0,0,0.16)] pointer-events-none';
    }

    const figureWrap = document.getElementById('rwActiveFigureWrap');
    if (figureWrap) {
      figureWrap.className = `runway-active-figure body-${ui.runwayBody} relative z-10 flex items-end justify-center`;
    }
    const turnCard = document.getElementById('rwTurnCard');
    if (turnCard) {
      turnCard.className = `runway-turn-card angle-${ui.runwayAngle} relative flex items-end justify-center cursor-grab active:cursor-grabbing`;
    }

    // Look number label (Maison Vell "LOOK 01")
    const lookNum = document.getElementById('rwLookNumber');
    if (lookNum) lookNum.textContent = `LOOK ${String(sIdx + 1).padStart(2, '0')}`;

    // Equipped 3-piece summary strip under/next to model
    const eqSuitImg = document.getElementById('eqSuitImg');
    const eqSuitName = document.getElementById('eqSuitName');
    const eqSuitPrice = document.getElementById('eqSuitPrice');
    if (eqSuitImg) eqSuitImg.src = suit.imgCard;
    if (eqSuitName) eqSuitName.textContent = suit.name;
    if (eqSuitPrice) eqSuitPrice.textContent = fmtPrice(suit.price);

    if (trouser) {
      document.getElementById('eqTrouserImg').src = trouser.imgCard;
      document.getElementById('eqTrouserName').textContent = trouser.name;
      document.getElementById('eqTrouserPrice').textContent = fmtPrice(trouser.price);
    }
    if (shoe) {
      document.getElementById('eqShoeImg').src = shoe.imgCard;
      document.getElementById('eqShoeName').textContent = shoe.name;
      document.getElementById('eqShoePrice').textContent = fmtPrice(shoe.price);
    }

    const total = (suit.price || 0) + (trouser ? trouser.price : 0) + (shoe ? shoe.price : 0);
    const totalEl = document.getElementById('rwOutfitTotal');
    if (totalEl) totalEl.textContent = fmtPrice(total);

    // Render Right-Side Maison Vell Picker List
    document.querySelectorAll('[data-rw-tab]').forEach((tb) => {
      const isA = tb.getAttribute('data-rw-tab') === ui.runwayTab;
      tb.className = `btn-motion flex-1 py-2.5 text-[11px] font-semibold tracking-wider uppercase border-b-2 transition ${isA ? 'border-black text-black' : 'border-transparent text-neutral-400 hover:text-black'}`;
    });

    const listEl = document.getElementById('rwPickerList');
    if (!listEl) return;
    const pool = ui.runwayTab === 'suits' ? suits : ui.runwayTab === 'trousers' ? trousers : shoes;
    const activeId = ui.runwayTab === 'suits' ? suit.id : ui.runwayTab === 'trousers' ? trouser?.id : shoe?.id;

    listEl.innerHTML = pool.map((item) => {
      const isEq = item.id === activeId;
      const sub = l === 'en' ? item.subtitle_en : item.subtitle_tr;
      return `
        <div onclick="BagozzaApp.equipOnRunway('${item.category}', '${item.id}')" class="group flex items-center gap-3.5 p-2.5 rounded-xl border cursor-pointer transition-all duration-250 ${isEq ? 'border-black bg-neutral-50 shadow-sm' : 'border-neutral-200/80 bg-white hover:border-neutral-400'}">
          <div class="w-16 h-20 rounded-lg overflow-hidden bg-neutral-100 shrink-0 relative">
            <img src="${item.imgCard}" alt="${escapeHtml(item.name)}" class="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" loading="lazy" />
            ${isEq ? '<span class="absolute top-1 left-1 w-4 h-4 rounded-full bg-black text-white text-[9px] flex items-center justify-center">✓</span>' : ''}
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-semibold tracking-wide text-black truncate">${escapeHtml(item.name)}</div>
            <div class="text-[11px] text-neutral-500 truncate mt-0.5">${escapeHtml(sub)}</div>
            <div class="flex items-center gap-2 mt-1.5">
              <span class="text-xs font-semibold text-black">${fmtPrice(item.price)}</span>
              ${item.oldPrice > item.price ? `<span class="text-[10px] text-neutral-400 line-through">${fmtPrice(item.oldPrice)}</span>` : ''}
            </div>
          </div>
          <button onclick="event.stopPropagation(); BagozzaApp.quickAddItem('${item.id}')" aria-label="Pakete ekle" title="${t('add_to_bag')}" class="btn-motion w-9 h-9 rounded-full border border-neutral-300 bg-white hover:bg-black hover:text-white hover:border-black flex items-center justify-center text-base font-light shrink-0">
            +
          </button>
        </div>
      `;
    }).join('');
  }

  function setRunwayTab(tab) {
    BagozzaAudio.play('tap');
    ui.runwayTab = tab;
    renderRunway();
  }

  function setRunwayBody(bodyKey) {
    BagozzaAudio.play('fabric');
    ui.runwayBody = bodyKey;
    // Pick a suit whose showcase best complements the chosen body type if user wants visual variety
    renderRunway();
  }

  function setRunwayAngle(ang) {
    BagozzaAudio.play('fabric');
    ui.runwayAngle = ang;
    renderRunway();
  }

  function stepRunwayLook(delta) {
    BagozzaAudio.play('fabric');
    const suits = BagozzaStore.getProducts().filter((p) => p.category === 'suits');
    if (!suits.length) return;
    const idx = Math.max(0, suits.findIndex((p) => p.id === ui.equippedSuitId));
    const next = suits[(idx + delta + suits.length) % suits.length];
    ui.equippedSuitId = next.id;
    renderRunway();
  }

  function equipOnRunway(category, id) {
    BagozzaAudio.play('fabric');
    if (category === 'suits') ui.equippedSuitId = id;
    else if (category === 'trousers') ui.equippedTrouserId = id;
    else if (category === 'shoes') ui.equippedShoeId = id;
    renderRunway();
  }

  function tryItemOnRunway(id) {
    const p = BagozzaStore.getProductById(id);
    if (!p) return;
    BagozzaAudio.play('fabric');
    ui.runwayTab = p.category;
    equipOnRunway(p.category, p.id);
    const sec = document.getElementById('runwaySection');
    if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast(`${p.name} — ${t('try_runway')}`, '👔');
  }

  async function addFullRunwayOutfitToBag() {
    const { suit, trouser, shoe } = getEquipped();
    const l = lang();
    const pieces = [suit, trouser, shoe].filter(Boolean);
    for (const item of pieces) {
      await BagozzaStore.addToCart({
        productId: item.id,
        name: item.name,
        price: item.price,
        size: item.category === 'shoes' ? '42' : '50',
        color: l === 'en' ? item.colorName_en : item.colorName_tr,
        bodyType: ui.runwayBody,
        img: item.imgCard,
        qty: 1
      });
    }
    BagozzaAudio.play('bag');
    renderCartBadge();
    showToast(`${pieces.length} Parça Kombin — ${t('added_toast')}`, '🛍');
  }

  function bindRunwayDragTurn() {
    const stage = document.getElementById('rwTurnCard');
    if (!stage) return;
    let startX = null;
    const angles = ['front', 'side', 'back', 'detail'];

    const down = (x) => { startX = x; };
    const up = (x) => {
      if (startX === null) return;
      const dx = x - startX;
      startX = null;
      if (Math.abs(dx) > 36) {
        const cur = angles.indexOf(ui.runwayAngle);
        const next = angles[(cur + (dx > 0 ? 1 : -1) + angles.length) % angles.length];
        setRunwayAngle(next);
      }
    };
    stage.addEventListener('mousedown', (e) => down(e.clientX));
    window.addEventListener('mouseup', (e) => { if (startX !== null) up(e.clientX); });
    stage.addEventListener('touchstart', (e) => { if (e.touches[0]) down(e.touches[0].clientX); }, { passive: true });
    stage.addEventListener('touchend', (e) => { if (e.changedTouches[0]) up(e.changedTouches[0].clientX); });
  }

  /* ========================================================================
     5. COMPACT 60-ITEM BLUEMINT CATALOG GRID (Hover-to-Wear + Quick Size Bar)
     ======================================================================== */
  function getFilteredProducts() {
    let list = BagozzaStore.getProducts();
    if (ui.activeCat !== 'all') {
      list = list.filter((p) => p.category === ui.activeCat);
    }
    if (ui.activeBodyFilter !== 'all') {
      list = list.filter((p) => p.bodyType === ui.activeBodyFilter);
    }
    if (ui.searchQuery.trim()) {
      const q = ui.searchQuery.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle_tr.toLowerCase().includes(q) ||
        p.subtitle_en.toLowerCase().includes(q) ||
        p.colorName_tr.toLowerCase().includes(q)
      );
    }
    return list;
  }

  function renderCatalog() {
    const all = BagozzaStore.getProducts();
    const counts = {
      suits: all.filter((p) => p.category === 'suits').length,
      trousers: all.filter((p) => p.category === 'trousers').length,
      shoes: all.filter((p) => p.category === 'shoes').length,
      all: all.length
    };

    // Update tab badges & active states
    document.querySelectorAll('[data-cat-tab]').forEach((btn) => {
      const c = btn.getAttribute('data-cat-tab');
      const countSpan = btn.querySelector('.js-cat-count');
      if (countSpan) countSpan.textContent = counts[c];
      const active = c === ui.activeCat;
      btn.className = `btn-motion px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border transition ${active ? 'bg-black text-white border-black shadow-sm' : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'}`;
    });

    // Update Body Filter pills
    document.querySelectorAll('[data-cat-body]').forEach((btn) => {
      const b = btn.getAttribute('data-cat-body');
      const active = b === ui.activeBodyFilter;
      btn.className = `btn-motion px-3 py-1.5 rounded-full text-[11px] font-medium border ${active ? 'bg-black text-white border-black' : 'bg-white text-neutral-600 border-neutral-200 hover:border-black'}`;
    });

    const filtered = getFilteredProducts();
    const totalPages = Math.max(1, Math.ceil(filtered.length / ui.perPage));
    if (ui.page > totalPages) ui.page = totalPages;

    const start = (ui.page - 1) * ui.perPage;
    const pageItems = filtered.slice(start, start + ui.perPage);
    const l = lang();

    const grid = document.getElementById('catalogGrid');
    if (!grid) return;

    if (pageItems.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-neutral-500 text-sm border border-dashed border-neutral-300 rounded-2xl">
          ${l === 'en' ? 'No matching garments found.' : 'Aradığınız kriterde ürün bulunamadı.'}
        </div>
      `;
    } else {
      grid.innerHTML = pageItems.map((item) => {
        const sub = l === 'en' ? item.subtitle_en : item.subtitle_tr;
        const colName = l === 'en' ? item.colorName_en : item.colorName_tr;
        const bodyLabel = item.bodyType === 'athletic'
          ? (l === 'en' ? 'Athletic' : 'Atletik')
          : item.bodyType === 'comfort'
            ? (l === 'en' ? 'Comfort' : 'Katta Beden')
            : 'Slim';
        return `
          <article class="product-card group ${ui.forceModelView ? 'force-worn' : ''}">
            <div class="product-media rounded-xl cursor-pointer" onclick="BagozzaApp.openPDP('${item.id}')">
              <img src="${item.imgCard}" alt="${escapeHtml(item.name)}" class="img-flat" loading="lazy" />
              <img src="${item.imgModel}" alt="${escapeHtml(item.name)} model" class="img-worn" loading="lazy" />

              <!-- Top subtle badges -->
              <div class="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
                <span class="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur text-[10px] font-medium text-neutral-800 border border-black/5">${bodyLabel}</span>
                <button onclick="event.stopPropagation(); BagozzaApp.tryItemOnRunway('${item.id}')" class="pointer-events-auto btn-motion px-2.5 py-1 rounded-full bg-white/90 backdrop-blur hover:bg-black hover:text-white text-[10px] font-semibold text-black border border-black/10 opacity-0 group-hover:opacity-100 transition" title="${t('try_runway')}">
                  👔 ${t('try_runway')}
                </button>
              </div>

              <!-- Bluemint Quick Size Bar on Hover -->
              <div class="quick-size-bar" onclick="event.stopPropagation()">
                <div class="flex items-center justify-center gap-1.5 flex-wrap">
                  ${item.sizes.map((sz) => `
                    <button onclick="BagozzaApp.quickAddItem('${item.id}', '${sz}')" class="size-pill" aria-label="Beden ${sz} Pakete Ekle">${sz}</button>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Bluemint Crisp Metadata Footer -->
            <div class="pt-3.5 px-1 cursor-pointer" onclick="BagozzaApp.openPDP('${item.id}')">
              <div class="flex items-center justify-between gap-2">
                <h3 class="text-xs sm:text-[13px] font-bold tracking-[0.06em] uppercase text-black truncate">${escapeHtml(item.name)}</h3>
                <div class="flex items-center gap-1 shrink-0">
                  ${(item.colors || []).slice(0, 3).map((c) => `<span class="w-2.5 h-2.5 rounded-full border border-black/15" style="background:${c.hex}"></span>`).join('')}
                </div>
              </div>
              <div class="text-[11px] uppercase tracking-wider text-neutral-400 mt-0.5">${escapeHtml(colName)}</div>
              <div class="text-xs text-neutral-600 truncate mt-0.5">${escapeHtml(sub)}</div>
              <div class="flex items-center gap-2.5 mt-1.5">
                ${item.oldPrice > item.price ? `<span class="text-xs text-neutral-400 line-through">${fmtPrice(item.oldPrice)}</span>` : ''}
                <span class="text-xs sm:text-sm font-semibold ${item.oldPrice > item.price ? 'text-[#c62828]' : 'text-black'}">${fmtPrice(item.price)}</span>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }

    // Render compact pagination controls
    const pagWrap = document.getElementById('catalogPagination');
    if (pagWrap) {
      if (totalPages <= 1) {
        pagWrap.innerHTML = '';
      } else {
        let html = `<button onclick="BagozzaApp.setCatalogPage(${Math.max(1, ui.page - 1)})" ${ui.page === 1 ? 'disabled' : ''} class="btn-motion w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-sm disabled:opacity-30 hover:border-black">←</button>`;
        for (let i = 1; i <= totalPages; i++) {
          html += `<button onclick="BagozzaApp.setCatalogPage(${i})" class="btn-motion w-10 h-10 rounded-full text-xs font-semibold border ${i === ui.page ? 'bg-black text-white border-black' : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'}">${i}</button>`;
        }
        html += `<button onclick="BagozzaApp.setCatalogPage(${Math.min(totalPages, ui.page + 1)})" ${ui.page === totalPages ? 'disabled' : ''} class="btn-motion w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-sm disabled:opacity-30 hover:border-black">→</button>`;
        pagWrap.innerHTML = html;
      }
    }
  }

  function setCatalogCategory(cat) {
    BagozzaAudio.play('tap');
    ui.activeCat = cat;
    ui.page = 1;
    renderCatalog();
  }

  function setCatalogBodyFilter(body) {
    BagozzaAudio.play('tap');
    ui.activeBodyFilter = body;
    ui.page = 1;
    renderCatalog();
  }

  function setCatalogSearch(q) {
    ui.searchQuery = q;
    ui.page = 1;
    renderCatalog();
  }

  function toggleForceModelView(val) {
    BagozzaAudio.play('fabric');
    ui.forceModelView = val;
    document.getElementById('btnViewFlat')?.classList.toggle('bg-black', !val);
    document.getElementById('btnViewFlat')?.classList.toggle('text-white', !val);
    document.getElementById('btnViewModel')?.classList.toggle('bg-black', val);
    document.getElementById('btnViewModel')?.classList.toggle('text-white', val);
    renderCatalog();
  }

  function setCatalogPage(p) {
    BagozzaAudio.play('tap');
    ui.page = p;
    renderCatalog();
    document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function quickAddItem(id, size) {
    const item = BagozzaStore.getProductById(id);
    if (!item) return;
    const l = lang();
    const chosenSize = size || item.sizes[2] || item.sizes[0];
    await BagozzaStore.addToCart({
      productId: item.id,
      name: item.name,
      price: item.price,
      size: chosenSize,
      color: l === 'en' ? item.colorName_en : item.colorName_tr,
      bodyType: ui.runwayBody || item.bodyType || 'classic',
      img: item.imgCard,
      qty: 1
    });
    BagozzaAudio.play('bag');
    renderCartBadge();
    showToast(`${item.name} (${chosenSize}) — ${t('added_toast')}`, '🛍');
  }

  /* ========================================================================
     6. EXACT BLUEMINT PRODUCT DETAIL MODAL (PDP — Colors, Sizes, Body Types, 360° Turn)
     ======================================================================== */
  function openPDP(id) {
    const item = BagozzaStore.getProductById(id);
    if (!item) return;
    BagozzaAudio.play('tap');
    ui.pdpId = id;
    ui.pdpSlide = 0;
    ui.pdpColorIdx = 0;
    ui.pdpSize = item.sizes[2] || item.sizes[0];
    ui.pdpBody = item.bodyType || BagozzaStore.getSettings().defaultBody || 'classic';
    ui.pdpAngleDeg = 0;

    renderPDP();
    document.getElementById('pdpModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePDP() {
    BagozzaAudio.play('tap');
    document.getElementById('pdpModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderPDP() {
    const item = BagozzaStore.getProductById(ui.pdpId);
    if (!item) return;
    const l = lang();
    const slides = [item.imgCard, item.imgModel, item.imgAlt || item.imgModel];
    const activeColor = (item.colors && item.colors[ui.pdpColorIdx]) || { hex: '#111', tr: item.colorName_tr, en: item.colorName_en };

    const catName = item.category === 'suits'
      ? t('cat_suits')
      : item.category === 'trousers'
        ? t('cat_trousers')
        : t('cat_shoes');

    document.getElementById('pdpBreadcrumb').textContent = `ANA SAYFA  •  ERKEK  •  ${catName.toUpperCase()}  •  ${item.name}`;
    document.getElementById('pdpTitle').textContent = item.name;
    document.getElementById('pdpColorName').textContent = (l === 'en' ? activeColor.en : activeColor.tr).toUpperCase();
    document.getElementById('pdpSubtitle').textContent = l === 'en' ? item.subtitle_en : item.subtitle_tr;

    const oldP = document.getElementById('pdpOldPrice');
    if (item.oldPrice > item.price) {
      oldP.textContent = fmtPrice(item.oldPrice);
      oldP.classList.remove('hidden');
    } else {
      oldP.classList.add('hidden');
    }
    document.getElementById('pdpPrice').textContent = fmtPrice(item.price);
    document.getElementById('pdpFabric').textContent = l === 'en' ? item.fabric_en : item.fabric_tr;

    // Main image with subtle body build proportion + interactive turn angle
    const imgEl = document.getElementById('pdpMainImg');
    imgEl.src = slides[ui.pdpSlide];
    const bodyScaleX = ui.pdpBody === 'comfort' ? 1.09 : ui.pdpBody === 'athletic' ? 1.04 : 1;
    imgEl.style.transform = `perspective(900px) rotateY(${ui.pdpAngleDeg}deg) scaleX(${bodyScaleX})`;

    // Pagination dots
    document.getElementById('pdpDots').innerHTML = slides.map((_, i) => `
      <button onclick="BagozzaApp.setPDPSlide(${i})" class="h-1.5 rounded-full transition-all ${i === ui.pdpSlide ? 'w-6 bg-black' : 'w-2 bg-black/25'}"></button>
    `).join('');

    // Color swatches (exact Bluemint circles)
    document.getElementById('pdpColors').innerHTML = (item.colors || []).map((c, idx) => `
      <button onclick="BagozzaApp.setPDPColor(${idx})" class="color-swatch ${idx === ui.pdpColorIdx ? 'active' : ''}" title="${l === 'en' ? c.en : c.tr}" aria-label="${c.tr}">
        <div class="color-swatch-inner" style="background:${c.hex}"></div>
      </button>
    `).join('');

    // Size pills (exact Bluemint circles)
    document.getElementById('pdpSizes').innerHTML = item.sizes.map((sz) => `
      <button onclick="BagozzaApp.setPDPSize('${sz}')" class="size-pill w-10 h-10 text-xs ${sz === ui.pdpSize ? 'active' : ''}">${sz}</button>
    `).join('');

    // Body Type pills
    document.querySelectorAll('[data-pdp-body]').forEach((b) => {
      const isA = b.getAttribute('data-pdp-body') === ui.pdpBody;
      b.className = `btn-motion px-3 py-1.5 rounded-full text-[11px] font-medium border ${isA ? 'bg-black text-white border-black' : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'}`;
    });
  }

  function setPDPSlide(idx) {
    BagozzaAudio.play('fabric');
    ui.pdpSlide = (idx + 3) % 3;
    ui.pdpAngleDeg = 0;
    renderPDP();
  }

  function stepPDPSlide(delta) {
    setPDPSlide(ui.pdpSlide + delta);
  }

  function turnPDPAngle(deg) {
    BagozzaAudio.play('fabric');
    ui.pdpAngleDeg = deg;
    if (deg !== 0 && ui.pdpSlide === 0) ui.pdpSlide = 1;
    renderPDP();
  }

  function setPDPColor(idx) {
    BagozzaAudio.play('tap');
    ui.pdpColorIdx = idx;
    renderPDP();
  }

  function setPDPSize(sz) {
    BagozzaAudio.play('tap');
    ui.pdpSize = sz;
    renderPDP();
  }

  function setPDPBody(body) {
    BagozzaAudio.play('fabric');
    ui.pdpBody = body;
    if (ui.pdpSlide === 0) ui.pdpSlide = 1; // Switch to model view when picking body type
    renderPDP();
  }

  async function addPDPToBag() {
    const item = BagozzaStore.getProductById(ui.pdpId);
    if (!item) return;
    const l = lang();
    const col = (item.colors && item.colors[ui.pdpColorIdx]) || { tr: item.colorName_tr, en: item.colorName_en };
    await BagozzaStore.addToCart({
      productId: item.id,
      name: item.name,
      price: item.price,
      size: ui.pdpSize,
      color: l === 'en' ? col.en : col.tr,
      bodyType: ui.pdpBody,
      img: item.imgCard,
      qty: 1
    });
    BagozzaAudio.play('bag');
    renderCartBadge();
    closePDP();
    showToast(`${item.name} (${ui.pdpSize}) — ${t('added_toast')}`, '🛍');
  }

  function toggleSizeGuide() {
    BagozzaAudio.play('tap');
    document.getElementById('sizeGuideBox')?.classList.toggle('hidden');
  }

  /* ========================================================================
     7. PAKET (SHOPPING BAG) DRAWER & WHATSAPP ORDER DISPATCH
     ======================================================================== */
  function renderCartBadge() {
    const cart = BagozzaStore.getCart();
    const totalCount = cart.reduce((sum, c) => sum + (c.qty || 1), 0);
    document.querySelectorAll('.js-cart-count').forEach((el) => {
      el.textContent = totalCount;
    });
  }

  function openCart() {
    BagozzaAudio.play('tap');
    renderCartDrawer();
    document.getElementById('cartDrawer').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    BagozzaAudio.play('tap');
    document.getElementById('cartDrawer').classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderCartDrawer() {
    const cart = BagozzaStore.getCart();
    const listEl = document.getElementById('cartItemsList');
    const totalEl = document.getElementById('cartTotalAmount');
    const checkoutWrap = document.getElementById('cartCheckoutWrap');

    renderCartBadge();

    if (cart.length === 0) {
      listEl.innerHTML = `
        <div class="py-16 text-center space-y-3">
          <div class="w-14 h-14 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-2xl">🛍</div>
          <p class="text-sm text-neutral-500 max-w-xs mx-auto">${t('empty_bag')}</p>
        </div>
      `;
      totalEl.textContent = '0₺';
      checkoutWrap.classList.add('opacity-40', 'pointer-events-none');
      return;
    }

    checkoutWrap.classList.remove('opacity-40', 'pointer-events-none');
    let total = 0;

    listEl.innerHTML = cart.map((c) => {
      total += (c.price || 0) * (c.qty || 1);
      return `
        <div class="flex gap-3.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
          <img src="${c.img}" alt="${escapeHtml(c.name)}" class="w-16 h-20 rounded-lg object-cover bg-white shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <h4 class="text-xs font-bold uppercase tracking-wide text-black truncate">${escapeHtml(c.name)}</h4>
              <button onclick="BagozzaApp.removeCart('${escapeHtml(c.key)}')" aria-label="Sil" class="text-neutral-400 hover:text-red-600 text-xs px-1">✕</button>
            </div>
            <div class="text-[11px] text-neutral-500 mt-0.5">${escapeHtml(c.color)} • Beden: <strong>${escapeHtml(c.size)}</strong></div>
            <div class="flex items-center justify-between mt-2.5">
              <div class="inline-flex items-center border border-neutral-300 rounded-full bg-white">
                <button onclick="BagozzaApp.stepCart('${escapeHtml(c.key)}', -1)" class="w-7 h-7 text-xs font-bold hover:bg-neutral-100 rounded-l-full">−</button>
                <span class="px-2.5 text-xs font-semibold">${c.qty}</span>
                <button onclick="BagozzaApp.stepCart('${escapeHtml(c.key)}', 1)" class="w-7 h-7 text-xs font-bold hover:bg-neutral-100 rounded-r-full">+</button>
              </div>
              <span class="text-xs font-bold text-black">${fmtPrice(c.price * c.qty)}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    totalEl.textContent = fmtPrice(total);
  }

  async function stepCart(key, delta) {
    BagozzaAudio.play('tap');
    await BagozzaStore.updateCartQty(key, delta);
    renderCartDrawer();
  }

  async function removeCart(key) {
    BagozzaAudio.play('tap');
    await BagozzaStore.removeCartItem(key);
    renderCartDrawer();
  }

  async function checkoutWhatsApp() {
    const cart = BagozzaStore.getCart();
    if (!cart.length) return;
    BagozzaAudio.play('bag');

    const custName = (document.getElementById('cartCustName')?.value || '').trim() || 'Değerli Müşteri';
    const delivery = document.getElementById('cartDeliveryMode')?.value || 'Şişli Mağaza Prova & Teslim';
    const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

    // Save order into store CRM for Admin Panel
    const saved = await BagozzaStore.addOrder({
      customerName: custName,
      deliveryMode: delivery,
      items: cart.map((c) => ({ name: c.name, size: c.size, color: c.color, qty: c.qty, price: c.price })),
      total
    });

    const lines = [
      `*BAGOZZA ŞİŞLİ — YENİ SİPARİŞ (${saved.id})*`,
      `👤 Müşteri: ${custName}`,
      `📍 Tercih: ${delivery}`,
      `────────────────────`
    ];
    cart.forEach((c, idx) => {
      lines.push(`${idx + 1}. *${c.name}* (${c.color} | Beden: ${c.size}) x${c.qty} — ${fmtPrice(c.price * c.qty)}`);
    });
    lines.push(`────────────────────`);
    lines.push(`💰 *TOPLAM: ${fmtPrice(total)}*`);

    const waPhone = BagozzaStore.cleanWaNumber(BagozzaStore.getSettings().whatsappPhone);
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(waUrl, '_blank');
    showToast(`Sipariş (${saved.id}) WhatsApp'a aktarıldı!`, '💬');
  }

  /* ========================================================================
     8. SETTINGS ("AYARLAR / NASTROYKA") MODAL
     ======================================================================== */
  function openSettings() {
    BagozzaAudio.play('tap');
    const s = BagozzaStore.getSettings();
    document.getElementById('setSoundToggle').checked = Boolean(s.sound);
    document.getElementById('setMotionToggle').checked = Boolean(s.reducedMotion);
    document.getElementById('setLangSelect').value = s.lang || 'tr';
    document.getElementById('setDefaultBody').value = s.defaultBody || 'classic';
    document.getElementById('setWaPreview').textContent = '+' + BagozzaStore.cleanWaNumber(s.whatsappPhone);

    document.getElementById('settingsModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSettings() {
    BagozzaAudio.play('tap');
    document.getElementById('settingsModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  async function saveUserSettings() {
    const sound = document.getElementById('setSoundToggle').checked;
    const reducedMotion = document.getElementById('setMotionToggle').checked;
    const newLang = document.getElementById('setLangSelect').value;
    const defaultBody = document.getElementById('setDefaultBody').value;

    await BagozzaStore.updateSettings({ sound, reducedMotion, lang: newLang, defaultBody });
    ui.runwayBody = defaultBody;
    BagozzaSuit3D.setBodyType(defaultBody);
    applyTranslations();
    renderCatalog();
    renderRunway();
    update3DInfoPanel();
    BagozzaAudio.play('tap');
    showToast(newLang === 'en' ? 'Settings saved' : 'Ayarlar kaydedildi', '⚙');
  }

  async function toggleQuickLang() {
    const next = lang() === 'tr' ? 'en' : 'tr';
    await BagozzaStore.updateSettings({ lang: next });
    BagozzaAudio.play('tap');
    applyTranslations();
    renderCatalog();
    renderRunway();
    update3DInfoPanel();
  }

  /* ========================================================================
     9. PHONE-LOCKED ADMIN CMS PANEL (Upload/Remove Photos, Edit Prices, Add/Delete Products)
     ======================================================================== */
  function openAdmin() {
    BagozzaAudio.play('tap');
    closeSettings();
    const modal = document.getElementById('adminModal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (ui.adminUnlocked) {
      document.getElementById('adminLoginView').classList.add('hidden');
      document.getElementById('adminDashView').classList.remove('hidden');
      renderAdminPanel();
    } else {
      document.getElementById('adminLoginView').classList.remove('hidden');
      document.getElementById('adminDashView').classList.add('hidden');
      document.getElementById('adminLoginErr').classList.add('hidden');
      const inp = document.getElementById('adminPhoneInput');
      if (inp) { inp.value = ''; setTimeout(() => inp.focus(), 120); }
    }
  }

  function closeAdmin() {
    BagozzaAudio.play('tap');
    document.getElementById('adminModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function submitAdminLogin(e) {
    if (e) e.preventDefault();
    const val = document.getElementById('adminPhoneInput')?.value || '';
    if (BagozzaStore.verifyAdminPhone(val)) {
      ui.adminUnlocked = true;
      BagozzaAudio.play('unlock');
      document.getElementById('adminLoginView').classList.add('hidden');
      document.getElementById('adminDashView').classList.remove('hidden');
      renderAdminPanel();
      showToast('Admin Paneli Açıldı — Hoş Geldiniz', '🔓');
    } else {
      BagozzaAudio.play('error');
      const err = document.getElementById('adminLoginErr');
      if (err) err.classList.remove('hidden');
    }
  }

  function logoutAdmin() {
    BagozzaAudio.play('tap');
    ui.adminUnlocked = false;
    document.getElementById('adminDashView').classList.add('hidden');
    document.getElementById('adminLoginView').classList.remove('hidden');
  }

  function setAdminTab(tab) {
    BagozzaAudio.play('tap');
    ui.adminTab = tab;
    renderAdminPanel();
  }

  function renderAdminPanel() {
    document.querySelectorAll('[data-adm-tab]').forEach((btn) => {
      const a = btn.getAttribute('data-adm-tab') === ui.adminTab;
      btn.className = `btn-motion px-4 py-2 rounded-full text-xs font-semibold border ${a ? 'bg-black text-white border-black' : 'bg-white text-neutral-600 border-neutral-200 hover:border-black'}`;
    });

    ['products', 'add', 'orders', 'config'].forEach((k) => {
      document.getElementById('admPane_' + k)?.classList.toggle('hidden', ui.adminTab !== k);
    });

    if (ui.adminTab === 'products') renderAdminProducts();
    if (ui.adminTab === 'orders') renderAdminOrders();
    if (ui.adminTab === 'config') renderAdminConfig();
  }

  function renderAdminProducts() {
    let list = BagozzaStore.getProducts();
    if (ui.adminCatFilter !== 'all') list = list.filter((p) => p.category === ui.adminCatFilter);
    if (ui.adminSearch.trim()) {
      const q = ui.adminSearch.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.subtitle_tr.toLowerCase().includes(q));
    }

    const wrap = document.getElementById('adminProductsList');
    document.getElementById('adminProdCount').textContent = `${list.length} Ürün`;

    wrap.innerHTML = list.map((p) => `
      <div class="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col md:flex-row gap-4 items-start md:items-center">
        <!-- Dual Thumbnail + Upload/Remove Photo Controls -->
        <div class="flex items-center gap-2.5 shrink-0">
          <div class="relative group w-16 h-20 rounded-lg overflow-hidden bg-white border border-neutral-200">
            <img src="${p.imgCard}" alt="Ürün" class="w-full h-full object-cover" />
            <label class="absolute inset-0 bg-black/55 text-white text-[9px] font-semibold flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition text-center px-1">
              Ürün Foto
              <input type="file" accept="image/*" class="hidden" onchange="BagozzaApp.adminUploadPhoto('${p.id}', 'imgCard', this)" />
            </label>
          </div>
          <div class="relative group w-16 h-20 rounded-lg overflow-hidden bg-white border border-neutral-200">
            <img src="${p.imgModel}" alt="Model" class="w-full h-full object-cover" />
            <label class="absolute inset-0 bg-black/55 text-white text-[9px] font-semibold flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition text-center px-1">
              Model Foto
              <input type="file" accept="image/*" class="hidden" onchange="BagozzaApp.adminUploadPhoto('${p.id}', 'imgModel', this)" />
            </label>
          </div>
        </div>

        <!-- Editable Name & Prices -->
        <div class="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-2.5 w-full">
          <div class="sm:col-span-5">
            <label class="block text-[10px] uppercase text-neutral-400">Ürün Adı</label>
            <input type="text" value="${escapeHtml(p.name)}" id="admName_${p.id}" class="w-full px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-neutral-300 bg-white focus:border-black focus:outline-none" />
          </div>
          <div class="sm:col-span-3">
            <label class="block text-[10px] uppercase text-neutral-400">Eski Fiyat (₺)</label>
            <input type="number" value="${p.oldPrice}" id="admOld_${p.id}" class="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-300 bg-white focus:border-black focus:outline-none" />
          </div>
          <div class="sm:col-span-4">
            <label class="block text-[10px] uppercase text-neutral-400 font-bold text-black">Satış Fiyatı (₺)</label>
            <input type="number" value="${p.price}" id="admPrice_${p.id}" class="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-black bg-white focus:outline-none" />
          </div>
        </div>

        <!-- Actions: Save, Remove Photo, Delete -->
        <div class="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
          <button onclick="BagozzaApp.adminSaveRow('${p.id}')" class="btn-motion px-3 py-2 rounded-lg bg-black text-white text-[11px] font-semibold">Kaydet</button>
          <button onclick="BagozzaApp.adminClearPhoto('${p.id}')" class="btn-motion px-2.5 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-700 hover:border-black text-[11px]" title="Fotoğrafı Kaldır">Foto Sil</button>
          <button onclick="BagozzaApp.adminDeleteProduct('${p.id}')" class="btn-motion px-2.5 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white text-[11px]" title="Ürünü Sil">Sil</button>
        </div>
      </div>
    `).join('');
  }

  async function adminSaveRow(id) {
    const name = document.getElementById('admName_' + id)?.value.trim();
    const oldPrice = Number(document.getElementById('admOld_' + id)?.value) || 0;
    const price = Number(document.getElementById('admPrice_' + id)?.value) || 0;
    if (!name || price <= 0) {
      BagozzaAudio.play('error');
      return showToast('Geçerli isim ve fiyat girin', '!');
    }
    await BagozzaStore.updateProduct(id, { name, oldPrice, price });
    BagozzaAudio.play('bag');
    renderCatalog();
    renderRunway();
    showToast(`${name} güncellendi (${fmtPrice(price)})`, '✓');
  }

  async function adminUploadPhoto(id, field, inputEl) {
    const file = inputEl.files && inputEl.files[0];
    if (!file) return;
    try {
      const dataUrl = await BagozzaStore.compressImageFile(file, 720, 0.85);
      const patch = { [field]: dataUrl };
      if (field === 'imgModel') patch.imgAlt = dataUrl;
      await BagozzaStore.updateProduct(id, patch);
      BagozzaAudio.play('bag');
      renderAdminProducts();
      renderCatalog();
      renderRunway();
      showToast('Yeni fotoğraf yüklendi ve kaydedildi!', '📸');
    } catch (_) {
      BagozzaAudio.play('error');
      showToast('Fotoğraf yüklenemedi', '!');
    }
  }

  async function adminClearPhoto(id) {
    const blankSvg = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="760" viewBox="0 0 600 760"><rect width="600" height="760" fill="#f5f5f3"/><text x="50%" y="48%" text-anchor="middle" font-family="serif" font-size="36" fill="#aaa" letter-spacing="8">BAGOZZA</text><text x="50%" y="54%" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#999">FOTOĞRAF KALDIRILDI</text></svg>`
    );
    await BagozzaStore.updateProduct(id, { imgCard: blankSvg, imgModel: blankSvg, imgAlt: blankSvg });
    BagozzaAudio.play('tap');
    renderAdminProducts();
    renderCatalog();
    renderRunway();
    showToast('Ürün fotoğrafı kaldırıldı', '🗑');
  }

  async function adminDeleteProduct(id) {
    await BagozzaStore.deleteProduct(id);
    BagozzaAudio.play('tap');
    renderAdminProducts();
    renderCatalog();
    renderRunway();
    showToast('Ürün katalogdan silindi', '🗑');
  }

  async function handleNewProdFile(which, inputEl) {
    const file = inputEl.files && inputEl.files[0];
    if (!file) return;
    try {
      const dataUrl = await BagozzaStore.compressImageFile(file, 720, 0.85);
      if (which === 'card') {
        ui.newCardDataUrl = dataUrl;
        document.getElementById('newProdCardPreview').src = dataUrl;
        document.getElementById('newProdCardPreview').classList.remove('hidden');
      } else {
        ui.newModelDataUrl = dataUrl;
        document.getElementById('newProdModelPreview').src = dataUrl;
        document.getElementById('newProdModelPreview').classList.remove('hidden');
      }
      BagozzaAudio.play('tap');
    } catch (_) {
      BagozzaAudio.play('error');
    }
  }

  async function submitNewProduct(e) {
    e.preventDefault();
    const name = document.getElementById('newProdName').value.trim();
    const category = document.getElementById('newProdCat').value;
    const price = Number(document.getElementById('newProdPrice').value) || 0;
    const oldPrice = Number(document.getElementById('newProdOldPrice').value) || Math.round(price * 1.15);
    const subtitle = document.getElementById('newProdSub').value.trim() || 'Bagozza Özel Koleksiyon';
    const fabric = document.getElementById('newProdFabric').value.trim() || '%100 Saf İtalyan Kumaş';
    const bodyType = document.getElementById('newProdBody').value;

    if (!name || price <= 0) {
      BagozzaAudio.play('error');
      return showToast('Ürün adı ve fiyat zorunludur', '!');
    }

    const fallbackImg = category === 'shoes'
      ? 'assets/shoes/sh_01_card.jpg'
      : category === 'trousers'
        ? 'assets/trousers/tr_01_card.jpg'
        : 'assets/suits/suit_01_card.jpg';

    const cardImg = ui.newCardDataUrl || fallbackImg;
    const modelImg = ui.newModelDataUrl || cardImg;

    await BagozzaStore.addProduct({
      id: 'custom_' + Date.now(),
      category,
      name: name.toUpperCase(),
      subtitle_tr: subtitle,
      subtitle_en: subtitle,
      oldPrice,
      price,
      colorName_tr: 'Özel Renk',
      colorName_en: 'Signature Tone',
      colors: [
        { hex: '#121316', tr: 'Siyah', en: 'Black' },
        { hex: '#1a2744', tr: 'Lacivert', en: 'Navy' },
        { hex: '#3d4047', tr: 'Antrasit', en: 'Charcoal' }
      ],
      sizes: category === 'shoes' ? ['40', '41', '42', '43', '44', '45'] : ['46', '48', '50', '52', '54', '56'],
      bodyType,
      preset3d: null,
      fabric_tr: fabric,
      fabric_en: fabric,
      imgCard: cardImg,
      imgModel: modelImg,
      imgAlt: modelImg
    });

    ui.newCardDataUrl = '';
    ui.newModelDataUrl = '';
    e.target.reset();
    document.getElementById('newProdCardPreview')?.classList.add('hidden');
    document.getElementById('newProdModelPreview')?.classList.add('hidden');

    BagozzaAudio.play('bag');
    renderCatalog();
    renderRunway();
    setAdminTab('products');
    showToast(`${name.toUpperCase()} vitrine eklendi!`, '✨');
  }

  function renderAdminOrders() {
    const orders = BagozzaStore.getOrders();
    const wrap = document.getElementById('adminOrdersList');
    if (!orders.length) {
      wrap.innerHTML = `<div class="py-12 text-center text-xs text-neutral-500 border border-dashed border-neutral-300 rounded-xl">Henüz paket/WhatsApp siparişi bulunmuyor.</div>`;
      return;
    }
    wrap.innerHTML = orders.map((o) => `
      <div class="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs space-y-2">
        <div class="flex items-center justify-between">
          <span class="font-bold text-black">${escapeHtml(o.id)} • ${escapeHtml(o.customerName)}</span>
          <span class="text-neutral-500">${escapeHtml(o.createdAt)}</span>
        </div>
        <div class="text-neutral-600">${escapeHtml(o.deliveryMode)}</div>
        <div class="space-y-1 pt-1 border-t border-neutral-200">
          ${(o.items || []).map((it) => `<div>• ${escapeHtml(it.name)} (${escapeHtml(it.size)}, ${escapeHtml(it.color)}) x${it.qty} — <strong>${fmtPrice(it.price * it.qty)}</strong></div>`).join('')}
        </div>
        <div class="text-right font-bold text-sm text-black">Toplam: ${fmtPrice(o.total)}</div>
      </div>
    `).join('');
  }

  function renderAdminConfig() {
    const s = BagozzaStore.getSettings();
    document.getElementById('cfgWaPhone').value = s.whatsappPhone;
    document.getElementById('cfgAdminPhone').value = s.adminPhone;
    document.getElementById('cfgAddress').value = s.storeAddress;
    document.getElementById('cfgMapsUrl').value = s.mapsUrl;
  }

  async function saveAdminConfig(e) {
    e.preventDefault();
    const whatsappPhone = BagozzaStore.cleanWaNumber(document.getElementById('cfgWaPhone').value);
    const adminPhone = BagozzaStore.cleanWaNumber(document.getElementById('cfgAdminPhone').value);
    const storeAddress = document.getElementById('cfgAddress').value.trim();
    const mapsUrl = document.getElementById('cfgMapsUrl').value.trim();

    await BagozzaStore.updateSettings({ whatsappPhone, adminPhone, storeAddress, mapsUrl });
    applyTranslations();
    BagozzaAudio.play('bag');
    showToast('Mağaza ve WhatsApp ayarları güncellendi!', '✓');
  }

  async function resetDefaultCatalog() {
    if (!confirm('60 parçalık orijinal Bagozza kataloğu geri yüklensin mi?')) return;
    await BagozzaStore.resetCatalog();
    BagozzaAudio.play('tap');
    renderAdminProducts();
    renderCatalog();
    renderRunway();
    showToast('60 parçalık orijinal katalog geri yüklendi', '↺');
  }

  /* ========================================================================
     10. BOOTSTRAP & GLOBAL EVENTS
     ======================================================================== */
  async function boot() {
    await BagozzaStore.init();
    ui.runwayBody = BagozzaStore.getSettings().defaultBody || 'classic';

    applyTranslations();
    init3DSection();
    renderRunway();
    bindRunwayDragTurn();
    renderCatalog();
    renderCartBadge();

    // Floating pill navbar elevation on scroll
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('pillNavbar');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // Escape closes active modal/drawer cleanly
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        ['pdpModal', 'cartDrawer', 'settingsModal', 'adminModal'].forEach((id) => {
          document.getElementById(id)?.classList.remove('open');
        });
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', boot);

  return {
    select3DPreset,
    select3DBody,
    select3DSize,
    rotate3D,
    toggle3DAuto,
    zoom3D,
    add3DSuitToBag,
    setRunwayTab,
    setRunwayBody,
    setRunwayAngle,
    stepRunwayLook,
    equipOnRunway,
    tryItemOnRunway,
    addFullRunwayOutfitToBag,
    setCatalogCategory,
    setCatalogBodyFilter,
    setCatalogSearch,
    toggleForceModelView,
    setCatalogPage,
    quickAddItem,
    openPDP,
    closePDP,
    setPDPSlide,
    stepPDPSlide,
    turnPDPAngle,
    setPDPColor,
    setPDPSize,
    setPDPBody,
    addPDPToBag,
    toggleSizeGuide,
    openCart,
    closeCart,
    stepCart,
    removeCart,
    checkoutWhatsApp,
    openSettings,
    closeSettings,
    saveUserSettings,
    toggleQuickLang,
    openAdmin,
    closeAdmin,
    submitAdminLogin,
    logoutAdmin,
    setAdminTab,
    setAdminSearch(v) { ui.adminSearch = v; renderAdminProducts(); },
    setAdminCatFilter(v) { ui.adminCatFilter = v; renderAdminProducts(); },
    adminSaveRow,
    adminUploadPhoto,
    adminClearPhoto,
    adminDeleteProduct,
    handleNewProdFile,
    submitNewProduct,
    saveAdminConfig,
    resetDefaultCatalog
  };
})();
