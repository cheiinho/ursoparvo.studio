export const PROCESS = {
  title: "Processo",
  steps: [
    {
      title: "Conversa",
      body: "Primeiro contacto. Entender o problema antes de falar de soluções.",
    },
    {
      title: "Orçamento",
      body: "Proposta com âmbito, valores e prazos. Sem letras pequenas.",
    },
    {
      title: "Contrato",
      body: "Nada avança sem assinatura. Protege ambos.",
    },
    {
      title: "Fatura",
      body: "Sinal de 50% antes de começar.",
    },
    {
      title: "Acessos & welcome doc",
      body: "O que é preciso, como comunicamos, onde vive o quê.",
    },
    {
      title: "Kickoff",
      body: "Chamada de arranque e começa o trabalho.",
    },
  ],
} as const;

export const CHECKLIST = {
  title: "O que enviar no primeiro contacto",
  intro: "Quanto mais completo, mais rápido o orçamento.",
  items: [
    "Materiais de marca existentes — logótipo, manual, o que houver.",
    "Objetivos — o que deve mudar com este projecto.",
    "Referências — coisas de que gosta, e de que não gosta.",
    "Prazos — datas reais, não optimistas.",
    "Faixa de orçamento — poupa duas semanas de emails a toda a gente.",
  ],
} as const;

export const CONTACT = {
  title: "Orçamento",
  intro: "Preencha e o seu cliente de email faz o resto.",
  fields: {
    name: "Nome",
    type: "Tipo de projecto",
    budget: "Orçamento estimado",
    deadline: "Prazo",
    deadlineHint: "ex.: até Setembro",
    description: "Descrição",
  },
  typeOptions: ["Identidade visual", "Rebranding", "Website", "Outro"],
  budgetOptions: [
    "Até 2.500 €",
    "2.500 – 5.000 €",
    "5.000 – 10.000 €",
    "Mais de 10.000 €",
    "Ainda não sei",
  ],
  submit: "Compor email",
  subjectPrefix: "Orçamento",
  sentNote: "O seu cliente de email deve ter aberto. Se não abriu, escreva directamente:",
  directPrefix: "Prefere escrever à mão?",
} as const;
