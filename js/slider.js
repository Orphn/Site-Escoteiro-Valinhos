// Funcionalidade do slider
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

// Criar indicadores
const indicatorsContainer = document.getElementById("slideIndicators");
for (let i = 0; i < totalSlides; i++) {
  const indicator = document.createElement("div");
  indicator.classList.add("indicator");
  if (i === 0) indicator.classList.add("active");
  indicator.addEventListener("click", () => irParaSlide(i));
  indicatorsContainer.appendChild(indicator);
}

const indicators = document.querySelectorAll(".indicator");

function mostrarSlide(n) {
  // Volta ao início ou fim se necessário
  if (n >= totalSlides) {
    currentSlide = 0;
  } else if (n < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = n;
  }

  // Atualizar slides
  slides.forEach((slide, index) => {
    slide.classList.remove("active");
    if (index === currentSlide) {
      slide.classList.add("active");
    }
  });

  // Atualizar indicadores
  indicators.forEach((indicator, index) => {
    indicator.classList.remove("active");
    if (index === currentSlide) {
      indicator.classList.add("active");
    }
  });
}

function proximoSlide() {
  mostrarSlide(currentSlide + 1);
}

function slideAnterior() {
  mostrarSlide(currentSlide - 1);
}

function irParaSlide(n) {
  mostrarSlide(n);
}

// Event listeners
document.getElementById("nextSlide").addEventListener("click", proximoSlide);
document.getElementById("prevSlide").addEventListener("click", slideAnterior);

// Navegação por teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    slideAnterior();
  } else if (e.key === "ArrowRight") {
    proximoSlide();
  }
});

// Scroll suave para navegação
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });

      // Atualizar link ativo na navegação
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// Atualizar navegação ativa ao rolar a página
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});
