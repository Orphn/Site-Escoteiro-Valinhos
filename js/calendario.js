// Configuração dos eventos - Adicione ou remova eventos facilmente aqui
// Basta adicionar objetos no array ou comentar/remover linhas
const eventos = [
  {
    titulo: "Acampamento Regional",
    data: "15/11/2025",
    horario: "08:00",
    categoria: "Acampamento",
  },
  {
    titulo: "Reunião de Pais",
    data: "20/11/2025",
    horario: "19:00",
    categoria: "Reunião",
  },
  {
    titulo: "Atividade Ecológica",
    data: "25/11/2025",
    horario: "14:00",
    categoria: "Ação Comunitária",
  },
  {
    titulo: "Treinamento de Chefes",
    data: "02/12/2025",
    horario: "09:00",
    categoria: "Formação",
  },
  {
    titulo: "Cerimônia de Promessa",
    data: "08/12/2025",
    horario: "16:00",
    categoria: "Cerimônia",
  },
  {
    titulo: "Jogo Escoteiro",
    data: "14/12/2025",
    horario: "15:00",
    categoria: "Atividade",
  },
];

// Cores para as categorias - Customize as cores aqui
const categoriasCores = {
  Acampamento: "#0066ff",
  Reunião: "#8b5cf6",
  "Ação Comunitária": "#10b981",
  Formação: "#f59e0b",
  Cerimônia: "#ef4444",
  Atividade: "#06b6d4",
};

function initCalendario() {
  const grid = document.getElementById("eventosGrid");

  // Se não houver eventos, mostra mensagem
  if (eventos.length === 0) {
    grid.innerHTML =
      '<p style="text-align: center; grid-column: 1/-1; font-size: 1.2rem; color: #666;">Nenhum evento agendado no momento.</p>';
    return;
  }

  // Cria um card para cada evento
  eventos.forEach((evento) => {
    const card = criarEventoCard(evento);
    grid.appendChild(card);
  });
}

function criarEventoCard(evento) {
  const card = document.createElement("div");
  card.className = "evento-card";

  const corCategoria = categoriasCores[evento.categoria] || "#0066ff";

  card.innerHTML = `
    <h3 class="evento-titulo">${evento.titulo}</h3>
    <div class="evento-info">
      <div class="evento-detalhe">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>${evento.data}</span>
      </div>
      <div class="evento-detalhe">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>${evento.horario}</span>
      </div>
    </div>
    <span class="evento-categoria" style="background: ${corCategoria}">${evento.categoria}</span>
  `;

  return card;
}

// Inicializa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", initCalendario);
