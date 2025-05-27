const btn = document.getElementById("button-mode");
const modeToggle = document.getElementById("mode-toggle");
const h1 = document.getElementById("h1");
const apiURL = 'http://localhost:5159/emocoes';
const divemocoes = document.getElementById("emotions");
const span = document.getElementById("resultado");
const mainElement = document.querySelector('main');

let ligado = true;
let campoFrase  = "frase"
btn.addEventListener("click", () =>{
    span.innerText = "Clique em uma emoção";
    ligado = !ligado;
    // Divino
    document.body.classList.toggle("divino")
    btn.classList.toggle("cormorant-unicase-light")
    h1.classList.toggle("cormorant-unicase-light")

    // Maldito
    document.body.classList.toggle("maldito")
    h1.classList.toggle("creepster-regular")
    btn.classList.toggle("creepster-regular")


    campoFrase = ligado? "frase" : "fraseRuim";
    span.style.color = ligado? "black" : "red";
    btn.textContent = ligado ? "BEM" : "MAL";
    btn.style.color = ligado ? "black" : "red";
    document.body.style.backgroundColor = ligado ?  "white" : "black";
    modeToggle.style.color = ligado ? "black" : "red";

}
)
let listemocoes = [];
const frasesPorEmocao = {}; // Guarda as frases por nome da emoção

const getEmocoes = async () => {
    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao Buscar emoções!");
        }

        const emocoes = await response.json();

        for (const emocao of emocoes) {
            if (!listemocoes.includes(emocao.nome)) {
                listemocoes.push(emocao.nome);

                const emotionDiv = document.createElement('div');
                emotionDiv.classList.add('grid');
                emotionDiv.classList.add('card');
                

                const newbutton = document.createElement('button');
                newbutton.innerText = emocao.nome;
                newbutton.id = emocao.nome;
                newbutton.classList.add('emotion-main');

                const actions = document.createElement('div');
                actions.classList.add('actions');
                const btnEditar = document.createElement('button');
                btnEditar.classList.add('Editar');
                btnEditar.textContent = '✏️';
                const btnExcluir = document.createElement('button');
                btnExcluir.classList.add('Excluir')
                btnExcluir.textContent = '🗑️';


                actions.appendChild(btnEditar);
                actions.appendChild(btnExcluir);
                emotionDiv.appendChild(newbutton);
                emotionDiv.appendChild(actions);
                divemocoes.appendChild(emotionDiv);

                // Busca as frases dessa emoção e armazena
                const resp = await fetch(`${apiURL}/nome/${emocao.nome}`);
                const frases = await resp.json();
                frasesPorEmocao[emocao.nome] = frases;

                // Adiciona evento de clique
                newbutton.addEventListener("click", () => {
                    const frases = frasesPorEmocao[emocao.nome];
                    if (frases && frases.length > 0) {
                        const indiceAleatorio = Math.floor(Math.random() * frases.length);
                        span.innerText = frases[indiceAleatorio][campoFrase];
                    } else {
                        span.innerText = "Nenhuma frase encontrada.";
                    }
            });


                
                
                btnEditar.addEventListener("click", (event) => {
                    event.stopPropagation();  
                         
        });

                btnExcluir.addEventListener("click", (event) => {
                    event.stopPropagation();
                    
        });
    }}

        const btnAdicionar = document.createElement('button');
        btnAdicionar.textContent = '➕';
        btnAdicionar.classList.add('adicionar');
        mainElement.appendChild(btnAdicionar)

        btnAdicionar.addEventListener('click', () => {
            
        })


    } catch (error) {
        console.log(error.message);
        divemocoes.innerText = error.message;
    }
};







getEmocoes();