var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');

//Variavel do rastro (Inicial):

var rastro = [];
rabo = 2;

//Variaveis de inicio (Onde a cobra e a fruta irão nascer.):

var x = 287;
var y = 262;
var xf = 87;
var yf = 262;

//Variavel de sentido(horizontal):

var sentidoH;

//Variavel de velocidade e score:

var intervalo = setInterval(atualizaTela, 100);
var score = 0;

//Variaveis de teclas:

var botao;
var esquerda = false;
var direita = false;
var cima = false;
var baixo = false

//Função de desenho da Fruta:

function desenhaFruta(xf,yf){
    pincel.fillStyle = 'darkgreen'; //Cor.
    pincel.beginPath();
    pincel.arc(xf, yf, 10, 0, 2 * Math.PI); //Criar a bolinha.
    pincel.fill(); //Preencher a bolinha.
}

//Função de desenho da cabeça da cobra:

function desenhaCabeca() {
    pincel.fillStyle = 'crimson';
    pincel.beginPath();
    pincel.arc(x, y,10, 0, 2 * Math.PI);
    pincel.fill();
}

//Função de desenho do corpo:

function desenhaCorpo(x, y) {
    pincel.fillStyle = 'crimson';
    pincel.beginPath();
    pincel.arc(x, y,10, 0, 2 * Math.PI);
    pincel.fill();
}

//Função para limpar a tela e deixar ela xadrez:

function limpaTela() {
    var coluna = 0; 
    while(coluna <=500){
        for(var linha= 0; linha<=500;linha=linha+25){
            for(var xa=0;xa<=500;xa+=25){
              
            if((linha+xa) % 2 == 0){
              pincel.fillStyle = "Pink";
            }
            else{
              pincel.fillStyle = "LightPink"
            }
            pincel.beginPath();
            pincel.rect(linha, xa, 25, 25);
            pincel.closePath();
            pincel.fill();  
            }
                
        }
        coluna = coluna + 25; 
    }    
}

//Função de finalizar o jogo:

function fimDeJogo(){

    alert("Game Over!");

    //Resetar para a posição inicial a cobra e a fruta:
    x = 287;
    y = 262;
    xf = 87;
    yf = 262;

    //Resetar o rastro:
    rabo = 2;
    
    //Resetar a velocidade:
    clearInterval(intervalo);
    intervalo = setInterval(atualizaTela, 100)

    //Resetar as teclas:
    botao = 0;
    direita = false;
    esquerda = false;
    baixo = false;
    cima = false;

    //Resetar o score:
    score = 0;
    document.getElementById("score").innerHTML = "Pontos: "+ 0;

}

function win(){

    alert("You Win!");

    //Resetar para a posição inicial a cobra e a fruta:
    x = 287;
    y = 262;
    xf = 87;
    yf = 262;

    //Resetar o rastro:
    rabo = 2;
    
    //Resetar a velocidade:
    clearInterval(intervalo);
    intervalo = setInterval(atualizaTela, 100)

    //Resetar as teclas:
    botao = 0;
    direita = false;
    esquerda = false;
    baixo = false;
    cima = false;

    //Resetar o score:
    score = 0;
    document.getElementById("score").innerHTML = "Pontos: "+ 0;

}

//Função para atualizar a tela:

function atualizaTela() {

    limpaTela();

    if(x == xf && y == yf){
        rabo++; //Aumentar rabo.
        
        //Aumentar score:

        if(score >=300 && score <=800){
            score += 50;
        }
        if(score >=100 && score <300){
            score += 20;
        }
        if(score <100){
            score += 10;
        }    
        if(score >=100){
            clearInterval(intervalo);
            intervalo = setInterval(atualizaTela, 75);
        }
        if(score >=300){
            clearInterval(intervalo);
            intervalo = setInterval(atualizaTela, 60);
        }
        if(score == 800){
            win()
        }

        document.getElementById("score").innerHTML = "Pontos: "+score;//Mandar o score direto para o HTML.

        while(true){
            var lugar = false; //Variavel para impedir a fruta de nascer dentro do corpo da cobra.
            xf = Math.floor(Math.random()*20)*25+12; //Randomizador da fruta.
            yf = Math.floor(Math.random()*20)*25+12; //Randomizador da fruta.
            for (var ii = 0; ii < rastro.length; ii++) {
                if (rastro[ii].px == xf && rastro[ii].py == yf){
                    lugar = true; //Caso ambos, fruta e cobra, nascer no mesmo lugar, o while ira se manter.           
                }
            }
            if(!lugar){
                break; //Caso ambos nascerem em lugares separados, o while quebrará.
            }
        
        }
    }

    //Condições que fazem a cobra andar e que delimitam o limite do campo:

    if(esquerda && sentidoH) {
        if(x == 12){
            fimDeJogo();
        }
        else {
        botao = "esquerda";    
        x -=25;
        }
    }
    if (direita && sentidoH) {
        if(x == 487){
            fimDeJogo();
        }
        else {
        botao = "direita";    
        x += 25;
        }
    }
    if(baixo && !sentidoH) {
        if(y == 487){
            fimDeJogo();
        }
        else {
        botao = "baixo";    
        y += 25;
        }
    }
    if (cima && !sentidoH) {
        if(y == 12){
            fimDeJogo();
        }
        else {
        botao = "cima";    
        y -= 25;
        }
    }
    
    desenhaFruta(xf,yf);

    desenhaCabeca();

    for (var i = 0; i < rastro.length; i++) {
        desenhaCorpo(rastro[i].px,rastro[i].py);

        //Colisão da cobra nela mesma:
        if (rabo > 2 && rastro[i].px == x && rastro[i].py == y){
            fimDeJogo();            
        }
    }
    rastro.push({ px:x, py:y });
    while (rastro.length > rabo) {
        //Tira o primeiro elemento do array:
        rastro.shift();
    }

} 

//Função para ler as teclas do teclado:

function teclado(clicar) {

    if(clicar.keyCode == 37 && botao !="direita") {

        sentidoH = true;
        esquerda = true;
        direita = false;

    } else if (clicar.keyCode == 39 && botao !="esquerda") {

        sentidoH = true; 
        direita = true;
        esquerda = false;

    } else if (clicar.keyCode == 38 && botao !="baixo") {

        sentidoH = false;
        cima = true;
        baixo = false;

    } else if (clicar.keyCode == 40 && botao !="cima") {

        sentidoH = false;
        baixo = true;
        cima = false;
    
    }
}

document.onkeydown = teclado;
