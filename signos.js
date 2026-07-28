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
let mensagemCompartilhar = "";

function descobrirMapa() {
  const inputData = document.getElementById("dataNascimento").value;
  const inputHora = document.getElementById("horaNascimento").value;

  if (!inputData || !inputHora) {
    alert("Por favor, preencha a data e a hora cósmicas!");
    return;
  }

  const partesData = inputData.split("-");
  const dataFormatada = partesData[1] + "-" + partesData[2];
  const signoSolar = dadosSignos.find(
    (s) => dataFormatada >= s.inicio && dataFormatada <= s.fim,
  );

  if (signoSolar) {
    const partesHora = inputHora.split(":");
    const hora = Number(partesHora[0]);
    let indiceSolar = ordemSignos.indexOf(signoSolar.nome);
    let horasPassadasDiz06 = hora >= 6 ? hora - 6 : hora + 18;
    let passosSignos = Math.floor(horasPassadasDiz06 / 2);
    let indiceAscendente = (indiceSolar + passosSignos) % 12;
    let ascendenteCalculado = ordemSignos[indiceAscendente];

    switch (signoSolar.elemento) {
      case "fogo":
        document.body.style.background =
          "linear-gradient(135deg, #2e0000, #5c0000, #990000)";
        document.getElementById("mainContainer").style.borderColor = "#ff4500";
        document.getElementById("mainContainer").style.boxShadow =
          "0 0 25px rgba(255, 69, 0, 0.6)";
        break;
      case "agua":
        document.body.style.background =
          "linear-gradient(135deg, #00112c, #00225c, #0044b3)";
        document.getElementById("mainContainer").style.borderColor = "#00f0ff";
        document.getElementById("mainContainer").style.boxShadow =
          "0 0 25px rgba(0, 240, 255, 0.6)";
        break;
      case "terra":
        document.body.style.background =
          "linear-gradient(135deg, #141c00, #283800, #4c6600)";
        document.getElementById("mainContainer").style.borderColor = "#adff2f";
        document.getElementById("mainContainer").style.boxShadow =
          "0 0 25px rgba(173, 255, 47, 0.5)";
        break;
      case "ar":
        document.body.style.background =
          "linear-gradient(135deg, #1a002c, #39005c, #6a00b3)";
        document.getElementById("mainContainer").style.borderColor = "#df00ff";
        document.getElementById("mainContainer").style.boxShadow =
          "0 0 25px rgba(223, 0, 255, 0.6)";
        break;
    }

    document.getElementById("signoFigura").innerText = signoSolar.figura;
    document.getElementById("signoNome").innerText =
      "Signo Solar: " + signoSolar.nome;
    document.getElementById("ascendenteNome").innerText =
      "Ascendente: " + ascendenteCalculado;
    document.getElementById("signoPerfil").innerText =
      signoSolar.perfil +
      " Seu ascendente em " +
      ascendenteCalculado +
      " e a mascara que voce usa para enganar o mundo na primeira impressao!";

    mensagemCompartilhar =
      "MEU MAPA ASTRAL EXPRESS \n\nSigno Solar: " +
      signoSolar.figura +
      " " +
      signoSolar.nome +
      "\nAscendente: " +
      ascendenteCalculado +
      "\n\nPerfil: " +
      signoSolar.perfil +
      "\n\nDescubra o seu também: " +
      window.location.href;
    document.getElementById("resultado").style.display = "block";
  }
}

function compartilharWhatsApp() {
  if (mensagemCompartilhar !== "") {
    window.open(
      "https://whatsapp.com" + encodeURIComponent(mensagemCompartilhar),
      "_blank",
    );
  }
}

let disparadorInstalacao = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  disparadorInstalacao = e;
  if (document.getElementById("btnInstalar"))
    document.getElementById("btnInstalar").style.display = "inline-block";
});

if (document.getElementById("btnInstalar")) {
  document.getElementById("btnInstalar").addEventListener("click", async () => {
    if (disparadorInstalacao) {
      disparadorInstalacao.prompt();
      disparadorInstalacao = null;
    }
  });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}
