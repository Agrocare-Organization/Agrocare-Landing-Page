// =====MENU=====
const menuBtn = document.getElementById('menuBtn');
const nav = document.querySelector('.nav');
let drawer;

menuBtn.addEventListener('click', () => {
    if (!drawer) {
        drawer = document.createElement('nav');
        drawer.className = 'nav__drawer';
        drawer.innerHTML = `
      <a href="#inicio">Inicio</a>
      <a href="#nosotros">Nosotros</a>
      <a href="#beneficios">Beneficios</a>
      <a href="#recomendaciones">Recomendaciones</a>
      <a href="#mis-plantas">Mis plantas</a>
      <a href="#calendario">Calendario</a>
      <a href="#contacto">Contáctanos</a>
    `;
        document.body.appendChild(drawer);

        drawer.querySelectorAll('a').forEach(a=>{
            a.addEventListener('click', () => drawer.classList.remove('open'));
        });

        //drawe para estilos minimos
        const style = document.createElement('style');
        style.textContent = `
      .nav__drawer{
        position: fixed; top:60px; right:16px; background:#103d21; color:#fff;
        display:flex; flex-direction:column; gap:.4rem; padding:.8rem; border-radius:12px;
        box-shadow:0 10px 26px rgba(0,0,0,.25); transform:scale(.95); opacity:0; pointer-events:none;
        transition:.2s ease;
      }
      .nav__drawer a{color:#e6f6eb; text-decoration:none; padding:.5rem .6rem; border-radius:8px}
      .nav__drawer a:hover{background:rgba(255,255,255,.1)}
      .nav__drawer.open{transform:scale(1); opacity:1; pointer-events:auto}
    `;
        document.head.appendChild(style);
    }

    drawer.classList.toggle('open');
});

// =====scroll suave + activar enlace =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
            document.querySelectorAll('.nav__links a').forEach(a=>a.classList.remove('active'));
            const desktopLink = document.querySelector(`.nav__links a[href="${link.getAttribute('href')}"]`);
            if (desktopLink) desktopLink.classList.add('active');
        }
    });
});

// ===== Formulario de contacto=====
const form = document.getElementById('contactForm');
const msg  = document.getElementById('formMsg');

form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    //  enviar con fetch() a tu backend
    msg.textContent = `¡Gracias, ${data.name}! Te responderemos a ${data.email} pronto`;
    form.reset();
});
