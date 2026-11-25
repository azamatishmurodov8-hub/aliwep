/**
 * BAGOZZA Persistence Engine (IndexedDB + localStorage fallback)
 * Supports full 60-item catalog edits, custom uploaded photos, price updates,
 * shopping bag (Paket), orders, settings, and phone-number Admin authentication.
 */
window.BagozzaStore = (function () {
  const DB_NAME = 'bagozza_atelier_db_v4';
  const STORE_NAME = 'kv';
  const LS_PREFIX = 'bagozza_v4_';

  const DEFAULT_SETTINGS = {
    lang: 'tr',
    sound: true,
    reducedMotion: false,
    defaultBody: 'classic',
    whatsappPhone: '902122347088',
    adminPhone: '902122347088',
    storeAddress: '19 Mayıs Mah., Hrant Dink Sok. No:39, 34363 Şişli/İstanbul',
    mapsUrl: 'https://maps.app.goo.gl/U2z7qZpVpbjofQgu7'
  };

  let dbPromise = null;
  let state = {
    products: [],
    cart: [],
    orders: [],
    settings: { ...DEFAULT_SETTINGS }
  };

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve) => {
      try {
        if (!window.indexedDB) return resolve(null);
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch (_) {
        resolve(null);
      }
    });
    return dbPromise;
  }

  async function idbGet(key) {
    const db = await openDB();
    if (db) {
      return new Promise((resolve) => {
        try {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const req = tx.objectStore(STORE_NAME).get(key);
          req.onsuccess = () => resolve(req.result !== undefined ? req.result : null);
          req.onerror = () => resolve(null);
        } catch (_) {
          resolve(null);
        }
      });
    }
    try {
      const raw = localStorage.getItem(LS_PREFIX + key);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  async function idbSet(key, val) {
    const db = await openDB();
    if (db) {
      await new Promise((resolve) => {
        try {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          tx.objectStore(STORE_NAME).put(val, key);
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => resolve(false);
        } catch (_) {
          resolve(false);
        }
      });
    }
    try {
      if (key !== 'products') {
        localStorage.setItem(LS_PREFIX + key, JSON.stringify(val));
      }
    } catch (_) {
      // Ignore quota errors on localStorage backup; IndexedDB holds large images
    }
  }

  function cloneDefaults() {
    return JSON.parse(JSON.stringify(window.BAGOZZA_DEFAULT_CATALOG || []));
  }

  async function init() {
    const savedProducts = await idbGet('products');
    const savedCart = await idbGet('cart');
    const savedOrders = await idbGet('orders');
    const savedSettings = await idbGet('settings');

    state.products = Array.isArray(savedProducts) && savedProducts.length > 0
      ? savedProducts
      : cloneDefaults();
    state.cart = Array.isArray(savedCart) ? savedCart : [];
    state.orders = Array.isArray(savedOrders) ? savedOrders : [];
    state.settings = { ...DEFAULT_SETTINGS, ...(savedSettings || {}) };

    return state;
  }

  function normalizePhone(raw) {
    const digits = String(raw || '').replace(/\D/g, '');
    if (digits.length < 7) return '';
    return digits.slice(-10);
  }

  function verifyAdminPhone(inputPhone) {
    const entered = normalizePhone(inputPhone);
    const target = normalizePhone(state.settings.adminPhone || DEFAULT_SETTINGS.adminPhone);
    return entered.length >= 10 && entered === target;
  }

  function cleanWaNumber(raw) {
    const digits = String(raw || '').replace(/\D/g, '');
    if (!digits) return DEFAULT_SETTINGS.whatsappPhone;
    if (digits.startsWith('0') && digits.length === 11) return '9' + digits;
    if (digits.length === 10) return '90' + digits;
    return digits;
  }

  function compressImageFile(file, maxW = 720, quality = 0.85) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) {
        return reject(new Error('Invalid image file'));
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const ratio = Math.min(1, maxW / img.width);
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * ratio);
          canvas.height = Math.round(img.height * ratio);
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => reject(new Error('Image decode failed'));
        img.src = ev.target.result;
      };
      reader.onerror = () => reject(new Error('File read failed'));
      reader.readAsDataURL(file);
    });
  }

  async function saveProducts() {
    await idbSet('products', state.products);
  }

  async function saveCart() {
    await idbSet('cart', state.cart);
  }

  async function saveOrders() {
    await idbSet('orders', state.orders);
  }

  async function saveSettings() {
    await idbSet('settings', state.settings);
  }

  return {
    init,
    getState: () => state,
    getProducts: () => state.products,
    getProductById: (id) => state.products.find((p) => p.id === id) || null,
    getCart: () => state.cart,
    getOrders: () => state.orders,
    getSettings: () => state.settings,
    verifyAdminPhone,
    cleanWaNumber,
    compressImageFile,

    async updateProduct(id, patch) {
      const idx = state.products.findIndex((p) => p.id === id);
      if (idx === -1) return null;
      state.products[idx] = { ...state.products[idx], ...patch };
      await saveProducts();
      return state.products[idx];
    },

    async addProduct(prod) {
      state.products.unshift(prod);
      await saveProducts();
      return prod;
    },

    async deleteProduct(id) {
      state.products = state.products.filter((p) => p.id !== id);
      await saveProducts();
    },

    async resetCatalog() {
      state.products = cloneDefaults();
      await saveProducts();
      return state.products;
    },

    async addToCart(entry) {
      const key = `${entry.productId}__${entry.size}__${entry.color}__${entry.bodyType || 'classic'}`;
      const existing = state.cart.find((c) => c.key === key);
      if (existing) {
        existing.qty += entry.qty || 1;
      } else {
        state.cart.unshift({ ...entry, key, qty: entry.qty || 1 });
      }
      await saveCart();
      return state.cart;
    },

    async updateCartQty(key, delta) {
      const idx = state.cart.findIndex((c) => c.key === key);
      if (idx === -1) return state.cart;
      state.cart[idx].qty += delta;
      if (state.cart[idx].qty <= 0) {
        state.cart.splice(idx, 1);
      }
      await saveCart();
      return state.cart;
    },

    async removeCartItem(key) {
      state.cart = state.cart.filter((c) => c.key !== key);
      await saveCart();
      return state.cart;
    },

    async clearCart() {
      state.cart = [];
      await saveCart();
    },

    async addOrder(order) {
      state.orders.unshift({
        id: 'BG-' + String(Date.now()).slice(-6),
        createdAt: new Date().toLocaleString('tr-TR'),
        status: 'Yeni',
        ...order
      });
      await saveOrders();
      return state.orders[0];
    },

    async updateSettings(patch) {
      state.settings = { ...state.settings, ...patch };
      await saveSettings();
      return state.settings;
    }
  };
})();
