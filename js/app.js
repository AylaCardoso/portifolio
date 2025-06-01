// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
  // 1. Scroll suave ao navegar para as seções
  document.querySelectorAll('.btn-skills').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (!btn.classList.contains('btn-figma-projeto')) {
        e.preventDefault();
        const section = document.getElementById('skills');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  document.querySelectorAll('.btn-contact').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (!btn.classList.contains('btn-caso-estudo')) {
        e.preventDefault();
        const section = document.getElementById('contato');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. Botão para abrir o projeto Figma (Último projeto)
  document.querySelectorAll('.btn-figma-projeto').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      window.open('https://www.figma.com/design/5dFya2weQj5xaX4qWwCDoX/Projeto-mobile-tcc?node-id=0-1&p=f&t=X9X6oji3i1sC24HW-0', '_blank');
    });
  });

  // 3. Botão para abrir o case de estudo (página HTML)
  document.querySelectorAll('.btn-caso-estudo').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'caso de estudo.html';
    });
  });

  // 4. Validação do formulário de contato
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

  // 5. MENU MOBILE HAMBURGER COM OVERLAY
  const btn = document.querySelector('.menu-mobile-btn');
  const menu = document.getElementById('menu-mobile');
  const closeBtn = document.querySelector('.menu-mobile-close');
  const overlay = document.querySelector('.menu-mobile-overlay');
  function closeMenuMobile() {
    menu.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    btn.style.display = 'block'; // mostra hamburger
    menu.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (btn && menu && closeBtn && overlay) {
    btn.addEventListener('click', function() {
      menu.classList.add('open');
      if (overlay) overlay.classList.add('open');
      btn.style.display = 'none'; // esconde hamburger
      menu.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });
    closeBtn.addEventListener('click', closeMenuMobile);
    overlay.addEventListener('click', closeMenuMobile);
    document.querySelectorAll('.menu-mobile-list a').forEach(link => {
      link.addEventListener('click', closeMenuMobile);
    });
  }
});
