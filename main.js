let conjuntoMoscas = document.getElementsByClassName("mosquito");
let quantidadeAtualMoscasNaTela = document.getElementsByClassName("mosquito").length;
let contador = 1;
const placar = document.getElementById("contador");
let quantidadeMoscasPermitidasNaTela = (window.matchMedia("(max-width:820px)").matches) ? 20 : 10;
let trilhaSonora =  document.getElementById("trilha-sonora");
let audioPontuacao =  document.getElementById("pontuou");
let audioErrou = document.getElementById("errou");
const botaoInicio = document.querySelector("#botao-inicio");
let idIntervalo;


botaoInicio.addEventListener("mouseover", ()=>
{
    botaoInicio.style.animationName = "aumentando-tamanho";
});

botaoInicio.addEventListener("mouseout", ()=>
{
    botaoInicio.style.animationName = "diminuindo-tamanho";
});

botaoInicio.addEventListener("click", ()=>
{
    botaoInicio.style.display = "none";
    trilhaSonora.play();
    executarProjeto();
    idIntervalo = setInterval(function(){executarProjeto();}, (window.matchMedia("(max-width:820px)").matches? 2000 : 3000));
});

function definirPlacar()
{
    placar.textContent = contador;
    if(contador <= -1 || contador >= 20)
    {
        finalizarProjeto();
    }
}


//Gera aleatóriamente uma string representando uma classe, pode retornar tamanho1, tamanho2 ou tamanho3.
function mudarTamanho()
{
    let classe = Math.floor(Math.random() * 3);
    if(classe == 0) return "tamanho1"; //Se 0 - tamanho1
    else if(classe == 1 ) return "tamanho2"; //Se 1 - tamanho2
    else return "tamanho3"; //Se 2 - tamanho3
}

function gerarMosquito()
{
    let altura = window.innerHeight;
    let largura = window.innerWidth;
    let posicaoAltura = Math.abs(Math.random() * altura - 100);
    let posicaoLargura = Math.abs(Math.random() * largura  - 100);
    let imagem = document.createElement("img"); 

    imagem.setAttribute("src", "./assets/mosquito.png");
    imagem.setAttribute("data-click", "clicou");
    imagem.id = "mosquito";
    imagem.className = "mosquito " + mudarTamanho();
    imagem.style.top = posicaoAltura + "px";
    imagem.style.left = posicaoLargura + "px";
    imagem.style.cursor = "pointer";
    imagem.addEventListener("dragstart", function (evento)
    {
        evento.preventDefault();
    });

    document.body.appendChild(imagem);
}

function removerMosquito()
{
    if(conjuntoMoscas && quantidadeAtualMoscasNaTela > (quantidadeMoscasPermitidasNaTela - 1)
        || conjuntoMoscas && quantidadeAtualMoscasNaTela > (quantidadeAtualMoscasNaTela - 1))
    {
        var lista = [...conjuntoMoscas];
        for(let i = 0; i < lista.length; i++)
        {
            lista[i].remove();
        }
    }
}

function clique(interacao)
{
    interacao.preventDefault();
    let alvo = interacao.target;
    if(alvo.classList[0] === "mosquito")
    {
        console.log(alvo.classList[0]);
        alvo.remove();
        contador++;
        audioPontuacao.currentTime = 0;
        audioPontuacao.play();            
    }
    else
    {
        if(contador > -1) contador--;
        console.log(alvo.classList[0]);
        audioErrou.currentTime = 0;
        audioErrou.play();  
    }
    definirPlacar();
}

function executarProjeto()
{
    placar.style.display = "flex";
    removerMosquito();
    if(quantidadeAtualMoscasNaTela == 0)
    {
        for(let i = 0; i < quantidadeMoscasPermitidasNaTela; i ++)
        {
            gerarMosquito();
        }
    }
    else
    {
        for(let i = 0; i < (quantidadeMoscasPermitidasNaTela - quantidadeAtualMoscasNaTela); i ++)
        {
            gerarMosquito();
        }
    }
    if(window.matchMedia("(max-width:820px)").matches)
    {
        document.body.addEventListener("touchstart", function(evento)
        {
            clique(evento);
        },false);
    }
    else
    {
        document.body.onclick = function(evento)
        {
            clique(evento);
        }
    }
}

function finalizarProjeto()
{
    clearInterval(idIntervalo);
    removerMosquito();
    trilhaSonora.pause();
    botaoInicio.style.display = "block";
    placar.style.display = "none";
    contador = 1;
    trilhaSonora.currentTime = 0;
    document.body.onclick = null;
}
