let conjuntoMoscas = document.getElementsByClassName("mosquito");
let quantidadeAtualMoscasNaTela = document.getElementsByClassName("mosquito").length;
let contador = 0;
let quantidadeMoscasPermitidasNaTela = (window.matchMedia("(max-width:820px)").matches) ? 20 : 10;
let trilhaSonora =  document.getElementById("trilha-sonora");
let audioPontuacao =  document.getElementById("pontuou");
let audioErrou = document.getElementById("errou");

trilhaSonora.currentTime = 0;
trilhaSonora.play();


setInterval(function(){executarProjeto();}, (window.matchMedia("(max-width:820px)").matches? 2000 : 3000));

function definirPlacar()
{
    document.getElementById("contador").textContent = contador;
}
definirPlacar();

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
        if(contador > 0) contador--;
        console.log(alvo.classList[0]);
        audioErrou.currentTime = 0;
        audioErrou.play();  
    }
    definirPlacar();
}

function executarProjeto()
{
    removerMosquito();
    if(quantidadeAtualMoscasNaTela == 0)
    {
        for(let i = 0; i < quantidadeMoscasPermitidasNaTela; i ++)
        {
            gerarMosquito();
        }
        console.log(quantidadeAtualMoscasNaTela);
        console.log(quantidadeMoscasPermitidasNaTela);
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
