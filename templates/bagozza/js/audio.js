/**
 * BAGOZZA Luxury Acoustic Sound Engine (Web Audio API)
 * Crisp, refined tactile sounds with zero external network dependencies.
 */
window.BagozzaAudio = (function () {
  let ctx = null;
  let enabled = true;

  function ensureContext() {
    if (!enabled) return null;
    try {
      if (!ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        ctx = new AudioCtx();
      }
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      return ctx;
    } catch (_) {
      return null;
    }
  }

  function play(type = 'tap') {
    const audio = ensureContext();
    if (!audio) return;

    const now = audio.currentTime;
    try {
      if (type === 'tap') {
        // Tactile watch-crown mechanical click
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(920, now);
        osc.frequency.exponentialRampToValueAtTime(340, now + 0.045);
        gain.gain.setValueAtTime(0.065, now);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.05);
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start(now);
        osc.stop(now + 0.055);
      } else if (type === 'fabric') {
        // Smooth silk/wool tailored rustle swoosh
        const duration = 0.14;
        const bufferSize = Math.floor(audio.sampleRate * duration);
        const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          const env = Math.sin((i / bufferSize) * Math.PI);
          data[i] = (Math.random() * 2 - 1) * env * 0.25;
        }
        const noise = audio.createBufferSource();
        noise.buffer = buffer;

        const filter = audio.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1100, now);
        filter.frequency.exponentialRampToValueAtTime(2200, now + duration);
        filter.Q.value = 1.4;

        const gain = audio.createGain();
        gain.gain.setValueAtTime(0.11, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audio.destination);
        noise.start(now);
      } else if (type === 'bag') {
        // Warm champagne crystal two-note chime
        const freqs = [659.25, 987.77]; // E5 -> B5
        freqs.forEach((f, idx) => {
          const osc = audio.createOscillator();
          const gain = audio.createGain();
          osc.type = 'triangle';
          const start = now + idx * 0.075;
          osc.frequency.setValueAtTime(f, start);
          gain.gain.setValueAtTime(0.001, start);
          gain.gain.linearRampToValueAtTime(0.09, start + 0.012);
          gain.gain.exponentialRampToValueAtTime(0.0008, start + 0.34);
          osc.connect(gain);
          gain.connect(audio.destination);
          osc.start(start);
          osc.stop(start + 0.36);
        });
      } else if (type === 'unlock') {
        // Refined luxury ascending chord
        [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
          const osc = audio.createOscillator();
          const gain = audio.createGain();
          osc.type = 'sine';
          const start = now + idx * 0.055;
          osc.frequency.setValueAtTime(f, start);
          gain.gain.setValueAtTime(0.06, start);
          gain.gain.exponentialRampToValueAtTime(0.0008, start + 0.28);
          osc.connect(gain);
          gain.connect(audio.destination);
          osc.start(start);
          osc.stop(start + 0.3);
        });
      } else if (type === 'error') {
        // Subtle muted double thud
        [190, 150].forEach((f, idx) => {
          const osc = audio.createOscillator();
          const gain = audio.createGain();
          osc.type = 'sine';
          const start = now + idx * 0.1;
          osc.frequency.setValueAtTime(f, start);
          gain.gain.setValueAtTime(0.09, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.09);
          osc.connect(gain);
          gain.connect(audio.destination);
          osc.start(start);
          osc.stop(start + 0.1);
        });
      }
    } catch (_) {
      // Fail gracefully without console noise
    }
  }

  return {
    play,
    setEnabled(val) {
      enabled = Boolean(val);
    },
    isEnabled() {
      return enabled;
    }
  };
})();
