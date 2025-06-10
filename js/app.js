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
      window.location.href = 'caso-de-estudo.html';
    });
  });

  // 4. Elementos principais do menu
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
    const isMobile = window.innerWidth <= 1023;

// Desktop: Ativa fundo verde quando o elemento alvo entra na viewport
    if (!isMobile && navMenu) {
      navMenu.classList.toggle('nav-bg-green', rect.top <= 100);
      if (bgBtnMobile) bgBtnMobile.classList.add('hide');
    }
// Mobile: Mostra barra verde quando o título sai da viewport
    else if (isMobile && bgBtnMobile) {
      const shouldShow = rect.top <= 100;
      bgBtnMobile.classList.toggle('hide', !shouldShow);

      // Aplica fundo verde no menu mobile quando aberto
      if (menu) {
        menu.classList.toggle('nav-bg-green', shouldShow && menu.classList.contains('open'));
      }
    }
  }

  // 6. Controle do menu mobile
  function toggleMenuMobile(abrir) {
    if (abrir) {
      menu.classList.add('open');
      overlay.classList.add('open');
      btn.style.display = 'none';
      menu.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      menu.classList.remove('open');
      overlay.classList.remove('open');
      btn.style.display = 'block';
      menu.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    handleBarraVerdeTopo();
  }

  if (btn && menu && closeBtn && overlay) {
    // Abrir menu
    btn.addEventListener('click', () => toggleMenuMobile(true));

    // Fechar menu
    const closeActions = [closeBtn, overlay];
    closeActions.forEach(element => {
      element.addEventListener('click', () => toggleMenuMobile(false));
    });

    // Fechar ao clicar em links do menu
    document.querySelectorAll('.menu-mobile-list a').forEach(link => {
      link.addEventListener('click', () => toggleMenuMobile(false));
    });
  }

  // 7. Validação do formulário de contato
  const form = document.querySelector('.contato-form');
  if (form) {
    const campos = {
      nome: document.getElementById('nome'),
      email: document.getElementById('email'),
      mensagem: document.getElementById('mensagem')
    };

    const erros = {
      nome: document.getElementById('erro-nome')?.querySelector('span'),
      email: document.getElementById('erro-email')?.querySelector('span'),
      mensagem: document.getElementById('erro-mensagem')?.querySelector('span')
    };

    // Função genérica de validação
    function validarCampo(campo, valor, regex = null) {
      const parent = campo.parentElement;
      const erro = erros[campo.id];

      if (!valor.trim()) {
        campo.classList.add('erro');
        parent.classList.add('erro');
        if (erro) erro.textContent = 'Este campo não pode estar vazio.';
        return false;
      }

      if (regex && !regex.test(valor)) {
        campo.classList.add('erro');
        parent.classList.add('erro');
        if (erro) erro.textContent = 'Formato inválido.';
        return false;
      }

      campo.classList.remove('erro');
      parent.classList.remove('erro');
      if (erro) erro.textContent = '';
      return true;
    }

    // Validações específicas
    campos.nome.addEventListener('input', () => {
      validarCampo(campos.nome, campos.nome.value);
    });

    campos.email.addEventListener('input', () => {
      validarCampo(campos.email, campos.email.value, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    campos.mensagem.addEventListener('input', () => {
      validarCampo(campos.mensagem, campos.mensagem.value);
    });

    // Submit handler
    form.addEventListener('submit', function(e) {
      const resultados = [
        validarCampo(campos.nome, campos.nome.value),
        validarCampo(campos.email, campos.email.value, /^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        validarCampo(campos.mensagem, campos.mensagem.value)
      ];

      if (resultados.includes(false)) {
        e.preventDefault();
      }
    });
  }

  // 8. Eventos globais
  window.addEventListener('scroll', handleBarraVerdeTopo);
  window.addEventListener('resize', handleBarraVerdeTopo);
  handleBarraVerdeTopo();
});
