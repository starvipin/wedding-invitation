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
