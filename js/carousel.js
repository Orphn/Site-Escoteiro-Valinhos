// Funcionalidade do carousel GE Valinhos
let currentCardIndex = 0;
const carouselTrack = document.getElementById("carouselTrack");
const cards = document.querySelectorAll(".carousel-card");
const totalCards = cards.length;

// Variável para armazenar quantos cards são visíveis
let cardsVisible = 3;
let isMobile = false;

// Função para calcular quantos cards são visíveis
function updateCardsVisible() {
  const width = window.innerWidth;
  if (width <= 768) {
    cardsVisible = 1;
    isMobile = true;
  } else if (width <= 1200) {
    cardsVisible = 2;
    isMobile = false;
  } else {
    cardsVisible = 3;
    isMobile = false;
  }
}

// Criar dots de navegação
const dotsContainer = document.getElementById("carouselDots");

function createDots() {
  dotsContainer.innerHTML = "";
  const dotsToCreate = totalCards;

  for (let i = 0; i < dotsToCreate; i++) {
    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => irParaCard(i));
    dotsContainer.appendChild(dot);
  }
}

const dots = () => document.querySelectorAll(".carousel-dot");

// Função para atualizar o card central destacado
function updateCenterCard() {
  cards.forEach((card, index) => {
    card.classList.remove("center");
    if (index === currentCardIndex) {
      card.classList.add("center");
    }
  });
}

function mostrarCard(index, noTransition = false) {
  updateCardsVisible();

  // Limitar o índice com loop infinito
  if (index >= totalCards) {
    currentCardIndex = 0;
  } else if (index < 0) {
    currentCardIndex = totalCards - 1;
  } else {
    currentCardIndex = index;
  }

  // Desabilitar transição se necessário
  if (noTransition) {
    carouselTrack.style.transition = "none";
  } else {
    carouselTrack.style.transition = "transform 0.5s ease";
  }

  // Calcular o deslocamento baseado no modo (desktop ou mobile)
  const cardWidth = cards[0].offsetWidth;
  const gap = parseFloat(window.getComputedStyle(carouselTrack).gap);
  let offset;

  if (isMobile) {
    // Mobile: centraliza o card atual
    const containerWidth = document.querySelector(
      ".carousel-container"
    ).offsetWidth;
    offset =
      containerWidth / 2 - cardWidth / 2 - currentCardIndex * (cardWidth + gap);
  } else {
    // Desktop: mantém o card central destacado
    const containerWidth = document.querySelector(
      ".carousel-container"
    ).offsetWidth;
    const centerPosition = containerWidth / 2;
    const cardCenter = cardWidth / 2;
    offset = centerPosition - cardCenter - currentCardIndex * (cardWidth + gap);
  }

  // Aplicar transformação
  carouselTrack.style.transform = `translateX(${offset}px)`;

  // Atualizar card central destacado
  updateCenterCard();

  // Atualizar dots
  dots().forEach((dot, i) => {
    dot.classList.remove("active");
    if (i === currentCardIndex) {
      dot.classList.add("active");
    }
  });

  // Retornar o offset para a função de drag
  return offset;
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

carouselTrack.addEventListener("mousedown", dragStart);
carouselTrack.addEventListener("touchstart", dragStart, { passive: true });
carouselTrack.addEventListener("mouseup", dragEnd);
carouselTrack.addEventListener("touchend", dragEnd);
carouselTrack.addEventListener("mouseleave", dragEnd);
carouselTrack.addEventListener("mousemove", drag);
carouselTrack.addEventListener("touchmove", drag, { passive: true });

function dragStart(e) {
  if (!isMobile) return; // Só permite drag no mobile

  isDragging = true;
  startPos = getPositionX(e);
  carouselTrack.style.cursor = "grabbing";
  carouselTrack.style.transition = "none";
}

function drag(e) {
  if (!isDragging || !isMobile) return;

  const currentPosition = getPositionX(e);
  currentTranslate = prevTranslate + currentPosition - startPos;
  carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
}

function dragEnd(e) {
  if (!isDragging || !isMobile) return;

  isDragging = false;
  carouselTrack.style.cursor = "grab";
  carouselTrack.style.transition = "transform 0.5s ease";

  const movedBy = currentTranslate - prevTranslate;
  const threshold = 50; // Threshold menor para mobile

  // Determina a direção do swipe com loop infinito
  if (movedBy < -threshold) {
    currentCardIndex += 1;
    if (currentCardIndex >= totalCards) {
      currentCardIndex = 0;
    }
  } else if (movedBy > threshold) {
    currentCardIndex -= 1;
    if (currentCardIndex < 0) {
      currentCardIndex = totalCards - 1;
    }
  }

  // Ancora na posição correta
  const finalOffset = mostrarCard(currentCardIndex);
  prevTranslate = finalOffset;
  currentTranslate = finalOffset;
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

// Inicializar carousel
updateCardsVisible();
createDots();
prevTranslate = mostrarCard(0);
currentTranslate = prevTranslate;

// Atualizar ao redimensionar
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    updateCardsVisible();
    createDots();
    prevTranslate = mostrarCard(currentCardIndex);
    currentTranslate = prevTranslate;
  }, 250);
});
