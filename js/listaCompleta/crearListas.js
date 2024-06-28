// Obtener la lista completa de series desde una variable global
const listas = window.listaCompletaGeneral;
// Obtener la lista completa de películas desde una variable global
const listaPelicula = window.listaCrearPelicula;

// Obtener el valor del parámetro "name" desde la URL
const urlParams = new URLSearchParams(window.location.search);
const miVariable = urlParams.get('name');

// Función para buscar una serie en la lista de series
function buscarSerie(nombreBuscado) {
    let serieEncontrada = null;

    // Recorrer cada serie en la lista de series
    listas.forEach(serie => {
        // Comparar el nombre de la serie en minúsculas con el nombre buscado en minúsculas
        if (serie.nombre.toLowerCase() === nombreBuscado.toLowerCase()) {
            serieEncontrada = serie;
        }
    });

    return serieEncontrada; // Devolver la serie encontrada (o null si no se encontró)
}

// Función para buscar una película en la lista de películas
function buscarPelicula(nombreBuscado) {
    let peliculaEncontrada = null;

    // Recorrer cada película en la lista de películas
    listaPelicula.forEach(pelicula => {
        // Comparar el nombre de la película en minúsculas con el nombre buscado en minúsculas
        if (pelicula.nombre.toLowerCase() === nombreBuscado.toLowerCase()) {
            peliculaEncontrada = pelicula;
        }
    });

    return peliculaEncontrada; // Devolver la película encontrada (o null si no se encontró)
}

// Seleccionar el elemento principal y el visor en el documento HTML
const main = document.querySelector('.main');
const visor = main.querySelector('.visor');

// Función para mostrar la serie o película seleccionada
function mostrarSeleccionado(itemList) {
    if (!itemList) { // Verificar si no se encontró la serie o película
        console.log("Item no encontrado.");
        return;
    }

    // Crear un contenedor div para la serie o película
    const divContainer = document.createElement('div');
    divContainer.classList.add('container');
    divContainer.style.backgroundImage = `url(${itemList.imagen})`;
    main.appendChild(divContainer);
    main.insertBefore(visor, divContainer.nextSibling);

    // Crear un div para los datos de la serie o película
    const divDatos = document.createElement('div');
    divDatos.classList.add('datos');
    divContainer.appendChild(divDatos);

    // Crear una imagen para la portada de la serie o película
    const imgPortada = document.createElement('img');
    imgPortada.classList.add('portada');
    imgPortada.src = itemList.imagen; // Agregar lazyload
    divDatos.appendChild(imgPortada);

    // Crear un div para el título y resumen de la serie o película
    const div = document.createElement('div');
    divDatos.appendChild(div);

    // Crear un título h1 para el nombre de la serie o película
    const h1Titulo = document.createElement('h1');
    h1Titulo.classList.add('titulo');
    h1Titulo.textContent = itemList.nombre;
    div.appendChild(h1Titulo);

    // Crear un párrafo para la sinopsis de la serie o película
    const pResumen = document.createElement('p');
    pResumen.classList.add('resumen');
    pResumen.textContent = itemList.sinopsis;
    div.appendChild(pResumen);

    // Verificar si el itemList tiene temporadas (es una serie)
    if (itemList.temporadas) {
        // Recorrer cada temporada en la serie
        itemList.temporadas.forEach(temporada => {
            // Crear una lista ordenada para los episodios de la temporada
            const olTemporadas = document.createElement('ol');
            olTemporadas.classList.add('temporada');
            divContainer.appendChild(olTemporadas);

            // Crear un encabezado h3 para el título de la temporada
            const h3TemporadaCapitulo = document.createElement('h3');
            h3TemporadaCapitulo.classList.add('temporada-titulo');
            h3TemporadaCapitulo.textContent = `Temporada ${temporada.temporada}`;
            olTemporadas.appendChild(h3TemporadaCapitulo);

            // Recorrer cada episodio en la temporada
            temporada.episodios.forEach((episodio, index) => {
                // Crear un elemento de lista para el episodio
                const li = document.createElement('li');
                olTemporadas.appendChild(li);

                // Crear un enlace para el episodio
                const aCapitulo = document.createElement('a');
                aCapitulo.classList.add('capitulo');
                aCapitulo.href = episodio;
                aCapitulo.textContent = `Capitulo ${index + 1}`;
                li.appendChild(aCapitulo);
            });
        });
    } else {
        // Si no tiene temporadas, significa que es una película
        const aPelicula = document.createElement('a');
        aPelicula.classList.add('verPelicula');
        aPelicula.href = itemList.url;
        aPelicula.textContent = "Ver Película";
        divDatos.appendChild(aPelicula);
    }
}

// Función para obtener la última parte de cada URL en la lista de series y películas
function extraerUltimaParteDeUrls(lista) {
    if (lista.temporadas) {
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
    } else {
        // Procesar la URL de la película de la misma manera
        let partes = lista.url.split('/');
        let ultimaParte = partes[partes.length - 1];
        return {
            nombre: lista.nombre,
            sinopsis: lista.sinopsis,
            imagen: lista.imagen,
            url: ultimaParte.substring(1) // Elimina el primer carácter (generalmente un número)
        };
    }
}

// Llamar a la función para buscar la serie con el nombre recibido por URL
let itemEncontrado = buscarSerie(miVariable);
if (!itemEncontrado) {
    // Si no se encontró la serie, buscar la película
    itemEncontrado = buscarPelicula(miVariable);
}

//cambiar titulo pagina html por el titulo de los que estoy viendo
document.title = `Peliskal-${itemEncontrado.nombre}`;

// Si se encontró la serie o película, procesar y mostrarla
if (itemEncontrado) {
    const itemProcesado = extraerUltimaParteDeUrls(itemEncontrado);
    mostrarSeleccionado(itemProcesado);
} else {
    alert("Serie o Película no encontrada."); // Mostrar alerta si no se encontró la serie o película
}

