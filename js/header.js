// --- Configuração ---
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const mobileOverlay = document.getElementById("mobileOverlay");
const navLinks = document.querySelectorAll(".nav-link");

let savedScrollPosition = 0;

function openMenu() {
  savedScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;

  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  document.body.style.top = `-${savedScrollPosition}px`;

  navMenu.classList.add("active");
  mobileOverlay.classList.add("active");
}

/**
 * @param {boolean} restoreScroll
 */
function closeMenu(restoreScroll = true) {
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.width = "";
  document.body.style.top = "";

  navMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");

  if (restoreScroll) {
    document.documentElement.style.scrollBehavior = "auto";

    window.scrollTo(0, savedScrollPosition);
    document.documentElement.style.scrollBehavior = "";
  }
}

menuToggle.addEventListener("click", () => {
  if (navMenu.classList.contains("active")) {
    closeMenu(true);
  } else {
    openMenu();
  }
});

mobileOverlay.addEventListener("click", () => {
  closeMenu(true);
});

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && navMenu.classList.contains("active")) {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      closeMenu(true);
      setTimeout(() => {
        document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

// Fecha o menu se redimensionar a tela
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
    closeMenu(true); // Fecha e restaura
  }
});

// Prevenir scroll horizontal
document.documentElement.style.overflowX = "hidden";
document.body.style.overflowX = "hidden";
