const btn = document.getElementById("button-mode");
const modeToggle = document.getElementById("mode-toggle");
const h1 = document.getElementById("h1");
const apiURL = 'http://localhost:5159/emocoes';
const divemocoes = document.getElementById("emotions");
const span = document.getElementById("resultado");
const mainElement = document.querySelector('main');
const container2 = document.getElementById("container2")
let ligado = true;
let campoFrase = "frase"
btn.addEventListener("click", () => {
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


    campoFrase = ligado ? "frase" : "fraseRuim";
    span.style.color = ligado ? "black" : "red";
    btn.textContent = ligado ? "BEM" : "MAL";
    btn.style.color = ligado ? "black" : "red";
    document.body.style.backgroundColor = ligado ? "white" : "black";
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
                btnEditar.dataset.id = emocao.id;

                const btnExcluir = document.createElement('button');
                btnExcluir.classList.add('Excluir')
                btnExcluir.textContent = '🗑️';
                btnExcluir.dataset.id = emocao.id;




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




                btnEditar.addEventListener("click", async function () {
                    const id_editar = this.dataset.id;
                    let lista_emocoes = await buscarEmocoesPorId(id_editar);
                    console.log("Apertou editar")
                    container2.style.display = "";
                    for (const emocao of lista_emocoes) {

                    }
                });

                btnExcluir.addEventListener("click", function () {

                    const id_excluir = this.dataset.id;
                    console.log(`Editando emoção com id: ${id_excluir}`);
                    console.log(`pog`)

                });
            }
        }

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


// 🔴 DELETE
async function deletarEmocao(nome) {
    try {
        const response = await fetch(`${apiURL}/nome/${nome}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Erro ao deletar emoção.');

        alert('Emoção deletada com sucesso!');
        window.location.reload();  // Ou remova a div do DOM diretamente
    } catch (error) {
        alert(error.message);
    }
}


// 🟡 UPDATE
async function atualizarFrase(nomeEmocao, novaFrase) {
    try {
        const response = await fetch(`${apiURL}/nome/${nomeEmocao}/frase`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ frase: novaFrase })
        });

        if (!response.ok) throw new Error('Erro ao atualizar a frase.');

        alert('Frase atualizada com sucesso!');
        window.location.reload();
    } catch (error) {
        alert(error.message);
    }
}

// 🟢 CREATE
async function criarEmocao(novaEmocao) {
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaEmocao)
        });
        if (!response.ok) throw new Error('Erro ao criar emoção.');

        alert('Emoção criada com sucesso!');
        window.location.reload();
    } catch (error) {
        alert(error.message);
    }
}


async function buscarEmocoesPorId(id) {
    try {
        // Passo 1: buscar a emoção com o ID
        const response = await fetch(`${apiURL}/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar emoção pelo ID');

        const emocaoBase = await response.json();

        if (!emocaoBase || !emocaoBase.nome) {
            return [];  // Não achou ou não tem nome
        }

        const nomeBuscado = emocaoBase.nome;

        // Passo 2: buscar todas as emoções com o mesmo nome
        const resp = await fetch(`${apiURL}/nome/${nomeBuscado}`);
        if (!resp.ok) throw new Error('Erro ao buscar emoções pelo nome');

        const emocoesComMesmoNome = await resp.json();

        // Passo 3: mapear e devolver apenas id, frase e fraseRuim
        return emocoesComMesmoNome.map(e => ({
            Id: e.id,
            Frase: e.frase,
            FraseRuim: e.fraseRuim
        }));

    } catch (error) {
        console.error(error);
        return [];
    }
}







getEmocoes();