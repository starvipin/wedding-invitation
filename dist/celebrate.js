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
const musicButton = document.getElementById('music-toggle');
const volumeInput = document.getElementById('music-volume');
let audioContext, master, timer, playing = false, busy = false;
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
function musicLabel() {
  musicButton.setAttribute('aria-pressed', String(playing));
  musicButton.textContent = playing ? 'Ⅱ संगीत रोकें' : '♫ संगीत चलाएँ';
}
async function stopMusic() {
  playing = false;
  clearInterval(timer);
  if (audioContext) await audioContext.suspend();
  musicLabel();
}
musicButton.addEventListener('click', async () => {
  if (busy) return;
  busy = true;
  try {
    if (playing) { await stopMusic(); return; }
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) throw new Error('Audio unavailable');
    if (!audioContext) {
      audioContext = new Audio();
      master = audioContext.createGain();
      master.gain.value = Number(volumeInput.value);
      master.connect(audioContext.destination);
      nextNote = audioContext.currentTime + 0.06;
    }
    await audioContext.resume();
    if (audioContext.state !== 'running') throw new Error('Audio unavailable');
    playing = true;
    nextNote = Math.max(nextNote, audioContext.currentTime + 0.04);
    scheduleMusic();
    timer = setInterval(scheduleMusic, 120);
    musicLabel();
  } catch {
    playing = false;
    clearInterval(timer);
    musicLabel();
    document.getElementById('music-status').textContent = 'संगीत नहीं चल सका। दोबारा कोशिश करें।';
  } finally { busy = false; }
});
volumeInput.addEventListener('input', () => {
  if (master) master.gain.setTargetAtTime(Number(volumeInput.value), audioContext.currentTime, 0.08);
});
document.addEventListener('visibilitychange', () => { if (document.hidden && playing) stopMusic(); });
window.addEventListener('pagehide', () => { if (playing) stopMusic(); });
