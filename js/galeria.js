// Dados da galeria - Você pode modificar ou carregar de uma API
const galeriaData = [
  {
    type: "image",
    src: "./img/galeria1.jpg",
    title: "Acampamento de Verão 2024",
    description:
      "Nosso tradicional acampamento de verão reuniu mais de 50 escoteiros em três dias de aventura, aprendizado e diversão na natureza.",
    date: "15 de Janeiro, 2024",
  },
  {
    type: "video",
    src: "./videos/atividade1.mp4",
    thumbnail: "./img/video-thumb1.jpg",
    title: "Atividades de Nós e Amarras",
    description:
      "Aprenda com nossos escoteiros as técnicas fundamentais de nós e amarras utilizadas em diversas atividades do movimento.",
    date: "03 de Março, 2024",
  },
  {
    type: "image",
    src: "./img/galeria2.jpg",
    title: "Projeto Ambiental",
    description:
      "Ação de limpeza e conscientização ambiental realizada na praça central de Valinhos com participação da comunidade.",
    date: "22 de Abril, 2024",
  },
  {
    type: "image",
    src: "./img/galeria3.jpg",
    title: "Cerimônia de Promessa",
    description:
      "Momento especial onde novos membros fizeram sua promessa escoteira, assumindo o compromisso com os valores do movimento.",
    date: "10 de Maio, 2024",
  },
  {
    type: "video",
    src: "./videos/atividade2.mp4",
    thumbnail: "./img/video-thumb2.jpg",
    title: "Jogos Cooperativos",
    description:
      "Confira os momentos de diversão e aprendizado durante nossas atividades de jogos cooperativos com todas as seções.",
    date: "18 de Junho, 2024",
  },
  {
    type: "image",
    src: "./img/galeria4.jpg",
    title: "Reunião Semanal",
    description:
      "Encontro semanal repleto de atividades educativas, jogos e momentos de confraternização entre os membros.",
    date: "05 de Agosto, 2024",
  },
];

let currentGaleriaIndex = 0;
let galeriaItems = [];

// Inicializa a galeria
function initGaleria() {
  const track = document.getElementById("galeriaTrack");
  const indicators = document.getElementById("galeriaIndicators");

  if (!track || !indicators) return;

  // Cria os itens da galeria
  galeriaData.forEach((item, index) => {
    const galeriaItem = createGaleriaItem(item, index);
    track.appendChild(galeriaItem);
    galeriaItems.push(galeriaItem);

    // Cria indicador
    const indicator = document.createElement("div");
    indicator.className = `galeria-indicator ${index === 0 ? "active" : ""}`;
    indicator.addEventListener("click", () => goToGaleriaItem(index));
    indicators.appendChild(indicator);
  });

  updateGaleriaPositions();
}

// Cria um item da galeria
function createGaleriaItem(item, index) {
  const itemDiv = document.createElement("div");
  itemDiv.className = "galeria-item";
  itemDiv.dataset.index = index;

  let mediaHTML = "";

  if (item.type === "image") {
    mediaHTML = `
      <div class="galeria-media">
        <img src="${item.src}" alt="${item.title}" onerror="this.parentElement.innerHTML='<div class=\\'placeholder\\'>Imagem não disponível</div>'">
      </div>
    `;
  } else if (item.type === "video") {
    mediaHTML = `
      <div class="galeria-media">
        <img src="${item.thumbnail || item.src}" alt="${item.title}" onerror="this.parentElement.innerHTML='<div class=\\'placeholder\\'>Vídeo não disponível</div>'">
        <div class="video-overlay" onclick="openVideoModal(${index})">
          <div class="play-icon">
            <svg viewBox="0 0 24 24">
              <polygon points="8 5 19 12 8 19 8 5"></polygon>
            </svg>
          </div>
        </div>
      </div>
    `;
  }

  itemDiv.innerHTML = `
    ${mediaHTML}
    <div class="galeria-description">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <span class="galeria-date">${item.date}</span>
    </div>
  `;

  return itemDiv;
}

// Calcula a posição relativa de cada item em relação ao centro
function getRelativePosition(itemIndex, centerIndex, totalItems) {
  let diff = itemIndex - centerIndex;

  // Ajusta para criar o efeito circular
  if (diff > totalItems / 2) {
    diff -= totalItems;
  } else if (diff < -totalItems / 2) {
    diff += totalItems;
  }

  return diff;
}

// Atualiza as posições dos itens no carrossel
function updateGaleriaPositions() {
  const totalItems = galeriaItems.length;

  galeriaItems.forEach((item, index) => {
    const relativePos = getRelativePosition(
      index,
      currentGaleriaIndex,
      totalItems
    );

    // Remove todas as classes de posição
    item.classList.remove(
      "center",
      "left-1",
      "left-2",
      "right-1",
      "right-2",
      "hidden"
    );

    // Adiciona a classe apropriada baseada na posição relativa
    if (relativePos === 0) {
      item.classList.add("center");
    } else if (relativePos === -1) {
      item.classList.add("left-1");
    } else if (relativePos === -2) {
      item.classList.add("left-2");
    } else if (relativePos === 1) {
      item.classList.add("right-1");
    } else if (relativePos === 2) {
      item.classList.add("right-2");
    } else {
      item.classList.add("hidden");
    }
  });

  // Atualiza os indicadores
  const indicators = document.querySelectorAll(".galeria-indicator");
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentGaleriaIndex);
  });
}

// Navega para item específico
function goToGaleriaItem(index) {
  currentGaleriaIndex = index;
  updateGaleriaPositions();
}

// Próximo item
function nextGaleriaItem() {
  currentGaleriaIndex = (currentGaleriaIndex + 1) % galeriaData.length;
  updateGaleriaPositions();
}

// Item anterior
function prevGaleriaItem() {
  currentGaleriaIndex =
    (currentGaleriaIndex - 1 + galeriaData.length) % galeriaData.length;
  updateGaleriaPositions();
}

// Modal de vídeo
function openVideoModal(index) {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("modalVideo");
  const item = galeriaData[index];

  if (item.type === "video" && modal && video) {
    video.src = item.src;
    modal.classList.add("active");
    video.play();
  }
}

function closeVideoModal() {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("modalVideo");

  if (modal && video) {
    modal.classList.remove("active");
    video.pause();
    video.src = "";
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  initGaleria();

  const prevBtn = document.getElementById("prevGaleria");
  const nextBtn = document.getElementById("nextGaleria");
  const modalClose = document.querySelector(".video-modal-close");
  const modal = document.getElementById("videoModal");

  if (prevBtn) prevBtn.addEventListener("click", prevGaleriaItem);
  if (nextBtn) nextBtn.addEventListener("click", nextGaleriaItem);
  if (modalClose) modalClose.addEventListener("click", closeVideoModal);

  // Fecha modal ao clicar fora do vídeo
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeVideoModal();
      }
    });
  }

  // Navegação por teclado (apenas quando não estiver em outros carrosséis)
  document.addEventListener("keydown", (e) => {
    // Verifica se a galeria está visível na viewport
    const galeriaSection = document.getElementById("galeria");
    if (galeriaSection) {
      const rect = galeriaSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        if (e.key === "ArrowLeft") {
          prevGaleriaItem();
        } else if (e.key === "ArrowRight") {
          nextGaleriaItem();
        }
      }
    }

    if (e.key === "Escape") {
      closeVideoModal();
    }
  });

  // Clique no item central para abrir vídeo
  document.addEventListener("click", (e) => {
    const centerItem = document.querySelector(".galeria-item.center");
    if (
      centerItem &&
      centerItem.contains(e.target) &&
      !e.target.closest(".video-overlay")
    ) {
      const index = parseInt(centerItem.dataset.index);
      const item = galeriaData[index];
      if (item.type === "video") {
        openVideoModal(index);
      }
    }
  });
});

// Auto-play opcional (descomente se quiser rotação automática)
// setInterval(nextGaleriaItem, 5000);
