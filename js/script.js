/* Seven Hills Wai - page scripts (each block is isolated so one error cannot stop the others) */

/* ---- block 1 ---- */
try {
(function(){
  gsap.registerPlugin(ScrollTrigger);

  var video = document.getElementById('scrub-video');
  var scrollTrack = document.getElementById('scroll-track');
  var fileInput = document.getElementById('custom-file-input');
  var videoTimeline = null;

  /* links scroll position to video.currentTime (down = forward, up = backward) */
  function setupVideoScrubber(){
    var duration = video.duration && !isNaN(video.duration) ? video.duration : 10;
    if (videoTimeline){
      if (videoTimeline.scrollTrigger) videoTimeline.scrollTrigger.kill();
      videoTimeline.kill();
    }
    videoTimeline = gsap.timeline({
      defaults:{ease:'none'},
      scrollTrigger:{
        trigger: scrollTrack,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: function(self){
          var t = self.progress * duration;
          if (video.readyState >= 2 && !isNaN(t)) video.currentTime = t;
        }
      }
    });
    ScrollTrigger.refresh();
  }

  video.addEventListener('loadedmetadata', setupVideoScrubber);
  if (video.readyState >= 1) setupVideoScrubber();

  video.muted = true;
  video.pause();

  fileInput.addEventListener('change', function(e){
    var file = e.target.files[0];
    if (!file) return;
    video.src = URL.createObjectURL(file);
    video.load();
    video.addEventListener('loadeddata', function(){ setupVideoScrubber(); }, {once:true});
  });

  window.addEventListener('resize', function(){ ScrollTrigger.refresh(); });
})();
} catch (err) { console.error("script block 1 failed:", err); }

/* ---- block 2 ---- */
try {
(function(){
  var el=document.querySelector(".s1");
  if(!el) return;
  if(!("IntersectionObserver" in window)){ el.classList.add("is-in"); return; }
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ el.classList.add("is-in"); io.disconnect(); } }); },{threshold:0.15});
  io.observe(el);
})();
} catch (err) { console.error("script block 2 failed:", err); }

/* ---- block 3 ---- */
try {
(function(){
  // Paste your Typeform link here, e.g. 'https://yourname.typeform.com/to/XXXXXX'
  var TYPEFORM_URL = '';
  document.querySelectorAll('.s8 [data-iv-form]').forEach(function(a){
    var card = a.closest('.iv-card');
    var plot = card ? card.querySelector('h3').textContent.trim() : '';
    if (TYPEFORM_URL){
      // opens the form in a new tab; "plot" is passed along (add a hidden field named plot in Typeform to receive it)
      a.href = TYPEFORM_URL + (TYPEFORM_URL.indexOf('?')>-1 ? '&' : '#') + 'plot=' + encodeURIComponent(plot);
      a.target = '_blank'; a.rel = 'noopener';
    }
    // if no link yet, the arrow scrolls to the contact form on this page
  });
})();
} catch (err) { console.error("script block 3 failed:", err); }

/* ---- block 4 ---- */
try {
(() => {
  const wrap = document.getElementById('nWrap');
  const track = document.getElementById('nTrack');
  const cards = [...track.children];
  const curInner = document.getElementById('nCurInner');
  const cap = document.getElementById('nCap');
  const bar = document.getElementById('nBar');
  const prev = document.getElementById('nPrev');
  const next = document.getElementById('nNext');
  const N = cards.length;
  const captions = [
    'Seven peaks around your home.',
    'A calm lake, minutes away.',
    'Green valleys all around.',
    'History at your doorstep.'
  ];
  let cur = 0, tgt = 0, idx = -1, running = false;

  const step = () => cards[0].offsetWidth + parseFloat(getComputedStyle(track).columnGap);
  const range = () => Math.max(1, wrap.offsetHeight - innerHeight);

  function readTarget(){
    const t = Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / range()));
    tgt = t * (N - 1);
  }

  function setIndex(k){
    if (k === idx) return;
    idx = k;
    curInner.firstElementChild && (curInner.style.transform = `translateY(${-k * 100 / N}%)`);
    cap.classList.add('out');
    setTimeout(() => { cap.textContent = captions[k]; cap.classList.remove('out'); }, 180);
    prev.disabled = k === 0;
    next.disabled = k === N - 1;
  }

  function frame(){
    cur += (tgt - cur) * 0.12;
    if (Math.abs(tgt - cur) < 0.001) cur = tgt;
    track.style.transform = `translate3d(${-cur * step()}px,0,0)`;
    cards.forEach((c, k) => {
      const d = k - cur;
      c.style.setProperty('--d', d.toFixed(3));
      c.style.opacity = (1 - Math.min(.5, Math.abs(d) * .28)).toFixed(3);
    });
    bar.style.width = (cur / (N - 1) * 100) + '%';
    setIndex(Math.round(cur));
    if (cur !== tgt) requestAnimationFrame(frame); else running = false;
  }
  function kick(){ readTarget(); if (!running) { running = true; requestAnimationFrame(frame); } }

  addEventListener('scroll', kick, {passive:true});
  addEventListener('resize', kick);

  // arrows / keys jump the page scroll to the matching slide
  function goTo(k){
    k = Math.max(0, Math.min(N - 1, k));
    const top = wrap.getBoundingClientRect().top + scrollY;
    scrollTo({top: top + (k / (N - 1)) * range(), behavior: 'smooth'});
  }
  prev.onclick = () => goTo(Math.round(tgt) - 1);
  next.onclick = () => goTo(Math.round(tgt) + 1);

  // counter digits: each <span> is 1/N of the inner height
  curInner.style.transition = 'transform .5s cubic-bezier(.22,.8,.3,1)';

  cap.textContent = captions[0];
  readTarget(); cur = tgt; kick();
})();
} catch (err) { console.error("script block 4 failed:", err); }

/* ---- block 5 ---- */
try {
(function(){

const IMG = "images/map.jpg";
const IMG_W = 1672, IMG_H = 941;
const $ = id => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
const svgEl = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent && parent.appendChild(e); return e; };
const div = (cls, parent, html) => { const e = document.createElement('div'); e.className = cls; if (html) e.innerHTML = html; parent && parent.appendChild(e); return e; };

$('mapimg').src = IMG;
$('lbg').style.backgroundImage = `url("${IMG}")`;

// Positions measured on the image (pixels of the 1672 x 941 picture)
const WAI = { x: 921, y: 588 };
const CITIES = [
  { n: 'Mumbai',        x: 467, y: 242, km: '234 km',  t: '4 – 5 hrs', bend: -0.12, chip: 'left'  },
  { n: 'Pune',          x: 855, y: 387, km: '95 km',   t: '2.5 hrs',   bend: -0.14, chip: 'left'  },
  { n: 'Satara',        x: 953, y: 688, km: '46.1 km', t: '~1 hr*',    bend: -0.30, chip: 'left'  },
  { n: 'Mahabaleshwar', x: 764, y: 605, km: '41.5 km', t: '1.5 hrs',   bend:  0.14, chip: 'right' }
];

const pinSvg = '<svg width="14" height="18" viewBox="0 0 24 30"><path d="M12 29C5 20 2 16 2 11a10 10 0 1 1 20 0c0 5-3 9-10 18z" fill="#e02424"/><circle cx="12" cy="11" r="4" fill="#fff"/></svg>';
const carSvg = '<svg width="18" height="14" viewBox="0 0 24 18" fill="#2f4a0f"><path d="M4.5 1.5h15l2.5 6.5v8h-3.5v-2h-13v2H2V8zm1.8 2L4.7 7.5h14.6L17.7 3.5zM5.5 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm13 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>';

const linesLayer = $('lines'), markers = $('markers');

// Seven Hills red pin
const wai = div('mk wai', markers);
div('wpulse', wai);
div('wchip', wai, '<span class="wic"><svg viewBox="0 0 24 30"><path d="M12 29C5 20 2 16 2 11a10 10 0 1 1 20 0c0 5-3 9-10 18z"/></svg></span><span class="wtx"><b>Seven Hills Wai</b><small>Wai, Satara</small></span>');
const wpin = div('wpin', wai,
  '<svg viewBox="0 0 32 44" width="100%" height="100%"><path d="M16 43C7 30 2 24 2 16a14 14 0 1 1 28 0c0 8-5 14-14 27z" fill="#e02424" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><circle cx="16" cy="16" r="5.6" fill="#fff"/></svg>');

CITIES.forEach((c, i) => {
  const dl = (1.1 + i * 0.25).toFixed(2) + 's';
  c.glow = svgEl('path', { class: 'link-glow', pathLength: 1 }, linesLayer);
  c.link = svgEl('path', { class: 'link' }, linesLayer);
  c.glow.style.setProperty('--d', dl); c.link.style.setProperty('--d', dl);

  c.mk = div('mk', markers);
  c.dot = div('dot', c.mk, '<div class="ring"></div>');
  c.dot.style.setProperty('--d', (1.5 + i * 0.25).toFixed(2) + 's');
  c.chipEl = div('chip' + (c.chip === 'right' ? ' right' : ''), c.mk, c.km);
  c.chipEl.style.setProperty('--d', (1.7 + i * 0.25).toFixed(2) + 's');

  const row = document.querySelector(`#linfo .row[data-i="${i}"]`);
  row.style.setProperty('--d', (1.05 + i * 0.12).toFixed(2) + 's');
  row.innerHTML = `<span class="city">${pinSvg}${c.n}</span><span class="km">${c.km}</span><span class="time">${carSvg}${c.t}</span>`;
  c.row = row;

  const parts = [c.row, c.glow, c.link, c.dot, c.chipEl];
  c.set = on => parts.forEach(e => e.classList.toggle('active', on));
  [c.row, c.dot, c.chipEl].forEach(e => {
    e.addEventListener('pointerenter', ev => { if (ev.pointerType === 'mouse') c.set(true); });
    e.addEventListener('pointerleave', ev => { if (ev.pointerType === 'mouse') c.set(false); });
    e.addEventListener('click', ev => {                 // touch / pen: tap to highlight, tap again to clear
      if (ev.pointerType === 'mouse') return;
      const was = c.row.classList.contains('active');
      CITIES.forEach(x => x.set(false));
      if (!was) c.set(true);
    });
  });
});

// ---- Fit the picture to the screen -------------------------------------------------
// Keeps the whole route (Mumbai -> Wai -> Satara) in the free area next to / above the info card,
// and covers the whole screen with the image whenever the screen shape allows it.
const bottomMQ = matchMedia('(max-width: 900px) and (min-height: 521px), (max-aspect-ratio: 1/1)');
function fit() {
  const sec = $('loc'), W = sec.clientWidth, H = sec.clientHeight, card = $('linfo'), bottom = bottomMQ.matches;
  let aw = W, ah = H;
  if (bottom) ah = H - (card.offsetHeight + 12 + 12);
  else aw = W - (card.offsetWidth + 28 + 16);
  const f = bottom ? { x0: 415, x1: 1170, y0: 190, y1: 760 } : { x0: 430, x1: 1190, y0: 130, y1: 770 };
  const sFit = Math.min(aw / (f.x1 - f.x0), ah / (f.y1 - f.y0));
  const sCover = Math.max(W / IMG_W, H / IMG_H);
  const place = (s, clamp) => {
    let vx = (f.x0 + f.x1) / 2 - aw / 2 / s, vy = (f.y0 + f.y1) / 2 - ah / 2 / s;
    if (clamp) { vx = Math.min(Math.max(vx, 0), IMG_W - W / s); vy = Math.min(Math.max(vy, 0), IMG_H - H / s); }
    const ok = (f.x0 - vx) * s >= -1 && (f.x1 - vx) * s <= aw + 1 && (f.y0 - vy) * s >= -1 && (f.y1 - vy) * s <= ah + 1;
    return { s, vx, vy, ok, covers: clamp };
  };
  let L;
  if (sFit < sCover) L = place(sFit, false);              // narrow screens: fit the route, blurred backdrop fills the rest
  else {
    L = place(sCover, true);                              // normal: image covers the whole screen
    if (!L.ok) L = place(sFit, true);                     // route would hide under the card: zoom in a little
    if (!L.ok) L = place(sFit, false);                    // still not possible: keep the route clear of the card
  }
  const S = L.s, vx = L.vx, vy = L.vy, covers = L.covers;

  const img = $('mapimg');
  img.style.transform = `translate(${(-vx * S).toFixed(2)}px, ${(-vy * S).toFixed(2)}px) scale(${S.toFixed(4)})`;
  img.classList.toggle('soft', !covers);

  const P = (x, y) => [(x - vx) * S, (y - vy) * S];
  const [wx, wy] = P(WAI.x, WAI.y);
  wai.style.transform = `translate(${wx.toFixed(1)}px, ${wy.toFixed(1)}px)`;
  markers.style.setProperty('--rg', Math.min(20, Math.max(13, 22 * S)).toFixed(1) + 'px');
  const ph = Math.max(38, 62 * S);
  wai.style.setProperty('--ph', ph.toFixed(1) + 'px');
  wai.style.setProperty('--pw', (ph * 32 / 44).toFixed(1) + 'px');

  CITIES.forEach(c => {
    const [x, y] = P(c.x, c.y);
    c.mk.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    const dx = x - wx, dy = y - wy;
    const cx = (wx + x) / 2 - dy * c.bend, cy = (wy + y) / 2 + dx * c.bend;
    const d = `M${wx.toFixed(1)} ${wy.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    c.glow.setAttribute('d', d); c.link.setAttribute('d', d);
  });
}
fit();
addEventListener('resize', fit);
addEventListener('orientationchange', fit);
bottomMQ.addEventListener && bottomMQ.addEventListener('change', fit);
if (window.ResizeObserver) { var ro = new ResizeObserver(fit); ro.observe($('linfo')); ro.observe($('loc')); };
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  var locSec = document.getElementById('loc');
  if ('IntersectionObserver' in window){
    new IntersectionObserver(function(e, o){
      if (e[0].isIntersecting){ locSec.classList.add('in'); o.disconnect(); }
    }, {threshold:.2}).observe(locSec);
  } else { locSec.classList.add('in'); }
})();
} catch (err) { console.error("script block 5 failed:", err); }

/* ---- block 6 ---- */
try {
(function(){
  var sec = document.getElementById('amen');
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize:true });
  sec.classList.add('js-on');

  var vp = document.getElementById('vp'), track = document.getElementById('track');
  /* scoped to #amen so it never picks up the .card elements from the Overview section */
  var cards = gsap.utils.toArray('#amen .card'), imgs = cards.map(function(c){ return c.querySelector('.img'); }), N = cards.length;
  var prev = document.getElementById('prev'), next = document.getElementById('next'), hint = document.getElementById('hint');
  var curNum = document.getElementById('curNum'), totNum = document.getElementById('totNum'), note = document.getElementById('note');
  var clamp = gsap.utils.clamp;

  var state = {pos:0}, step = 0, maxI = N - 1, vis = 0, idx = 0, shown = -1, tl = null, hintOn = true;
  function pad(n){ return (n < 10 ? '0' : '') + n; }

  function measure(){
    var win = vp.clientWidth, mobile = window.innerWidth <= 860;
    var gap = parseFloat(getComputedStyle(track).columnGap) || 16;
    vis = mobile ? 1 : 2;
    var w = mobile ? win * 0.82 : (win - gap) / 2;
    cards.forEach(function(c){ c.style.flex = '0 0 ' + w + 'px'; c.style.width = w + 'px'; });
    step = w + gap;
    maxI = N - vis;
    totNum.textContent = '/' + pad(maxI + 1);
  }

  function ui(instant){
    prev.disabled = idx <= 0;
    next.disabled = idx >= maxI;
    if (idx === shown) return;
    var dir = idx > shown ? 1 : -1, first = shown < 0 || instant;
    shown = idx;
    var txt = cards[idx].dataset.note;
    if (first){ curNum.textContent = pad(idx + 1); note.textContent = txt; return; }
    gsap.to(curNum, {yPercent:-100 * dir, opacity:0, duration:.22, ease:'power2.in', overwrite:true, onComplete:function(){
      curNum.textContent = pad(idx + 1);
      gsap.fromTo(curNum, {yPercent:100 * dir, opacity:0}, {yPercent:0, opacity:1, duration:.4, ease:'power3.out'});
    }});
    gsap.to(note, {opacity:0, y:8, duration:.18, overwrite:true, onComplete:function(){
      note.textContent = txt;
      gsap.to(note, {opacity:1, y:0, duration:.4, ease:'power2.out'});
    }});
  }

  function render(){
    var pos = state.pos;
    gsap.set(track, {x: -pos * step});
    for (var i = 0; i < N; i++){
      var d = i - pos;
      gsap.set(imgs[i], {xPercent: clamp(-8, 8, d * -8)});
    }
    gsap.set('#bg', {scale: 1 + (maxI ? pos / maxI : 0) * 0.06});
    idx = clamp(0, maxI, Math.round(pos));
    ui();
    var h = pos < 0.02;
    if (h !== hintOn){ hintOn = h; gsap.to(hint, {opacity: h ? 1 : 0, duration:.3, overwrite:true}); }
  }

  function build(){
    if (tl){ tl.scrollTrigger.kill(true); tl.kill(); }
    measure(); state.pos = 0; shown = -1; idx = 0;
    tl = gsap.timeline({
      scrollTrigger:{
        trigger: sec,
        start: 'top top',
        end: function(){ return '+=' + maxI * Math.max(window.innerHeight * 0.75, 380); },
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap:{ snapTo: 1 / maxI, inertia:false, duration:{min:.25, max:.7}, delay:.06, ease:'power2.inOut' },
        onRefreshInit: function(){ measure(); render(); }
      }
    });
    tl.to(state, {pos: maxI, ease:'none', onUpdate: render});
    render();
  }

  var jump = null;
  function goTo(i){
    var st = tl && tl.scrollTrigger; if (!st) return;
    i = clamp(0, maxI, i);
    var y = st.start + (i / maxI) * (st.end - st.start), o = {y: window.pageYOffset};
    if (jump) jump.kill();
    jump = gsap.to(o, {y:y, duration:.9, ease:'power3.inOut', onUpdate:function(){ window.scrollTo(0, o.y); }});
  }
  prev.addEventListener('click', function(){ goTo(idx - 1); });
  next.addEventListener('click', function(){ goTo(idx + 1); });
  document.addEventListener('keydown', function(e){
    var r = sec.getBoundingClientRect();
    if (r.top > 4 || r.bottom < window.innerHeight - 4) return;
    if (e.key === 'ArrowRight'){ e.preventDefault(); goTo(idx + 1); }
    if (e.key === 'ArrowLeft'){  e.preventDefault(); goTo(idx - 1); }
  });

  build();

  var lastVis = vis;
  window.addEventListener('resize', function(){
    var mobile = window.innerWidth <= 860;
    if ((mobile ? 1 : 2) !== lastVis){ lastVis = mobile ? 1 : 2; build(); ScrollTrigger.refresh(); }
    else { measure(); render(); }
  });

  /* entrance (selectors scoped to #amen to avoid clashes with other sections) */
  var intro = gsap.timeline({
    defaults:{ease:'power3.out'},
    scrollTrigger:{trigger:sec, start:'top 85%', once:true}
  });
  intro.from('#panel', {y:70, opacity:0, scale:.965, duration:1.1})
    .from('#amen .chip', {y:14, opacity:0, duration:.6}, '-=.7')
    .from('#amen h2 .ln span', {yPercent:110, duration:.9, stagger:.12}, '-=.55')
    .from('#amen .descr', {y:16, opacity:0, duration:.7}, '-=.6')
    .from('#amen .cn, #amen .btns', {y:20, opacity:0, duration:.7, stagger:.1}, '-=.6')
    .from(cards, {x:90, opacity:0, duration:1, stagger:.12, clearProps:'opacity'}, '-=.9');

  window.addEventListener('load', function(){ ScrollTrigger.refresh(); });
})();
} catch (err) { console.error("script block 6 failed:", err); }

/* ---- block 7 ---- */
try {
(function(){
  var items = document.querySelectorAll('#legal .offer');
  items.forEach(function(item){
    function select(){
      items.forEach(function(i){ i.classList.remove('active'); });
      item.classList.add('active');
    }
    item.addEventListener('click', select);
    item.addEventListener('mouseenter', select);
  });
})();
} catch (err) { console.error("script block 7 failed:", err); }

/* ---- block 8 ---- */
try {
(function(){
  var items = document.querySelectorAll(".s7 .reveal");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("is-visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -20px 0px" });
    items.forEach(function(i){ obs.observe(i); });
  } else { items.forEach(function(i){ i.classList.add("is-visible"); }); }
  // placeholder links: replace "#" with each partner's real URL
  document.querySelectorAll(".s7 .bk-row").forEach(function(r){
    r.addEventListener("click", function(e){ if (r.getAttribute("href") === "#") e.preventDefault(); });
  });
})();
} catch (err) { console.error("script block 8 failed:", err); }

/* ---- block 9 ---- */
try {
(function(){
  
  var ENDPOINT = '';                         // e.g. '/wp-json/yoursite/v1/lead'
  var THANK_YOU_URL = '';                    // e.g. '/thank-you/' (leave empty to stay on page)

  var form = document.getElementById('shc-form');
  var status = document.getElementById('shc-status');
  if (!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    status.className = 'shc-status';
    status.textContent = '';

    var data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
      source: 'Seven Hills Wai - Contact'
    };

    if (!data.name || !/^\S+@\S+\.\S+$/.test(data.email) || data.phone.replace(/\D/g,'').length < 10){
      status.className = 'shc-status is-error';
      status.textContent = 'Please enter your name, a valid email and a 10-digit phone number.';
      return;
    }

    var btn = form.querySelector('.shc-btn');
    btn.disabled = true;

    var send = ENDPOINT
      ? fetch(ENDPOINT, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)})
          .then(function(r){ if(!r.ok) throw new Error('bad response'); })
      : Promise.resolve(console.warn('Contact form: set ENDPOINT to save leads.'));

    send.then(function(){
      if (THANK_YOU_URL){ window.location.href = THANK_YOU_URL; return; }
      status.textContent = 'Thank you. Our team will contact you shortly.';
      form.reset();
    }).catch(function(){
      status.className = 'shc-status is-error';
      status.textContent = 'Something went wrong. Please try again.';
    }).then(function(){ btn.disabled = false; });
  });
})();
} catch (err) { console.error("script block 9 failed:", err); }

