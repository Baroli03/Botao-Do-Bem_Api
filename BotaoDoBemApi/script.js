const listaPokemons = document.getElementById('lista-pokemons');
const apiURL = 'http://localhost:5255/pokemons';

const getPokemons = async () => {
    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar os pokemons!");         
        }

        const pokemons = await response.json();

        pokemons.forEach(pokemon => {
            const newLi = document.createElement('li');
            newLi.innerText = `Nome: ${pokemon.nome} | Peso: ${pokemon.peso}`;
            newLi.id = pokemon.nome;
            newLi.className = 'xalala';
            listaPokemons.appendChild(newLi);
        });
        

    } catch (error) {
        console.log(error.message);
        listaPokemons.innerText = `${error.message}`;
    }
}

getPokemons();