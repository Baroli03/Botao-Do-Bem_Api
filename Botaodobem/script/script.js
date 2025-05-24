const btn = document.getElementById("button-mode");
const modeToggle = document.getElementById("mode-toggle");
const h1 = document.getElementById("h1");
const apiURL = 'http://localhost:5159/emocoes';
const divemocoes = document.getElementById("emotions");
const span = document.getElementById("resultado");

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

                const newbutton = document.createElement('button');
                newbutton.innerText = emocao.nome;
                newbutton.id = emocao.nome;
                divemocoes.appendChild(newbutton);

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
            }
        }

    } catch (error) {
        console.log(error.message);
        divemocoes.innerText = error.message;
    }
};





getEmocoes();

const frases = {
    raiva: [
        "A raiva é um ácido que pode fazer mais mal ao recipiente do que a qualquer coisa sobre a qual for derramado.",
        "Transforme a raiva em ação positiva."
    ],
    tristeza: [
        "A tristeza voa com as asas do tempo.",
        "Chorar também é sinal de força."
    ],
    alegria: [
        "A alegria evita mil males.",
        "Sorrir é a forma mais simples de espalhar felicidade."
    ]
};

document.getElementById("mostrar-frase").addEventListener("click", () => {
    const emocao = document.getElementById("emotion").value;
    const lista = frases[emocao];
    if (lista && lista.length > 0) {
        const index = Math.floor(Math.random() * lista.length);
        document.getElementById("resultado").textContent = lista[index];
    } else {
        document.getElementById("resultado").textContent = "Nenhuma frase disponível.";
    }
});

document.getElementById("adicionar").addEventListener("click", () => {
    const emocao = document.getElementById("emotion").value;
    const novaFrase = document.getElementById("nova-frase").value.trim();
    if (novaFrase !== "") {
        frases[emocao].push(novaFrase);
        document.getElementById("nova-frase").value = "";
        alert("Frase adicionada com sucesso!");
    } else {
        alert("Digite uma frase válida.");
    }
});
