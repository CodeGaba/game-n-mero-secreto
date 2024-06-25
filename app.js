let listaDeNumerosSorteados = [];
let numeroLimite = 10
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');   
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        // O botão novo jogo estava desabilitado, com o código abaixo, ele será habilitado
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número é menor que o chute');
        } else {
            exibirTextoNaTela('p', 'O número é maior que o chute');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEsolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = []
    }


    if (listaDeNumerosSorteados.includes(numeroEsolhido)) {
        return gerarNumeroAleatorio();
    } else { 
        listaDeNumerosSorteados.push(numeroEsolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEsolhido
    }
}

// Foi criada uma função para quando chutar um número, o campo é limpo, associamos texto vazio
function limparCampo() {
    let campoChute = document.querySelector('input');
    campoChute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

// Adicionando o listener de evento para o botão de reiniciar
document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);

// Supondo que haja um botão de verificação de chute
document.getElementById('verificar').addEventListener('click', verificarChute);
