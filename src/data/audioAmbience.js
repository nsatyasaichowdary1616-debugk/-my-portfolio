/**
 * Procedural Web Audio API sound generator for cinematic sci-fi ambient immersion.
 * Uses zero external audio files - 100% synthetic, zero network latency, instant playback.
 */

class SciFiAmbience {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.isPlaying = false;
    this.gainNode = null;
    this.droneOsc = null;
    this.droneOsc2 = null;
    this.lfo = null;
    this.filter = null;
    this.shimmerOsc = null;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();

      // Master Gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);

      // Low pass filter with gentle resonance
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(240, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(4, this.ctx.currentTime);
      this.filter.connect(this.gainNode);

      // Deep sub-bass cosmic drone oscillator 1 (55Hz - A1)
      this.droneOsc = this.ctx.createOscillator();
      this.droneOsc.type = 'sine';
      this.droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime);

      // Sub drone 2 slightly detuned for organic beating (55.4Hz)
      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(55.35, this.ctx.currentTime);

      // LFO for slow atmospheric breathing (0.12 Hz)
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(60, this.ctx.currentTime);
      this.lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);

      // Subtle celestial harmonic overtone (220Hz - A3)
      this.shimmerOsc = this.ctx.createOscillator();
      this.shimmerOsc.type = 'sine';
      this.shimmerOsc.frequency.setValueAtTime(220, this.ctx.currentTime);
      const shimmerGain = this.ctx.createGain();
      shimmerGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.shimmerOsc.connect(shimmerGain);
      shimmerGain.connect(this.filter);

      this.droneOsc.connect(this.filter);
      this.droneOsc2.connect(this.filter);

      this.droneOsc.start();
      this.droneOsc2.start();
      this.lfo.start();
      this.shimmerOsc.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked", e);
    }
  }

  toggle() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    if (this.gainNode && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.22;
      this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 1.2);
    }
    return !this.isMuted;
  }

  playPortalHum() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.6);
    } catch (e) {}
  }

  playChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.8);
    } catch (e) {}
  }
}

export const audioManager = new SciFiAmbience();
