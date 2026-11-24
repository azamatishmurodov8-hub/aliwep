/**
 * BAGOZZA 3D Atelier — Museum-Grade Real-Time Three.js WebGL Bespoke Suit
 * Continuous sculptural curved sleeves, Savile Row torso silhouette, satin/velvet lapels,
 * seamless trouser drape, polished Italian Oxfords on a tiered Carrara marble pedestal
 * inside a sunlit Milanese Galleria archway.
 */
window.BagozzaSuit3D = (function () {
  const PRESETS = {
    tuxedo: {
      id: 'tuxedo',
      name_tr: 'Milano Black-Tie Smokin',
      name_en: 'Milano Black-Tie Tuxedo',
      price: 42000,
      jacket: 0x0d0e12,
      trouser: 0x0b0c10,
      lapel: 0x060709,
      sheen: 0x1c1e26,
      lapelGloss: true,
      stripe: false,
      doubleBreasted: false,
      bowTie: true,
      tieColor: 0x09090c,
      pocketSquare: 0xffffff,
      shoeColor: 0x070709,
      shoeGloss: 0.95,
      fabric_tr: '%100 Super 160s Barathea Yünü & İpek Saten Klapa',
      fabric_en: '100% Super 160s Barathea Wool & Silk Satin Lapel'
    },
    navy: {
      id: 'navy',
      name_tr: 'Napoli Royal Navy Takım',
      name_en: 'Napoli Royal Navy Suit',
      price: 37800,
      jacket: 0x142038,
      trouser: 0x121d33,
      lapel: 0x142038,
      sheen: 0x263b63,
      lapelGloss: false,
      stripe: false,
      doubleBreasted: false,
      bowTie: false,
      tieColor: 0x6b1826,
      pocketSquare: 0xf7f5f0,
      shoeColor: 0x3b2013,
      shoeGloss: 0.72,
      fabric_tr: '%100 Super 150s Loro Piana Lacivert Saf Yün',
      fabric_en: '100% Super 150s Loro Piana Royal Navy Wool'
    },
    ivory: {
      id: 'ivory',
      name_tr: 'Ivory Gala Kruvaze Smokin',
      name_en: 'Ivory Gala Double-Breasted Tuxedo',
      price: 41500,
      jacket: 0xf0ebe0,
      trouser: 0x0d0e12,
      lapel: 0xf7f3ea,
      sheen: 0xffffff,
      lapelGloss: true,
      stripe: false,
      doubleBreasted: true,
      bowTie: true,
      tieColor: 0x0a0a0d,
      pocketSquare: 0x0a0a0d,
      shoeColor: 0x08080a,
      shoeGloss: 0.95,
      fabric_tr: '%100 Fildişi İnce İtalyan Yünü & Siyah Smokin Pantolonu',
      fabric_en: '100% Ivory Fine Italian Wool & Jet Black Tuxedo Trousers'
    },
    pinstripe: {
      id: 'pinstripe',
      name_tr: 'Roma Çizgili Kruvaze Takım',
      name_en: 'Roma Chalk-Stripe Double-Breasted',
      price: 34900,
      jacket: 0x152238,
      trouser: 0x142034,
      lapel: 0x152238,
      sheen: 0x283e63,
      lapelGloss: false,
      stripe: true,
      doubleBreasted: true,
      bowTie: false,
      tieColor: 0x5c1a24,
      pocketSquare: 0xffffff,
      shoeColor: 0x181311,
      shoeGloss: 0.78,
      fabric_tr: '%100 Cerruti 1881 İnce Çizgili Saf İtalyan Yünü',
      fabric_en: '100% Cerruti 1881 Chalk-Stripe Pure Wool'
    },
    charcoal: {
      id: 'charcoal',
      name_tr: 'Torino Antrasit Flanel Takım',
      name_en: 'Torino Anthracite Flannel Suit',
      price: 35400,
      jacket: 0x2c2f34,
      trouser: 0x272a2f,
      lapel: 0x2c2f34,
      sheen: 0x454952,
      lapelGloss: false,
      stripe: false,
      doubleBreasted: false,
      bowTie: false,
      tieColor: 0x162238,
      pocketSquare: 0xf2f0eb,
      shoeColor: 0x261710,
      shoeGloss: 0.7,
      fabric_tr: '%100 İtalyan Antrasit Flanel Yünü, El Dikimi',
      fabric_en: '100% Italian Anthracite Flannel Wool, Hand-Finished'
    },
    burgundy: {
      id: 'burgundy',
      name_tr: 'Bologna Bordo Kadife Smokin',
      name_en: 'Bologna Velvet Gala Tuxedo',
      price: 44500,
      jacket: 0x451122,
      trouser: 0x0c0d11,
      lapel: 0x07080a,
      sheen: 0x7c2540,
      lapelGloss: true,
      stripe: false,
      doubleBreasted: false,
      bowTie: true,
      tieColor: 0x08080b,
      pocketSquare: 0xf5efe6,
      shoeColor: 0x08080a,
      shoeGloss: 0.95,
      fabric_tr: '%100 İtalyan İpek Kadife & Kontrast Siyah Saten Klapa',
      fabric_en: '100% Italian Silk Velvet & Contrast Black Satin Lapel'
    }
  };

  const BODY_SCALES = {
    athletic: { torsoX: 1.075, torsoZ: 1.04, legX: 1.03 },
    classic:  { torsoX: 1.00,  torsoZ: 1.00, legX: 1.00 },
    comfort:  { torsoX: 1.135, torsoZ: 1.16, legX: 1.09 }
  };

  let container = null;
  let renderer, scene, camera;
  let suitPivot, upperBodyGroup, lowerBodyGroup;
  let jacketMat, trouserMat, lapelMat, tieMat, pocketMat, shoeMat;
  let necktieGroup, bowtieGroup, singleBtnsGroup, doubleBtnsGroup, frontSeamMesh;
  let dustParticles;
  let woolTex, stripeTex;

  let currentPreset = 'tuxedo';
  let currentBody = 'classic';
  let autoRotate = true;
  let targetRotY = 0.28;
  let currentRotY = 0.28;
  let targetRotX = 0.04;
  let currentRotX = 0.04;
  let targetCamZ = 5.55;
  let currentCamZ = 5.55;
  let targetBodyScale = { ...BODY_SCALES.classic };
  let currentBodyScale = { ...BODY_SCALES.classic };

  let isDragging = false;
  let prevX = 0, prevY = 0;
  let isVisible = true;

  function makeWoolTexture(pinstripe = false) {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const g = c.getContext('2d');
    g.fillStyle = '#e8e8e8';
    g.fillRect(0, 0, 256, 256);

    // Fine Italian diagonal Super 150s twill weave
    g.strokeStyle = 'rgba(0,0,0,0.08)';
    g.lineWidth = 1;
    for (let i = -256; i < 512; i += 4) {
      g.beginPath();
      g.moveTo(i, 0);
      g.lineTo(i + 256, 256);
      g.stroke();
    }
    for (let y = 0; y < 256; y += 3) {
      g.fillStyle = y % 6 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
      g.fillRect(0, y, 256, 1);
    }

    if (pinstripe) {
      for (let x = 8; x < 256; x += 22) {
        g.fillStyle = 'rgba(255,255,255,0.58)';
        g.fillRect(x, 0, 1.8, 256);
      }
    }

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(5, 5);
    return tex;
  }

  function makeMarbleTexture() {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const g = c.getContext('2d');
    g.fillStyle = '#f8f7f3';
    g.fillRect(0, 0, 512, 512);

    // Subtle Carrara marble veining
    for (let i = 0; i < 22; i++) {
      g.beginPath();
      let x = Math.random() * 512;
      let y = Math.random() * 512;
      g.moveTo(x, y);
      for (let s = 0; s < 9; s++) {
        x += (Math.random() - 0.35) * 85;
        y += (Math.random() - 0.35) * 85;
        g.lineTo(x, y);
      }
      g.strokeStyle = i % 4 === 0 ? 'rgba(181, 148, 91, 0.22)' : 'rgba(110, 112, 118, 0.13)';
      g.lineWidth = Math.random() * 2.4 + 0.6;
      g.stroke();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  function buildGalleryStage() {
    const stageGroup = new THREE.Group();
    const marbleTex = makeMarbleTexture();

    const marbleMat = new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.24,
      metalness: 0.04
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc9a86a,
      roughness: 0.20,
      metalness: 0.90
    });

    const plasterMat = new THREE.MeshStandardMaterial({
      color: 0xf4f2ec,
      roughness: 0.90,
      metalness: 0.0
    });

    // Multi-tiered Carrara Marble Pedestal
    const topPlinth = new THREE.Mesh(new THREE.CylinderGeometry(1.12, 1.18, 0.18, 64), marbleMat);
    topPlinth.position.y = -1.68;
    topPlinth.receiveShadow = true;
    topPlinth.castShadow = true;
    stageGroup.add(topPlinth);

    const basePlinth = new THREE.Mesh(new THREE.CylinderGeometry(1.38, 1.46, 0.20, 64), marbleMat);
    basePlinth.position.y = -1.87;
    basePlinth.receiveShadow = true;
    stageGroup.add(basePlinth);

    // Brushed Champagne Gold Trim Rings
    const ringTop = new THREE.Mesh(new THREE.TorusGeometry(1.13, 0.016, 16, 80), goldMat);
    ringTop.rotation.x = Math.PI / 2;
    ringTop.position.y = -1.595;
    stageGroup.add(ringTop);

    const ringBot = new THREE.Mesh(new THREE.TorusGeometry(1.39, 0.014, 16, 80), goldMat);
    ringBot.rotation.x = Math.PI / 2;
    ringBot.position.y = -1.775;
    stageGroup.add(ringBot);

    // Bright Gallery Floor receiving studio shadows
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(15, 64),
      new THREE.MeshStandardMaterial({ color: 0xf3f2ee, roughness: 0.78, metalness: 0.02 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.97;
    floor.receiveShadow = true;
    stageGroup.add(floor);

    // Minimalist Milanese Galleria Arch Alcove & Fluted Columns
    const archWall = new THREE.Mesh(
      new THREE.CylinderGeometry(4.6, 4.6, 6.8, 48, 1, true, Math.PI * 0.72, Math.PI * 0.56),
      new THREE.MeshStandardMaterial({ color: 0xf7f6f1, roughness: 0.92, side: THREE.BackSide })
    );
    archWall.position.set(0, 0.9, 0.5);
    stageGroup.add(archWall);

    [-2.15, 2.15].forEach((xPos) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 5.4, 24), plasterMat);
      col.position.set(xPos, 0.5, -2.35);
      col.receiveShadow = true;
      stageGroup.add(col);

      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.15, 0.12, 24), goldMat);
      cap.position.set(xPos, 3.15, -2.35);
      stageGroup.add(cap);
    });

    // Architectural Brass Arch Halo behind mannequin
    const halo = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.014, 16, 96, Math.PI), goldMat);
    halo.position.set(0, 0.85, -2.28);
    stageGroup.add(halo);

    // Floating delicate golden studio motes
    const moteCount = 46;
    const positions = new Float32Array(moteCount * 3);
    for (let i = 0; i < moteCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4.8;
      positions[i * 3 + 1] = Math.random() * 3.8 - 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3.2;
    }
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    dustParticles = new THREE.Points(moteGeo, new THREE.PointsMaterial({
      color: 0xc9a86a,
      size: 0.03,
      transparent: true,
      opacity: 0.45
    }));
    stageGroup.add(dustParticles);

    scene.add(stageGroup);
  }

  function buildSculptedSuit() {
    suitPivot = new THREE.Group();
    upperBodyGroup = new THREE.Group();
    lowerBodyGroup = new THREE.Group();
    suitPivot.add(upperBodyGroup);
    suitPivot.add(lowerBodyGroup);

    woolTex = makeWoolTexture(false);
    stripeTex = makeWoolTexture(true);

    jacketMat = new THREE.MeshPhysicalMaterial({
      color: 0x0d0e12,
      map: woolTex,
      bumpMap: woolTex,
      bumpScale: 0.008,
      roughness: 0.74,
      metalness: 0.03,
      sheen: 0.55,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color(0x1c1e26)
    });

    trouserMat = new THREE.MeshPhysicalMaterial({
      color: 0x0b0c10,
      map: woolTex,
      bumpMap: woolTex,
      bumpScale: 0.007,
      roughness: 0.78,
      metalness: 0.02,
      sheen: 0.4,
      sheenRoughness: 0.55,
      sheenColor: new THREE.Color(0x191b22)
    });

    lapelMat = new THREE.MeshPhysicalMaterial({
      color: 0x060709,
      roughness: 0.16,
      metalness: 0.14,
      clearcoat: 0.85,
      clearcoatRoughness: 0.14
    });

    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0xfefefe,
      roughness: 0.52,
      metalness: 0.01
    });

    tieMat = new THREE.MeshPhysicalMaterial({
      color: 0x09090c,
      roughness: 0.22,
      metalness: 0.12,
      clearcoat: 0.6
    });

    pocketMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.45
    });

    shoeMat = new THREE.MeshPhysicalMaterial({
      color: 0x070709,
      roughness: 0.14,
      metalness: 0.10,
      clearcoat: 0.95,
      clearcoatRoughness: 0.10
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc9a86a,
      roughness: 0.22,
      metalness: 0.90
    });

    const walnutMat = new THREE.MeshStandardMaterial({
      color: 0x2c1b12,
      roughness: 0.30,
      metalness: 0.08
    });

    const buttonMat = new THREE.MeshStandardMaterial({
      color: 0x16161a,
      roughness: 0.22,
      metalness: 0.4
    });

    // 1. ANATOMICALLY SCULPTED TAILORED JACKET TORSO (Lower skirt gracefully drapes over trouser waist)
    const torsoPts = [
      new THREE.Vector2(0.01, -0.44),
      new THREE.Vector2(0.415, -0.43), // longer Savile Row tailored jacket hem covering pelvis cleanly
      new THREE.Vector2(0.395, -0.22), // hip drape
      new THREE.Vector2(0.335, 0.06),  // sculpted natural Italian waist suppression
      new THREE.Vector2(0.385, 0.34),  // ribcage
      new THREE.Vector2(0.455, 0.64),  // full structured chest
      new THREE.Vector2(0.495, 0.86),  // structured Italian shoulder line
      new THREE.Vector2(0.355, 0.97),  // trapezius slope
      new THREE.Vector2(0.175, 1.01),  // collar base
      new THREE.Vector2(0.01, 1.02)
    ];
    const torsoGeo = new THREE.LatheGeometry(torsoPts, 52);
    const torsoMesh = new THREE.Mesh(torsoGeo, jacketMat);
    torsoMesh.scale.set(1.06, 1.0, 0.62);
    torsoMesh.position.y = 0.28;
    torsoMesh.castShadow = true;
    torsoMesh.receiveShadow = true;
    upperBodyGroup.add(torsoMesh);

    // Subtle Center Front Closure Seam & Rear Double-Vent Lines (authentic when rotated 180°)
    const seamMat = new THREE.MeshStandardMaterial({ color: 0x050507, roughness: 0.9 });
    frontSeamMesh = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.54, 0.012), seamMat);
    frontSeamMesh.position.set(0, 0.12, 0.258);
    upperBodyGroup.add(frontSeamMesh);

    [-0.145, 0.145].forEach((vx) => {
      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.36, 0.018), seamMat);
      vent.position.set(vx, 0.04, -0.252);
      upperBodyGroup.add(vent);
    });

    // 2. CRISP EGYPTIAN COTTON DRESS SHIRT V-PLASTRON & SPREAD COLLAR
    const shirtShape = new THREE.Shape();
    shirtShape.moveTo(0, 0.45);
    shirtShape.lineTo(0.175, 1.24);
    shirtShape.lineTo(-0.175, 1.24);
    shirtShape.closePath();

    const shirtV = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shirtShape, { depth: 0.042, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.01, bevelSegments: 4 }),
      shirtMat
    );
    shirtV.position.set(0, 0.0, 0.236);
    shirtV.rotation.x = -0.04;
    upperBodyGroup.add(shirtV);

    const collarMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.162, 0.178, 0.14, 36), shirtMat);
    collarMesh.scale.set(1.0, 1.0, 0.88);
    collarMesh.position.y = 1.30;
    collarMesh.castShadow = true;
    upperBodyGroup.add(collarMesh);

    const jacketCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.186, 0.20, 0.115, 36, 1, true, Math.PI * 0.22, Math.PI * 1.56),
      lapelMat
    );
    jacketCollar.scale.set(1.0, 1.0, 0.88);
    jacketCollar.position.set(0, 1.285, -0.01);
    jacketCollar.rotation.y = Math.PI;
    upperBodyGroup.add(jacketCollar);

    // 3. SCULPTED 3D PEAK / SHAWL LAPELS
    function createLapel(side) {
      const s = new THREE.Shape();
      s.moveTo(0, 0.42);
      s.quadraticCurveTo(side * 0.068, 0.72, side * 0.155, 1.235);
      s.lineTo(side * 0.215, 1.185);
      s.quadraticCurveTo(side * 0.275, 0.94, side * 0.25, 0.84);
      s.quadraticCurveTo(side * 0.165, 0.64, side * 0.015, 0.40);
      s.closePath();

      const geo = new THREE.ExtrudeGeometry(s, {
        depth: 0.025,
        bevelEnabled: true,
        bevelThickness: 0.011,
        bevelSize: 0.011,
        bevelSegments: 4
      });
      const m = new THREE.Mesh(geo, lapelMat);
      m.position.set(0, 0.0, 0.270);
      m.rotation.y = -side * 0.16;
      m.rotation.x = -0.03;
      m.castShadow = true;
      return m;
    }
    upperBodyGroup.add(createLapel(1));
    upperBodyGroup.add(createLapel(-1));

    // 4. SILK NECKTIE & SATIN BOW-TIE (Switchable per preset)
    necktieGroup = new THREE.Group();
    const knot = new THREE.Mesh(new THREE.ConeGeometry(0.044, 0.085, 6), tieMat);
    knot.rotation.x = Math.PI;
    knot.scale.set(1.0, 1.0, 0.65);
    knot.position.set(0, 1.22, 0.278);
    necktieGroup.add(knot);

    const tieShape = new THREE.Shape();
    tieShape.moveTo(-0.024, 1.19);
    tieShape.lineTo(0.024, 1.19);
    tieShape.lineTo(0.056, 0.56);
    tieShape.lineTo(0, 0.45);
    tieShape.lineTo(-0.056, 0.56);
    tieShape.closePath();
    const tieBlade = new THREE.Mesh(
      new THREE.ExtrudeGeometry(tieShape, { depth: 0.016, bevelEnabled: true, bevelSize: 0.005, bevelThickness: 0.005 }),
      tieMat
    );
    tieBlade.position.set(0, 0, 0.274);
    tieBlade.rotation.x = -0.025;
    necktieGroup.add(tieBlade);
    upperBodyGroup.add(necktieGroup);

    bowtieGroup = new THREE.Group();
    const bowCenter = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.04, 0.028), tieMat);
    bowCenter.position.set(0, 1.23, 0.268);
    bowtieGroup.add(bowCenter);
    [-1, 1].forEach((side) => {
      const wing = new THREE.Mesh(new THREE.ConeGeometry(0.054, 0.11, 5), tieMat);
      wing.rotation.z = side * Math.PI / 2;
      wing.scale.set(1.0, 1.0, 0.45);
      wing.position.set(side * 0.057, 1.23, 0.264);
      bowtieGroup.add(wing);
    });
    upperBodyGroup.add(bowtieGroup);

    // 5. WELT BREAST POCKET + FOLDED SILK POCKET SQUARE
    const welt = new THREE.Mesh(new THREE.BoxGeometry(0.145, 0.018, 0.02), lapelMat);
    welt.position.set(0.245, 0.87, 0.270);
    welt.rotation.z = 0.09;
    welt.rotation.y = 0.34;
    upperBodyGroup.add(welt);

    const sqShape = new THREE.Shape();
    sqShape.moveTo(-0.054, 0);
    sqShape.lineTo(-0.022, 0.046);
    sqShape.lineTo(0.006, 0.026);
    sqShape.lineTo(0.036, 0.052);
    sqShape.lineTo(0.056, 0);
    sqShape.closePath();
    const pocketSq = new THREE.Mesh(
      new THREE.ExtrudeGeometry(sqShape, { depth: 0.008, bevelEnabled: false }),
      pocketMat
    );
    pocketSq.position.set(0.246, 0.875, 0.267);
    pocketSq.rotation.z = 0.09;
    pocketSq.rotation.y = 0.34;
    upperBodyGroup.add(pocketSq);

    [-1, 1].forEach((side) => {
      const flap = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.022), jacketMat);
      flap.position.set(side * 0.24, 0.17, 0.252);
      flap.rotation.y = side * 0.42;
      upperBodyGroup.add(flap);
    });

    // 6. FRONT BUTTONS (Single-Breasted 2-btn & Double-Breasted 6-btn)
    singleBtnsGroup = new THREE.Group();
    [0.37, 0.19].forEach((by) => {
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.021, 0.021, 0.014, 20), buttonMat);
      b.rotation.x = Math.PI / 2;
      b.position.set(0.01, by, 0.258);
      singleBtnsGroup.add(b);
    });
    upperBodyGroup.add(singleBtnsGroup);

    doubleBtnsGroup = new THREE.Group();
    [0.50, 0.34, 0.18].forEach((by) => {
      [-0.088, 0.088].forEach((bx) => {
        const b = new THREE.Mesh(new THREE.CylinderGeometry(0.021, 0.021, 0.014, 20), buttonMat);
        b.rotation.x = Math.PI / 2;
        b.position.set(bx, by, 0.260);
        doubleBtnsGroup.add(b);
      });
    });
    upperBodyGroup.add(doubleBtnsGroup);

    // 7. CONTINUOUS SEAMLESS CURVED TAILORED SLEEVES (Zero visible joint seams!)
    [-1, 1].forEach((side) => {
      const sleeveGroup = new THREE.Group();

      // Smooth organic sleeve curve from shoulder pad through subtle natural elbow bend to tapered wrist
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.45, 1.07, -0.01),
        new THREE.Vector3(side * 0.54, 0.82, -0.005),
        new THREE.Vector3(side * 0.57, 0.50, 0.015),
        new THREE.Vector3(side * 0.57, 0.22, 0.06),
        new THREE.Vector3(side * 0.56, 0.02, 0.095)
      ]);
      const tubeGeo = new THREE.TubeGeometry(curve, 36, 0.115, 24, false);
      // Taper tube radius cleanly from shoulder (1.15x) to cuff (0.72x)
      const posAttr = tubeGeo.attributes.position;
      const tmp = new THREE.Vector3();
      const center = new THREE.Vector3();
      for (let i = 0; i < posAttr.count; i++) {
        tmp.fromBufferAttribute(posAttr, i);
        const t = Math.max(0, Math.min(1, (1.07 - tmp.y) / 1.05));
        curve.getPoint(t, center);
        const scale = 1.18 - t * 0.44;
        tmp.sub(center).multiplyScalar(scale).add(center);
        posAttr.setXYZ(i, tmp.x, tmp.y, tmp.z);
      }
      tubeGeo.computeVertexNormals();

      const sleeveMesh = new THREE.Mesh(tubeGeo, jacketMat);
      sleeveMesh.castShadow = true;
      sleeveMesh.receiveShadow = true;
      sleeveGroup.add(sleeveMesh);

      // Smooth rounded shoulder head cap blended cleanly
      const shoulderCap = new THREE.Mesh(new THREE.SphereGeometry(0.134, 24, 24), jacketMat);
      shoulderCap.scale.set(1.0, 0.9, 0.94);
      shoulderCap.position.set(side * 0.455, 1.07, -0.01);
      shoulderCap.castShadow = true;
      sleeveGroup.add(shoulderCap);

      // Crisp White Shirt French Cuff peeking cleanly past jacket sleeve
      const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.076, 0.074, 0.065, 24), shirtMat);
      cuff.position.set(side * 0.56, -0.01, 0.102);
      cuff.rotation.x = -0.16;
      sleeveGroup.add(cuff);

      // 4 Kissing Surgeon's Cuff Buttons
      for (let bi = 0; bi < 4; bi++) {
        const cb = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.008, 14), buttonMat);
        cb.rotation.z = Math.PI / 2;
        cb.position.set(side * 0.642, 0.055 + bi * 0.026, 0.085 - bi * 0.004);
        sleeveGroup.add(cb);
      }

      upperBodyGroup.add(sleeveGroup);
    });

    // 8. SAVILE ROW BESPOKE NECK FINIAL (Walnut + Brushed Gold Crown)
    const neckBlock = new THREE.Mesh(new THREE.CylinderGeometry(0.142, 0.154, 0.13, 32), walnutMat);
    neckBlock.position.y = 1.395;
    neckBlock.castShadow = true;
    upperBodyGroup.add(neckBlock);

    const goldCollarRing = new THREE.Mesh(new THREE.TorusGeometry(0.145, 0.013, 16, 48), goldMat);
    goldCollarRing.rotation.x = Math.PI / 2;
    goldCollarRing.position.y = 1.46;
    upperBodyGroup.add(goldCollarRing);

    const finialStem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.052, 0.11, 24), goldMat);
    finialStem.position.y = 1.52;
    upperBodyGroup.add(finialStem);

    const finialOrb = new THREE.Mesh(new THREE.SphereGeometry(0.064, 28, 28), goldMat);
    finialOrb.position.y = 1.60;
    finialOrb.castShadow = true;
    upperBodyGroup.add(finialOrb);

    // 9. SEAMLESS TAILORED CREASED TROUSERS (No protruding cylinder seam!)
    const legPts = [
      new THREE.Vector2(0.01, -0.78),
      new THREE.Vector2(0.102, -0.77), // crisp tailored ankle hem
      new THREE.Vector2(0.118, -0.45), // calf
      new THREE.Vector2(0.135, -0.08), // knee
      new THREE.Vector2(0.172, 0.36),  // upper thigh
      new THREE.Vector2(0.195, 0.72),  // seamlessly tucked inside tailored jacket skirt!
      new THREE.Vector2(0.01, 0.74)
    ];
    const legGeo = new THREE.LatheGeometry(legPts, 36);

    [-1, 1].forEach((side) => {
      const leg = new THREE.Mesh(legGeo, trouserMat);
      leg.scale.set(0.96, 1.0, 1.08);
      leg.position.set(side * 0.172, -0.71, 0);
      leg.rotation.z = -side * 0.015;
      leg.castShadow = true;
      leg.receiveShadow = true;
      lowerBodyGroup.add(leg);

      // 10. POLISHED ITALIAN LEATHER OXFORD SHOES resting directly on Carrara Marble Plinth
      const shoeGroup = new THREE.Group();
      const vamp = new THREE.Mesh(new THREE.SphereGeometry(0.114, 26, 18), shoeMat);
      vamp.scale.set(0.82, 0.50, 1.98);
      vamp.position.set(0, 0.052, 0.095);
      vamp.castShadow = true;
      shoeGroup.add(vamp);

      const heel = new THREE.Mesh(new THREE.BoxGeometry(0.136, 0.048, 0.13), walnutMat);
      heel.position.set(0, 0.024, -0.055);
      shoeGroup.add(heel);

      const sole = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.022, 0.39), walnutMat);
      sole.position.set(0, 0.011, 0.085);
      shoeGroup.add(sole);

      shoeGroup.position.set(side * 0.192, -1.585, 0.02);
      shoeGroup.rotation.y = side * 0.15;
      lowerBodyGroup.add(shoeGroup);
    });

    suitPivot.position.y = 0.0;
    scene.add(suitPivot);
  }

  function applyPreset(presetId) {
    const p = PRESETS[presetId] || PRESETS.tuxedo;
    currentPreset = p.id;
    if (!jacketMat) return p;

    jacketMat.color.setHex(p.jacket);
    jacketMat.sheenColor.setHex(p.sheen);
    jacketMat.map = p.stripe ? stripeTex : woolTex;
    jacketMat.needsUpdate = true;

    trouserMat.color.setHex(p.trouser);
    trouserMat.sheenColor.setHex(p.sheen);
    trouserMat.map = p.stripe ? stripeTex : woolTex;
    trouserMat.needsUpdate = true;

    lapelMat.color.setHex(p.lapel);
    lapelMat.roughness = p.lapelGloss ? 0.15 : 0.68;
    lapelMat.clearcoat = p.lapelGloss ? 0.88 : 0.05;
    lapelMat.needsUpdate = true;

    tieMat.color.setHex(p.tieColor);
    pocketMat.color.setHex(p.pocketSquare);

    shoeMat.color.setHex(p.shoeColor);
    shoeMat.clearcoat = p.shoeGloss;
    shoeMat.needsUpdate = true;

    necktieGroup.visible = !p.bowTie;
    bowtieGroup.visible = p.bowTie;
    singleBtnsGroup.visible = !p.doubleBreasted;
    doubleBtnsGroup.visible = p.doubleBreasted;
    if (frontSeamMesh) frontSeamMesh.visible = !p.doubleBreasted;

    return p;
  }

  function setBodyType(bodyKey) {
    if (!BODY_SCALES[bodyKey]) return;
    currentBody = bodyKey;
    targetBodyScale = { ...BODY_SCALES[bodyKey] };
  }

  function setAngle(deg) {
    autoRotate = false;
    targetRotY = (deg * Math.PI) / 180;
    targetRotX = 0.04;
  }

  function toggleAutoRotate() {
    autoRotate = !autoRotate;
    return autoRotate;
  }

  function adjustZoom(delta) {
    targetCamZ = Math.max(3.4, Math.min(6.4, targetCamZ + delta));
  }

  function bindPointerEvents(el) {
    const onDown = (clientX, clientY) => {
      isDragging = true;
      autoRotate = false;
      prevX = clientX;
      prevY = clientY;
    };
    const onMove = (clientX, clientY) => {
      if (!isDragging) return;
      const dx = clientX - prevX;
      const dy = clientY - prevY;
      targetRotY += dx * 0.0115;
      targetRotX = Math.max(-0.22, Math.min(0.24, targetRotX + dy * 0.0045));
      prevX = clientX;
      prevY = clientY;
    };
    const onUp = () => { isDragging = false; };

    el.addEventListener('mousedown', (e) => onDown(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onUp);

    el.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) onDown(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    el.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
    el.addEventListener('touchend', onUp);
  }

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible || !renderer) return;

    if (autoRotate && !isDragging) {
      targetRotY += 0.0052;
    }

    currentRotY += (targetRotY - currentRotY) * 0.09;
    currentRotX += (targetRotX - currentRotX) * 0.09;
    currentCamZ += (targetCamZ - currentCamZ) * 0.08;

    currentBodyScale.torsoX += (targetBodyScale.torsoX - currentBodyScale.torsoX) * 0.08;
    currentBodyScale.torsoZ += (targetBodyScale.torsoZ - currentBodyScale.torsoZ) * 0.08;
    currentBodyScale.legX += (targetBodyScale.legX - currentBodyScale.legX) * 0.08;

    if (suitPivot) {
      suitPivot.rotation.y = currentRotY;
      suitPivot.rotation.x = currentRotX * 0.30;
      upperBodyGroup.scale.set(currentBodyScale.torsoX, 1, currentBodyScale.torsoZ);
      lowerBodyGroup.scale.set(currentBodyScale.legX, 1, currentBodyScale.torsoZ * 0.96);
    }

    if (dustParticles) {
      dustParticles.rotation.y += 0.0007;
    }

    camera.position.z = currentCamZ;
    camera.position.y = -0.05 + currentRotX * 0.6;
    camera.lookAt(0, -0.14, 0);

    renderer.render(scene, camera);
  }

  function init(elementId) {
    container = document.getElementById(elementId);
    if (!container || typeof THREE === 'undefined') return false;

    const w = container.clientWidth || 640;
    const h = container.clientHeight || 540;

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (_) {
      return false;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f4f0);
    scene.fog = new THREE.Fog(0xf5f4f0, 7.5, 16.5);

    camera = new THREE.PerspectiveCamera(36, w / h, 0.1, 40);
    camera.position.set(0, -0.05, currentCamZ);

    // Sculpted Architectural Studio Lighting (Balanced for deep blacks + luminous marble!)
    const hemi = new THREE.HemisphereLight(0xffffff, 0xdcd7cb, 0.72);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xfffdf8, 1.38);
    keyLight.position.set(3.4, 5.4, 4.4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xeef3ff, 0.42);
    fillLight.position.set(-4.0, 2.2, 2.2);
    scene.add(fillLight);

    const rimLight = new THREE.SpotLight(0xffe7c2, 1.35, 16, Math.PI / 3.2, 0.55);
    rimLight.position.set(-1.4, 4.8, -3.6);
    scene.add(rimLight);

    buildGalleryStage();
    buildSculptedSuit();
    applyPreset('tuxedo');
    bindPointerEvents(renderer.domElement);

    const handleResize = () => {
      if (!container || !renderer) return;
      const nw = container.clientWidth || 640;
      const nh = container.clientHeight || 540;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);
    if (window.ResizeObserver) {
      new ResizeObserver(handleResize).observe(container);
    }

    if (window.IntersectionObserver) {
      new IntersectionObserver((entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      }, { threshold: 0.05 }).observe(container);
    }

    animate();
    return true;
  }

  return {
    init,
    PRESETS,
    applyPreset,
    setBodyType,
    setAngle,
    toggleAutoRotate,
    adjustZoom,
    getActivePreset: () => PRESETS[currentPreset],
    getActiveBody: () => currentBody
  };
})();
