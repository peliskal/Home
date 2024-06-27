



const listas = window.listaCompletaGeneral;

//recibo nombre por url
 // Obtener el valor de la URL
 const urlParams = new URLSearchParams(window.location.search);
 const miVariable = urlParams.get('name');

function buscarSerie(nombreBuscado) {
    let serieEncontrada = null;
    
    listas.forEach(serie => {
        if (serie.nombre.toLowerCase() === nombreBuscado.toLowerCase()) {
            serieEncontrada = serie;
        }
    });
    
    return serieEncontrada;
}

const main = document.querySelector('.main');
const visor = main.querySelector('.visor');

function mostrarSeleccionado(seriesList) {
    if (!seriesList) {
        console.log("Serie no encontrada.");
        return;
    }
    
    const divContainer = document.createElement('div');
    divContainer.classList.add('container');
    main.appendChild(divContainer);
    main.insertBefore(visor, divContainer.nextSibling);

    const divDatos = document.createElement('div');
    divDatos.classList.add('datos');
    divContainer.appendChild(divDatos);

    const imgPortada = document.createElement('img');
    imgPortada.classList.add('portada');
    imgPortada.src = seriesList.imagen; //agregar lazyload
    divDatos.appendChild(imgPortada);

    const div = document.createElement('div');
    divDatos.appendChild(div);

    const h1Titulo = document.createElement('h1');
    h1Titulo.classList.add('titulo');
    h1Titulo.textContent = seriesList.nombre;
    div.appendChild(h1Titulo);

    const pResumen = document.createElement('p');
    pResumen.classList.add('resumen');
    pResumen.textContent = seriesList.sinopsis;
    div.appendChild(pResumen);

    seriesList.temporadas.forEach(temporada => {
        const olTemporadas = document.createElement('ol');
        olTemporadas.classList.add('temporada');
        divContainer.appendChild(olTemporadas);

        const h3TemporadaCapitulo = document.createElement('h3');
        h3TemporadaCapitulo.classList.add('temporada-titulo');
        h3TemporadaCapitulo.textContent = `Temporada ${temporada.temporada}`;
        olTemporadas.appendChild(h3TemporadaCapitulo);

        temporada.episodios.forEach((episodio, index) => {
            const li = document.createElement('li');
            olTemporadas.appendChild(li);

            const aCapitulo = document.createElement('a');
            aCapitulo.classList.add('capitulo');
            aCapitulo.href = episodio;
            aCapitulo.textContent = `Capitulo ${index + 1}`;
            li.appendChild(aCapitulo);
        });
    });
}

// Función para obtener la última parte de cada URL
function extraerUltimaParteDeUrls(lista) {
    return {
        nombre: lista.nombre,
        sinopsis: lista.sinopsis,
        imagen: lista.imagen,
        temporadas: lista.temporadas.map(temporada => ({
            temporada: temporada.temporada,
            episodios: temporada.episodios.map(url => {
                // Dividir la URL por '/'
                let partes = url.split('/');
                // Obtener la última parte
                let ultimaParte = partes[partes.length - 1];
                return ultimaParte.substring(1); // Elimina el primer carácter (generalmente un número)
            })
        }))
    };
}


// Llamar a la función para trabajar el array de forma para cambiar los links

const serieEncontrada = buscarSerie(miVariable);
if (serieEncontrada) {
    const serieProcesada = extraerUltimaParteDeUrls(serieEncontrada);
    mostrarSeleccionado(serieProcesada);
} else {
    console.log("Serie no encontrada.");
}