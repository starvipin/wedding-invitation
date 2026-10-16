// Countdown is to the start of 20 November 2026 in India, not the ceremony time.
const weddingDay = Date.parse('2026-11-20T00:00:00+05:30');
function countdownParts(now) {
  const total = Math.max(0, Math.floor((weddingDay - now) / 1000));
  return [Math.floor(total / 86400), Math.floor(total / 3600) % 24, Math.floor(total / 60) % 60, total % 60];
}
function updateCountdown() {
  countdownParts(Date.now()).forEach((value, i) => {
    document.querySelectorAll('[data-countdown]')[i].textContent = String(value).padStart(2, '0');
  });
  if (Date.now() >= weddingDay) {
    document.getElementById('countdown-caption').textContent = 'इंतज़ार पूरा हुआ — खुशियों का दिन आ गया!';
  }
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Original, gentle pentatonic instrumental. No third-party tracks or downloads.
const MUSIC_VOLUME = 0.10;

let audioContext, master, timer, playing = false;
const melody = [0, 2, 4, 7, 9, 7, 4, 2, 4, 7, 12, 9, 7, 4, 2, 0, 2, 4, 7, 4, 2, 0, -3, 0, 4, 7, 9, 12, 9, 7, 4, 2];
let noteIndex = 0, nextNote = 0;
function tone(frequency, start, duration, level, type = 'sine') {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(level, start + 0.09);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain).connect(master);
  osc.start(start);
  osc.stop(start + duration + 0.02);
  osc.onended = () => { osc.disconnect(); gain.disconnect(); };
}
function scheduleMusic() {
  while (playing && nextNote < audioContext.currentTime + 0.4) {
    const frequency = 293.66 * Math.pow(2, melody[noteIndex % melody.length] / 12);
    tone(frequency, nextNote, 1.65, 0.2);
    tone(frequency * 2, nextNote, 1.2, 0.035);
    if (noteIndex % 4 === 0) {
      tone(146.83, nextNote, 3.1, 0.12, 'triangle');
      tone(220, nextNote + 0.15, 2.9, 0.055);
    }
    if (noteIndex % 2 === 0) tone(frequency / 2, nextNote + 0.32, 0.8, 0.045, 'triangle');
    noteIndex++;
    nextNote += 0.72;
  }
}
function syncPlayback() {
  clearInterval(timer);
  playing = audioContext?.state === 'running' && !document.hidden;
  if (!playing) return;
  nextNote = Math.max(nextNote, audioContext.currentTime + 0.04);
  scheduleMusic();
  timer = setInterval(scheduleMusic, 120);
}
function startMusic() {
  if (document.hidden) return;
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    if (!audioContext) {
      audioContext = new Audio();
      master = audioContext.createGain();
      master.gain.value = MUSIC_VOLUME;
      master.connect(audioContext.destination);
      nextNote = audioContext.currentTime + 0.06;
      audioContext.addEventListener('statechange', syncPlayback);
    }
    // Resume is also called on user interaction: autoplay may remain pending
    // until a browser receives its first permitted tap, click or key press.
    if (audioContext.state !== 'running') {
      audioContext.resume().then(syncPlayback).catch(() => {});
    } else if (!playing) syncPlayback();
  } catch { /* Browsers without audio support still show the invitation. */ }
}
function pauseHiddenMusic() {
  playing = false;
  clearInterval(timer);
  if (audioContext) audioContext.suspend().catch(() => {});
}
for (const event of ['pointerdown', 'touchend', 'keydown']) {
  document.addEventListener(event, startMusic, { passive: true });
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) pauseHiddenMusic(); else startMusic();
});
window.addEventListener('pagehide', pauseHiddenMusic);
window.addEventListener('pageshow', startMusic);
startMusic();