// Add confirmed details here later. Year is deliberately blank until confirmed.
const weddingDetails = { year: '', venueName: '', times: {18: '', 19: '', 20: ''}, parents: {groom: '', bride: ''}, photos: [] };
document.getElementById('venue-name').textContent = weddingDetails.venueName;
document.querySelectorAll('[data-time]').forEach(el => { el.textContent = weddingDetails.times[el.dataset.time] || ''; });
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  for (let i = 0; i < 11; i++) { const p = document.createElement('span'); p.className='petal'; p.style.left=`${8+i*8}%`; p.style.animationDelay=`${i*1.1}s`; p.style.animationDuration=`${11+i%4}s`; document.querySelector('.petals').append(p); }
}
document.getElementById('share').addEventListener('click', async () => {
  const status = document.getElementById('share-status');
  const data = { title: 'विनायक एवं चन्दरकान्ता • शुभ विवाह', text: 'सप्रेम निमंत्रण 🌸\n१८–२० नवंबर • द्वारका, नई दिल्ली\nहमारी खुशियों में सपरिवार शामिल हों।', url: location.href.split('#')[0] };
  try { if(navigator.share) { await navigator.share(data); status.textContent=''; } else if(navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(`${data.text}\n${data.url}`); status.textContent='निमंत्रण का लिंक कॉपी हो गया है। अब अपनों को भेजें।'; } else { status.textContent='ऊपर ब्राउज़र में दिख रहे लिंक को कॉपी करके साझा करें।'; } }
  catch(error) { if(error.name !== 'AbortError') status.textContent='ऊपर ब्राउज़र में दिख रहे लिंक को कॉपी करके साझा करें।'; }
});
