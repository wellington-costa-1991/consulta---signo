const dadosSignos = [
  {
    nome: "Capricórnio",
    figura: "♑",
    inicio: "01-01",
    fim: "01-19",
    perfil: "Determinado, prático, focado em metas e muito responsável.",
  },
  {
    nome: "Aquário",
    figura: "♒",
    inicio: "01-20",
    fim: "02-18",
    perfil: "Inovador, independente, idealista e valoriza muito a liberdade.",
  },
  {
    nome: "Peixes",
    figura: "♓",
    inicio: "02-19",
    fim: "03-20",
    perfil: "Empático, intuitivo, sonhador e com forte conexão artística.",
  },
  {
    nome: "Áries",
    figura: "♈",
    inicio: "03-21",
    fim: "04-19",
    perfil: "Corajoso, enérgico, líder nato e cheio de iniciativa.",
  },
  {
    nome: "Touro",
    figura: "♉",
    inicio: "04-20",
    fim: "05-20",
    perfil:
      "Paciente, confiável, determinado e amante do conforto e da estabilidade.",
  },
  {
    nome: "Gêmeos",
    figura: "♊",
    inicio: "05-21",
    fim: "06-20",
    perfil: "Comunicativo, curioso, versátil e adora aprender coisas novas.",
  },
  {
    nome: "Câncer",
    figura: "♋",
    inicio: "06-21",
    fim: "07-22",
    perfil: "Protetor, intuitivo, ligado à família e com emoções profundas.",
  },
  {
    nome: "Leão",
    figura: "♌",
    inicio: "07-23",
    fim: "08-22",
    perfil: "Criativo, generoso, confiante e com um magnetismo natural.",
  },
  {
    nome: "Virgem",
    figura: "♍",
    inicio: "08-23",
    fim: "09-22",
    perfil: "Analítico, organizado, detalhista e sempre pronto a ajudar.",
  },
  {
    nome: "Libra",
    figura: "♎",
    inicio: "09-23",
    fim: "10-22",
    perfil:
      "Diplomático, justo, sociável e busca sempre a harmonia e o equilíbrio.",
  },
  {
    nome: "Escorpião",
    figura: "♏",
    inicio: "10-23",
    fim: "11-21",
    perfil:
      "Intenso, determinado, intuitivo e com grande poder de transformação.",
  },
  {
    nome: "Sagitário",
    figura: "♐",
    inicio: "11-22",
    fim: "12-21",
    perfil: "Otimista, aventureiro, bem-humorado e amante da sabedoria.",
  },
  {
    nome: "Capricórnio",
    figura: "♑",
    inicio: "12-22",
    fim: "12-31",
    perfil: "Determinado, prático, focado em metas e muito responsável.",
  },
];

const ordemSignos = [
  "Áries",
  "Touro",
  "Gêmeos",
  "Câncer",
  "Leão",
  "Virgem",
  "Libra",
  "Escorpião",
  "Sagitário",
  "Capricórnio",
  "Aquário",
  "Peixes",
];

function descobrirMapa() {
  const inputData = document.getElementById("dataNascimento").value;
  const inputHora = document.getElementById("horaNascimento").value;

  if (!inputData || !inputHora) {
    alert("Por favor, preencha a data e a hora cósmicas!");
    return;
  }

  const [ano, mes, dia] = inputData.split("-");
  const dataFormatada = `${mes}-${dia}`;
  const signoSolar = dadosSignos.find(
    (signo) => dataFormatada >= signo.inicio && dataFormatada <= signo.fim,
  );

  if (signoSolar) {
    const [hora, minuto] = inputHora.split(":").map(Number);
    let indiceSolar = ordemSignos.indexOf(signoSolar.nome);
    let horasPassadasDiz06 = hora >= 6 ? hora - 6 : hora + 18;
    let passosSignos = Math.floor(horasPassadasDiz06 / 2);
    let indiceAscendente = (indiceSolar + passosSignos) % 12;
    let ascendenteCalculado = ordemSignos[indiceAscendente];

    document.getElementById("signoFigura").innerText = signoSolar.figura;
    document.getElementById("signoNome").innerText =
      `Signo Solar: ${signoSolar.nome}`;
    document.getElementById("ascendenteNome").innerText =
      `Ascendente: ${ascendenteCalculado}`;
    document.getElementById("signoPerfil").innerText =
      `${signoSolar.perfil} Seu ascendente em ${ascendenteCalculado} indica a forma como você se projeta para o mundo e a primeira impressão que causa nas pessoas.`;
    document.getElementById("resultado").style.display = "block";
  }
}

let disparadorInstalacao;
const botaoInstalar = document.getElementById("btnInstalar");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  disparadorInstalacao = e;
  botaoInstalar.style.display = "inline-block";
});

botaoInstalar.addEventListener("click", async () => {
  if (disparadorInstalacao) {
    disparadorInstalacao.prompt();
    const { outcome } = await disparadorInstalacao.userChoice;
    if (outcome === "accepted") {
      botaoInstalar.style.display = "none";
    }
    disparadorInstalacao = null;
  }
});

window.addEventListener("appinstalled", () => {
  botaoInstalar.style.display = "none";
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
