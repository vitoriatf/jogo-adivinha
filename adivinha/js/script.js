const jogoAdivinha = {
  minimo: 1,
  maximo: 50,
  tentativasMaximas: 5,
  tentativasFeitas: 0,
  numeroSorteado: function geraValorAleatorio() {
    return Math.floor(Math.random() * (this.maximo - this.minimo + 1)) + this.minimo;
  },
};

const btnVerifica = document.getElementById("btnVerifica");
const status = document.getElementById("status");
const tentativa = document.getElementById("tentativa");
const chute = document.getElementById("chute");
const nomeJogador = document.getElementById("nomeJogador");

let numeroSorteado = jogoAdivinha.numeroSorteado();

function atualizarTentativa(tentativa, valor) {
  tentativa.textContent = 'Tentativas: ' + valor + ' / ' + jogoAdivinha.tentativasMaximas;
}

function reiniciar() {
  btnVerifica.innerText = "Verificar";
  jogoAdivinha.tentativasFeitas = 0;
  atualizarTentativa(tentativa, jogoAdivinha.tentativasFeitas);
  numeroSorteado = jogoAdivinha.numeroSorteado();
  chute.disabled = false;
  chute.value = "";
  status.textContent = "Adivinhe o número sorteado";
  nomeJogador.disabled = false;
  btnVerifica.removeEventListener("click", reiniciar);
}

const formAdivinha = document.getElementById("form");
console.log(numeroSorteado);
formAdivinha.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!!chute.value == false || !!nomeJogador.value == false) {
    status.innerHTML = '<span style="color:#FF3D00">Digite um valor e um nome</span>';
    return;
  }

  if (jogoAdivinha.tentativasFeitas == 4 && chute.value!=numeroSorteado) {
    jogoAdivinha.tentativasFeitas++;
    atualizarTentativa(tentativa, jogoAdivinha.tentativasFeitas);
    status.innerHTML = '<span style="color:#FF3D00">Suas tentativas acabaram! O número era ' + numeroSorteado + '</span>';
    chute.disabled = true;
    nomeJogador.disabled = true;
    btnVerifica.innerText = "Tentar novamente?";
    btnVerifica.addEventListener("click", reiniciar);
    return;
  }

  jogoAdivinha.tentativasFeitas++;
  atualizarTentativa(tentativa, jogoAdivinha.tentativasFeitas);

  if (numeroSorteado == chute.value) {
    status.innerHTML =
      '<span style="color:#00C853">Parabéns, ' + nomeJogador.value + ', você acertou o número ' + numeroSorteado + ' em ' + jogoAdivinha.tentativasFeitas + ' tentativas!</span>';
    chute.disabled = true;
    nomeJogador.disabled = true;
    btnVerifica.innerText = "Tentar novamente?";
    btnVerifica.addEventListener("click", reiniciar);
  } else if (numeroSorteado > chute.value) {
    status.innerText = "O número sorteado é maior";
  } else if (numeroSorteado < chute.value) {
    status.innerText = "O número sorteado é menor";
  }
});