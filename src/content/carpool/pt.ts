import type { CarpoolContent } from "./types";

export const carpoolPt: CarpoolContent = {
  meta: {
    title: "Carpool — caso de estudo de UX research · UrsoParvo Studio",
    description:
      "Caso de estudo de UX research sobre disponibilidade de veículos, comportamento de reserva e readiness operacional — e como a pesquisa desafiou uma assunção platform-first.",
  },
  disclosure:
    "Detalhes de cliente e produto foram anonimizados. As interfaces foram reconstruídas para efeitos de portefólio.",
  labels: {
    research: "Evidência de pesquisa",
    context: "Contexto de projeto",
    inference: "Interpretação",
    reconstruction: "Reconstrução",
    exploration: "Exploração de design",
  },
  cover: {
    eyebrow: "Caso de estudo · Produto interno · Orientado por research",
    title: "Carpool",
    subtitle:
      "Um projecto de UX research que desafiou a assunção de que uma nova plataforma de reservas resolveria o problema real.",
    meta: "UX research · Service design · Explorações de design",
    thesis:
      "A interface tinha problemas reais de usabilidade — mas a restrição dominante era a disponibilidade de veículos e a readiness operacional.",
  },
  brief: {
    kicker: "Contexto",
    headline: "Um benefício interno de frota partilhada",
    line: "Colaboradores reservavam carros da empresa para lazer ou trabalho. À superfície, parecia um problema de produto de reservas.",
  },
  assumption: {
    kicker: "01 — Assunção",
    statement: "Pensámos que a plataforma era o problema.",
    body: "Se reservar parecia partido, reconstruir o produto de reservas. Razoável — e incompleto.",
    nodes: ["Plataforma", "Reserva", "Carro"],
    bridge: "Antes de desenhar a solução, investigámos o serviço.",
    contextNote:
      "Uma reconstrução de plataforma estava enquadrada em cerca de 6–12 meses — contexto de projecto, não métrica de research.",
  },
  investigation: {
    kicker: "02 — Investigação",
    headline: "Olhámos para além dos ecrãs",
    line: "Inquiry operacional, research com utilizadores de lazer, papéis comportamentais e expert review do produto em produção.",
    methods: [
      {
        title: "Operações",
        detail: "Carregamento, inspeção, políticas, condição, multas.",
      },
      {
        title: "Utilizadores de lazer",
        detail: "Procurar, reservar, cancelar e se a espera compensava.",
      },
      {
        title: "Papéis",
        detail: "Flexibilidade de lazer, precisão de trabalho, operações de frota.",
      },
      {
        title: "Expert review",
        detail: "Timing de regras, histórico, confirmação, clareza de erros.",
      },
    ],
    caveat:
      "Mais forte no lazer. Trabalho e operações mais profundas ficaram como próximos passos.",
  },
  personas: {
    headline: "Três relações com o mesmo serviço",
    line: "Papéis comportamentais — não cartões demográficos.",
    items: [
      {
        name: "Lazer",
        role: "Procura flexível",
        need: "Próxima oportunidade utilizável — fins-de-semana importam.",
      },
      {
        name: "Trabalho",
        role: "Compromisso fixo",
        need: "Um carro numa data e intervalo específicos.",
      },
      {
        name: "Operações",
        role: "Frota e pedidos",
        need: "Procura versus readiness entre reservas.",
      },
    ],
  },
  availability: {
    kicker: "03 — Encontrar um carro",
    statement: "O problema não era encontrar o botão de reservar.",
    after: "Era encontrar um carro.",
    line: "As pessoas caçavam dias livres, planeavam com meses de antecedência e encontravam opções indisponíveis que ainda pareciam seleccionáveis. Não havia lista de espera.",
  },
  wait: {
    kicker: "04 — A espera",
    statement: "Até uma reserva podia desaparecer.",
    line: "Um caso documentado: reservado em janeiro para setembro; cerca de vinte dias antes, o carro deixava de estar disponível — sem explicação útil nem alternativa. Outros cancelamentos repetiram o mesmo silêncio.",
  },
  readiness: {
    kicker: "05 — Disponível ≠ pronto",
    statement: "Disponível nem sempre significava pronto.",
    line: "Carros eléctricos de lazer precisam de tempo de carregamento. A inspeção fica entre a devolução e a próxima reserva. Uma célula livre no calendário pode ainda significar um carro que ainda não pode sair.",
  },
  intents: {
    kicker: "06 — Trabalho ≠ lazer",
    statement: "Trabalho e lazer precisavam de coisas diferentes.",
    line: "Um modelo de interacção servia dois trabalhos: compromissos fixos e oportunidade flexível. A pesquisa recomendava declarar a intenção.",
  },
  rules: {
    kicker: "07 — Regras demasiado tarde",
    statement: "O sistema conhecia a regra antes do clique.",
    line: "Limites como uma reserva de lazer activa apareciam depois de Reservar — não antes do compromisso.",
  },
  history: {
    kicker: "08 — Histórico",
    statement: "O estado era difícil de ver quando importava.",
    line: "Defaults podiam esconder reservas futuras. O estado importante vinha tarde na tabela. As pessoas abriam tickets para reservas que já existiam.",
  },
  usage: {
    kicker: "09 — Uso real",
    statement: "A hora agendada não prova o que aconteceu.",
    line: "A pesquisa recomendava registar pickup e return reais — para responsabilização quando os planos mudam.",
    note: "Os horários abaixo são ilustrativos.",
  },
  turningPoint: {
    kicker: "10 — Ponto de viragem",
    statement:
      "A indisponibilidade de veículos era o desafio principal. A usabilidade era secundária.",
    qualifier:
      "A interface tinha problemas reais. Esse finding não absolve o produto — reordena o problema.",
    shift:
      "De “como melhoramos a reserva?” para “o que torna uma reserva verdadeira?”",
  },
  service: {
    kicker: "Serviço",
    statement: "A plataforma era só uma camada do problema.",
    steps: [
      "Utilizador",
      "Pedido",
      "Reserva",
      "Veículo",
      "Preparação",
      "Carregamento / manutenção",
      "Pronto",
      "Levantamento",
      "Uso",
      "Devolução",
      "Inspeção",
      "Próximo utilizador",
    ],
    diagramNote:
      "Modelo conceptual de serviço derivado da pesquisa — não é um SOP oficial.",
  },
  software: {
    kicker: "Limites",
    headline: "O que o software podia ajudar — e o que não resolvia sozinho",
    could: {
      title: "O software podia melhorar",
      items: [
        "Descoberta de disponibilidade",
        "Regras mais cedo",
        "Estado, confirmação, histórico",
        "Motivos de cancelamento",
        "Sinais de readiness — se houver dados",
        "Intenção trabalho / lazer",
      ],
    },
    couldNot: {
      title: "O software não podia sozinho",
      items: [
        "Criar capacidade de frota",
        "Apagar a física do carregamento",
        "Inventar capacidade de inspeção",
        "Impedir todos os cancelamentos de manutenção",
        "Fazer a escassez parecer abundância",
      ],
    },
    closing:
      "Dizer a verdade operacional mais cedo — e só reconstruir se a reconstrução mirar a restrição dominante.",
  },
  investment: {
    kicker: "Investimento",
    headline: "Se uma plataforma leva 6–12 meses, para que problema é esse tempo?",
    line: "Contexto de projecto — não métrica de research. Sem ROI inventado.",
    contextNote: "Contexto de projecto",
    chainA: ["Nova plataforma", "Melhor UI de reserva", "Melhor acesso?"],
    chainB: [
      "Nova plataforma",
      "Melhor UI de reserva",
      "Mesma frota",
      "Mesma restrição de disponibilidade",
    ],
    close:
      "A pesquisa desafiou se reconstruir a plataforma responderia à restrição dominante.",
  },
  explorations: {
    kicker: "Explorações",
    headline: "O que a pesquisa permite ao design fazer",
    intro: "Respostas conceptuais — não produto publicado.",
    items: [
      {
        title: "Encontrar disponibilidade",
        detail: "Perguntar quando é preciso um carro antes de escolher o modelo.",
      },
      {
        title: "Mostrar readiness",
        detail: "Tornar carregamento e preparação visíveis.",
      },
      {
        title: "Intenção trabalho / lazer",
        detail: "Janela fixa versus próxima disponibilidade.",
      },
      {
        title: "Explicar estado",
        detail: "Estado que responde ao que está a acontecer agora.",
      },
      {
        title: "Explicar cancelamento",
        detail: "Motivo e próximo passo — não silêncio.",
      },
      {
        title: "Registar uso real",
        detail: "Registar pickup e return quando acontecem.",
      },
    ],
  },
  outcome: {
    kicker: "Resultado",
    headline: "A pesquisa mudou a pergunta",
    line: "Um enquadramento de decisão mais afiado — sem história de lançamento nem poupanças inventadas.",
    before: "Como construímos uma melhor plataforma de reservas?",
    after: "O que está de facto a impedir o serviço de funcionar?",
  },
  reflection: {
    headline: "Reflexão",
    body: [
      "Ferramentas internas herdam a física do serviço que representam. Quando o serviço é escasso e operacionalmente tamponado, o primeiro trabalho do produto é ser verdadeiro.",
      "Restam limites: amostra concentrada em lazer, evidência de trabalho mais fina, profundidade operacional por concluir. Esses limites pertencem ao espaço público.",
    ],
  },
  interact: {
    selectDate: "Escolher um dia",
    vehicles: "Veículos",
    noAvailability: "Sem carros utilizáveis neste dia",
    fewerOptions: "Menos opções",
    tryAnotherDay: "Experimentar outro dia",
    dayLabels: ["Sex", "Sáb", "Dom", "Seg", "Ter", "Qua"],
    vehicleOpen: "Disponível para reservar",
    vehicleClosed: "Listado · sem slot utilizável",
    scrubHint: "Percorrer a reserva",
    booked: "Reservado",
    monthsPass: "Passam meses",
    stillBooked: "A reserva ainda existe",
    twentyDays: "~20 dias antes",
    cancelled: "Cancelada",
    noReason: "Sem motivo mostrado",
    noAlternative: "Sem alternativa oferecida",
    playReady: "Percorrer a readiness",
    stepReturn: "Devolução",
    stepInspection: "Inspeção",
    stepCharging: "Carregamento",
    stepReady: "Pronto",
    availableTag: "Disponível",
    readyTag: "Pronto",
    workMode: "Trabalho",
    leisureMode: "Lazer",
    workNeed: "12 Set · 09:00 → 14:00 · janela fixa",
    leisureNeed: "Próximo fim-de-semana disponível",
    reserve: "Reservar",
    lateRule: "Já tem uma reserva de lazer activa.",
    earlyRule: "1 reserva de lazer activa — volte a reservar depois de terminar.",
    tryAgain: "Activar Reservar",
    showBefore: "Mostrar a regra antes do compromisso",
    tabUpcoming: "Próximas",
    tabActive: "Activas",
    tabCompleted: "Concluídas",
    tabCancelled: "Canceladas",
    statusOpen: "Aberta",
    statusCompleted: "Concluída",
    statusCancelled: "Cancelada",
    scheduled: "Agendado",
    actual: "Real",
    pickup: "Levantamento",
    returnLabel: "Devolução",
    illustrative: "Horários ilustrativos",
    zoomHint: "Deslizar ou avançar para afastar da camada de reserva",
    platformNode: "Plataforma de reservas",
  },
};
