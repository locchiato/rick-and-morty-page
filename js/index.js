const get = {
    characters: "https://rickandmortyapi.com/api/character",
    locations: "https://rickandmortyapi.com/api/location",
    episodes: "https://rickandmortyapi.com/api/episode",
};

fetch(get["characters"])
    .then((data) => data.json())
    .then((res) => res.results)
    .then((personajes) => personajes.forEach(renderizarPersonaje));

function renderizarPersonaje(personaje) {
    const info = {};
    const main = document.querySelector("main");

    console.log(personaje);
    recorrerObjetoYHacer(personaje, (key, value) => {
        info[key] = value;
    });

    const div = document.createElement('div');
    div.classList.add('tarjeta');
    div.onclick = () => {
        main.innerHTML = '';

        fetch(info.url)
            .then(data => data.json())
            .then(renderizarPersonaje)
            .then(() => {
                document.querySelector('.tarjeta').onclick = "";
            })

    }

    div.innerHTML += `
    
        <h1>${info.name}</h1>
        <img src="${info.image}">
        <p>${info.status}</p>
            `;

    main.appendChild(div);

}

const CAMPOS = ['name', 'status', 'image', 'url'];

let recorrerObjetoYHacer = (
    objeto,
    hacer = (key, value) => {
        console.log(key + ": " + value);
    }
) => {
    for (const dato in objeto) {
        if (CAMPOS.includes(dato)) hacer(dato, objeto[dato]);
    }
    return objeto;
};