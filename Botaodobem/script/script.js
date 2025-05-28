const btn = document.getElementById("button-mode");
const modeToggle = document.getElementById("mode-toggle");
const h1 = document.getElementById("h1");
const apiURL = 'http://localhost:5159/emocoes';
const divEmocoes = document.getElementById("emotions");
const spanResultado = document.getElementById("resultado");
const mainElement = document.querySelector('main');
const formNovo = document.getElementById("novo");
const formEditar = document.getElementById('form-editar');
const editDiv = document.getElementById("edit");
const btnFecharEdit = document.getElementById("fechar-editar");
const btnFecharAdicionar = document.getElementById('fechar-adicionar');
const itens = document.getElementById("itens");
const container2 = document.getElementById("container2");
const formAdicionar = document.getElementById('form-adicionar');

let ligado = true;
let campoFrase = "frase";

btn.addEventListener("click", () => {
    spanResultado.innerText = "Clique em uma emoção";
    ligado = !ligado;

    // Alterna classes e estilos para os modos
    document.body.classList.toggle("divino");
    btn.classList.toggle("cormorant-unicase-light");
    h1.classList.toggle("cormorant-unicase-light");

    document.body.classList.toggle("maldito");
    h1.classList.toggle("creepster-regular");
    btn.classList.toggle("creepster-regular");

    campoFrase = ligado ? "frase" : "fraseRuim";
    spanResultado.style.color = ligado ? "black" : "red";
    btn.textContent = ligado ? "BEM" : "MAL";
    btn.style.color = ligado ? "black" : "red";
    document.body.style.backgroundColor = ligado ? "white" : "black";
    modeToggle.style.color = ligado ? "black" : "red";
});

let listaEmocoesNomes = [];
const frasesPorEmocao = {}; // Guarda as frases por nome da emoção

// Função principal para buscar e exibir emoções
const getEmocoes = async () => {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Erro ao buscar emoções!");

        const emocoes = await response.json();

        for (const emocao of emocoes) {
            if (!listaEmocoesNomes.includes(emocao.nome)) {
                listaEmocoesNomes.push(emocao.nome);

                // Cria o card da emoção
                const emotionDiv = document.createElement('div');
                emotionDiv.classList.add('grid', 'card');

                const newButton = document.createElement('button');
                newButton.innerText = emocao.nome;
                newButton.id = emocao.nome;
                newButton.classList.add('emotion-main');

                // Cria botões de ação: editar e excluir
                const actions = document.createElement('div');
                actions.classList.add('actions');

                const btnEditar = document.createElement('button');
                btnEditar.classList.add('Editar');
                btnEditar.textContent = '✏️';
                btnEditar.dataset.id = emocao.id;

                const btnExcluir = document.createElement('button');
                btnExcluir.classList.add('Excluir');
                btnExcluir.textContent = '🗑️';
                btnExcluir.dataset.id = emocao.id;

                actions.appendChild(btnEditar);
                actions.appendChild(btnExcluir);

                emotionDiv.appendChild(newButton);
                emotionDiv.appendChild(actions);
                divEmocoes.appendChild(emotionDiv);

                // Busca as frases dessa emoção e armazena
                const resp = await fetch(`${apiURL}/nome/${emocao.nome}`);
                const frases = await resp.json();
                frasesPorEmocao[emocao.nome] = frases;

                // Evento para mostrar frase aleatória ao clicar na emoção
                newButton.addEventListener("click", () => {
                    const frases = frasesPorEmocao[emocao.nome];
                    if (frases && frases.length > 0) {
                        const indiceAleatorio = Math.floor(Math.random() * frases.length);
                        spanResultado.innerText = frases[indiceAleatorio][campoFrase];
                    } else {
                        spanResultado.innerText = "Nenhuma frase encontrada.";
                    }
                });

                // Evento para editar emoção
                btnEditar.addEventListener("click", async function () {
                    const idEditar = parseInt(this.dataset.id);
                    abrirFormularioEditar(idEditar);
                });

                // Evento para excluir emoção
                btnExcluir.addEventListener("click", async function () {
                    const idExcluir = this.dataset.id;
                    await excluirEmocaoPrompt(idExcluir);
                });
            }
        }
    } catch (error) {
        console.log(error.message);
        divEmocoes.innerText = error.message;
    }
};

// Abre o formulário de edição com dados carregados
async function abrirFormularioEditar(idEditar) {
    btnAdicionar.style.display = 'none'; // Esconde botão adicionar
    editDiv.style.display = "block";  // Mostra div do form de edição
    container2.style.display = "flex";

    // Busca emoções com mesmo nome para mostrar ao usuário
    const listaEmocoes = await buscarEmocoesPorId(idEditar);

    itens.innerHTML = ''; // Limpa lista anterior

    listaEmocoes.forEach(emocao => {
        const span = document.createElement('span');
        span.innerHTML = `
            ID: ${emocao.Id} <br>
            Frase Boasinha: ${emocao.Frase} <br>
            Frase Maldita: ${emocao.FraseRuim} <br><br>
        `;
        itens.appendChild(span);
    });

    // Preenche o formulário com a primeira emoção da lista
    if (listaEmocoes.length > 0) {
        document.getElementById('id-emocao').value = listaEmocoes[0].Id;
        document.getElementById('frasedobem').value = listaEmocoes[0].Frase;
        document.getElementById('fraseruim').value = listaEmocoes[0].FraseRuim;
    }
}

// Função para excluir emoção via prompt e confirmação
async function excluirEmocaoPrompt(idExcluir) {
    const listaEmocoes = await buscarEmocoesPorId(idExcluir);
    if (listaEmocoes.length === 0) {
        alert("Nenhuma emoção encontrada para deletar.");
        return;
    }

    const idsEfrases = listaEmocoes.map(e => `ID: ${e.Id}, Frase: ${e.Frase}`).join('\n');

    const idEscolhido = prompt(
        `As seguintes emoções relacionadas foram encontradas:\n\n${idsEfrases}\n\nDigite o ID que deseja deletar:`
    );

    if (!idEscolhido) {
        alert("Exclusão cancelada.");
        return;
    }

    const idNumerico = parseInt(idEscolhido);

    const existe = listaEmocoes.some(e => e.Id === idNumerico);
    if (!existe) {
        alert("ID inválido. Exclusão cancelada.");
        return;
    }

    const confirmar = confirm(`Deseja realmente excluir a emoção com ID: ${idNumerico}?`);
    if (confirmar) {
        await deletarEmocaoPorId(idNumerico);
    }
}

// Buscar emoções pelo ID (inclui todas as que tem o mesmo nome)
async function buscarEmocoesPorId(id) {
    try {
        const response = await fetch(`${apiURL}/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar emoção pelo ID');
        const emocaoBase = await response.json();

        if (!emocaoBase || !emocaoBase.nome) return [];

        const nomeBuscado = emocaoBase.nome;
        const resp = await fetch(`${apiURL}/nome/${nomeBuscado}`);
        if (!resp.ok) throw new Error('Erro ao buscar emoções pelo nome');
        const emocoesComMesmoNome = await resp.json();

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

// DELETE
async function deletarEmocaoPorId(id) {
    try {
        const response = await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro ao deletar emoção.');
        alert('Emoção deletada com sucesso!');
        window.location.reload();
    } catch (error) {
        alert(error.message);
    }
}

// UPDATE (via formulário editar)
formEditar.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = parseInt(document.getElementById('id-emocao').value);
    const novaFrase = document.getElementById('frasedobem').value.trim();
    const novaFraseRuim = document.getElementById('fraseruim').value.trim();

    if (!id || (!novaFrase && !novaFraseRuim)) {
        alert('Preencha todos os campos para atualizar');
        return;
    }

    try {
        const bodyUpdate = {
            frase: novaFrase,
            fraseRuim: novaFraseRuim
        };

        const response = await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyUpdate)
        });

        if (!response.ok) throw new Error('Erro ao atualizar emoção');

        alert('Emoção atualizada com sucesso!');
        window.location.reload();
    } catch (error) {
        alert(error.message);
    }
});

// Botão fechar edição
btnFecharEdit.addEventListener('click', () => {
    container2.style.display = "none";
    editDiv.style.display = "none";
    btnAdicionar.style.display = 'block';
});

// Criar botão adicionar dinamicamente
const btnAdicionar = document.createElement('button');
btnAdicionar.textContent = '➕';
btnAdicionar.classList.add('adicionar');
mainElement.appendChild(btnAdicionar);

// Ao clicar no botão adicionar
btnAdicionar.addEventListener('click', () => {
    editDiv.style.display = "none";
    container2.style.display = "flex";
    formNovo.style.display = 'block';
    itens.innerHTML = '';
    btnAdicionar.style.display = 'none'; // Esconde botão enquanto o formulário está aberto
});

// Fechar formulário adicionar
btnFecharAdicionar.onclick = () => {
    formNovo.style.display = 'none';
    container2.style.display = "none";
    btnAdicionar.style.display = 'block'; // Mostra botão adicionar ao fechar
};

// Criar nova emoção - form adicionar
formAdicionar.addEventListener('submit', async (e) => {
    e.preventDefault();

    const novaEmocao = {
        nome: document.getElementById('nome').value.trim(),
        frase: document.getElementById('frasedobem-adicionar').value.trim(),
        fraseRuim: document.getElementById('fraseruim-adicionar').value.trim()
    };

    if (!novaEmocao.nome || (!novaEmocao.frase && !novaEmocao.fraseRuim)) {
        alert('Preencha todos os campos para adicionar');
        return;
    }

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaEmocao)
        });

        if (!response.ok) throw new Error('Erro ao criar emoção.');

        alert('Emoção criada com sucesso!');
        window.location.reload();
    } catch (error) {
        alert(error.message);
    }
});

// Inicializa a lista de emoções
getEmocoes();
