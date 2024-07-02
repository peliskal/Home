let peliculas = [];
let series = [];

if (document.title === 'Peliskal-peliculas') {
    peliculas = window.listaCrearPelicula;
} else if (document.title === 'Peliskal-series') {
    series = window.listaCompletaGeneral;
} else {
    peliculas = window.listaCrearPelicula;
    series = window.listaCompletaGeneral;
}

let elegido = 0;

function elegir(s, p) {
    if(s && p != null){
        return s = s.concat(p);
    }
    else if (s && s.length > 0) {
        return s;
    } else {
        return p;
    }
}

const imagenCarga = 'https://i.ibb.co/zPTHfJD/gifcarga.webp';

function generarPeliculas() {
    const elementoPrincipal = document.querySelector('main');

    if (!elementoPrincipal) {
        console.error("Error: No se encontró el elemento 'main' en el documento.");
        return;
    }

    const elementoPeliculas = document.createElement('div');
    elementoPeliculas.classList.add('peliculas');

    const elegidoArray = elegir(series, peliculas);

    elegidoArray.forEach(pelicula => {
        const elementoPelicula = document.createElement('div');
        elementoPelicula.classList.add('portadaPelicula');
        const imagenPelicula = document.createElement('img');
        imagenPelicula.src = imagenCarga;
        imagenPelicula.setAttribute('data-src', pelicula.imagen);
        imagenPelicula.classList.add('lazy-image');
        imagenPelicula.alt = "imagen de "+pelicula.nombre;

        const nombrePelicula = document.createElement('a');
        const nombrePeliculaSpan = document.createElement('span');
        const valoPasar = pelicula.nombre;
        nombrePelicula.href =`https://peliskal.com.ar/reproductor/reproducir.html?name=${valoPasar}`;
       // nombrePelicula.setAttribute('target', '_blank');
        nombrePeliculaSpan.textContent = pelicula.nombre;
        nombrePelicula.classList.add("elementoA");
        nombrePelicula.appendChild(imagenPelicula);
        nombrePelicula.appendChild(nombrePeliculaSpan);
        elementoPelicula.appendChild(nombrePelicula);

        elementoPeliculas.appendChild(elementoPelicula);
    });

    elementoPrincipal.appendChild(elementoPeliculas);
}

generarPeliculas();

function detectarNombre(nombre) {
    console.log(nombre);
    return nombre;
}







