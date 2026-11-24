/**
 * BAGOZZA 3D Hero Centerpiece — Monumental Real-Time Three.js WebGL Bespoke Suit
 * Seamlessly rendered directly onto the pure-white architectural hero canvas (alpha: true),
 * with procedural Studio Softbox Environment reflections (PMREM), satin lapels, curved
 * seamless tailored sleeves, golden lapel pin, sculpted Italian Oxfords, and a luminous
 * gold-trimmed Carrara marble turntable pedestal.
 */
window.BagozzaSuit3D = (function () {
  const PRESETS = {
    tuxedo: {
      id: 'tuxedo',
      name_tr: 'Milano Black-Tie Smokin',
      name_en: 'Milano Black-Tie Tuxedo',
      price: 42000,
      jacket: 0x0b0c10,
      trouser: 0x090a0d,
      lapel: 0x050608,
      sheen: 0x252834,
      lapelGloss: true,
      stripe: false,
      doubleBreasted: false,
      bowTie: true,
      tieColor: 0x070709,
      pocketSquare: 0xffffff,
      shoeColor: 0x060608,
      shoeGloss: 0.98,
      fabric_tr: '%100 Super 160s Barathea Yünü & İpek Saten Klapa',
      fabric_en: '100% Super 160s Barathea Wool & Silk Satin Lapel'
    },
    navy: {
      id: 'navy',
      name_tr: 'Napoli Royal Navy Takım',
      name_en: 'Napoli Royal Navy Suit',
      price: 37800,
      jacket: 0x13203b,
      trouser: 0x111c34,
      lapel: 0x13203b,
      sheen: 0x2b4474,
      lapelGloss: false,
      stripe: false,
      doubleBreasted: false,
      bowTie: false,
      tieColor: 0x721928,
      pocketSquare: 0xf8f6f1,
      shoeColor: 0x3e2113,
      shoeGloss: 0.78,
      fabric_tr: '%100 Super 150s Loro Piana Lacivert Saf Yün',
      fabric_en: '100% Super 150s Loro Piana Royal Navy Wool'
    },
    ivory: {
      id: 'ivory',
      name_tr: 'Ivory Gala Kruvaze Smokin',
      name_en: 'Ivory Gala Double-Breasted Tuxedo',
      price: 41500,
      jacket: 0xf2ede3,
      trouser: 0x0b0c10,
      lapel: 0xf9f6ef,
      sheen: 0xffffff,
      lapelGloss: true,
      stripe: false,
      doubleBreasted: true,
      bowTie: true,
      tieColor: 0x08080b,
      pocketSquare: 0x08080b,
      shoeColor: 0x070709,
      shoeGloss: 0.98,
      fabric_tr: '%100 Fildişi İnce İtalyan Yünü & Siyah Smokin Pantolonu',
      fabric_en: '100% Ivory Fine Italian Wool & Jet Black Tuxedo Trousers'
    },
    pinstripe: {
      id: 'pinstripe',
      name_tr: 'Roma Çizgili Kruvaze Takım',
      name_en: 'Roma Chalk-Stripe Double-Breasted',
      price: 34900,
      jacket: 0x142138,
      trouser: 0x121d32,
      lapel: 0x142138,
      sheen: 0x2a416b,
      lapelGloss: false,
      stripe: true,
      doubleBreasted: true,
      bowTie: false,
      tieColor: 0x631926,
      pocketSquare: 0xffffff,
      shoeColor: 0x181311,
      shoeGloss: 0.82,
      fabric_tr: '%100 Cerruti 1881 İnce Çizgili Saf İtalyan Yünü',
      fabric_en: '100% Cerruti 1881 Chalk-Stripe Pure Wool'
    },
    charcoal: {
      id: 'charcoal',
      name_tr: 'Torino Antrasit Flanel Takım',
      name_en: 'Torino Anthracite Flannel Suit',
      price: 35400,
      jacket: 0x282b30,
      trouser: 0x23262b,
      lapel: 0x282b30,
      sheen: 0x454a54,
      lapelGloss: false,
      stripe: false,
      doubleBreasted: false,
      bowTie: false,
      tieColor: 0x15233c,
      pocketSquare: 0xf2f0eb,
      shoeColor: 0x28170f,
      shoeGloss: 0.74,
      fabric_tr: '%100 İtalyan Antrasit Flanel Yünü, El Dikimi',
      fabric_en: '100% Italian Anthracite Flannel Wool, Hand-Finished'
    },
    burgundy: {
      id: 'burgundy',
      name_tr: 'Bologna Bordo Kadife Smokin',
      name_en: 'Bologna Velvet Gala Tuxedo',
      price: 44500,
      jacket: 0x4a1124,
      trouser: 0x0b0c10,
      lapel: 0x060709,
      sheen: 0x8f294a,
      lapelGloss: true,
      stripe: false,
      doubleBreasted: false,
      bowTie: true,
      tieColor: 0x070709,
      pocketSquare: 0xf7f2ea,
      shoeColor: 0x070709,
      shoeGloss: 0.98,
      fabric_tr: '%100 İtalyan İpek Kadife & Kontrast Siyah Saten Klapa',
      fabric_en: '100% Italian Silk Velvet & Contrast Black Satin Lapel'
    }
  };

  const BODY_SCALES = {
    athletic: { torsoX: 1.08, torsoZ: 1.045, legX: 1.03 },
    classic:  { torsoX: 1.00, torsoZ: 1.00,  legX: 1.00 },
    comfort:  { torsoX: 1.14, torsoZ: 1.16,  legX: 1.09 }
  };

  let container = null;
  let renderer, scene, camera;
  let suitPivot, plinthGroup, upperBodyGroup, lowerBodyGroup;
  let jacketMat, trouserMat, lapelMat, tieMat, pocketMat, shoeMat;
  let necktieGroup, bowtieGroup, singleBtnsGroup, doubleBtnsGroup, frontSeamMesh;
  let dustParticles;
  let woolTex, stripeTex;

  let currentPreset = 'tuxedo';
  let currentBody = 'classic';
  let autoRotate = true;
  let targetRotY = 0.24;
  let currentRotY = 0.24;
  let targetRotX = 0.03;
  let currentRotX = 0.03;
  let targetCamZ = 5.48;
  let currentCamZ = 5.48;
  let targetBodyScale = { ...BODY_SCALES.classic };
  let currentBodyScale = { ...BODY_SCALES.classic };

  let isDragging = false;
  let prevX = 0, prevY = 0;
  let isVisible = true;
  let clockT = 0;

  function makeStudioEnvMap(ren) {
    try {
      const pmrem = new THREE.PMREMGenerator(ren);
      const envScene = new THREE.Scene();
      envScene.background = new THREE.Color(0xffffff);

      // Soft studio softbox light panels for glossy satin, gold & patent leather reflections
      const panels = [
        { pos: [4, 4, 4], scale: [6, 4, 0.2], color: 0xfffcf5 },
        { pos: [-5, 3, 2], scale: [5, 4, 0.2], color: 0xeef4ff },
        { pos: [0, 6, -3], scale: [7, 2, 0.2], color: 0xffeacc },
        { pos: [0, -3, 0], scale: [8, 0.2, 8], color: 0xd8d5ce }
      ];
      panels.forEach((p) => {
        const m = new THREE.Mesh(
          new THREE.BoxGeometry(p.scale[0], p.scale[1], p.scale[2]),
          new THREE.MeshBasicMaterial({ color: p.color })
        );
        m.position.set(p.pos[0], p.pos[1], p.pos[2]);
        envScene.add(m);
      });

      const rt = pmrem.fromScene(envScene, 0.04);
      pmrem.dispose();
      return rt.texture;
    } catch (_) {
      return null;
    }
  }

  function makeWoolTexture(pinstripe = false) {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const g = c.getContext('2d');
    g.fillStyle = '#e5e5e5';
    g.fillRect(0, 0, 256, 256);

    g.strokeStyle = 'rgba(0,0,0,0.09)';
    g.lineWidth = 1;
    for (let i = -256; i < 512; i += 4) {
      g.beginPath();
      g.moveTo(i, 0);
      g.lineTo(i + 256, 256);
      g.stroke();
    }
    for (let y = 0; y < 256; y += 3) {
      g.fillStyle = y % 6 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.045)';
      g.fillRect(0, y, 256, 1);
    }

    if (pinstripe) {
      for (let x = 8; x < 256; x += 22) {
        g.fillStyle = 'rgba(255,255,255,0.62)';
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
    g.fillStyle = '#fbfaf7';
    g.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 24; i++) {
      g.beginPath();
      let x = Math.random() * 512;
      let y = Math.random() * 512;
      g.moveTo(x, y);
      for (let s = 0; s < 9; s++) {
        x += (Math.random() - 0.35) * 85;
        y += (Math.random() - 0.35) * 85;
        g.lineTo(x, y);
      }
      g.strokeStyle = i % 4 === 0 ? 'rgba(181, 148, 91, 0.25)' : 'rgba(110, 112, 118, 0.14)';
      g.lineWidth = Math.random() * 2.4 + 0.6;
      g.stroke();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  function buildMarbleTurntable() {
    plinthGroup = new THREE.Group();
    const marbleTex = makeMarbleTexture();

    const marbleMat = new THREE.MeshStandardMaterial({
      map: marbleTex,
      roughness: 0.18,
      metalness: 0.05
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd0ae6e,
      roughness: 0.18,
      metalness: 0.94
    });

    // Sleek Architectural Carrara Marble Turntable Plinth
    const topPlinth = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 1.04, 0.14, 64), marbleMat);
    topPlinth.position.y = -1.66;
    topPlinth.receiveShadow = true;
    topPlinth.castShadow = true;
    plinthGroup.add(topPlinth);

    const basePlinth = new THREE.Mesh(new THREE.CylinderGeometry(1.22, 1.30, 0.15, 64), marbleMat);
    basePlinth.position.y = -1.81;
    basePlinth.receiveShadow = true;
    plinthGroup.add(basePlinth);

    // Gleaming Brushed Champagne Gold Trim Rings
    const ringTop = new THREE.Mesh(new THREE.TorusGeometry(0.99, 0.015, 16, 96), goldMat);
    ringTop.rotation.x = Math.PI / 2;
    ringTop.position.y = -1.59;
    plinthGroup.add(ringTop);

    const ringBot = new THREE.Mesh(new THREE.TorusGeometry(1.23, 0.013, 16, 96), goldMat);
    ringBot.rotation.x = Math.PI / 2;
    ringBot.position.y = -1.735;
    plinthGroup.add(ringBot);

    // Transparent Shadow-Only Ground Receiver Plane (so white Hero background blends 100% seamlessly!)
    const shadowFloor = new THREE.Mesh(
      new THREE.CircleGeometry(4.5, 64),
      new THREE.ShadowMaterial({ opacity: 0.13 })
    );
    shadowFloor.rotation.x = -Math.PI / 2;
    shadowFloor.position.y = -1.89;
    shadowFloor.receiveShadow = true;
    plinthGroup.add(shadowFloor);

    // Delicate floating golden studio particles orbiting softly around the bespoke suit
    const moteCount = 38;
    const positions = new Float32Array(moteCount * 3);
    for (let i = 0; i < moteCount; i++) {
      const ang = Math.random() * Math.PI * 2;
      const rad = 1.05 + Math.random() * 1.15;
      positions[i * 3] = Math.cos(ang) * rad;
      positions[i * 3 + 1] = Math.random() * 3.4 - 1.5;
      positions[i * 3 + 2] = Math.sin(ang) * rad;
    }
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    dustParticles = new THREE.Points(moteGeo, new THREE.PointsMaterial({
      color: 0xc9a86a,
      size: 0.032,
      transparent: true,
      opacity: 0.5
    }));
    plinthGroup.add(dustParticles);

    scene.add(plinthGroup);
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
      color: 0x0b0c10,
      map: woolTex,
      bumpMap: woolTex,
      bumpScale: 0.009,
      roughness: 0.78,
      metalness: 0.03,
      envMapIntensity: 0.22,
      sheen: 0.55,
      sheenRoughness: 0.52,
      sheenColor: new THREE.Color(0x252834)
    });

    trouserMat = new THREE.MeshPhysicalMaterial({
      color: 0x090a0d,
      map: woolTex,
      bumpMap: woolTex,
      bumpScale: 0.008,
      roughness: 0.80,
      metalness: 0.02,
      envMapIntensity: 0.20,
      sheen: 0.4,
      sheenRoughness: 0.55,
      sheenColor: new THREE.Color(0x20222c)
    });

    lapelMat = new THREE.MeshPhysicalMaterial({
      color: 0x050608,
      roughness: 0.14,
      metalness: 0.18,
      envMapIntensity: 1.15,
      clearcoat: 0.94,
      clearcoatRoughness: 0.10
    });

    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      metalness: 0.01
    });

    tieMat = new THREE.MeshPhysicalMaterial({
      color: 0x070709,
      roughness: 0.18,
      metalness: 0.14,
      clearcoat: 0.75
    });

    pocketMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.45
    });

    shoeMat = new THREE.MeshPhysicalMaterial({
      color: 0x060608,
      roughness: 0.12,
      metalness: 0.12,
      clearcoat: 0.98,
      clearcoatRoughness: 0.08
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd0ae6e,
      roughness: 0.18,
      metalness: 0.94
    });

    const walnutMat = new THREE.MeshStandardMaterial({
      color: 0x2b1910,
      roughness: 0.28,
      metalness: 0.08
    });

    const buttonMat = new THREE.MeshStandardMaterial({
      color: 0x16161b,
      roughness: 0.2,
      metalness: 0.45
    });

    // 1. ANATOMICALLY SCULPTED TAILORED JACKET TORSO
    const torsoPts = [
      new THREE.Vector2(0.01, -0.45),
      new THREE.Vector2(0.418, -0.44),
      new THREE.Vector2(0.398, -0.22),
      new THREE.Vector2(0.335, 0.06),
      new THREE.Vector2(0.388, 0.34),
      new THREE.Vector2(0.460, 0.65),
      new THREE.Vector2(0.500, 0.87),
      new THREE.Vector2(0.355, 0.97),
      new THREE.Vector2(0.175, 1.01),
      new THREE.Vector2(0.01, 1.02)
    ];
    const torsoGeo = new THREE.LatheGeometry(torsoPts, 56);
    const torsoMesh = new THREE.Mesh(torsoGeo, jacketMat);
    torsoMesh.scale.set(1.06, 1.0, 0.62);
    torsoMesh.position.y = 0.28;
    torsoMesh.castShadow = true;
    torsoMesh.receiveShadow = true;
    upperBodyGroup.add(torsoMesh);

    const seamMat = new THREE.MeshStandardMaterial({ color: 0x050507, roughness: 0.9 });
    frontSeamMesh = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.54, 0.012), seamMat);
    frontSeamMesh.position.set(0, 0.12, 0.258);
    upperBodyGroup.add(frontSeamMesh);

    // Authentic Italian Double Rear Vents (visible when rotating 180°)
    [-0.145, 0.145].forEach((vx) => {
      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.36, 0.018), seamMat);
      vent.position.set(vx, 0.04, -0.254);
      upperBodyGroup.add(vent);
    });

    // 2. CRISP WHITE EGYPTIAN COTTON SHIRT V-PLASTRON & COLLAR
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

    // 3. SCULPTED 3D PEAK LAPELS + GOLDEN BAGOZZA LAPEL PIN
    function createLapel(side) {
      const s = new THREE.Shape();
      s.moveTo(0, 0.42);
      s.quadraticCurveTo(side * 0.068, 0.72, side * 0.155, 1.235);
      s.lineTo(side * 0.215, 1.185);
      s.quadraticCurveTo(side * 0.278, 0.94, side * 0.252, 0.84);
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

    // Signature Bagozza Brushed Gold Lapel Emblem Pin on wearer's left lapel
    const lapelPin = new THREE.Mesh(new THREE.CylinderGeometry(0.019, 0.019, 0.01, 20), goldMat);
    lapelPin.rotation.x = Math.PI / 2;
    lapelPin.position.set(0.185, 0.99, 0.282);
    upperBodyGroup.add(lapelPin);

    // 4. NECKTIE & SATIN BOW-TIE
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

    // 5. WELT BREAST POCKET + SILK POCKET SQUARE + HIP FLAPS
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
    const pocketSq = new THREE.Mesh(new THREE.ExtrudeGeometry(sqShape, { depth: 0.008, bevelEnabled: false }), pocketMat);
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

    // 6. FRONT CLOSURE BUTTONS
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

    // 7. CONTINUOUS SEAMLESS CURVED TAILORED SLEEVES + SURGEON CUFF BUTTONS + FRENCH CUFFS
    [-1, 1].forEach((side) => {
      const sleeveGroup = new THREE.Group();
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 0.45, 1.07, -0.01),
        new THREE.Vector3(side * 0.54, 0.82, -0.005),
        new THREE.Vector3(side * 0.57, 0.50, 0.015),
        new THREE.Vector3(side * 0.57, 0.22, 0.06),
        new THREE.Vector3(side * 0.56, 0.02, 0.095)
      ]);
      const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.115, 24, false);
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

      const shoulderCap = new THREE.Mesh(new THREE.SphereGeometry(0.135, 24, 24), jacketMat);
      shoulderCap.scale.set(1.0, 0.9, 0.94);
      shoulderCap.position.set(side * 0.455, 1.07, -0.01);
      shoulderCap.castShadow = true;
      sleeveGroup.add(shoulderCap);

      const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.076, 0.074, 0.065, 24), shirtMat);
      cuff.position.set(side * 0.56, -0.01, 0.102);
      cuff.rotation.x = -0.16;
      sleeveGroup.add(cuff);

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

    // 9. SEAMLESS TAILORED CREASED TROUSERS + POLISHED ITALIAN OXFORD SHOES
    const legPts = [
      new THREE.Vector2(0.01, -0.78),
      new THREE.Vector2(0.102, -0.77),
      new THREE.Vector2(0.118, -0.45),
      new THREE.Vector2(0.135, -0.08),
      new THREE.Vector2(0.172, 0.36),
      new THREE.Vector2(0.195, 0.72),
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
    lapelMat.roughness = p.lapelGloss ? 0.14 : 0.68;
    lapelMat.clearcoat = p.lapelGloss ? 0.92 : 0.06;
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
    targetRotX = 0.03;
  }

  function toggleAutoRotate() {
    autoRotate = !autoRotate;
    return autoRotate;
  }

  function adjustZoom(delta) {
    targetCamZ = Math.max(3.3, Math.min(6.0, targetCamZ + delta));
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
      targetRotY += dx * 0.012;
      targetRotX = Math.max(-0.20, Math.min(0.24, targetRotX + dy * 0.0045));
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

    clockT += 0.016;
    if (autoRotate && !isDragging) {
      targetRotY += 0.0068; // Silky smooth continuous 360° turntable motion
    }

    currentRotY += (targetRotY - currentRotY) * 0.085;
    currentRotX += (targetRotX - currentRotX) * 0.085;
    currentCamZ += (targetCamZ - currentCamZ) * 0.08;

    currentBodyScale.torsoX += (targetBodyScale.torsoX - currentBodyScale.torsoX) * 0.08;
    currentBodyScale.torsoZ += (targetBodyScale.torsoZ - currentBodyScale.torsoZ) * 0.08;
    currentBodyScale.legX += (targetBodyScale.legX - currentBodyScale.legX) * 0.08;

    if (suitPivot) {
      suitPivot.rotation.y = currentRotY;
      suitPivot.rotation.x = currentRotX * 0.28;
      // Subtle luxury breathing motion on the upper garment
      suitPivot.position.y = Math.sin(clockT * 1.4) * 0.012;
      upperBodyGroup.scale.set(currentBodyScale.torsoX, 1, currentBodyScale.torsoZ);
      lowerBodyGroup.scale.set(currentBodyScale.legX, 1, currentBodyScale.torsoZ * 0.96);
    }

    if (dustParticles) {
      dustParticles.rotation.y -= 0.0012;
    }

    camera.position.z = currentCamZ;
    camera.position.y = 0.02 + currentRotX * 0.55;
    camera.lookAt(0, -0.05, 0);

    renderer.render(scene, camera);
  }

  function init(elementId) {
    container = document.getElementById(elementId);
    if (!container || typeof THREE === 'undefined') return false;

    const w = container.clientWidth || 720;
    const h = container.clientHeight || 620;

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (_) {
      return false;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0); // Pure transparent canvas over white Hero!
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.04;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    const envTex = makeStudioEnvMap(renderer);
    if (envTex) scene.environment = envTex;

    camera = new THREE.PerspectiveCamera(36, w / h, 0.1, 40);
    camera.position.set(0, -0.02, currentCamZ);

    // High-Fashion Editorial 3-Point Studio Lighting
    const hemi = new THREE.HemisphereLight(0xffffff, 0xe0dcd2, 0.68);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xfffdf8, 1.45);
    keyLight.position.set(3.4, 5.6, 4.4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xeef3ff, 0.45);
    fillLight.position.set(-4.2, 2.2, 2.5);
    scene.add(fillLight);

    const rimLight = new THREE.SpotLight(0xffe7c2, 1.4, 16, Math.PI / 3.0, 0.55);
    rimLight.position.set(-1.6, 4.8, -3.6);
    scene.add(rimLight);

    buildMarbleTurntable();
    buildSculptedSuit();
    applyPreset('tuxedo');
    bindPointerEvents(renderer.domElement);

    const handleResize = () => {
      if (!container || !renderer) return;
      const nw = container.clientWidth || 720;
      const nh = container.clientHeight || 620;
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
