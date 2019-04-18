var timerId = null; // Armazena a chamada do setTimeout
var tempo = 0;

function iniciaJogo() {

	var url = window.location.search;
	var nivel_jogo = url.replace("?nivel=", "");

	switch(nivel_jogo) {
		case '1':
			tempo = 120;
			break;
		case '2':
			tempo = 60;
			break;
		case '3':
			tempo = 30;
			break;
		default:
			alert("Nível de dificuldade inválido!");
			window.location.href = "index.html";
			return false;
	}

	document.getElementById("cronometro").innerHTML = tempo;

	document.getElementById("baloes_inteiros").innerHTML = 50;
	document.getElementById("baloes_estourados").innerHTML = 0;

	criar_baloes(50);

	contagem_tempo(tempo + 1);

}

function criar_baloes(qtde_baloes) {

	for(var i = 1; i<=qtde_baloes; i++){
		var balao = document.createElement("img");
		balao.src = "imagens/balao_azul_pequeno.png";
		balao.style.margin = "10px";
		balao.id = "b"+i;
		balao.onclick = function() { estourarBalao(this); }
		document.getElementById("cenario").appendChild(balao);
	}

}

function contagem_tempo(tempo) {

	if (tempo == 0){
		clearTimeout(timerId); // Limpar a chamada da função setTimeout
		gameOver();
		return false;
	}

	--tempo;
	document.getElementById("cronometro").innerHTML = tempo;
	timerId = setTimeout("contagem_tempo("+tempo+")", 1000);

}

function gameOver() {
	alert("Fim de jogo, você perdeu!");
	removerEventos();
}

function removerEventos() {

	var i = 1;
	var baloes_estourados = parseInt(document.getElementById("baloes_estourados").innerHTML);
	var baloes_cheios = parseInt(document.getElementById("baloes_inteiros").innerHTML);
	var total = baloes_estourados + baloes_cheios;
	while(i <= total) {
		document.getElementById("b"+i).setAttribute("onclick", "");
		i++;
	}
}

function estourarBalao(balao) {

	if (tempo == 0){
		return false;
	}

	var id = balao.id;

	
	document.getElementById(id).setAttribute("onclick", "");
	document.getElementById(id).src = "imagens/balao_azul_pequeno_estourado.png";

	pontuacao(-1);

}

function pontuacao(acao) {

	acao = parseInt(acao);

	var baloes_cheios = document.getElementById("baloes_inteiros").innerHTML;
	var baloes_estourados = document.getElementById("baloes_estourados").innerHTML;

	baloes_cheios = parseInt(baloes_cheios);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_cheios += acao;
	baloes_estourados -= acao;

	document.getElementById("baloes_inteiros").innerHTML = baloes_cheios;
	document.getElementById("baloes_estourados").innerHTML = baloes_estourados;

	situacaoJogo(baloes_cheios);
}

function situacaoJogo(baloes_cheios){
	if(baloes_cheios == 0){
		alert("Parabéns! Você venceu!");
		pararJogo();
	}
}

function pararJogo() {
	clearTimeout(timerId);
}