setInterval(function(){executarProjeto();}, 1000);
let contador = 0;
let trilhaSonora = document.getElementById("trilha-sonora");
let audioPontuacao =  document.getElementById("pontuou");
let audioErrou = document.getElementById("errou");

function executarProjeto()
{

    if($("#mosquito")) $("#mosquito").remove();

    let altura = window.innerHeight;
    let largura = window.innerWidth;
    let posicaoAltura = Math.abs(Math.random() * altura - 100);
    let posicaoLargura = Math.abs(Math.random() * largura  - 100);
    let imagem = document.createElement("img");

    imagem.setAttribute("src", "./assets/mosquito.png");
    imagem.id = "mosquito";
    imagem.className = "mosquito " + mudarTamanho();
    imagem.style.top = posicaoAltura + "px";
    imagem.style.left = posicaoLargura + "px";

    document.body.appendChild(imagem);
    document.body.onclick = function(evento)
    {
        trilhaSonora.play();
        if
        (
            ((evento.clientX > imagem.x) && (evento.clientX < (imagem.x + imagem.width))) 
            && 
            (evento.clientY > (imagem.y) && (evento.clientY < (imagem.y + imagem.height)))
        )
        {   
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
        $("#contador").html(contador);
    }
}



function mudarTamanho()
{
    let classe = Math.floor(Math.random() * 3);
    if(classe == 0) return "tamanho1";
    else if(classe == 1 ) return "tamanho2";
    else return "tamanho3";
}