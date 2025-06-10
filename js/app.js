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
      window.location.href = 'caso de estudo.html';
    });
  });


  // 4. Elementos principais
  const navMenu = document.querySelector('.menu');
  const bgBtnMobile = document.querySelector('.bg-btn-mobile');
  const btn = document.querySelector('.menu-mobile-btn');
  const menu = document.getElementById('menu-mobile');
  const closeBtn = document.querySelector('.menu-mobile-close');
  const overlay = document.querySelector('.menu-mobile-overlay');

  // 5. Controle da barra verde - Versão universal
  function handleBarraVerdeTopo() {
    let targetElement;

    // Verifica qual página está
    if (document.querySelector('.header-case h1')) { // Página do caso de estudo
      targetElement = document.querySelector('.header-case h1');
    } else { // Página principal
      targetElement = document.querySelector('.sobre-mim-section');
    }

    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    const is800 = window.innerWidth <= 800;

    // Desktop: Ativa fundo verde quando o elemento alvo entra na viewport
    if (!is800 && navMenu) {
      if (rect.top <= 100) { // Ajuste de sensibilidade
        navMenu.classList.add('nav-bg-green');
        navMenu.classList.remove('nav-bg-dark');
      } else {
        navMenu.classList.remove('nav-bg-green');
      }
      if (bgBtnMobile) bgBtnMobile.classList.add('hide');
    }
    // Mobile: Mantém a lógica original
    else if (is800 && bgBtnMobile) {
      if (rect.top <= 100 && !menu.classList.contains('open')) {
        bgBtnMobile.classList.remove('hide');
      } else {
        bgBtnMobile.classList.add('hide');
      }
      if (navMenu) navMenu.classList.remove('nav-bg-green');
    }
  }

  // 6. MENU MOBILE HAMBURGER COM OVERLAY (mantido original)
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

  // 8. CARROSSEL RESPONSIVO COMPLETO
  const carouselInit = () => {
    const track = document.querySelector('.carousel-track');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    if (!track || !indicatorsContainer) return;

    const slides = Array.from(track.children);
    let visible = 3;
    let currentPage = 0;
    let isAnimating = false;

    // Configurações de margem
    const marginBetween = 15;
    const totalMargin = marginBetween * (visible - 1);

    // Função para determinar número de slides visíveis
    const updateVisibleSlides = () => {
      const width = window.innerWidth;
      if (width <= 768) visible = 1;
      else if (width <= 1199) visible = 2;
      else visible = 3;
    };

    // Calcula largura dos slides dinamicamente
    const calculateSlideWidth = () => {
      const containerWidth = track.parentElement.offsetWidth;
      return (containerWidth - totalMargin) / visible;
    };

    // Atualiza indicadores
    const updateIndicators = () => {
      indicatorsContainer.innerHTML = '';
      const totalPages = Math.ceil(slides.length / visible);

      for (let i = 0; i < totalPages; i++) {
        const button = document.createElement('button');
        button.addEventListener('click', () => goToPage(i));
        button.classList.toggle('active', i === currentPage);
        indicatorsContainer.appendChild(button);
      }
    };

    // Navegação suave
    const smoothScroll = (offset) => {
      isAnimating = true;
      track.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
      track.style.transform = `translateX(${offset}px)`;

      track.addEventListener('transitionend', () => {
        isAnimating = false;
      }, { once: true });
    };

    // Navega para página específica
    const goToPage = (page) => {
      if (isAnimating) return;

      const totalPages = Math.ceil(slides.length / visible);
      currentPage = Math.max(0, Math.min(page, totalPages - 1));
      const slideWidth = calculateSlideWidth();
      const offset = -(currentPage * (slideWidth + marginBetween) * visible);

      smoothScroll(offset);
      updateIndicators();
    };

    // Controle de redimensionamento
    const handleResize = () => {
      updateVisibleSlides();
      const newTotalPages = Math.ceil(slides.length / visible);
      currentPage = Math.min(currentPage, newTotalPages - 1);
      goToPage(currentPage);
    };

    // Controle de touch
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) goToPage(currentPage + 1);
        else goToPage(currentPage - 1);
      }
    });

    // Inicialização
    updateVisibleSlides();
    updateIndicators();
    window.addEventListener('resize', handleResize);
    goToPage(0);
  };

  // Inicializa o carrossel
  carouselInit();

  // 9. Eventos globais atualizados
  window.addEventListener('scroll', handleBarraVerdeTopo);
  window.addEventListener('resize', handleBarraVerdeTopo);
  handleBarraVerdeTopo();
});
