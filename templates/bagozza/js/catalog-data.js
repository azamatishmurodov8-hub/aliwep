/**
 * BAGOZZA Milano & Istanbul — Official 60-Item Curated Luxury Menswear Catalog
 * 20 Bespoke Suits • 20 Tailored Trousers • 20 Italian Leather Shoes
 */
window.BAGOZZA_DEFAULT_CATALOG = (function () {
  const SUIT_SIZES = ['46', '48', '50', '52', '54', '56'];
  const SHOE_SIZES = ['40', '41', '42', '43', '44', '45'];

  const PALETTES = {
    formal: [
      { hex: '#121316', tr: 'Gece Siyahı', en: 'Midnight Black' },
      { hex: '#1a2744', tr: 'Kraliyet Laciverti', en: 'Royal Navy' },
      { hex: '#3d4047', tr: 'Antrasit Gri', en: 'Charcoal Grey' },
      { hex: '#f3efe6', tr: 'Fildişi Beyaz', en: 'Ivory White' },
      { hex: '#521b2c', tr: 'Bordo Kadife', en: 'Burgundy Velvet' }
    ],
    classic: [
      { hex: '#1a2744', tr: 'Lacivert', en: 'Navy Blue' },
      { hex: '#4b4e54', tr: 'Füme Gri', en: 'Slate Grey' },
      { hex: '#c8b69b', tr: 'Kum Beji', en: 'Sand Beige' },
      { hex: '#3d2c24', tr: 'Çikolata Kahve', en: 'Chocolate Brown' },
      { hex: '#121316', tr: 'Siyah', en: 'Jet Black' }
    ],
    resort: [
      { hex: '#c8b69b', tr: 'Şampanya Bej', en: 'Champagne Beige' },
      { hex: '#9ca8b8', tr: 'Buz Mavisi', en: 'Ice Blue' },
      { hex: '#f7f5f0', tr: 'Saf Beyaz', en: 'Pure White' },
      { hex: '#5b664f', tr: 'Zeytin Yeşili', en: 'Olive Green' },
      { hex: '#7a252e', tr: 'Bordo', en: 'Bordeaux' }
    ],
    leather: [
      { hex: '#141416', tr: 'Siyah Dana Derisi', en: 'Black Calfskin' },
      { hex: '#4a2b18', tr: 'Espresso Kahve', en: 'Espresso Brown' },
      { hex: '#9b5826', tr: 'Konyak Taba', en: 'Cognac Tan' },
      { hex: '#5c1f24', tr: 'Bordo Patina', en: 'Oxblood Patina' },
      { hex: '#1e2c45', tr: 'Gece Mavisi', en: 'Midnight Patina' }
    ]
  };

  const SUITS_RAW = [
    ['MILANO BLACK-TIE', 'Saten Şal Yaka Smokin', 'Satin Shawl Lapel Tuxedo', 49500, 42000, 'Gece Siyahı', 'Midnight Black', 'formal', 'athletic', 'tuxedo', '%100 Super 150s İtalyan Yünü & Saf İpek Saten Yaka', '100% Super 150s Italian Wool & Pure Silk Satin Lapel'],
    ['IVORY GALA', 'Kruvaze Beyaz Smokin', 'Ivory Double-Breasted Tuxedo', 48000, 41500, 'Fildişi Beyaz', 'Ivory White', 'formal', 'classic', 'ivory', '%100 Loro Piana İnce Yün & Siyah Saten Papyon Uyumu', '100% Loro Piana Fine Wool & Formal Gala Cut'],
    ['NAPOLI ROYAL', 'Yelekli 3 Parça Lacivert Takım', 'Royal Navy 3-Piece Bespoke Suit', 44000, 37800, 'Kraliyet Laciverti', 'Royal Navy', 'classic', 'athletic', 'navy', '%100 Super 160s Saf Yün, El Dikimi Napoli Omuz', '100% Super 160s Pure Wool, Hand-Stitched Neapolitan Shoulder'],
    ['FIRENZE SAND', 'Kum Beji 3 Parça Takım', 'Sand Beige 3-Piece Suit', 42500, 36200, 'Kum Beji', 'Sand Beige', 'resort', 'classic', 'ivory', '%85 İtalyan Yünü, %15 Kaşmir, Yelekli Tam Kalıp', '85% Italian Wool, 15% Cashmere, 3-Piece Tailored Fit'],
    ['ROMA PINSTRIPE', 'Çizgili Lacivert İş Takımı', 'Chalk-Stripe Navy Executive Suit', 41000, 34900, 'Çizgili Lacivert', 'Pinstripe Navy', 'classic', 'athletic', 'pinstripe', '%100 Cerruti 1881 Çizgili Saf Yün, Tam Astar', '100% Cerruti 1881 Chalk-Stripe Wool, Full Silk Lining'],
    ['VENEZIA ESPRESSO', 'Çikolata Kahve İtalyan Takım', 'Espresso Brown Sartorial Suit', 39500, 33500, 'Çikolata Kahve', 'Espresso Brown', 'classic', 'comfort', 'charcoal', '%100 Merinos Yünü, Yumuşak Omuzlu Modern Kalıp', '100% Merino Wool, Soft-Shoulder Contemporary Cut'],
    ['COMO WHITE GALA', 'Beyaz Siyah Klapa Smokin', 'White Contrast-Lapel Tuxedo', 47000, 39900, 'Saf Beyaz', 'Pure White', 'formal', 'classic', 'ivory', '%100 Saf Yün & Kontrast Siyah İpek Şal Yaka', '100% Virgin Wool & Contrast Black Silk Shawl Lapel'],
    ['TORINO ANTHRACITE', 'Antrasit Kruvaze Takım', 'Anthracite Double-Breasted Suit', 41500, 35400, 'Antrasit Gri', 'Anthracite Grey', 'classic', 'comfort', 'charcoal', '%100 Super 150s Flanel Yün, Altı Düğme Kruvaze', '100% Super 150s Flannel Wool, Six-Button Double-Breasted'],
    ['BOLOGNA VELVET', 'Mor Kadife Özel Smokin', 'Royal Purple Velvet Tuxedo', 52000, 44500, 'Kraliyet Moru', 'Royal Purple Velvet', 'formal', 'athletic', 'burgundy', '%100 İtalyan İpek Kadife, Saten Klapa El İşçiliği', '100% Italian Silk Velvet, Hand-Finished Satin Lapel'],
    ['PALERMO PEARL', 'Açık Gri Yazlık Takım', 'Pearl Grey Summer Tailored Suit', 36000, 30800, 'İnci Grisi', 'Pearl Grey', 'resort', 'classic', 'charcoal', '%70 Serin Yün, %30 İpek — Nefes Alan Yaz Dokusu', '70% Cool Wool, 30% Silk — Breathable Summer Weave'],
    ['VERONA BEIGE', 'Bej Çizgili Kruvaze Takım', 'Beige Chalk-Stripe Double-Breasted', 40500, 34500, 'Bej Çizgili', 'Beige Pinstripe', 'resort', 'classic', 'ivory', '%80 Yün, %20 Keten — Milano Şehir Zarafeti', '80% Wool, 20% Linen — Milanese Urban Elegance'],
    ['SIENA OLIVE', 'Zeytin Yeşili 3 Parça Takım', 'Olive Green 3-Piece Tailored Suit', 43000, 36900, 'Zeytin Yeşili', 'Olive Green', 'resort', 'comfort', 'charcoal', '%100 Super 140s Saf Yün, Özel Dikim Yelekli', '100% Super 140s Pure Wool, Bespoke Waistcoat Included'],
    ['PORTOFINO SKY', 'Buz Mavisi İtalyan Blazer Takım', 'Ice Blue Italian Blazer Set', 34500, 29400, 'Buz Mavisi', 'Ice Blue', 'resort', 'classic', 'navy', '%60 Keten, %40 İpek — Akdeniz Lüks Duruşu', '60% Linen, 40% Silk — Mediterranean Luxury Drape'],
    ['CAPRI CORAL', 'Mercan Yazlık Gala Takımı', 'Coral Summer Editorial Suit', 35500, 30200, 'Mercan', 'Soft Coral', 'resort', 'classic', 'burgundy', '%100 İnce İtalyan Keten-Yün Karışımı, Hafif Astar', '100% Fine Italian Linen-Wool Blend, Half-Lined'],
    ['AMALFI NOIR', 'Siyah Kruvaze Damatlık', 'Jet Black Double-Breasted Gala', 48500, 41900, 'Siyah', 'Jet Black', 'formal', 'athletic', 'tuxedo', '%100 Super 160s Barathea Yünü & Saten Detaylar', '100% Super 160s Barathea Wool & Satin Accents'],
    ['BRERA CASHMERE', 'Vizon Saf Kaşmir Palto & Takım', 'Camel Cashmere Overcoat & Suit', 54000, 46500, 'Vizon Kaşmir', 'Camel Cashmere', 'classic', 'comfort', 'ivory', '%100 Saf İtalyan Kaşmir Kumaş, El Dikişli Yaka', '100% Pure Italian Cashmere, Hand-Pick Stitched'],
    ['MONTENAPOLEONE', 'Ekose Gri Kruvaze Takım', 'Glen Plaid Grey Double-Breasted', 42000, 35800, 'Ekose Gri', 'Glen Plaid Grey', 'classic', 'comfort', 'pinstripe', '%100 İngiliz-İtalyan Ekose Saf Yün, Geniş Klapa', '100% Heritage Glen Plaid Pure Wool, Wide Peak Lapel'],
    ['NAVIGLI BORDEAUX', 'Bordo İtalyan Blazer Kombin', 'Bordeaux Italian Tailored Blazer', 33000, 27900, 'Bordo', 'Bordeaux Red', 'resort', 'athletic', 'burgundy', '%75 Yün, %25 İpek — Sedef Düğmeli Tek Ceket', '75% Wool, 25% Silk — Mother-of-Pearl Button Blazer'],
    ['CORTINA JET', 'Koyu Lacivert Seyahat Takımı', 'Midnight Navy Travel Bespoke Suit', 41000, 34800, 'Gece Laciverti', 'Midnight Navy', 'classic', 'athletic', 'navy', '%100 Kırışmaz High-Twist İtalyan Yünü', '100% Crease-Resistant High-Twist Italian Wool'],
    ['SAN MARCO TAUPE', 'Vizon 3 Parça Klasik Takım', 'Taupe 3-Piece Heritage Suit', 43500, 37200, 'Vizon Gri', 'Warm Taupe', 'classic', 'comfort', 'charcoal', '%100 Super 150s Yün, İpek Astarlı Klasik Kalıp', '100% Super 150s Wool, Silk-Lined Classic Fit']
  ];

  const TROUSERS_RAW = [
    ['NOIR SATIN SMOKIN', 'Saten Şeritli Smokin Pantolonu', 'Satin-Stripe Tuxedo Trousers', 13500, 11400, 'Gece Siyahı', 'Midnight Black', 'formal', 'classic', '%100 Barathea Yün & Yan İpek Saten Şerit', '100% Barathea Wool & Side Silk Satin Galon'],
    ['FIRENZE PLEATED', 'Kum Beji Pileli Yün Pantolon', 'Sand Beige Pleated Wool Trousers', 10800, 9200, 'Kum Beji', 'Sand Beige', 'resort', 'classic', '%100 İnce İtalyan Merinos Yünü, Çift Pile', '100% Fine Italian Merino Wool, Double Pleated'],
    ['NAPOLI MIDNIGHT', 'Gece Laciverti Slim Fit Pantolon', 'Midnight Navy Slim Tailored Trousers', 10200, 8650, 'Gece Laciverti', 'Midnight Navy', 'classic', 'athletic', '%100 Super 140s Yün, Modern Daralan Paça', '100% Super 140s Wool, Modern Tapered Leg'],
    ['RIVIERA PEARL', 'İnci Grisi Yazlık Keten Pantolon', 'Pearl Grey Summer Linen Trousers', 9400, 7950, 'İnci Grisi', 'Pearl Grey', 'resort', 'classic', '%70 İtalyan Keten, %30 Koton — Ferah Kesim', '70% Italian Linen, 30% Cotton — Crisp Drape'],
    ['CAPRI WHITE', 'Saf Beyaz Riviera Pantolon', 'Pure White Riviera Tailored Pants', 9600, 8150, 'Saf Beyaz', 'Pure White', 'resort', 'classic', '%98 Organik Koton, %2 Elastan, Tam Kalıp', '98% Organic Cotton, 2% Elastane, Tailored Fit'],
    ['MILANO SUPER 150', 'Antrasit Klasik Yün Pantolon', 'Anthracite Super 150s Classic Trousers', 11500, 9800, 'Antrasit', 'Anthracite', 'classic', 'comfort', '%100 Super 150s Saf Yün, Comfort Bel Yapısı', '100% Super 150s Pure Wool, Comfort Waistband'],
    ['VENEZIA ESPRESSO', 'Espresso Kahve Flanel Pantolon', 'Espresso Brown Flannel Trousers', 11200, 9450, 'Espresso Kahve', 'Espresso Brown', 'classic', 'comfort', '%100 Kışlık Yumuşak İtalyan Flanel Yünü', '100% Brushed Winter Italian Wool Flannel'],
    ['TORINO SLATE', 'Füme Gri İtalyan Kesim Pantolon', 'Slate Grey Italian Cut Trousers', 10400, 8800, 'Füme Gri', 'Slate Grey', 'classic', 'athletic', '%100 Serin Yün, Keskin Ütü Çizgili', '100% Cool Wool, Sharp Permanent Crease'],
    ['VERONA STRIPE', 'Vizon Çizgili Tailored Pantolon', 'Taupe Pinstripe Tailored Trousers', 11000, 9350, 'Vizon Çizgili', 'Taupe Pinstripe', 'resort', 'classic', '%85 Yün, %15 İpek — İnce Çizgi Dokusu', '85% Wool, 15% Silk — Fine Chalk Stripe'],
    ['COMO IVORY', 'Fildişi Koton Gabardin Pantolon', 'Ivory Cotton Gabardine Trousers', 9200, 7800, 'Fildişi', 'Ivory Cream', 'resort', 'classic', '%100 Yüksek Yoğunluklu İtalyan Gabardin', '100% High-Density Italian Cotton Gabardine'],
    ['ROMA CHALK', 'Lacivert İnce Çizgili Pantolon', 'Navy Pinstripe Executive Trousers', 11400, 9650, 'Çizgili Lacivert', 'Navy Pinstripe', 'classic', 'athletic', '%100 Cerruti Saf Yün, Yan Ayarlı Bel Tokası', '100% Cerruti Pure Wool, Side Tab Adjusters'],
    ['PORTOFINO SAND', 'Şampanya Bej Slim Pantolon', 'Champagne Beige Slim Trousers', 9800, 8300, 'Şampanya Bej', 'Champagne Beige', 'resort', 'classic', '%80 Yün, %20 Keten — Dört Mevsim Zarafet', '80% Wool, 20% Linen — Four-Season Tailoring'],
    ['BOLOGNA BORDEAUX', 'Bordo Kışlık Flanel Pantolon', 'Bordeaux Winter Flannel Trousers', 10900, 9250, 'Bordo', 'Bordeaux', 'resort', 'athletic', '%100 Saf Yün Flanel, İtalyan Cep Detayı', '100% Pure Wool Flannel, Slanted Pocket Cut'],
    ['TOSCANA COGNAC', 'Konyak Taba Koton Chino', 'Cognac Tan Luxury Cotton Chinos', 8600, 7250, 'Konyak Taba', 'Cognac Tan', 'resort', 'comfort', '%97 Pima Koton, %3 Esnek Dokuma', '97% Pima Cotton, 3% Comfort Stretch'],
    ['CORTINA TRAVEL', 'Koyu Lacivert Esnek Seyahat Pantolonu', 'Dark Navy Stretch Travel Trousers', 10500, 8900, 'Koyu Lacivert', 'Dark Navy', 'classic', 'comfort', '%100 High-Twist Kırışmaz Yün, Gün Boyu Konfor', '100% High-Twist Crease-Free Wool, All-Day Ease'],
    ['SIENA KHAKI', 'Haki Bej Pileli İtalyan Pantolon', 'Khaki Beige Pleated Trousers', 9900, 8400, 'Haki Bej', 'Khaki Beige', 'resort', 'comfort', '%100 Nefes Alan İtalyan Koton Twill', '100% Breathable Italian Cotton Twill'],
    ['AMALFI ROYAL', 'Kraliyet Mavisi İtalyan Pantolon', 'Royal Blue Tailored Trousers', 10600, 8950, 'Kraliyet Mavisi', 'Royal Blue', 'classic', 'athletic', '%100 Super 130s Saf Yün, Parlak Tuşe', '100% Super 130s Pure Wool, Lustrous Finish'],
    ['BRERA CHARCOAL', 'Kömür Grisi Kaşmir Karışımlı Pantolon', 'Charcoal Cashmere-Blend Trousers', 12800, 10900, 'Kömür Grisi', 'Charcoal Grey', 'classic', 'comfort', '%90 Saf Yün, %10 Kaşmir — Ekstra Yumuşak', '90% Pure Wool, 10% Cashmere — Ultra Soft'],
    ['PALERMO TOBACCO', 'Tütün Kahve Comfort Chino', 'Tobacco Brown Comfort Chinos', 8800, 7450, 'Tütün Kahve', 'Tobacco Brown', 'resort', 'comfort', '%98 İtalyan Koton, Rahat Beden Kesimi', '98% Italian Cotton, Relaxed Comfort Cut'],
    ['NAVIGLI GRAPHITE', 'Grafit Modern Slim Pantolon', 'Graphite Modern Slim Trousers', 9900, 8350, 'Grafit', 'Graphite', 'classic', 'athletic', '%100 Super 140s Yün, Minimalist Bel Bandı', '100% Super 140s Wool, Minimalist Waistband']
  ];

  const SHOES_RAW = [
    ['BAGOZZA OPERA', 'Siyah Rugan & Dana Püsküllü Loafer', 'Black Calf & Patent Tassel Loafer', 16500, 13900, 'Siyah Rugan', 'Black Patent', 'leather', 'classic', '%100 İtalyan Dana Derisi, El Dikişli Kösele Taban', '100% Italian Calfskin, Hand-Stitched Leather Sole'],
    ['BAGOZZA SUEDE', 'Siyah Süet Püsküllü Loafer', 'Black Suede Italian Tassel Loafer', 15800, 13400, 'Siyah Süet', 'Black Suede', 'leather', 'classic', '%100 İtalyan Süet, Yumuşak Deri Astar', '100% Italian Suede, Supple Calfskin Lining'],
    ['MILANO WHOLECUT', 'Siyah Tek Parça Klasik Oxford', 'Jet Black Wholecut Formal Oxford', 18500, 15900, 'Siyah', 'Jet Black', 'leather', 'athletic', 'Tek Parça İtalyan Dana Derisi, Blake Dikim', 'Single-Piece Italian Calfskin, Blake Construction'],
    ['NAPOLI BROGUE', 'Koyu Kahve İşlemeli Oxford', 'Dark Brown Wingtip Brogue Oxford', 17200, 14600, 'Koyu Kahve', 'Dark Espresso', 'leather', 'comfort', 'El Boyaması Patina Dana Derisi & Tam Kösele', 'Hand-Burnished Patina Calfskin & Full Leather Sole'],
    ['FIRENZE CAP-TOE', 'Konyak Klasik Cap-Toe Oxford', 'Cognac Classic Cap-Toe Oxford', 16900, 14200, 'Konyak Taba', 'Cognac Chestnut', 'leather', 'classic', '%100 Toskana Derisi, Goodyear Çift Dikiş', '100% Tuscan Calf Leather, Goodyear Welted'],
    ['ROMA SUEDE DERBY', 'Çikolata Süet Klasik Derby', 'Chocolate Suede Classic Derby', 14900, 12600, 'Çikolata Süet', 'Chocolate Suede', 'leather', 'comfort', 'Su İtici İtalyan Süet & Hafif Kösele Taban', 'Water-Repellent Italian Suede & Light Sole'],
    ['COMO PATENT GALA', 'Siyah Rugan Damatlık Oxford', 'Black Patent Formal Tuxedo Oxford', 18900, 16200, 'Siyah Rugan', 'Mirror Patent Black', 'leather', 'classic', 'Ayna Parlaklığında İtalyan Rugan, İpek Bağcık', 'Mirror-Shine Italian Patent Leather, Silk Laces'],
    ['VENEZIA TAN', 'Taba İtalyan Wholecut Derby', 'Honey Tan Italian Wholecut Derby', 16200, 13800, 'Bal Taba', 'Honey Tan', 'leather', 'classic', 'Doğal Bitkisel Tabaklanmış İtalyan Derisi', 'Vegetable-Tanned Full-Grain Italian Leather'],
    ['BOLOGNA OXBLOOD', 'Bordo Patina El Yapımı Derby', 'Oxblood Hand-Patina Luxury Derby', 17800, 15100, 'Bordo Patina', 'Oxblood Burgundy', 'leather', 'athletic', 'Usta El Boyaması Bordo Patina & Tam Kösele', 'Master Hand-Painted Patina & Leather Sole'],
    ['PORTOFINO PENNY', 'Konyak İtalyan Penny Loafer', 'Cognac Italian Penny Loafer', 15200, 12900, 'Konyak', 'Cognac Leather', 'leather', 'classic', 'Esnek El Yapımı Mokasen Kalıbı, Deri Astar', 'Supple Handcrafted Moc Construction, Calf Lined'],
    ['AMALFI NOIR LOAFER', 'Siyah Dana Derisi Penny Loafer', 'Black Calfskin Penny Loafer', 15500, 13200, 'Siyah', 'Jet Black Calf', 'leather', 'classic', '%100 Parlak Dana Derisi, Dört Mevsim Şıklık', '100% Polished Calfskin, Four-Season Versatility'],
    ['TORINO MAHOGANY', 'Maun Kahve El Yapımı Loafer', 'Mahogany Handcrafted Penny Loafer', 15900, 13500, 'Maun Kahve', 'Mahogany Brown', 'leather', 'comfort', 'Geniş Kalıp Konforlu İç Taban & İtalyan Deri', 'Comfort-Last Leather Insole & Italian Calf'],
    ['CAPRI VENETIAN', 'Kestane Venedik Mokasen', 'Chestnut Venetian Slip-On Loafer', 14200, 11900, 'Kestane', 'Chestnut Brown', 'leather', 'comfort', 'Ultra Hafif Günlük & Ofis Kullanımı', 'Ultra-Light Everyday & Executive Slip-On'],
    ['SICILIA INTRECCIO', 'Örgü Deri İtalyan Loafer', 'Woven Leather Italian Loafer', 16400, 13900, 'Konyak Örgü', 'Woven Cognac', 'leather', 'classic', 'El Örmesi İtalyan Derisi, Yazlık Nefes Alan Yapı', 'Hand-Woven Italian Calfskin, Breathable Craft'],
    ['VERONA WINGTIP', 'Ceviz Patina Wingtip Oxford', 'Walnut Patina Wingtip Oxford', 17600, 14900, 'Ceviz Patina', 'Walnut Patina', 'leather', 'athletic', 'Geleneksel İtalyan Delikli Brogue İşçiliği', 'Traditional Italian Medallion Brogue Craft'],
    ['TAORMINA SAND', 'Kum Süet Püsküllü Loafer', 'Sand Suede Italian Tassel Loafer', 14800, 12400, 'Kum Süet', 'Sand Suede', 'leather', 'classic', 'Yumuşak Süet, Keten Takımlar İçin İdeal', 'Velvety Suede, Ideal Pairing for Linen Suits'],
    ['SAN MARCO TASSEL', 'Siyah Deri Püsküllü Loafer', 'Black Calfskin Tassel Loafer', 15900, 13500, 'Siyah Deri', 'Black Calfskin', 'leather', 'classic', 'Çift Püsküllü Klasik Milano Formu', 'Double-Tassel Classic Milanese Silhouette'],
    ['BRERA MONK STRAP', 'Antrasit Çift Tokalı Monk Strap', 'Charcoal Double Monk Strap Shoe', 18200, 15500, 'Antrasit', 'Charcoal Leather', 'leather', 'athletic', 'Fırçalanmış Metal Çift Toka & Kösele Taban', 'Brushed Metal Double Buckles & Leather Sole'],
    ['CORTINA BOOT', 'Espresso Deri Klasik Kış Botu', 'Espresso Leather Dress Boot', 19500, 16800, 'Espresso', 'Espresso Calf', 'leather', 'comfort', 'Kışlık Takım Elbiseler İçin Zarif Deri Bot', 'Refined Dress Boot Tailored for Winter Suits'],
    ['POSITANO MIDNIGHT', 'Gece Mavisi Patina Oxford', 'Midnight Blue Hand-Patina Oxford', 18400, 15700, 'Gece Mavisi', 'Midnight Blue Patina', 'leather', 'athletic', 'Özel Seri El Boyaması Gece Mavisi Patina', 'Limited Edition Hand-Painted Midnight Patina']
  ];

  const items = [];

  SUITS_RAW.forEach((s, i) => {
    const num = String(i + 1).padStart(2, '0');
    items.push({
      id: `suit_${num}`,
      category: 'suits',
      name: s[0],
      subtitle_tr: s[1],
      subtitle_en: s[2],
      oldPrice: s[3],
      price: s[4],
      colorName_tr: s[5],
      colorName_en: s[6],
      colors: PALETTES[s[7]],
      sizes: [...SUIT_SIZES],
      bodyType: s[8],
      preset3d: s[9],
      fabric_tr: s[10],
      fabric_en: s[11],
      imgCard: `assets/suits/suit_${num}_card.jpg`,
      imgModel: `assets/suits/suit_${num}_model.jpg`,
      imgAlt: `assets/suits/suit_${num}_alt.jpg`
    });
  });

  TROUSERS_RAW.forEach((t, i) => {
    const num = String(i + 1).padStart(2, '0');
    items.push({
      id: `tr_${num}`,
      category: 'trousers',
      name: t[0],
      subtitle_tr: t[1],
      subtitle_en: t[2],
      oldPrice: t[3],
      price: t[4],
      colorName_tr: t[5],
      colorName_en: t[6],
      colors: PALETTES[t[7]],
      sizes: [...SUIT_SIZES],
      bodyType: t[8],
      preset3d: null,
      fabric_tr: t[9],
      fabric_en: t[10],
      imgCard: `assets/trousers/tr_${num}_card.jpg`,
      imgModel: `assets/trousers/tr_${num}_model.jpg`,
      imgAlt: `assets/trousers/tr_${num}_model.jpg`
    });
  });

  SHOES_RAW.forEach((sh, i) => {
    const num = String(i + 1).padStart(2, '0');
    items.push({
      id: `sh_${num}`,
      category: 'shoes',
      name: sh[0],
      subtitle_tr: sh[1],
      subtitle_en: sh[2],
      oldPrice: sh[3],
      price: sh[4],
      colorName_tr: sh[5],
      colorName_en: sh[6],
      colors: PALETTES[sh[7]],
      sizes: [...SHOE_SIZES],
      bodyType: sh[8],
      preset3d: null,
      fabric_tr: sh[9],
      fabric_en: sh[10],
      imgCard: `assets/shoes/sh_${num}_card.jpg`,
      imgModel: `assets/shoes/sh_${num}_model.jpg`,
      imgAlt: `assets/shoes/sh_${num}_card.jpg`
    });
  });

  return items;
})();
