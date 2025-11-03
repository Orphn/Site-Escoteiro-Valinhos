// Configuração da linha do tempo com conteúdo completo
const timelineData = [
  {
    year: 1994,
    title: "Fundação do GE Valinhos",
    description:
      "O Grupo Escoteiro Valinhos 252°/SP foi fundado em 1994, marcando o início de uma trajetória dedicada à formação de jovens através do método escoteiro. Desde o princípio, o grupo se estabeleceu como um importante centro de educação não formal na cidade de Valinhos, promovendo valores de cidadania, respeito e trabalho em equipe.",
    image: "./img/about1.png",
  },
  {
    year: 2005,
    title: "Consolidação e Crescimento",
    description:
      "Após mais de uma década de atividades, o GE Valinhos consolida sua presença na comunidade. Neste período, o grupo expandiu suas atividades, formou novos voluntários e fortaleceu os laços com a comunidade local, realizando diversos projetos sociais e ambientais que marcaram a história do escotismo em Valinhos.",
    image: "./img/about1.png",
  },
  {
    year: 2017,
    title: "Representação Internacional",
    description:
      "Um marco histórico para o GE Valinhos: membros do grupo representaram o Brasil no Kent International Jamboree na Inglaterra. Esta participação internacional demonstrou a excelência das atividades desenvolvidas e a qualidade da formação oferecida pelo grupo, colocando Valinhos no cenário mundial do escotismo.",
    image: "./img/about1.png",
  },
  {
    year: 2019,
    title: "25 Anos de História",
    description:
      "Em 2019, o Grupo Escoteiro Valinhos celebrou seus 25 anos de existência. Um quarto de século dedicado à formação de gerações de jovens, deixando um legado de cidadãos conscientes, líderes comprometidos e pessoas preparadas para construir um mundo melhor. A comemoração contou com a participação de ex-membros, famílias e a comunidade.",
    image: "./img/about1.png",
  },
  {
    year: 2025,
    title: "Presente e Futuro",
    description:
      "Hoje, com mais de 30 anos de história, o GE Valinhos 252°/SP continua sua missão de formar jovens através do escotismo. Com uma equipe dedicada de voluntários, infraestrutura adequada e programação diversificada, o grupo segue crescendo e se adaptando aos desafios contemporâneos, sempre mantendo vivos os valores e princípios do movimento escoteiro.",
    image: "./img/about1.png",
  },
];

let currentIndex = 2; // Começa em 2017 (índice 2)

function initEvolucao() {
  const contentContainer = document.querySelector(".evolucao-content");
  const timelineTrack = document.getElementById("timelineTrack");

  // Cria os slides de conteúdo
  timelineData.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "evolucao-slide";
    if (index === currentIndex) {
      slide.classList.add("active");
    }

    slide.innerHTML = `
      <div class="evolucao-image">
        <img src="${item.image}" alt="${item.title}" />
      </div>
      <div class="evolucao-text">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;

    contentContainer.appendChild(slide);
  });

  // Cria os itens da timeline
  timelineData.forEach((item, index) => {
    const timelineItem = document.createElement("div");
    timelineItem.className = "timeline-item";
    if (index === currentIndex) {
      timelineItem.classList.add("active");
    }

    timelineItem.innerHTML = `
      <div class="timeline-marker"></div>
      <div class="timeline-year">${item.year}</div>
    `;

    timelineItem.addEventListener("click", () => {
      setActiveYear(index);
    });

    timelineTrack.appendChild(timelineItem);
  });
}

function setActiveYear(index) {
  // Atualiza slides
  const slides = document.querySelectorAll(".evolucao-slide");
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");

  // Atualiza timeline
  const items = document.querySelectorAll(".timeline-item");
  items.forEach((item) => item.classList.remove("active"));
  items[index].classList.add("active");

  currentIndex = index;
}

// Navegação com setas
document.getElementById("prevYear").addEventListener("click", () => {
  if (currentIndex > 0) {
    setActiveYear(currentIndex - 1);
  }
});

document.getElementById("nextYear").addEventListener("click", () => {
  if (currentIndex < timelineData.length - 1) {
    setActiveYear(currentIndex + 1);
  }
});

// Suporte para teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && currentIndex > 0) {
    setActiveYear(currentIndex - 1);
  } else if (e.key === "ArrowRight" && currentIndex < timelineData.length - 1) {
    setActiveYear(currentIndex + 1);
  }
});

// Inicializa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", initEvolucao);
