// Portfolio interactions — Vinay Soni
const nav = document.getElementById('navbar');
const links = document.querySelectorAll('.nav-links a[href^="#"]');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// close on link click (mobile)
links.forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// active link on scroll + navbar shadow
const sections = ['home','about','skills','work','experience','contact'].map(id => document.getElementById(id)).filter(Boolean);
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 8) nav.style.boxShadow = '0 6px 30px rgba(0,0,0,0.06)';
  else nav.style.boxShadow = 'none';

  let current = 'home';
  for (const s of sections) {
    const top = s.offsetTop - 110;
    if (y >= top) current = s.id;
  }
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('in');
  });
},{threshold:0.12});
document.querySelectorAll('.project-card, .exp-card, .process-step, .skill-group, .trait, .about-ill, .hero-text, .hero-ill').forEach(el=>{
  el.classList.add('reveal'); io.observe(el);
});

// smooth scroll offset for sticky header already handled by CSS scroll-behavior; but ensure focus
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    if(id.length>1){
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({top, behavior:'smooth'});
      }
    }
  });
});

console.log('Vinay Soni Portfolio — ready for Vercel & GitHub Pages');
