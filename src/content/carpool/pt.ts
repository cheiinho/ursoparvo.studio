import type { CarpoolContent } from "./types";

export const carpoolPt: CarpoolContent = {
  meta: {
    title: "Carpool · caso de estudo de UX research · UrsoParvo Studio",
    description:
      "UX research sobre disponibilidade de veículos, comportamento de reserva e readiness operacional, e como essa evidência desafiou uma assunção platform-first.",
  },
  disclosure:
    "Detalhes de cliente e produto foram anonimizados. As interfaces foram reconstruídas para efeitos de portefólio.",
  labels: {
    research: "Evidência de pesquisa",
    context: "Contexto de projecto",
    inference: "Interpretação",
    reconstruction: "Reconstrução",
    exploration: "Exploração de design",
  },
  cover: {
    eyebrow: "Caso de estudo · Produto interno · Research",
    title: "Carpool",
    subtitle:
      "Colaboradores podiam reservar carros da empresa. O brief parecia um problema de produto de reservas. A pesquisa disse outra coisa.",
    meta: "UX research · Service design · Explorações de design",
    thesis:
      "A interface tinha problemas reais de usabilidade. A restrição dominante continuava a ser a disponibilidade de veículos e a readiness operacional.",
  },
  brief: {
    kicker: "Contexto",
    headline: "Um benefício interno de frota partilhada",
    line: "As pessoas reservavam carros da empresa para lazer ou trabalho. Se o fluxo de reserva parecia partido, era fácil assumir que o remendo estava no produto.",
  },
  assumption: {
    kicker: "01 · Assunção",
    statement: "Pensámos que a plataforma era o problema.",
    body: "Se reservar parecia partido, reconstruir o produto de reservas. Razoável. Incompleto.",
    nodes: ["Plataforma", "Reserva", "Carro"],
    bridge: "Antes de desenhar uma solução, investigámos o serviço.",
    contextNote:
      "Uma reconstrução de plataforma estava enquadrada em cerca de 6 a 12 meses. Esse número é contexto de projecto, não métrica de research.",
  },
  investigation: {
    kicker: "02 · Investigação",
    headline: "Olhámos para além dos ecrãs",
    line: "As operações disseram o que acontecia entre reservas. Utilizadores de lazer disseram o que era esperar. Um expert review percorreu o produto em produção, linha a linha.",
    methods: [
      {
        title: "Contextual inquiry",
        detail:
          "Levantamento, devolução, carregamento, inspeção, políticas, condição, multas.",
      },
      {
        title: "Entrevistas de lazer",
        detail:
          "Procurar, reservar, cancelar, e se a espera ainda compensava.",
      },
      {
        title: "Personas",
        detail: "Flexibilidade de lazer, precisão de trabalho, operações de frota.",
      },
      {
        title: "Expert review",
        detail: "Timing de regras, histórico, confirmação, clareza de erros.",
      },
    ],
    caveat:
      "Mais forte no lazer. Reservas de trabalho e operações mais profundas ficaram como próximos passos.",
    voice:
      "Um utilizador de lazer disse-o sem rodeios: quando havia carros, a interface deixava de ser a queixa principal.",
  },
  personas: {
    headline: "Três relações com o mesmo serviço",
    line: "Papéis comportamentais da pesquisa, não cartazes demográficos.",
    items: [
      {
        name: "Aires",
        role: "Lazer",
        need: "A próxima oportunidade utilizável. Fins-de-semana importam.",
        lens: "Procura flexível",
      },
      {
        name: "Ricardo",
        role: "Trabalho",
        need: "Um carro numa data fixa, dentro de um intervalo preciso.",
        lens: "Compromisso fixo",
      },
      {
        name: "Rita",
        role: "Operações",
        need: "Procura versus readiness entre uma reserva e a seguinte.",
        lens: "Frota e pedidos",
      },
    ],
  },
  availability: {
    kicker: "03 · Encontrar um carro",
    statement: "O problema não era encontrar o botão de reservar.",
    after: "Era encontrar um carro.",
    line: "As pessoas caçavam dias livres, planeavam com meses de antecedência, e ainda encontravam opções indisponíveis que pareciam seleccionáveis. Não havia lista de espera.",
  },
  wait: {
    kicker: "04 · A espera",
    statement: "Até uma reserva podia desaparecer.",
    line: "Um caso documentado: reservado em janeiro para setembro; cerca de vinte dias antes, o carro deixava de estar disponível. Sem explicação útil. Sem alternativa.",
    attribution:
      "Da pesquisa com utilizadores de lazer. Não é afirmado como regra de todas as reservas.",
  },
  readiness: {
    kicker: "05 · Disponível ≠ pronto",
    statement: "Disponível nem sempre significava pronto.",
    line: "Carros eléctricos de lazer precisam de tempo de carregamento. A inspeção fica entre a devolução e a próxima reserva. Uma célula livre no calendário pode ainda significar um carro que ainda não pode sair.",
  },
  intents: {
    kicker: "06 · Trabalho ≠ lazer",
    statement: "Trabalho e lazer precisavam de coisas diferentes.",
    line: "Um modelo de interacção servia dois trabalhos: compromissos fixos e oportunidade flexível. A pesquisa recomendava declarar a intenção.",
  },
  rules: {
    kicker: "07 · Regras demasiado tarde",
    statement: "O sistema conhecia a regra antes do clique.",
    line: "Limites como uma reserva de lazer activa apareciam depois de Reservar, não antes do compromisso.",
  },
  history: {
    kicker: "08 · Histórico",
    statement: "O estado era difícil de ver quando importava.",
    line: "Defaults podiam esconder reservas futuras. O estado importante vinha tarde na tabela. As pessoas abriam tickets para reservas que já existiam.",
  },
  usage: {
    kicker: "09 · Uso real",
    statement: "A hora agendada não prova o que aconteceu.",
    line: "A pesquisa recomendava registar pickup e return reais, para responsabilização quando os planos mudam.",
    note: "Os horários abaixo são ilustrativos.",
  },
  turningPoint: {
    kicker: "10 · Ponto de viragem",
    statement:
      "A indisponibilidade de veículos era o desafio principal. A usabilidade era secundária.",
    qualifier:
      "A interface tinha problemas reais. Esse finding não absolve o produto. Reordena o problema.",
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
      "Modelo conceptual de serviço derivado da pesquisa. Não é um SOP oficial.",
  },
  software: {
    kicker: "Limites",
    headline: "O que o software podia ajudar, e o que não resolvia sozinho",
    could: {
      title: "O software podia melhorar",
      items: [
        "Descoberta de disponibilidade",
        "Regras mais cedo",
        "Estado, confirmação, histórico",
        "Motivos de cancelamento",
        "Sinais de readiness, se houver dados",
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
      "Dizer a verdade operacional mais cedo. Só reconstruir se a reconstrução mirar a restrição dominante.",
  },
  investment: {
    kicker: "Investimento",
    headline: "Se uma plataforma leva 6 a 12 meses, para que problema é esse tempo?",
    line: "Contexto de projecto, não métrica de research. Sem ROI inventado.",
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
    headline: "O que a pesquisa abre ao design",
    intro: "Respostas conceptuais. Não produto publicado.",
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
        detail: "Motivo e próximo passo, não silêncio.",
      },
      {
        title: "Registar uso real",
        detail: "Registar pickup e return quando acontecem.",
      },
    ],
  },
  outcome: {
    kicker: "Resultado",
    climax:
      "A decisão de design mais útil foi decidir o que precisava de ser resolvido primeiro.",
    headline: "A pesquisa mudou a pergunta",
    line: "Um enquadramento de decisão mais afiado. Sem história de lançamento. Sem poupanças inventadas.",
    beforeLabel: "Antes",
    afterLabel: "Depois",
    before: "Como construímos uma melhor plataforma de reservas?",
    after: "O que está de facto a impedir o serviço de funcionar?",
    arc: [
      {
        label: "O que pensámos",
        text: "A plataforma de reservas era o sítio onde intervir.",
      },
      {
        label: "O que encontrámos",
        text: "Problemas reais de interface, sob uma restrição mais profunda de disponibilidade e readiness.",
      },
      {
        label: "O que mudou",
        text: "A pergunta de investimento passou de reconstruir UI para verdade de serviço.",
      },
      {
        label: "Porque importava",
        text: "Meses de trabalho de plataforma só ajudam se mirarem a restrição que as pessoas sentem.",
      },
    ],
  },
  reflection: {
    headline: "Limites",
    body: [
      "Ferramentas internas herdam a física do serviço que representam. Quando esse serviço é escasso e operacionalmente tamponado, o primeiro trabalho do produto é ser verdadeiro.",
      "A amostra era concentrada em lazer. A evidência de trabalho era mais fina. A profundidade operacional ficou por concluir. Esses limites pertencem ao espaço público.",
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
    workNeed: "12 Set · 09:00 a 14:00 · janela fixa",
    leisureNeed: "Próximo fim-de-semana disponível",
    reserve: "Reservar",
    lateRule: "Já tem uma reserva de lazer activa.",
    earlyRule: "1 reserva de lazer activa. Volte a reservar depois de terminar.",
    tryAgain: "Repor",
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
    zoomHint: "Afastar da camada de reserva",
    platformNode: "Plataforma de reservas",
  },
};
