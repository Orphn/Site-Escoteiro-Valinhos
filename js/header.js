// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const mobileOverlay = document.getElementById("mobileOverlay");
const navLinks = document.querySelectorAll(".nav-link");

function toggleMenu() {
  navMenu.classList.toggle("active");
  mobileOverlay.classList.toggle("active");

  // Bloquear scroll do body
  if (navMenu.classList.contains("active")) {
    document.body.classList.add("menu-open");
  } else {
    document.body.classList.remove("menu-open");
  }
}

menuToggle.addEventListener("click", toggleMenu);
mobileOverlay.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }

    // Update active state
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Close menu on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    mobileOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  }
});

// Prevenir scroll horizontal
document.documentElement.style.overflowX = "hidden";
document.body.style.overflowX = "hidden";
