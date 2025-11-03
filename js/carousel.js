// Funcionalidade do carousel GE Valinhos
let currentCardIndex = 0;
const carouselTrack = document.getElementById("carouselTrack");
const cards = document.querySelectorAll(".carousel-card");
const totalCards = cards.length;

// Variável para armazenar quantos cards são visíveis
let cardsVisible = 3;

// Função para calcular quantos cards são visíveis
function updateCardsVisible() {
  const width = window.innerWidth;
  if (width <= 768) {
    cardsVisible = 1;
  } else if (width <= 1200) {
    cardsVisible = 2;
  } else {
    cardsVisible = 3;
  }
}

// Criar dots de navegação
const dotsContainer = document.getElementById("carouselDots");
const maxDots = totalCards - cardsVisible + 1;

function createDots() {
  dotsContainer.innerHTML = "";
  const dotsToCreate = totalCards - cardsVisible + 1;

  for (let i = 0; i < dotsToCreate; i++) {
    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => irParaCard(i));
    dotsContainer.appendChild(dot);
  }
}

const dots = () => document.querySelectorAll(".carousel-dot");

function mostrarCard(index) {
  updateCardsVisible();
  const maxIndex = totalCards - cardsVisible;

  // Limitar o índice
  if (index > maxIndex) {
    currentCardIndex = maxIndex;
  } else if (index < 0) {
    currentCardIndex = 0;
  } else {
    currentCardIndex = index;
  }

  // Calcular o deslocamento
  const cardWidth = cards[0].offsetWidth;
  const gap = 40;
  const offset = -(currentCardIndex * (cardWidth + gap));

  // Aplicar transformação
  carouselTrack.style.transform = `translateX(${offset}px)`;

  // Atualizar dots
  dots().forEach((dot, i) => {
    dot.classList.remove("active");
    if (i === currentCardIndex) {
      dot.classList.add("active");
    }
  });
}

function proximoCard() {
  mostrarCard(currentCardIndex + 1);
}

function cardAnterior() {
  mostrarCard(currentCardIndex - 1);
}

function irParaCard(index) {
  mostrarCard(index);
}

// Event listeners
document.getElementById("nextCard").addEventListener("click", proximoCard);
document.getElementById("prevCard").addEventListener("click", cardAnterior);

// Navegação por teclado no carousel
document.addEventListener("keydown", (e) => {
  const geSection = document.getElementById("ge-valinhos");
  const rect = geSection.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight && rect.bottom >= 0;

  if (isInView) {
    if (e.key === "ArrowLeft") {
      cardAnterior();
    } else if (e.key === "ArrowRight") {
      proximoCard();
    }
  }
});

// Suporte para arrastar (touch/mouse)
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

carouselTrack.addEventListener("mousedown", dragStart);
carouselTrack.addEventListener("touchstart", dragStart);
carouselTrack.addEventListener("mouseup", dragEnd);
carouselTrack.addEventListener("touchend", dragEnd);
carouselTrack.addEventListener("mouseleave", dragEnd);
carouselTrack.addEventListener("mousemove", drag);
carouselTrack.addEventListener("touchmove", drag);

function dragStart(e) {
  isDragging = true;
  startPos = getPositionX(e);
  animationID = requestAnimationFrame(animation);
  carouselTrack.style.cursor = "grabbing";
}

function drag(e) {
  if (isDragging) {
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function dragEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  carouselTrack.style.cursor = "grab";

  const movedBy = currentTranslate - prevTranslate;

  // Se arrastou mais de 100px, muda de card
  if (movedBy < -100 && currentCardIndex < totalCards - cardsVisible) {
    currentCardIndex += 1;
  }

  if (movedBy > 100 && currentCardIndex > 0) {
    currentCardIndex -= 1;
  }

  mostrarCard(currentCardIndex);
  prevTranslate = currentTranslate;
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

function animation() {
  if (isDragging) requestAnimationFrame(animation);
}

// Inicializar carousel
updateCardsVisible();
createDots();
mostrarCard(0);

// Atualizar ao redimensionar
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    updateCardsVisible();
    createDots();
    mostrarCard(currentCardIndex);
  }, 250);
});
