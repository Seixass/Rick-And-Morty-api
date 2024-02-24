// Constantes e URL base da API
const page = 2; // Número da página a ser carregada
const baseUrl = 'https://rickandmortyapi.com/api';

// Função assíncrona para carregar dados de personagens
const loadCharacter = async () => {
    const res = await fetch(`${baseUrl}/character`);
    const data = await res.json();
    const limitData = data.results.slice(0, 12); // Limitando para exibir apenas os 12 primeiros personagens
    return { results: limitData };
};

// Função assíncrona para carregar dados de locais
const loadLocation = async () => {
    const res = await fetch(`${baseUrl}/location`);
    return await res.json();
};

// Função assíncrona para carregar dados de episódios
const loadEpisode = async () => {
    const res = await fetch(`${baseUrl}/episode`);
    return await res.json();
};

// Função assíncrona para carregar todos os tipos de dados simultaneamente
const loadAllWithPromiseAll = async () => {
    const [character, location, episode] = await Promise.all([
        loadCharacter(),
        loadLocation(),
        loadEpisode()
    ]);
    showCharacter(character.results);
};

// Chamada inicial para carregar dados ao carregar a página
loadAllWithPromiseAll();

// Função para exibir personagens na página HTML
function showCharacter(characters) {
    const characterContainer = document.getElementById("character-container");

    characters.map((character) => {
        // Criação de elementos HTML para cada personagem
        const divCharacter = document.createElement('div');
        divCharacter.innerHTML = `
            <img src="${character.image}" alt="Imagedopersonagem"/>
            <article>
                <div class="box-1">
                    <h3>${character.name}</h3>
                    <span>${character.status} - ${character.species}</span>
                </div>
                <div class="box-2">
                    <span class="location">Location</span>
                    <a href="${character.location.url}">${character.location.name}</a>
                </div>
                <div class="box-3">
                    <span class="origin">Origin</span>
                    <a href="${character.origin.url}">${character.origin.name}</a>
                </div>
            </article>
        `;
        divCharacter.classList.add('character-box');

        // Adição dos elementos à página
        characterContainer.appendChild(divCharacter);
    });
}
