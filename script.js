/* GYMFIT script. Plain JavaScript, no libraries. Runs fine from file:// */
document.documentElement.classList.add('js');

/* ---------- Editable content (change text/images here) ---------- */
const IMG = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=70`;
const courses = [
  {t:'Strength Training', d:'Build muscle and power with structured barbell and machine programs.', m:'12 weeks · All levels', i:'photo-1534438327276-14e5300c3a48', x:'Includes progressive overload plans and form checks every two weeks.'},
  {t:'Personal Training', d:'One-on-one coaching built around your goals, schedule and body.', m:'Flexible · Custom', i:'photo-1571019613454-1cb2f99b2d8b', x:'Start with a free assessment, then train with the same coach each session.'},
  {t:'Cardio & Endurance', d:'Raise your stamina with interval, circuit and conditioning sessions.', m:'8 weeks · Beginner+', i:'photo-1517836357463-d25dfeac3438', x:'Heart-rate guided sessions on treadmills, rowers and bikes.'},
  {t:'Yoga & Flexibility', d:'Improve mobility, balance and recovery with guided yoga flows.', m:'6 weeks · All levels', i:'photo-1544367567-0f2fcb009e0b', x:'Small classes focused on breathing, mobility and injury prevention.'}
];
const trainers = [
  {n:'Alex Carter', s:'Strength & Conditioning', b:'10 years coaching lifters. Certified strength specialist (sample).', i:'photo-1581009146145-b5ef050c2e1e'},
  {n:'Maya Singh', s:'Yoga & Mobility', b:'500-hour certified yoga instructor focused on recovery (sample).', i:'photo-1594381898411-846e7d193883'},
  {n:'Jordan Reyes', s:'Cardio & Personal Training', b:'Former sprinter, now an endurance and fat-loss coach (sample).', i:'photo-1567013127542-490d757e51fc'}
];
const reviews = [
  {n:'Sample Member A', r:5, q:'The coaches adjusted my plan every month. I am lifting more than I thought possible.'},
  {n:'Sample Member B', r:5, q:'Clean gym, friendly people and classes that fit around my work hours.'},
  {n:'Sample Member C', r:4, q:'Yoga classes helped my back pain more than anything else I had tried.'}
];
const COLORS = {Strength:'#ff7a1a', Cardio:'#e53935', Yoga:'#43a047', Personal:'#1e88e5'};
const classes = { // day: [name, type, trainer, time]
  Mon:[['Strength Basics','Strength','Alex','6:00-7:00 AM'],['Morning Flow','Yoga','Maya','8:00-9:00 AM']],
  Tue:[['HIIT Circuit','Cardio','Jordan','6:30-7:30 AM'],['Power Lifting','Strength','Alex','6:00-7:15 PM']],
  Wed:[['Mobility Reset','Yoga','Maya','7:00-8:00 AM'],['Coached 1:1','Personal','Jordan','5:00-6:00 PM']],
  Thu:[['Strength Basics','Strength','Alex','6:00-7:00 AM'],['Endurance Run','Cardio','Jordan','7:00-8:00 PM']],
  Fri:[['HIIT Circuit','Cardio','Jordan','6:30-7:30 AM'],['Evening Yoga','Yoga','Maya','6:30-7:30 PM']],
  Sat:[['Open Strength','Strength','Alex','9:00-10:30 AM'],['Coached 1:1','Personal','Jordan','11:00 AM-12:00 PM']],
  Sun:[['Sunday Stretch','Yoga','Maya','10:00-11:00 AM']]
};

/* ---------- Render cards from data ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const socials = '<div class="social"><a href="https://instagram.com" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a><a href="https://facebook.com" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a><a href="https://x.com" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a></div>';

function renderCards() {
  $('#courseGrid').innerHTML = courses.map(c => `
    <article class="card reveal"><div class="imgbox"><img src="${IMG(c.i)}" alt="${c.t} session" loading="lazy"></div>
    <div class="body"><h3>${c.t}</h3><p>${c.d}</p><span class="meta">${c.m}</span>
    <p class="extra">${c.x} <a href="#contact" style="color:#ff7a1a">Enquire</a></p>
    <button class="more" aria-expanded="false">Learn more</button></div></article>`).join('');
  $('#trainerGrid').innerHTML = trainers.map(t => `
    <article class="card trainer reveal"><div class="imgbox"><img src="${IMG(t.i)}" alt="Portrait of trainer ${t.n}" loading="lazy"></div>
    <div class="body"><h3>${t.n}</h3><span class="meta">${t.s}</span><p>${t.b}</p>${socials}</div></article>`).join('');
  $('#testimonialGrid').innerHTML = reviews.map(r => `
    <article class="quote reveal"><div class="stars" aria-label="${r.r} out of 5 stars">${'★'.repeat(r.r)}${'☆'.repeat(5 - r.r)}</div>
    <p>“${r.q}”</p><div class="who"><span class="av" aria-hidden="true">${r.n.slice(-1)}</span><strong>${r.n}</strong></div></article>`).join('');
  const days = Object.keys(classes);
  $('#timetable').innerHTML = '<thead><tr>' + days.map(d => `<th scope="col">${d}</th>`).join('') + '</tr></thead><tbody><tr>' +
    days.map(d => '<td>' + classes[d].map(([n, ty, tr, tm]) => `<span class="cls" style="--c:${COLORS[ty]}"><b>${n}</b><span>${tm}</span><span>with ${tr}</span></span>`).join('') + '</td>').join('') + '</tr></tbody>';
  $('.table-wrap').insertAdjacentHTML('afterend', '<div class="legend">' + Object.entries(COLORS).map(([k, c]) => `<span style="--c:${c}"><i></i>${k}</span>`).join('') + '</div>');
  // "Learn more" toggles extra text on each course card
  $$('#courseGrid .more').forEach(b => b.addEventListener('click', () => {
    const open = b.closest('.card').classList.toggle('open');
    b.setAttribute('aria-expanded', open); b.textContent = open ? 'Show less' : 'Learn more';
  }));
}

/* ---------- Mobile menu ---------- */
function initMenu() {
  const burger = $('#burger'), menu = $('#menu');
  const set = open => { menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open);
    burger.innerHTML = `<i class="fa-solid ${open ? 'fa-xmark' : 'fa-bars'}"></i>`; };
  burger.addEventListener('click', () => set(!menu.classList.contains('open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
}

/* ---------- Hero slider ---------- */
function initSlider() {
  const slides = $$('.slide'), dots = $('#dots'); let i = 0, timer;
  slides.forEach((_, n) => { const b = document.createElement('button'); b.setAttribute('aria-label', 'Go to slide ' + (n + 1)); b.onclick = () => { go(n); restart(); }; dots.append(b); });
  const go = n => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle('active', k === i)); $$('button', dots).forEach((d, k) => d.classList.toggle('on', k === i)); };
  const restart = () => { clearInterval(timer); if (!matchMedia('(prefers-reduced-motion: reduce)').matches) timer = setInterval(() => go(i + 1), 6000); };
  $('#prev').onclick = () => { go(i - 1); restart(); };
  $('#next').onclick = () => { go(i + 1); restart(); };
  go(0); restart();
}

/* ---------- Active nav, back-to-top, reveal ---------- */
function initScroll() {
  const links = $$('.menu a[href^="#"]:not(.btn)'), toTop = $('#toTop');
  const sections = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const update = () => {
    const y = scrollY + 120; let cur = sections[0];
    sections.forEach(s => { if (s.offsetTop <= y) cur = s; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur.id));
    toTop.classList.toggle('show', scrollY > 600);
  };
  addEventListener('scroll', update, {passive: true}); update();
  toTop.onclick = () => scrollTo({top: 0});
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold: .12});
  $$('.reveal').forEach(el => io.observe(el));
}

/* ---------- Pricing buttons: prefill contact subject ---------- */
function initPlans() {
  $$('[data-plan]').forEach(b => b.addEventListener('click', () => { $('#subject').value = b.dataset.plan + ' membership enquiry'; }));
}

/* ---------- Contact form validation ----------
   NOTE: This only validates in the browser. Nothing is sent anywhere.
   Real delivery needs a backend (Node/PHP/etc.) or a form service
   (Formspree, Web3Forms...). Replace the success branch with a fetch() to it. */
function initForm() {
  const form = $('#contactForm'), status = $('#formStatus');
  const rules = {
    name: v => v.trim().length >= 2 || 'Enter your name (at least 2 characters).',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email like name@example.com.',
    phone: v => /^[+\d][\d\s()-]{6,}$/.test(v.trim()) || 'Enter a valid phone number (digits, spaces, + - allowed).',
    subject: v => v.trim().length >= 3 || 'Enter a subject (at least 3 characters).',
    message: v => v.trim().length >= 10 || 'Write a message of at least 10 characters.'
  };
  const check = el => { const r = rules[el.name](el.value), field = el.closest('.field');
    field.classList.toggle('bad', r !== true); $('.err', field).textContent = r === true ? '' : r; return r === true; };
  $$('input,textarea', form).forEach(el => el.addEventListener('blur', () => check(el)));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fields = $$('input,textarea', form), ok = fields.map(check).every(Boolean);
    status.className = 'status ' + (ok ? 'ok' : 'fail');
    if (!ok) { status.textContent = 'Please fix the highlighted fields.'; fields.find(f => f.closest('.bad')).focus(); return; }
    status.textContent = 'Thanks! Your form passed validation. (Demo only: no message was actually sent.)';
    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCards(); initMenu(); initSlider(); initScroll(); initPlans(); initForm();
  $('#year').textContent = new Date().getFullYear();
});
