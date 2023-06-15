let conjuntoMoscas = document.getElementsByClassName("mosquito");
let quantidadeAtualMoscasNaTela = document.getElementsByClassName("mosquito").length;
let contador = 0;
let quantidadeMoscasPermitidasNaTela = 3;
let trilhaSonora =  document.getElementById("trilha-sonora");
let audioPontuacao =  document.getElementById("pontuou");
let audioErrou = document.getElementById("errou");

trilhaSonora.currentTime = 0;
trilhaSonora.play();


setInterval(function(){executarProjeto();}, 1000);

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

function executarProjeto()
{
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
    
    document.body.onmousedown = function(evento)
    {
        let condicao = (mosca) =>
            ((evento.clientX > mosca.x) && (evento.clientX < (mosca.x + mosca.width)))
            && 
            ((evento.clientY > mosca.y) && (evento.clientY < (mosca.y + mosca.height)));

        /*Converte o HTMLCollection<Element> retornado por getElementsByClassName("mosquito") em um array de
            Element, ou seja: Element[]*/
        let array = [...conjuntoMoscas];

        if
        (array && array.some(condicao))
        {   
            let clicado =  array.some(condicao)? array.filter(condicao) : null;
            clicado[0].remove();
            contador++;
            audioPontuacao.currentTime = 0;
            audioPontuacao.play();
        }
        else
        {
            if(contador > 0)
            {
                contador--;
                audioErrou.currentTime = 0;
                audioErrou.play();
            } 
        }
        definirPlacar();
    }
}
