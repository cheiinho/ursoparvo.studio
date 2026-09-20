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
    reconstruction: "UI reconstruída",
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
    kicker: "02 — O brief",
    headline: "Um benefício interno de frota partilhada",
    body: [
      "Os colaboradores podiam reservar carros da empresa para lazer ou trabalho. À superfície, parecia um problema de produto: interface de reserva, histórico, estados, políticas, confirmações. Havia queixas. Os ecrãs pareciam cheios de atrito.",
      "O brief deste trabalho era perceber o que falhava de facto — e que tipo de investimento em design faria sentido.",
      "Isto não é uma história de lançamento. Não é uma história de conversão. Não afirma que as recomendações foram construídas.",
    ],
  },
  assumption: {
    kicker: "03 — A assunção",
    headline: "A experiência de reserva parecia ser o problema",
    body: [
      "Se os colaboradores têm dificuldade em reservar carros, melhora-se o produto de reserva. Torna-se a disponibilidade mais clara. Aperta-se o fluxo. Limpa-se a interface. Talvez se justifique uma reconstrução maior da plataforma.",
      "Essa assunção é razoável. Também é incompleta. A interface de reserva é onde a frustração se torna visível. Nem sempre é onde vive a restrição.",
    ],
    chain: [
      "A experiência de reserva é o problema",
      "Construir uma nova plataforma",
      "Investir cerca de 6–12 meses",
      "Melhorar o acesso aos carros",
    ],
    bridge: "Antes de desenhar a solução, investigámos o serviço.",
    contextNote:
      "O prazo de 6–12 meses é contexto de projecto fornecido pelo designer — não um número do relatório de research.",
  },
  investigation: {
    kicker: "04 — A investigação",
    headline: "Investigámos o serviço, não só os ecrãs",
    body: [
      "O trabalho combinou actividades complementares documentadas na revisão: inquiry operacional, research com utilizadores de lazer, personas que separavam lazer, trabalho e operações, e uma expert review do produto de reservas em produção.",
    ],
    methods: [
      {
        title: "Contexto operacional",
        detail:
          "Preocupações de pick-up e drop-off: carregamento, inspeção, políticas, acidentes, condição, multas e restrições relacionadas.",
      },
      {
        title: "Research com lazer",
        detail:
          "Como as pessoas procuravam, reservavam, cancelavam e decidiam se o benefício valia a espera.",
      },
      {
        title: "Personas",
        detail:
          "Flexibilidade de lazer, precisão de trabalho, e um papel operacional a gerir carros e pedidos.",
      },
      {
        title: "Expert review",
        detail:
          "Percurso anotado de pesquisa, reserva, confirmação, histórico, erros e timing das regras.",
      },
    ],
    caveat:
      "A pesquisa foi mais forte no uso de lazer. Reservas de trabalho e o fluxo operacional mais profundo foram assinalados como próximos passos.",
  },
  personas: {
    headline: "Três relações com o mesmo serviço",
    body: "São personas comportamentais da pesquisa — não retratos demográficos. Mostram que “o utilizador” não é um único actor.",
    items: [
      {
        name: "Lazer",
        role: "Procura flexível",
        need: "Muitas vezes quer a próxima oportunidade utilizável — fins-de-semana importam.",
      },
      {
        name: "Trabalho",
        role: "Compromisso fixo",
        need: "Precisa de um carro numa data e intervalo específicos.",
      },
      {
        name: "Operações",
        role: "Frota e pedidos",
        need: "Gere carros, pedidos e o fosso entre procura e readiness.",
      },
    ],
  },
  experience: {
    kicker: "05 — O que os utilizadores viviam",
    headline: "Encontrar um carro era mais difícil do que reservar um",
    body: [
      "Utilizadores de lazer descreveram um benefício atractivo em teoria e pouco fiável na prática. Procuravam dias livres. Planeavam com meses de antecedência. Viam reservas cair sem razão clara. Abriam tickets porque filtros de histórico escondiam reservas futuras. Confirmavam por email o que o produto não tornava óbvio.",
      "Alguns deixaram de usar o benefício porque a espera não compensava.",
      "Também encontraram falhas reais de interface: calendários pouco claros, regras tardias, estados confusos, empty states fracos, histórico pouco intuitivo. As duas coisas eram verdade ao mesmo tempo.",
    ],
    signal:
      "As pessoas valorizavam o acesso aos carros — e abandonavam o benefício quando a espera e a incerteza dominavam.",
  },
  service: {
    kicker: "06 — Por detrás do ecrã",
    headline: "O calendário podia sugerir um slot. As operações decidiam se era real.",
    body: [
      "Os carros de lazer eram totalmente eléctricos. Precisavam de tempo para carregar. Intervalos curtos entre reservas falhavam com mais facilidade. Os veículos também precisavam de inspeção antes de estarem realmente prontos. A manutenção podia cancelar planos depois de as pessoas já terem organizado a vida em torno da reserva.",
    ],
    steps: [
      "Procura",
      "Disponibilidade",
      "Reserva",
      "Preparação",
      "Carregamento / manutenção",
      "Pronto",
      "Levantamento",
      "Devolução",
      "Inspeção",
      "Próximo utilizador",
    ],
    diagramNote:
      "Modelo conceptual de serviço derivado da pesquisa. Sequência simplificada — não é um SOP operacional documentado.",
  },
  turningPoint: {
    kicker: "07 — O ponto de viragem",
    statement:
      "A indisponibilidade de veículos era o desafio principal. A usabilidade era secundária.",
    qualifier:
      "A interface tinha problemas reais. Esse finding não absolve o produto — reordena o problema.",
    body: [
      "A expert review podia encher páginas com defeitos de interface. Os utilizadores também os descreviam. E ainda assim, a síntese da pesquisa colocava a indisponibilidade de veículos em primeiro lugar.",
      "Se os carros são escassos, difíceis de garantir, ou ainda não estão prontos quando aparecem como disponíveis, polir a UI de reserva trata a embalagem do sintoma. O serviço continua a falhar no momento que importa: alguém precisa de um carro e não o consegue obter com fiabilidade.",
    ],
    shift:
      "A investigação passou de “como melhoramos a reserva?” para “o que torna uma reserva verdadeira?”",
  },
  findings: {
    kicker: "08 — Cinco padrões",
    headline: "Não têm o mesmo peso",
    intro:
      "Disponibilidade e readiness estão no centro. Os outros padrões explicam como o produto amplificou a restrição mais profunda.",
    items: [
      {
        id: "f01",
        weight: "lead",
        title: "Encontrar um slot era difícil",
        body: [
          "Os utilizadores tinham dificuldade em identificar dias livres. Horários indisponíveis eram pouco claros. Veículos sem datas utilizáveis podiam aparecer na lista. A página principal não expunha bem a disponibilidade, por isso as pessoas usavam tentativa e erro — por vezes a planear com meses de antecedência. Não havia lista de espera.",
          "O serviço era tecnicamente reservável e, na prática, difícil de aceder quando a procura excedia os veículos.",
        ],
        level: "Misto — escassez de serviço agravada por má descoberta",
      },
      {
        id: "f02",
        weight: "support",
        title: "Trabalho ≠ lazer",
        body: [
          "Utilizadores de lazer precisam muitas vezes de flexibilidade e da próxima oportunidade disponível. Utilizadores de trabalho precisam de data e intervalo fixos. O produto usava um único modelo de interacção para ambos.",
          "A experiência de trabalho estava menos representada na amostra — a distinção é conceptualmente forte e parcialmente validada.",
        ],
        level: "Modelo de produto sobre propósitos de serviço diferentes",
      },
      {
        id: "f03",
        weight: "lead",
        title: "Disponível ≠ pronto",
        body: [
          "Carros eléctricos de lazer precisam de tempo de carregamento. É necessária inspeção antes da próxima reserva. Uma célula livre no calendário pode ainda significar um carro que ainda não pode sair.",
          "Esta é uma das ligações mais fortes entre operações e falha de reserva na pesquisa.",
        ],
        level: "Operações — com um fosso de honestidade na interface",
      },
      {
        id: "f04",
        weight: "support",
        title: "Uma reserva podia desaparecer",
        body: [
          "Reservas a longo prazo podiam ser canceladas tarde, sem explicação ou alternativa. Cancelamentos por manutenção frustravam quem já tinha planeado. Os detalhes muitas vezes omitiam o motivo.",
          "A confiança quebrava depois da reserva — quando a promessa futura falhava.",
        ],
        level: "Fiabilidade de serviço + falha de comunicação",
      },
      {
        id: "f05",
        weight: "support",
        title: "O sistema escondia as próprias regras",
        body: [
          "Limites de uma reserva activa apareciam depois de clicar em Reservar. Restrições de início ao fim-de-semana eram lidas como indisponibilidade total. Regras sobre terceiros eram difíceis de encontrar. Defaults de histórico podiam esconder reservas futuras e gerar tickets de suporte.",
          "As políticas existiam. As pessoas encontravam-nas como erros.",
        ],
        level: "Representação de política na interface",
      },
    ],
  },
  software: {
    kicker: "09 — Limites",
    headline: "O que o software podia ajudar — e o que não resolvia sozinho",
    could: {
      title: "O software podia melhorar de forma significativa",
      items: [
        "Descoberta de disponibilidade e próximos slots",
        "Verificação antecipada de elegibilidade e regras",
        "Linguagem de estado, confirmação e defaults de histórico",
        "Motivos de cancelamento e clareza do ciclo de vida",
        "Sinais de readiness — se existirem dados operacionais",
        "Intenções distintas de lazer e trabalho",
      ],
    },
    couldNot: {
      title: "O software não podia, por si só",
      items: [
        "Criar capacidade de frota",
        "Eliminar a física do tempo de carregamento",
        "Inventar capacidade de inspeção",
        "Impedir todos os cancelamentos por manutenção",
        "Fazer um benefício escasso parecer abundante só com UI",
      ],
    },
    closing:
      "Construir software que diga a verdade operacional mais cedo — e só investir numa reconstrução maior se essa reconstrução mirar a restrição dominante, não só a dívida de interacção.",
  },
  investment: {
    kicker: "10 — A pergunta de investimento",
    headline: "Se uma plataforma leva 6–12 meses, para que problema é esse tempo?",
    body: [
      "Um esforço sério de plataforma pode consumir cerca de seis a doze meses. Esse número não vem do PDF de research. É contexto de projecto — útil porque força uma pergunta afiada.",
      "Se a resposta for “uma UI de reserva mais limpa”, a pesquisa diz que podemos estar a mirar baixo. Se a resposta for “um sistema que represente disponibilidade, readiness, verdade nos cancelamentos e intenções distintas”, a pesquisa torna-se um briefing para o investimento.",
    ],
    contextNote: "Contexto de projecto — não é uma métrica de research. Sem custos nem ROI inventados.",
    chainA: [
      "Nova plataforma",
      "Melhor experiência de reserva",
      "Melhor acesso aos carros?",
    ],
    chainB: [
      "Nova plataforma",
      "Melhor experiência de reserva",
      "Mesma capacidade de frota",
      "Mesma restrição de disponibilidade",
    ],
    close:
      "A pesquisa desafiou se reconstruir a plataforma responderia à restrição dominante.",
  },
  explorations: {
    kicker: "11 — Explorações de design",
    headline: "Com o problema reenquadrado, o design podia explorar uma reserva consciente do serviço",
    intro:
      "Estas são respostas de design à pesquisa — não um registo de implementação.",
    items: [
      {
        title: "Reserva com disponibilidade primeiro",
        detail: "Perguntar quando é preciso um carro antes de pedir para escolher o modelo.",
      },
      {
        title: "Lista de espera / notificação",
        detail: "Transformar cancelamentos em oportunidade estruturada em vez de workarounds informais.",
      },
      {
        title: "Intenção trabalho / lazer",
        detail: "O mesmo produto, duas entradas: janela fixa vs próxima disponibilidade.",
      },
      {
        title: "Visibilidade de readiness",
        detail: "Mostrar carregamento e preparação para que “disponível” signifique utilizável.",
      },
      {
        title: "Motivos de cancelamento",
        detail: "Explicar porque acabou a reserva — e o que pode acontecer a seguir.",
      },
      {
        title: "Histórico que responde à pergunta certa",
        detail: "Próximas, passadas e canceladas — sem esconder o futuro atrás de um filtro por omissão.",
      },
    ],
  },
  outcome: {
    kicker: "Resultado",
    headline: "A decisão de design mais valiosa foi perceber o que precisava de ser resolvido primeiro",
    body: [
      "A pesquisa desafiou o caso de tratar o Carpool sobretudo como uma reconstrução de interface. Mudou a pergunta de investimento: de como redesenhar a plataforma de reservas para o que o serviço precisa de tornar verdadeiro antes de o software melhorar a experiência sentida.",
      "Esse é o resultado que este caso pode afirmar com honestidade: um enquadramento de decisão mais afiado, assente em evidência, com limites claros sobre o que foi e não foi provado.",
    ],
    before: "Como construímos uma melhor plataforma de reservas?",
    after: "A plataforma é de facto a restrição dominante?",
  },
  reflection: {
    headline: "Reflexão",
    body: [
      "Bom product design não é só execução dentro de um brief dado. É a capacidade de testar se o brief mira a restrição certa.",
      "Ferramentas internas herdam a física do serviço que representam. Quando o serviço é escasso, operacionalmente tamponado e por vezes cancelado a montante, o primeiro trabalho do produto é ser verdadeiro — depois ser gracioso.",
      "A pesquisa tem limites: amostra concentrada em lazer, evidência incompleta de trabalho, profundidade operacional por concluir, ainda sem estudo de usabilidade medido. Esses limites pertencem ao espaço público, não devem ser lixados para drama.",
    ],
  },
  artefacts: {
    availabilityCaption:
      "O problema não era escolher um carro. Era descobrir quando um carro podia ser usado de facto.",
    intentsCaption: "A mesma interface de reserva servia dois trabalhos muito diferentes.",
    readinessCaption: "Um slot livre no calendário não significava necessariamente um carro pronto a usar.",
    cancelCaption:
      "Uma reserva podia existir durante meses e falhar pouco antes do uso — sem um motivo útil.",
    cancelExploreCaption: "Exploração: tornar o motivo e o próximo passo visíveis.",
    ruleCaption: "O sistema conhecia a regra antes de o utilizador clicar em Reservar.",
    historyCaption: "Os defaults podiam esconder uma reserva futura e fazer a lista parecer vazia.",
    explorationStripNote:
      "Direcções conceptuais possibilitadas pela pesquisa — não produto publicado.",
    uiPoolTitle: "Reserva de frota",
    uiReserve: "Reservar",
    uiLeisure: "Lazer",
    uiWork: "Trabalho",
    uiNextAvailable: "Próximo fim-de-semana disponível",
    uiWhenNeed: "Quando precisa de um carro?",
    uiCancelled: "Cancelada",
    uiNoReason: "Sem motivo indicado",
    uiReasonMaintenance: "Motivo: manutenção do veículo",
    uiJoinWaitlist: "Avisar-me se abrir um slot",
    uiActiveRule: "Já tem uma reserva de lazer activa.",
    uiTooLate: "Revelado depois de Reservar",
    uiEligibility: "Já tem uma reserva activa. Pode voltar a reservar depois de terminar.",
    uiHistoryEmpty: "Sem resultados",
    uiHistoryDefault: "Filtro por omissão: apenas o ano actual",
    uiUpcoming: "Próximas",
    uiAvailableFrom: "Disponível a partir das 16:00",
    uiCharging: "A carregar · inspeção necessária",
    uiReadyAt: "Pronto às 18:30",
    uiInspection: "Inspeção",
    availableLabel: "Disponível",
    readyLabel: "Pronto",
  },
};
