document.addEventListener('DOMContentLoaded', function() {
  // 1. Scroll suave para as seções
  document.querySelectorAll('.btn-skills').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const section = document.getElementById('skills');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.btn-contact').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const section = document.getElementById('contato');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 2. Botão para baixar o portfólio em PDF
  document.querySelectorAll('.btn-baixar-portifolio').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      window.open('downloads/ayla-cardoso-portifolio.pdf', '_blank');
    });
  });

  // 3. Botão para abrir o case de estudo (página HTML)
  document.querySelectorAll('.btn-caso-estudo').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'caso de estudo.html';
    });
  });

  // 4. Elementos principais
  const navMenu = document.querySelector('.menu');
  const bgBtnMobile = document.querySelector('.bg-btn-mobile');
  const sobreMimSection = document.querySelector('.sobre-mim-section');
  const btn = document.querySelector('.menu-mobile-btn');
  const menu = document.getElementById('menu-mobile');
  const closeBtn = document.querySelector('.menu-mobile-close');
  const overlay = document.querySelector('.menu-mobile-overlay');

  // 5. Controle da barra verde e fundo do menu
  function handleBarraVerdeTopo() {
    if (!sobreMimSection) return;
    const rect = sobreMimSection.getBoundingClientRect();
    const is800 = window.innerWidth <= 800;

    // Desktop: Ativa fundo no menu principal
    if (!is800 && navMenu) {
      if (rect.top <= 0) {
        navMenu.classList.add('nav-bg-dark');
      } else {
        navMenu.classList.remove('nav-bg-dark');
      }
      if (bgBtnMobile) bgBtnMobile.classList.add('hide');
    }
    // Mobile: Ativa barra verde
    else if (is800 && bgBtnMobile) {
      if (rect.top <= 0 && !menu.classList.contains('open')) {
        bgBtnMobile.classList.remove('hide');
      } else {
        bgBtnMobile.classList.add('hide');
      }
      if (navMenu) navMenu.classList.remove('nav-bg-dark');
    }
  }

  // 6. MENU MOBILE HAMBURGER COM OVERLAY
  function closeMenuMobile() {
    menu.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    btn.style.display = 'block';
    menu.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    handleBarraVerdeTopo();
  }

  if (btn && menu && closeBtn && overlay) {
    btn.addEventListener('click', function() {
      menu.classList.add('open');
      if (overlay) overlay.classList.add('open');
      btn.style.display = 'none';
      menu.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (bgBtnMobile) bgBtnMobile.classList.add('hide');
    });

    closeBtn.addEventListener('click', closeMenuMobile);
    overlay.addEventListener('click', closeMenuMobile);
    document.querySelectorAll('.menu-mobile-list a').forEach(link => {
      link.addEventListener('click', closeMenuMobile);
    });
  }

  // 7. Validação do formulário de contato
  const form = document.querySelector('.contato-form');
  if (form) {
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');
    const erroNome = document.getElementById('erro-nome')?.querySelector('span');
    const erroEmail = document.getElementById('erro-email')?.querySelector('span');
    const erroMensagem = document.getElementById('erro-mensagem')?.querySelector('span');

    function validaNome() {
      if (!nome.value.trim()) {
        nome.classList.add('erro');
        nome.classList.remove('sucesso');
        nome.parentElement.classList.add('erro');
        nome.parentElement.classList.remove('sucesso');
        if (erroNome) erroNome.textContent = 'Este campo não pode estar vazio.';
        return false;
      } else {
        nome.classList.remove('erro');
        nome.classList.add('sucesso');
        nome.parentElement.classList.remove('erro');
        nome.parentElement.classList.add('sucesso');
        if (erroNome) erroNome.textContent = '';
        return true;
      }
    }

    function validaEmail() {
      const emailVal = email.value.trim();
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        email.classList.add('erro');
        email.classList.remove('sucesso');
        email.parentElement.classList.add('erro');
        email.parentElement.classList.remove('sucesso');
        if (erroEmail) erroEmail.textContent = 'Este campo não pode estar vazio.';
        return false;
      } else if (!regex.test(emailVal)) {
        email.classList.add('erro');
        email.classList.remove('sucesso');
        email.parentElement.classList.add('erro');
        email.parentElement.classList.remove('sucesso');
        if (erroEmail) erroEmail.textContent = 'Por favor, insira um email válido.';
        return false;
      } else {
        email.classList.remove('erro');
        email.classList.add('sucesso');
        email.parentElement.classList.remove('erro');
        email.parentElement.classList.add('sucesso');
        if (erroEmail) erroEmail.textContent = '';
        return true;
      }
    }

    function validaMensagem() {
      if (!mensagem.value.trim()) {
        mensagem.classList.add('erro');
        mensagem.classList.remove('sucesso');
        mensagem.parentElement.classList.add('erro');
        mensagem.parentElement.classList.remove('sucesso');
        if (erroMensagem) erroMensagem.textContent = 'Este campo não pode estar vazio.';
        return false;
      } else {
        mensagem.classList.remove('erro');
        mensagem.classList.add('sucesso');
        mensagem.parentElement.classList.remove('erro');
        mensagem.parentElement.classList.add('sucesso');
        if (erroMensagem) erroMensagem.textContent = '';
        return true;
      }
    }

    nome.addEventListener('input', validaNome);
    email.addEventListener('input', validaEmail);
    mensagem.addEventListener('input', validaMensagem);

    form.addEventListener('submit', function(e) {
      const validNome = validaNome();
      const validEmail = validaEmail();
      const validMensagem = validaMensagem();
      if (!validNome || !validEmail || !validMensagem) {
        e.preventDefault();
      }
    });
  }

  // 8. CAROUSEL INFINITO (3 IMAGENS VISÍVEIS)
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const visible = 3;
  const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginRight);

// Clona as 3 primeiras e 3 últimas imagens
  for (let i = 0; i < visible; i++) {
    track.appendChild(slides[i].cloneNode(true));
    track.insertBefore(slides[slides.length - 1 - i].cloneNode(true), track.firstChild);
  }

// Atualiza lista de slides após clonagem
  const allSlides = Array.from(track.children);

// Posição inicial: depois dos clones iniciais
  let position = visible;
  track.style.transform = `translateX(-${position * slideWidth}px)`;

// Função para avançar
  function moveToNext() {
    position++;
    track.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
    track.style.transform = `translateX(-${position * slideWidth}px)`;

    track.addEventListener('transitionend', function handler() {
      // Se chegou no final dos clones, reseta para o início real
      if (position === allSlides.length - visible) {
        track.style.transition = 'none';
        position = visible;
        track.style.transform = `translateX(-${position * slideWidth}px)`;
      }
      track.removeEventListener('transitionend', handler);
    });
  }

// Função para voltar
  function moveToPrev() {
    position--;
    track.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
    track.style.transform = `translateX(-${position * slideWidth}px)`;

    track.addEventListener('transitionend', function handler() {
      // Se chegou no início dos clones, reseta para o final real
      if (position === 0) {
        track.style.transition = 'none';
        position = allSlides.length - 2 * visible;
        track.style.transform = `translateX(-${position * slideWidth}px)`;
      }
      track.removeEventListener('transitionend', handler);
    });
  }

  document.querySelector('.carousel-arrow.right').onclick = moveToNext;
  document.querySelector('.carousel-arrow.left').onclick = moveToPrev;

  // 9. Eventos globais
  window.addEventListener('scroll', handleBarraVerdeTopo);
  window.addEventListener('resize', handleBarraVerdeTopo);
  handleBarraVerdeTopo();
});
