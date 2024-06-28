document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el campo de búsqueda por su ID
    const buscador = document.getElementById('buscador');
    // Selecciona el botón de búsqueda por su clase
    const botonBuscar = document.querySelector('.buscadorBtn');
    // Selecciona todos los elementos <span> dentro de <a> en el elemento <main>
    const enlaces = document.querySelectorAll('main a span');
    // Selecciona el contenedor donde se mostrarán los resultados o el mensaje de no resultados
    const resultNull = document.querySelector('.peliculas'); // Suponiendo que tienes un contenedor con la clase 'peliculas'

    // Función para normalizar texto (eliminar acentos)
    const normalizarTexto = (texto) => {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    };

    // Función para buscar series
    const buscarSeries = () => {
        // Obtiene el valor del campo de búsqueda, lo normaliza
        const query = normalizarTexto(buscador.value);

        // Variable para contar los resultados encontrados
        let resultadosEncontrados = 0;

        // Oculta todos los enlaces al inicio de la búsqueda
        enlaces.forEach(enlace => {
            enlace.classList.add('oculto');
        });

        // Muestra solo los enlaces que coincidan con la búsqueda
        enlaces.forEach(enlace => {
            // Obtiene el texto del enlace y lo normaliza
            const textoEnlace = normalizarTexto(enlace.textContent);
            // Si el texto del enlace incluye la consulta de búsqueda
            if (textoEnlace.includes(query)) {
                // Remueve la clase 'oculto' del enlace para mostrarlo
                enlace.classList.remove('oculto');
                // Encuentra el contenedor padre más cercano con la clase 'portadaPelicula'
                const contenedorPadre = enlace.closest('.portadaPelicula');
                // Remueve la clase 'oculto' del contenedor padre para mostrarlo
                contenedorPadre.classList.remove('oculto');
                // Incrementa el contador de resultados encontrados
                resultadosEncontrados++;
            } else {
                // Encuentra el contenedor padre más cercano con la clase 'portadaPelicula'
                const contenedorPadre = enlace.closest('.portadaPelicula');
                // Agrega la clase 'oculto' al contenedor padre para ocultarlo
                contenedorPadre.classList.add('oculto');
            }
        });

        // Verifica si no se encontraron resultados y muestra un mensaje en la consola
        const mensajeAnterior = document.querySelector('.no-resultados');
        if (resultadosEncontrados === 0) {
            if (!mensajeAnterior) {
                const noP = document.createElement('p');
                noP.textContent = 'No se encontraron resultados para tu busqueda';
                noP.className = 'no-resultados'; // Agrega una clase para identificar el mensaje
                resultNull.appendChild(noP);
            }
        } else if (mensajeAnterior) {
            mensajeAnterior.remove();
        }
    };

    // Agrega un evento 'click' al botón de búsqueda
    botonBuscar.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del botón
        buscarSeries(); // Ejecuta la función de búsqueda
    });

    // Agrega un evento 'input' al campo de búsqueda para buscar en tiempo real
    buscador.addEventListener('input', buscarSeries);
});

