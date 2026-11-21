import os

BASE_DIR = "/Users/dalerishmurodov/.gemini/antigravity/scratch/ai_web_agency/aliwep/templates"

def banner(title, price, id_slug):
    return f"""
    <nav class="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-black/85 backdrop-blur-md border border-white/20 shadow-2xl text-[11px] sm:text-xs font-mono">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span class="text-white font-bold tracking-tight">{title}</span>
      <span class="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">{price}</span>
      <a href="https://t.me/aliWep_code_Bot?start=secim_{id_slug}" target="_blank" class="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold hover:scale-105 transition-transform flex items-center gap-1">
        ⚡️ Bu Tasarımı Al
      </a>
      <a href="../../index.html" class="text-gray-400 hover:text-white transition-colors ml-1" title="Showroom'a dön">✕</a>
    </nav>
    """

def save(slug, title, price, body_html, extra_js=""):
    os.makedirs(f"{BASE_DIR}/{slug}", exist_ok=True)
    html = f"""<!DOCTYPE html>
<html lang="tr" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} — aliWep 3D Master Showcase</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,500;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {{
      darkMode: 'class',
      theme: {{
        extend: {{
          fontFamily: {{
            royal: ['"Cinzel"', 'serif'],
            serif: ['"Playfair Display"', 'serif'],
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"Space Grotesk"', 'monospace'],
          }}
        }}
      }}
    }}
  </script>
  <style>
    body {{ background: #07070A; color: #F3F4F6; overflow-x: hidden; font-family: 'Plus Jakarta Sans', sans-serif; }}
    .glass-card {{ background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08); transition: all 0.3s ease; }}
    .glass-card:hover {{ border-color: rgba(212, 175, 55, 0.4); transform: translateY(-4px); }}
    .glow-gold {{ box-shadow: 0 0 40px -10px rgba(212, 175, 55, 0.25); }}
  </style>
</head>
<body class="min-h-screen relative selection:bg-amber-500 selection:text-black pt-16">
  {banner(title, price, slug)}
  {body_html}
  
  <!-- Footer -->
  <footer class="border-t border-white/10 bg-black/60 py-10 px-4 text-center text-xs font-mono text-gray-400">
    <div class="max-w-4xl mx-auto flex flex-col items-center gap-3">
      <span class="font-royal text-base text-white font-bold">{title} • aliWep Studio Projesi</span>
      <p>Ön ödeme yok • 30 gün teknik garanti • 5-10 günde teslimat</p>
      <a href="https://t.me/aliWep_code_Bot?start=secim_{slug}" class="text-amber-400 hover:underline">Telegram ile bu siteyi sipariş et →</a>
    </div>
  </footer>

  <script>
    lucide.createIcons();
    {extra_js}
  </script>
</body>
</html>"""
    with open(f"{BASE_DIR}/{slug}/index.html", "w", encoding="utf-8") as f:
        f.write(html)
    print(f"✓ Created {slug}")

# ==========================================
# 1. kofe-nordic (8.000 TL)
# ==========================================
save(
    "kofe-nordic",
    "Nordic Minimal Specialty Coffee",
    "8.000 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">İSVİÇRE TİPOGRAFİSİ & TEK ETİYOPYA ÇEKİRDEKLERİ</span>
      <h1 class="text-5xl sm:text-7xl font-sans font-light tracking-tighter text-white mt-6 mb-4">NORDIC.<span class="text-stone-400">ROAST</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-10">Karaköy ve Kadıköy sokaklarında minimalizm. Açık kavrum, floral notalar ve temas gerektirmeyen dijital QR menü.</p>

      <!-- Interactive Flavor Wheel Selector -->
      <div class="glass-card rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto mb-16 text-left">
        <h3 class="text-xs font-mono uppercase tracking-widest text-amber-400 mb-4">☕️ Çekirdek & Tadım Profili Seçici</h3>
        <div class="grid grid-cols-3 gap-3 mb-6">
          <button onclick="setBean('Yirgacheffe', 'Yasemin, Limon Otu, Şeftali', '95 ₺')" class="bean-btn active p-3 rounded-xl bg-white/10 border border-amber-400 text-xs font-mono text-white text-center">
            Etiyopya
          </button>
          <button onclick="setBean('Geisha Huila', 'Kırmızı Erik, Bergamot, Bal', '130 ₺')" class="bean-btn p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300 text-center hover:bg-white/10">
            Kolombiya
          </button>
          <button onclick="setBean('Nyeri Peaberry', 'Siyah Frenküzümü, Çikolata', '110 ₺')" class="bean-btn p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300 text-center hover:bg-white/10">
            Kenya
          </button>
        </div>
        <div id="bean-display" class="p-4 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between">
          <div>
            <h4 id="bean-name" class="font-bold text-white text-base">Etiyopya Yirgacheffe Washed</h4>
            <p id="bean-notes" class="text-xs text-gray-400 mt-0.5">Tadım: Yasemin, Limon Otu, Şeftali</p>
          </div>
          <span id="bean-price" class="font-mono text-lg font-bold text-amber-400">95 ₺</span>
        </div>
      </div>

      <!-- Quick Menu Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div class="glass-card p-6 rounded-2xl text-left">
          <span class="text-xs font-mono text-gray-400">01 / Demleme</span>
          <h4 class="text-lg font-bold text-white mt-1">V60 Pour-Over</h4>
          <p class="text-xs text-gray-400 mt-2">Origami Dripper ile 92°C su ile 3 dakika 15 saniyede hassas demleme.</p>
          <span class="block mt-4 font-mono text-sm text-amber-400 font-bold">110 ₺</span>
        </div>
        <div class="glass-card p-6 rounded-2xl text-left">
          <span class="text-xs font-mono text-gray-400">02 / Sütlü</span>
          <h4 class="text-lg font-bold text-white mt-1">Flat White (Yulaf)</h4>
          <p class="text-xs text-gray-400 mt-2">Çift shot ristretto ve ipeksi mikro köpüklü organik yulaf sütü.</p>
          <span class="block mt-4 font-mono text-sm text-amber-400 font-bold">120 ₺</span>
        </div>
        <div class="glass-card p-6 rounded-2xl text-left">
          <span class="text-xs font-mono text-gray-400">03 / Soğuk</span>
          <h4 class="text-lg font-bold text-white mt-1">Kyoto Cold Drip</h4>
          <p class="text-xs text-gray-400 mt-2">18 saat boyunca damla damla süzülmüş yoğun viski aromatik gövde.</p>
          <span class="block mt-4 font-mono text-sm text-amber-400 font-bold">140 ₺</span>
        </div>
      </div>
    </div>
    """,
    """
    function setBean(name, notes, price) {
      document.getElementById('bean-name').innerText = name;
      document.getElementById('bean-notes').innerText = 'Tadım: ' + notes;
      document.getElementById('bean-price').innerText = price;
    }
    """
)

# ==========================================
# 2. kofe-darkgold (14.000 TL)
# ==========================================
save(
    "kofe-darkgold",
    "Dark Gold Espresso & Night Lounge",
    "14.000 ₺",
    """
    <div class="relative py-20 px-4 text-center max-w-5xl mx-auto">
      <div class="w-32 h-32 rounded-full bg-amber-500/20 blur-3xl absolute top-10 left-1/2 -translate-x-1/2"></div>
      <span class="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">BEŞİKTAŞ & NİŞANTAŞI GECE ESTETİĞİ</span>
      <h1 class="text-5xl sm:text-7xl font-royal font-black text-white mt-6 mb-4 tracking-wider">DARK GOLD<br><span class="text-amber-400">ESPRESSO LOUNGE</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">Gündüz üçüncü dalga nitelikli espresso, gece nargile ve özel lounge kokteylleri. VIP masa rezervasyonu.</p>

      <!-- VIP Table Booking Widget -->
      <div class="glass-card rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-16 text-left glow-gold">
        <h3 class="font-royal text-lg font-bold text-white mb-2">Masa Rezervasyonu</h3>
        <p class="text-xs text-gray-400 mb-6">İstediğiniz alanı seçin, anında WhatsApp ile masanızı ayıralım.</p>
        <div class="grid grid-cols-2 gap-3 mb-4">
          <div class="p-4 rounded-xl bg-white/5 border border-amber-400/30 text-xs">
            <span class="font-bold text-amber-400 block mb-1">VIP Loca (4-6 Kişi)</span>
            <span class="text-gray-400">Kadife koltuklar, özel servis</span>
          </div>
          <div class="p-4 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span class="font-bold text-white block mb-1">Teras Bar</span>
            <span class="text-gray-400">Açık hava & DJ yanı</span>
          </div>
        </div>
        <a href="https://wa.me/905521234567?text=DarkGold%20VIP%20Rezervasyon%20Talebi" target="_blank" class="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
          WhatsApp ile Masayı Ayır →
        </a>
      </div>

      <!-- Menu Highlights -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
        <div class="glass-card p-6 rounded-2xl flex items-center justify-between">
          <div>
            <h4 class="font-bold text-white">Gold Dust Affogato</h4>
            <p class="text-xs text-gray-400 mt-1">Madagaskar vanilya dondurması, 24K yenilebilir altın tozu, ristretto.</p>
          </div>
          <span class="font-mono text-amber-400 font-bold ml-4">190 ₺</span>
        </div>
        <div class="glass-card p-6 rounded-2xl flex items-center justify-between">
          <div>
            <h4 class="font-bold text-white">Midnight Cold Brew Martini</h4>
            <p class="text-xs text-gray-400 mt-1">Azotla köpürtülmüş soğuk kahve, vanilya şurubu, portakal kabuğu.</p>
          </div>
          <span class="font-mono text-amber-400 font-bold ml-4">220 ₺</span>
        </div>
      </div>
    </div>
    """
)

# ==========================================
# 3. kofe-bakery (18.000 TL)
# ==========================================
save(
    "kofe-bakery",
    "Artisan Bakery & Pour-Over Lab",
    "18.000 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">HER SABAH 07:00'DE FIRINDAN TAZE</span>
      <h1 class="text-5xl sm:text-7xl font-serif font-black text-white mt-6 mb-4">CRUST & BEAN</h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">Fransız tereyağlı kruvasanlar, ekşi mayalı köy ekmekleri ve taze kavrulmuş artisan pour-over kahveler.</p>

      <!-- Oven Countdown Widget -->
      <div class="glass-card rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-16 text-center border-amber-500/30">
        <i data-lucide="flame" class="w-8 h-8 text-amber-400 mx-auto mb-2 animate-bounce"></i>
        <h3 class="font-serif text-xl font-bold text-white mb-1">Sıradaki Sıcak Parti Fırında!</h3>
        <p class="text-xs text-gray-400 mb-4">Antep Fıstıklı Kruvasan & Çikolatalı Babka</p>
        <div class="text-3xl sm:text-4xl font-mono font-black text-amber-400 tracking-widest" id="countdown">14:28</div>
        <span class="text-[10px] text-gray-500 uppercase tracking-widest block mt-2">Kalan Süre (Fırından Çıkış)</span>
      </div>

      <!-- Pastry Showcase -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
        <div class="glass-card p-5 rounded-2xl">
          <div class="h-36 rounded-xl bg-gradient-to-br from-amber-900/60 to-black mb-4 flex items-center justify-center">
            <span class="text-4xl">🥐</span>
          </div>
          <h4 class="font-bold text-white text-base">Almond Frangipane Kruvasan</h4>
          <p class="text-xs text-gray-400 mt-1">İki kez fırınlanmış badem kreması ve çıtır badem pulları.</p>
          <span class="font-mono text-amber-400 font-bold block mt-3">135 ₺</span>
        </div>
        <div class="glass-card p-5 rounded-2xl">
          <div class="h-36 rounded-xl bg-gradient-to-br from-orange-950/60 to-black mb-4 flex items-center justify-center">
            <span class="text-4xl">🍞</span>
          </div>
          <h4 class="font-bold text-white text-base">Cevizli Ekşi Mayalı Ekmek</h4>
          <p class="text-xs text-gray-400 mt-1">36 saat soğuk fermantasyon, taş tabanlı fırında pişmiş.</p>
          <span class="font-mono text-amber-400 font-bold block mt-3">150 ₺</span>
        </div>
        <div class="glass-card p-5 rounded-2xl">
          <div class="h-36 rounded-xl bg-gradient-to-br from-yellow-950/60 to-black mb-4 flex items-center justify-center">
            <span class="text-4xl">🥧</span>
          </div>
          <h4 class="font-bold text-white text-base">Kardemummabulle (Kakuleli Çörek)</h4>
          <p class="text-xs text-gray-400 mt-1">Geleneksel İsveç kakule taneli tereyağlı düğüm hamuru.</p>
          <span class="font-mono text-amber-400 font-bold block mt-3">115 ₺</span>
        </div>
      </div>
    </div>
    """,
    """
    let time = 14 * 60 + 28;
    setInterval(() => {
      time--;
      if (time < 0) time = 30 * 60;
      const m = Math.floor(time / 60);
      const s = time % 60;
      document.getElementById('countdown').innerText = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }, 1000);
    """
)

# ==========================================
# 4. kofe-club (25.000 TL)
# ==========================================
save(
    "kofe-club",
    "İstanbul Coffee Roasters Club",
    "25.000 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono">DÜZENLİ TAZE ÇEKİRDEK ABONELİĞİ</span>
      <h1 class="text-5xl sm:text-7xl font-sans font-black text-white mt-6 mb-4">ROASTERS CLUB.<span class="text-orange-500">İST</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">Her ay kapınıza gelen taze kavrulmuş mikro lot çekirdekler. Dijital sadakat kartı ve özel barista atölyeleri.</p>

      <!-- Subscription Builder -->
      <div class="glass-card rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto mb-16 text-left border-orange-500/30">
        <h3 class="font-mono uppercase text-xs tracking-widest text-orange-400 mb-3">📦 Aylık Kahve Kutunuzu Oluşturun</h3>
        
        <label class="block text-xs text-gray-300 font-medium mb-2">Aylık Çekirdek Miktarı:</label>
        <div class="grid grid-cols-3 gap-3 mb-6">
          <button onclick="setSub('250g', 'Ayda 2 Paket (500g)', '350 ₺/ay')" class="sub-btn p-3 rounded-xl bg-white/10 border border-orange-400 text-xs font-mono text-white text-center">
            500g
          </button>
          <button onclick="setSub('500g', 'Ayda 4 Paket (1kg)', '650 ₺/ay')" class="sub-btn p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300 text-center hover:bg-white/10">
            1 Kg
          </button>
          <button onclick="setSub('1kg', 'Ofis & Aile Paketi (2kg)', '1.190 ₺/ay')" class="sub-btn p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-300 text-center hover:bg-white/10">
            2 Kg
          </button>
        </div>

        <div class="p-4 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between">
          <div>
            <h4 id="sub-title" class="font-bold text-white text-base">Ayda 2 Paket (500g) Taze Çekirdek</h4>
            <p class="text-xs text-gray-400 mt-0.5">Ücretsiz kargo + Özel tadım kartları dahil</p>
          </div>
          <span id="sub-price" class="font-mono text-xl font-bold text-orange-400">350 ₺/ay</span>
        </div>

        <a href="https://wa.me/905521234567?text=Roasters%20Club%20Abonelik%20Talebi" target="_blank" class="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
          Aboneliği Başlat →
        </a>
      </div>
    </div>
    """,
    """
    function setSub(amount, title, price) {
      document.getElementById('sub-title').innerText = title;
      document.getElementById('sub-price').innerText = price;
    }
    """
)

# ==========================================
# 5. butik-runway (16.000 TL)
# ==========================================
save(
    "butik-runway",
    "Haute Couture 3D Runway",
    "16.000 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">İSTANBUL MODA HAFTASI SEÇKİSİ</span>
      <h1 class="text-5xl sm:text-7xl font-royal font-black text-white mt-6 mb-4">RUNWAY.<span class="text-purple-400">COUTURE</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">Podyum koleksiyonları, canlı kumaş akışkanlığı ve defile parçalarını doğrudan satın alma deneyimi.</p>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
        <div class="glass-card rounded-2xl overflow-hidden">
          <div class="h-64 bg-gradient-to-t from-black via-purple-950/60 to-purple-900/40 p-4 flex flex-col justify-end">
            <span class="px-2 py-0.5 rounded bg-purple-500 text-black font-bold text-[10px] w-fit font-mono mb-2">RUNWAY 01</span>
            <h4 class="font-royal text-lg font-bold text-white">Saten Drapeli Gece Elbisesi</h4>
          </div>
          <div class="p-4 flex items-center justify-between border-t border-white/5">
            <span class="text-xs text-gray-400">İtalyan İpek Saten</span>
            <span class="font-mono text-purple-400 font-bold">12.500 ₺</span>
          </div>
        </div>

        <div class="glass-card rounded-2xl overflow-hidden">
          <div class="h-64 bg-gradient-to-t from-black via-fuchsia-950/60 to-fuchsia-900/40 p-4 flex flex-col justify-end">
            <span class="px-2 py-0.5 rounded bg-fuchsia-500 text-black font-bold text-[10px] w-fit font-mono mb-2">RUNWAY 02</span>
            <h4 class="font-royal text-lg font-bold text-white">Oversize Kaşmir Palto</h4>
          </div>
          <div class="p-4 flex items-center justify-between border-t border-white/5">
            <span class="text-xs text-gray-400">%100 Moğol Kaşmiri</span>
            <span class="font-mono text-fuchsia-400 font-bold">18.000 ₺</span>
          </div>
        </div>

        <div class="glass-card rounded-2xl overflow-hidden">
          <div class="h-64 bg-gradient-to-t from-black via-indigo-950/60 to-indigo-900/40 p-4 flex flex-col justify-end">
            <span class="px-2 py-0.5 rounded bg-indigo-500 text-black font-bold text-[10px] w-fit font-mono mb-2">RUNWAY 03</span>
            <h4 class="font-royal text-lg font-bold text-white">Stilist Takım Blazer</h4>
          </div>
          <div class="p-4 flex items-center justify-between border-t border-white/5">
            <span class="text-xs text-gray-400">Yün Gabardin Kumaş</span>
            <span class="font-mono text-indigo-400 font-bold">14.000 ₺</span>
          </div>
        </div>
      </div>
    </div>
    """
)

# ==========================================
# 6. butik-linen (10.000 TL)
# ==========================================
save(
    "butik-linen",
    "Minimalist Linen & Natural Silk",
    "10.000 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">DOĞAL TOPRAK TONLARI & NEFES ALAN DOKULAR</span>
      <h1 class="text-5xl sm:text-7xl font-serif font-light text-white mt-6 mb-4 tracking-tight">PURE.<span class="text-emerald-400">LINEN</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">Yaz ve bahar ayları için %100 saf keten ve ipek giysiler. Sade, zamansız ve sürdürülebilir gardırop.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
        <div class="glass-card p-6 rounded-2xl">
          <span class="text-xs font-mono text-emerald-400">Keten Koleksiyonu</span>
          <h4 class="text-xl font-bold text-white mt-1">Gevşek Kesim Keten Gömlek</h4>
          <p class="text-xs text-gray-400 mt-2">Fransız keteni, sedef düğmeler, kum beji ve adaçayı yeşili seçenekleri.</p>
          <div class="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
            <span class="font-mono text-lg font-bold text-emerald-400">2.400 ₺</span>
            <a href="https://wa.me/905521234567?text=Keten%20Gomlek%20Siparisi" class="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">WhatsApp Sipariş</a>
          </div>
        </div>

        <div class="glass-card p-6 rounded-2xl">
          <span class="text-xs font-mono text-emerald-400">İpek Koleksiyonu</span>
          <h4 class="text-xl font-bold text-white mt-1">Doğal İpek Kimono & Şal</h4>
          <p class="text-xs text-gray-400 mt-2">Bursa ipeği, bitkisel kök boya ile renklendirilmiş zanaat eseri.</p>
          <div class="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
            <span class="font-mono text-lg font-bold text-emerald-400">4.200 ₺</span>
            <a href="https://wa.me/905521234567?text=Ipek%20Kimono%20Siparisi" class="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">WhatsApp Sipariş</a>
          </div>
        </div>
      </div>
    </div>
    """
)

# ==========================================
# 7. butik-velvet (24.000 TL)
# ==========================================
save(
    "butik-velvet",
    "Velvet & Diamond Eveningwear VIP",
    "24.000 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">ÖZEL DİKİM & NİŞANTAŞI ATÖLYESİ</span>
      <h1 class="text-5xl sm:text-7xl font-royal font-black text-white mt-6 mb-4">VELVET.<span class="text-rose-400">ATELIER</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">Gala geceleri, düğün ve kırmızı halı davetleri için vücut ölçülerinize özel dikilen el işçiliği lüks abiyeler.</p>

      <div class="glass-card p-8 rounded-2xl max-w-xl mx-auto text-left border-rose-500/30 mb-12">
        <h3 class="font-royal text-lg font-bold text-white mb-2">Özel Prova Randevusu</h3>
        <p class="text-xs text-gray-400 mb-6">Atölyemizde baş terzimiz eşliğinde kumaş seçimi ve kişiye özel prova.</p>
        <div class="space-y-3 mb-6">
          <input type="text" placeholder="Adınız ve Soyadınız" class="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white">
          <input type="text" placeholder="Telefon Numaranız" class="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white">
        </div>
        <a href="https://wa.me/905521234567?text=Velvet%20Ozel%20Prova%20Randevusu" target="_blank" class="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-600 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center">
          Randevu Talebi Gönder →
        </a>
      </div>
    </div>
    """
)

# ==========================================
# 8. tech-gaming (18.000 TL)
# ==========================================
save(
    "tech-gaming",
    "Neon Cyber Gaming & Gear Hub",
    "18.000 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">ESPORTS & MEKANİK EKİPMAN DÜNYASI</span>
      <h1 class="text-5xl sm:text-7xl font-mono font-black text-white mt-6 mb-4 tracking-tighter">CYBER.<span class="text-cyan-400">GEAR</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">Mekanik klavyeler, 8K Hz oyuncu fareleri, 3D sesli kulaklıklar ve canlı switch ses test modülü.</p>

      <!-- Mechanical Switch Sound Tester -->
      <div class="glass-card rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-16 text-left border-cyan-500/30">
        <h3 class="font-mono text-sm font-bold text-cyan-300 mb-1">🔊 Canlı Switch Ses Testi</h3>
        <p class="text-xs text-gray-400 mb-4">Satın almadan önce mekanik tuşun tıkırtısını dinleyin:</p>
        <div class="grid grid-cols-3 gap-3">
          <button onclick="playSwitch(800)" class="p-3 rounded-xl bg-blue-500/20 border border-blue-400/40 text-xs font-mono text-blue-300 text-center hover:bg-blue-500/30">
            Blue Switch (Clicky)
          </button>
          <button onclick="playSwitch(400)" class="p-3 rounded-xl bg-red-500/20 border border-red-400/40 text-xs font-mono text-red-300 text-center hover:bg-red-500/30">
            Red Switch (Linear)
          </button>
          <button onclick="playSwitch(600)" class="p-3 rounded-xl bg-amber-500/20 border border-amber-400/40 text-xs font-mono text-amber-300 text-center hover:bg-amber-500/30">
            Brown (Tactile)
          </button>
        </div>
      </div>

      <!-- Gaming Gear Showcase -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
        <div class="glass-card p-6 rounded-2xl">
          <span class="text-xs font-mono text-cyan-400">8000 Hz Polling Rate</span>
          <h4 class="text-lg font-bold text-white mt-1">Titan 3D Ultra Hafif Fare</h4>
          <p class="text-xs text-gray-400 mt-2">49 gram karbon fiber gövde, optik anahtarlar ve sıfır gecikme.</p>
          <span class="block mt-4 font-mono text-cyan-400 font-bold text-base">3.490 ₺</span>
        </div>
        <div class="glass-card p-6 rounded-2xl">
          <span class="text-xs font-mono text-cyan-400">7.1 Spatial Audio</span>
          <h4 class="text-lg font-bold text-white mt-1">Apex Pro Kablosuz Kulaklık</h4>
          <p class="text-xs text-gray-400 mt-2">50mm titanyum sürücüler, gürültü engelleyici yayıncı mikrofonu.</p>
          <span class="block mt-4 font-mono text-cyan-400 font-bold text-base">5.800 ₺</span>
        </div>
      </div>
    </div>
    """,
    """
    function playSwitch(freq) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } catch(e){}
    }
    """
)

# ==========================================
# 9. tech-apple (10.000 TL)
# ==========================================
save(
    "tech-apple",
    "Cupertino Clean Apple Reseller",
    "10.000 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-gray-300 text-xs font-mono">ORİJİNAL GARANTİLİ APPLE & AKSESUAR</span>
      <h1 class="text-5xl sm:text-7xl font-sans font-light text-white mt-6 mb-4 tracking-tight">TITANIUM.<span class="text-stone-400">PRO</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">En yeni iPhone, MacBook ve Watch modelleri. Eski cihazınızı getirin, anında takas indirimi kazanın.</p>

      <!-- Trade-In Calculator -->
      <div class="glass-card rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-16 text-left">
        <h3 class="font-bold text-white text-base mb-2">Eski Cihazını Değiştir (Takas)</h3>
        <p class="text-xs text-gray-400 mb-4">Mevcut telefonunuzu seçin, tahmini indirim tutarınızı görün:</p>
        <select onchange="updateTradeIn(this.value)" class="w-full p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-white mb-4">
          <option value="18000">iPhone 13 Pro (128GB) — 18.000 ₺ Değerinde</option>
          <option value="26000">iPhone 14 Pro (128GB) — 26.000 ₺ Değerinde</option>
          <option value="34000">iPhone 15 Pro (128GB) — 34.000 ₺ Değerinde</option>
        </select>
        <div class="p-4 rounded-xl bg-white/5 flex items-center justify-between">
          <span class="text-xs text-gray-300">Yeni iPhone 16 Pro için Ödeyeceğiniz:</span>
          <span id="trade-result" class="font-mono text-lg font-bold text-emerald-400">46.999 ₺</span>
        </div>
      </div>
    </div>
    """,
    """
    function updateTradeIn(val) {
      const base = 64999;
      const finalPrice = base - parseInt(val);
      document.getElementById('trade-result').innerText = finalPrice.toLocaleString('tr-TR') + ' ₺';
    }
    """
)

# ==========================================
# 10. tech-smarthome (22.000 TL)
# ==========================================
save(
    "tech-smarthome",
    "Smart Home & IoT Interactive Dome",
    "22.000 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono">3D AKILLI YAŞAM & OTOMASYON</span>
      <h1 class="text-5xl sm:text-7xl font-sans font-black text-white mt-6 mb-4">SMART.<span class="text-blue-400">DOME</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">Işıklar, perde motorları, iklimlendirme ve güvenlik kameralarını tek merkezden yöneten sistemler.</p>

      <!-- Interactive 3D Room Lighting Toggle -->
      <div class="glass-card rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-16 text-left border-blue-500/30">
        <h3 class="font-bold text-white text-base mb-4">Daire Işık ve Güvenlik Simülatörü</h3>
        <div class="grid grid-cols-2 gap-3 mb-4">
          <button onclick="toggleLight(this, 'salon')" class="p-4 rounded-xl bg-blue-500/20 border border-blue-400/40 text-xs font-mono text-left">
            <span class="font-bold text-white block">Salon Aydınlatması</span>
            <span class="text-blue-300 text-[11px] status-text">Açık (%100 Günışığı)</span>
          </button>
          <button onclick="toggleLight(this, 'sinema')" class="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-left">
            <span class="font-bold text-white block">Sinema Modu</span>
            <span class="text-gray-400 text-[11px] status-text">Kapalı</span>
          </button>
        </div>
      </div>
    </div>
    """,
    """
    function toggleLight(btn, room) {
      const st = btn.querySelector('.status-text');
      if (st.innerText === 'Kapalı') {
        st.innerText = 'Açık (%80)';
        btn.classList.add('bg-blue-500/20', 'border-blue-400/40');
      } else {
        st.innerText = 'Kapalı';
        btn.classList.remove('bg-blue-500/20', 'border-blue-400/40');
      }
    }
    """
)

# ==========================================
# 11. tech-repair (8.500 TL)
# ==========================================
save(
    "tech-repair",
    "Pro Phone Repair & Service Lab",
    "8.500 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">30 DAKİKADA EKRAN VE PİL DEĞİŞİMİ</span>
      <h1 class="text-5xl sm:text-7xl font-sans font-bold text-white mt-6 mb-4">PRO.<span class="text-indigo-400">FIX</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">Orijinal yedek parça, 6 ay koşulsuz garanti ve motorlu kurye ile kapınızdan alıp kapınıza teslim.</p>

      <!-- Diagnostic Repair Calculator -->
      <div class="glass-card rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-16 text-left border-indigo-500/30">
        <h3 class="font-bold text-white text-base mb-4">Hızlı Tamir Fiyatı Hesapla</h3>
        <label class="block text-xs text-gray-400 mb-1">Cihaz Modeli:</label>
        <select id="dev-model" onchange="calcRepair()" class="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white mb-3">
          <option value="1000">iPhone 11 / 12</option>
          <option value="1800">iPhone 13 / 14</option>
          <option value="2900">iPhone 15 / 16 Pro</option>
        </select>
        <label class="block text-xs text-gray-400 mb-1">Arıza Türü:</label>
        <select id="dev-issue" onchange="calcRepair()" class="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white mb-6">
          <option value="1.0">Orijinal Ekran Değişimi</option>
          <option value="0.5">Batarya (Pil Sağlığı %100)</option>
          <option value="0.7">Kamera Lensi & Arka Cam</option>
        </select>
        <div class="p-4 rounded-xl bg-white/5 flex items-center justify-between">
          <span class="text-xs text-gray-300">Tahmini Tamir Bedeli:</span>
          <span id="repair-cost" class="font-mono text-xl font-bold text-indigo-400">1.800 ₺</span>
        </div>
      </div>
    </div>
    """,
    """
    function calcRepair() {
      const m = parseFloat(document.getElementById('dev-model').value);
      const i = parseFloat(document.getElementById('dev-issue').value);
      const total = Math.round(m * i + 800);
      document.getElementById('repair-cost').innerText = total.toLocaleString('tr-TR') + ' ₺';
    }
    """
)

# ==========================================
# 12. resto-bosphorus (26.000 TL)
# ==========================================
save(
    "resto-bosphorus",
    "Bosphorus Rooftop Dining & Sunset",
    "26.000 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono">BOĞAZ MANZARALI GURME DENEYİM</span>
      <h1 class="text-5xl sm:text-7xl font-serif font-black text-white mt-6 mb-4">BOSPHORUS.<span class="text-sky-400">ROOFTOP</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">Ortaköy ve Boğaziçi Köprüsü ayaklarınızın altında. Michelin ödüllü şef tadım menüsü ve günbatımı masaları.</p>

      <!-- Table Reservation Visualizer -->
      <div class="glass-card rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-16 text-left border-sky-500/30">
        <h3 class="font-serif text-lg font-bold text-white mb-2">Boğaz Manzaralı Masa Seçin</h3>
        <p class="text-xs text-gray-400 mb-6">Özel gün, yıldönümü ve iş yemekleri için ön masa rezervasyonu.</p>
        <div class="grid grid-cols-2 gap-3 mb-6">
          <div class="p-3.5 rounded-xl bg-sky-500/20 border border-sky-400/40 text-xs">
            <span class="font-bold text-sky-300 block">Deniz Kenarı Ön Masa</span>
            <span class="text-gray-400 text-[11px]">Köprü manzaralı 2 kişilik</span>
          </div>
          <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <span class="font-bold text-white block">VIP Pergola Bahçe</span>
            <span class="text-gray-400 text-[11px]">Grup & Aile (8 kişiye kadar)</span>
          </div>
        </div>
        <a href="https://wa.me/905521234567?text=Bosphorus%20Masa%20Rezervasyonu" target="_blank" class="w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center">
          Masayı Ayırın →
        </a>
      </div>
    </div>
    """
)

# ==========================================
# 13. resto-steak (18.000 TL)
# ==========================================
save(
    "resto-steak",
    "Fire & Wood Ottoman Steakhouse",
    "18.000 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">28 GÜN DİNLENDİRİLMİŞ DRY-AGED ET</span>
      <h1 class="text-5xl sm:text-7xl font-sans font-black text-white mt-6 mb-4">FIRE & WOOD.<span class="text-red-500">STEAK</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">Meşe kömüründe pişen Tomahawk, Dallas Steak ve tereyağlı lokum bonfileler.</p>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
        <div class="glass-card p-6 rounded-2xl">
          <span class="text-2xl mb-2 block">🥩</span>
          <h4 class="font-bold text-white text-lg">Tomahawk Steak</h4>
          <p class="text-xs text-gray-400 mt-1">Kemikli antrikot, kaya tuzu ve biberiye tereyağı ile alevde sunum.</p>
          <span class="block mt-4 font-mono text-red-400 font-bold">1.250 ₺</span>
        </div>
        <div class="glass-card p-6 rounded-2xl">
          <span class="text-2xl mb-2 block">🔥</span>
          <h4 class="font-bold text-white text-lg">Tereyağlı Lokum Bonfile</h4>
          <p class="text-xs text-gray-400 mt-1">Sıcak bakır tavada masanızda cızırdayan taze dana bonfile dilimleri.</p>
          <span class="block mt-4 font-mono text-red-400 font-bold">780 ₺</span>
        </div>
        <div class="glass-card p-6 rounded-2xl">
          <span class="text-2xl mb-2 block">🍔</span>
          <h4 class="font-bold text-white text-lg">Truffle Wagyu Burger</h4>
          <p class="text-xs text-gray-400 mt-1">200g Wagyu köfte, trüflü mayonez, füme kaburga ve çıtır patates.</p>
          <span class="block mt-4 font-mono text-red-400 font-bold">450 ₺</span>
        </div>
      </div>
    </div>
    """
)

# ==========================================
# 14. resto-tokyo (15.000 TL)
# ==========================================
save(
    "resto-tokyo",
    "Tokyo Street 3D Sushi & Ramen Bar",
    "15.000 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">GİON & SHİBUYA SOKAK LEZZETLERİ</span>
      <h1 class="text-5xl sm:text-7xl font-mono font-black text-white mt-6 mb-4 tracking-tight">TOKYO.<span class="text-rose-400">RAMEN</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">12 saat kaynatılmış yoğun Tonkotsu et suyu, el yapımı taze erişte ve taze Norveç somonlu sushiler.</p>

      <!-- Build Your Own Ramen Box -->
      <div class="glass-card rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-16 text-left border-rose-500/30">
        <h3 class="font-bold text-white text-base mb-2">🍜 Kendi Ramen Kliğini Oluştur</h3>
        <p class="text-xs text-gray-400 mb-4">Et suyunu, acı seviyesini ve ek malzemelerini seç:</p>
        <div class="space-y-3 mb-6">
          <select class="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white">
            <option>Zengin Tonkotsu (Yoğun Kemik Suyu)</option>
            <option>Miso & Soya Soslu Hafif Çorba</option>
            <option>Baharatlı Kara Miso (Ekstra Acı)</option>
          </select>
          <div class="flex gap-2">
            <span class="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300">+ Chashu Dana</span>
            <span class="px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-400/40 text-xs text-rose-300 font-bold">+ Marine Yumurta (Ajitsuke)</span>
          </div>
        </div>
        <div class="flex items-center justify-between pt-4 border-t border-white/5">
          <span class="text-xs text-gray-400">Kase Toplamı:</span>
          <span class="font-mono text-xl font-bold text-rose-400">420 ₺</span>
        </div>
      </div>
    </div>
    """
)

# ==========================================
# 15. resto-pasta (12.000 TL)
# ==========================================
save(
    "resto-pasta",
    "Artisan Truffle & Handmade Pasta Atelier",
    "12.000 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">HER SABAH AÇILAN TAZE İTALYAN MAKARNALARI</span>
      <h1 class="text-5xl sm:text-7xl font-serif font-black text-white mt-6 mb-4">PASTA.<span class="text-amber-400">ATELIER</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">İtalyan semolina unu ve taze köy yumurtasıyla açılan tagliatelle, ravioli ve siyah trüf mantarlı gnocchi.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
        <div class="glass-card p-6 rounded-2xl">
          <span class="text-xs font-mono text-amber-400">İmza Tabak</span>
          <h4 class="text-lg font-bold text-white mt-1">Siyah Trüflü Tagliolini</h4>
          <p class="text-xs text-gray-400 mt-2">Piemonte siyah trüf mantarı, 24 ay dinlendirilmiş Parmesan tekeri ve köy tereyağı.</p>
          <span class="block mt-4 font-mono text-amber-400 font-bold text-base">540 ₺</span>
        </div>
        <div class="glass-card p-6 rounded-2xl">
          <span class="text-xs font-mono text-amber-400">Klasik Lezzet</span>
          <h4 class="text-lg font-bold text-white mt-1">Ricotta & Ispanaklı Ravioli</h4>
          <p class="text-xs text-gray-400 mt-2">Adaçayı tereyağı sosu, kavrulmuş çam fıstığı ve taze çekilmiş muskat rendesi.</p>
          <span class="block mt-4 font-mono text-amber-400 font-bold text-base">460 ₺</span>
        </div>
      </div>
    </div>
    """
)

# ==========================================
# 16. resto-seafood (22.000 TL)
# ==========================================
save(
    "resto-seafood",
    "Aegean Waterfront Seafood & Meze",
    "22.000 ₺",
    """
    <div class="max-w-5xl mx-auto px-4 py-16 text-center">
      <span class="px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono">EGE SAHİLLERİNDEN GÜNLÜK TAZE BALIKLAR</span>
      <h1 class="text-5xl sm:text-7xl font-serif font-black text-white mt-6 mb-4">AEGEAN.<span class="text-teal-400">SEAFOOD</span></h1>
      <p class="text-gray-400 max-w-xl mx-auto text-sm sm:text-base mb-12">Günün taze balık tezgahı, zeytinyağlı meze tepsisi ve deniz kenarında günbatımı masaları.</p>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
        <div class="glass-card p-5 rounded-2xl">
          <span class="text-3xl mb-2 block">🐟</span>
          <h4 class="font-bold text-white text-base">Tuzda Kaya Levreği</h4>
          <p class="text-xs text-gray-400 mt-1">Alevli tuz kabuğunda kendi buharında pişen sulu Ege levreği.</p>
          <span class="font-mono text-teal-400 font-bold block mt-3">950 ₺</span>
        </div>
        <div class="glass-card p-5 rounded-2xl">
          <span class="text-3xl mb-2 block">🐙</span>
          <h4 class="font-bold text-white text-base">Izgara Ahtapot Bacağı</h4>
          <p class="text-xs text-gray-400 mt-1">Fava yatağında zeytinyağı ve kekik sosuyla meşe ızgarada karamelize.</p>
          <span class="font-mono text-teal-400 font-bold block mt-3">680 ₺</span>
        </div>
        <div class="glass-card p-5 rounded-2xl">
          <span class="text-3xl mb-2 block">🥗</span>
          <h4 class="font-bold text-white text-base">Geleneksel 8'li Meze Tepsisi</h4>
          <p class="text-xs text-gray-400 mt-1">Girit ezmesi, atom, haydari, deniz börülcesi, lakerda ve ahtapot salatası.</p>
          <span class="font-mono text-teal-400 font-bold block mt-3">720 ₺</span>
        </div>
      </div>
    </div>
    """
)

print("All 16 templates generated successfully!")
