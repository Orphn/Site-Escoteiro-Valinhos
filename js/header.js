// --- Configuração ---
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const mobileOverlay = document.getElementById("mobileOverlay");
const navLinks = document.querySelectorAll(".nav-link");

// Variável global para guardar a posição
let savedScrollPosition = 0;

// --- Funções ---

/**
 * Trava o scroll e abre o menu
 */
function openMenu() {
  // 1. Salva a posição exata
  savedScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;

  // 2. Trava o body na posição atual (A MÁGICA ESTÁ AQUI)
  // Nós mesmos aplicamos os estilos, sem depender de classes
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.width = "100%"; // Previne "pulo" do layout
  document.body.style.top = `-${savedScrollPosition}px`;

  // 3. Mostra o menu e o overlay
  navMenu.classList.add("active");
  mobileOverlay.classList.add("active");
}

/**
 * Fecha o menu e decide o que fazer com o scroll
 * @param {boolean} restoreScroll - Se true, volta ao ponto salvo (clique no overlay).
 */
function closeMenu(restoreScroll = true) {
  // 1. Destrava o body, removendo os estilos inline
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.width = "";
  document.body.style.top = "";

  // 2. Esconde o menu e o overlay
  navMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");

  // 3. Lógica de Scroll
  if (restoreScroll) {
    // Caso (A): Clique no overlay/hamburger para fechar
    // Queremos voltar ao ponto salvo IMEDIATAMENTE, sem animação.

    // Desliga o 'scroll-behavior: smooth' temporariamente
    document.documentElement.style.scrollBehavior = "auto";

    // Pula para a posição salva
    window.scrollTo(0, savedScrollPosition);

    // Liga o 'scroll-behavior' de volta (se houver)
    document.documentElement.style.scrollBehavior = "";
  }
  // Caso (B): Se 'restoreScroll' for false (clicou num link)
  // Não fazemos nada, só deixamos o navegador rolar para a âncora.
}

// --- Event Listeners ---

// 1. Clique no Hamburger (Abrir/Fechar)
menuToggle.addEventListener("click", () => {
  if (navMenu.classList.contains("active")) {
    closeMenu(true); // Fecha e restaura a posição
  } else {
    openMenu(); // Abre
  }
});

// 2. Clique no Overlay (Fechar)
mobileOverlay.addEventListener("click", () => {
  closeMenu(true); // Fecha e restaura a posição
});

// 3. Clique nos Links do Menu (Fechar e Rolar)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768 && navMenu.classList.contains("active")) {
      closeMenu(false); // Apenas fecha, NÃO restaura a posição
    }
    // Atualiza estado ativo
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// --- Outros Listeners ---

// Fecha o menu se redimensionar a tela
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
    closeMenu(true); // Fecha e restaura
  }
});

// Prevenir scroll horizontal (que já estava no seu)
document.documentElement.style.overflowX = "hidden";
document.body.style.overflowX = "hidden";
