/**
 * Synthesizes a subtle, pleasant contactless NFC chime using native Web Audio API.
 * No external audio files or network requests required.
 */
export function playNfcChime(): void {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Dual chime tones (C5: ~523Hz followed quickly by G5: ~784Hz)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(880, now + 0.08);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.15);

    osc2.start(now + 0.08);
    osc2.stop(now + 0.35);

    setTimeout(() => {
      try {
        ctx.close();
      } catch {
        // ignore
      }
    }, 500);
  } catch (e) {
    console.debug('Web Audio not allowed or unavailable', e);
  }
}
