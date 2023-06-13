setInterval(function(){executarProjeto();}, 1000);

let contador = 0;
let trilhaSonora = document.getElementById("trilha-sonora");
let audioPontuacao =  document.getElementById("pontuou");
let audioErrou = document.getElementById("errou");

function executarProjeto()
{

    if(document.getElementsByClassName("mosquito") && document.getElementsByClassName("mosquito").length > 2)
    {
        //O número gerado para índice será sempre de min até max, já que o valor limite max é exclusivo.
        var lista = [...document.getElementsByClassName("mosquito")];
        let indice = Math.floor(Math.random() * (3 - 0) + 0);
        lista[indice].remove();
           
    }

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

    document.body.appendChild(imagem);
    document.body.onclick = function(evento)
    {
        let condicao = (mosca) =>
            ((evento.clientX > mosca.x) && (evento.clientX < (mosca.x + mosca.width)))
            && 
            ((evento.clientY > mosca.y) && (evento.clientY < (mosca.y + mosca.height)));

        let clique = (mosca) => mosca.setAttribute("data-click", "clicou");

        /*Converte o HTMLCollection<Element> retornado por getElementsByClassName("mosquito") em um array de
            Element, ou seja: Element[]*/
        let array = [...document.getElementsByClassName("mosquito")];

        trilhaSonora.play();
        if
        (array && array.some(condicao))
        {   
            let clicado =  array.filter(condicao);
            clicado[0].remove();
            contador++;
            // imagem.src = "./assets/sangue2.png";
            audioPontuacao.play();
        }
        else
        {
            if(contador > 0)
            {
                contador--;
                audioErrou.play();
            } 
        }
        document.getElementById("contador").textContent = contador;
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