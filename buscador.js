document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el campo de búsqueda por su ID
    const buscador = document.getElementById('buscador');
    // Selecciona el botón de búsqueda por su clase
    const botonBuscar = document.querySelector('.buscadorBtn');
    // Selecciona todos los elementos <span> dentro de <a> en el elemento <main>
    const enlaces = document.querySelectorAll('main a span');

    // Función para buscar series
    const buscarSeries = () => {
        // Obtiene el valor del campo de búsqueda, lo convierte a minúsculas y elimina los espacios en blanco
        const query = buscador.value.toLowerCase().trim();
        
        // Oculta todos los enlaces al inicio de la búsqueda
        enlaces.forEach(enlace => {
            enlace.classList.add('oculto');
        });

        // Muestra solo los enlaces que coincidan con la búsqueda
        enlaces.forEach(enlace => {
            // Obtiene el texto del enlace y lo convierte a minúsculas
            const textoEnlace = enlace.textContent.toLowerCase();
            // Si el texto del enlace incluye la consulta de búsqueda
            if (textoEnlace.includes(query)) {
                // Remueve la clase 'oculto' del enlace para mostrarlo
                enlace.classList.remove('oculto');
                // Encuentra el contenedor padre más cercano con la clase 'portadaPelicula'
                const contenedorPadre = enlace.closest('.portadaPelicula');
                // Remueve la clase 'oculto' del contenedor padre para mostrarlo
                contenedorPadre.classList.remove('oculto');
            } else {
                // Encuentra el contenedor padre más cercano con la clase 'portadaPelicula'
                const contenedorPadre = enlace.closest('.portadaPelicula');
                // Agrega la clase 'oculto' al contenedor padre para ocultarlo
                contenedorPadre.classList.add('oculto');
            }
        });
    };

    // Agrega un evento 'click' al botón de búsqueda
    botonBuscar.addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del botón
        buscarSeries(); // Ejecuta la función de búsqueda
    });

    // Agrega un evento 'input' al campo de búsqueda para buscar en tiempo real
    buscador.addEventListener('input', buscarSeries);
});
