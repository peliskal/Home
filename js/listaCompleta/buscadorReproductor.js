document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById('buscador');
    const botonBuscar = document.querySelector('.buscadorBtn');
    const imagenCarga = 'https://i.ibb.co/zPTHfJD/gifcarga.webp';

    const normalizarTexto = (texto) => {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    };

    const buscarSeries = () => {
        const query = normalizarTexto(buscador.value);
        
        // Verificar si hay texto en el buscador
        if (!query) {
            ocultarResultados();
            return; // Si no hay texto, salir de la función sin hacer nada
        }

        let resultados = [];

        const buscarEnArray = (array) => {
            array.forEach(item => {
                const tituloNormalizado = normalizarTexto(item.nombre);
                if (tituloNormalizado.includes(query)) {
                    resultados.push(item);
                }
            });
        };

        if (window.listaCrearPelicula && window.listaCrearPelicula.length > 0) {
            buscarEnArray(window.listaCrearPelicula);
        }

        if (window.listaCompletaGeneral && window.listaCompletaGeneral.length > 0) {
            buscarEnArray(window.listaCompletaGeneral);
        }

        // Limpiar resultados anteriores
        const contenedorResultados = document.querySelector('.resultados-container');
        if (contenedorResultados) {
            contenedorResultados.innerHTML = '';

            // Mostrar resultados si existen
            if (resultados.length > 0) {
                contenedorResultados.style.display = 'block'; // Mostrar contenedor de resultados
                resultados.sort((a, b) => a.nombre.localeCompare(b.nombre));
                resultados.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'portadaPelicula';
                    div.innerHTML = `
                        <a href="https://peliskal.com.ar/reproductor/reproducir.html?name=${item.nombre}" class="capitulo">
                            <img src="${imagenCarga}" alt="imagen de ${item.nombre}" data-src="${item.imagen}" class="lazy-image">
                            <span>${item.nombre}</span>
                        </a>
                    `;
                    contenedorResultados.appendChild(div);
                });

                // Configurar lazy loading para las imágenes
                const imagenesPerezosas = document.querySelectorAll('.lazy-image');

                // Crear observador de intersecciones
                const observador = new IntersectionObserver((entradas, observador) => {
                    entradas.forEach(entrada => {
                        if (entrada.isIntersecting) {
                            // Cargar la imagen al entrar en el viewport
                            const imagen = entrada.target;
                            imagen.src = imagen.dataset.src;
                            imagen.classList.remove('lazy-image'); // Eliminar la clase lazy-image
                            // Dejar de observar la imagen una vez cargada
                            observador.unobserve(imagen);
                        }
                    });
                });

                // Observar cada imagen perezosa
                imagenesPerezosas.forEach(imagen => {
                    observador.observe(imagen);
                });
            } else {
                // Mostrar mensaje de no resultados si la búsqueda no arroja resultados
                mostrarNoResultados(contenedorResultados);
            }
        } else {
            console.error('No se encontró el contenedor de resultados');
        }
    };

    const ocultarResultados = () => {
        const contenedorResultados = document.querySelector('.resultados-container');
        if (contenedorResultados) {
            contenedorResultados.style.display = 'none'; // Ocultar contenedor de resultados
            contenedorResultados.innerHTML = ''; // Limpiar contenido
        }
    };

    const mostrarNoResultados = (contenedor) => {
        const noP = document.createElement('p');
        noP.textContent = 'No se encontraron resultados para tu búsqueda';
        noP.className = 'no-resultados';
        contenedor.appendChild(noP);
        contenedor.style.display = 'block'; // Mostrar contenedor con mensaje de no resultados
    };

    botonBuscar.addEventListener('click', (event) => {
        event.preventDefault();
        buscarSeries();
    });

    buscador.addEventListener('input', buscarSeries);

    // Crear contenedor de resultados al cargar la página
    const contenedorPadre = document.querySelector('.buscadorContainer');
    if (contenedorPadre) {
        const contenedorResultados = document.createElement('div');
        contenedorResultados.className = 'resultados-container';
        contenedorPadre.appendChild(contenedorResultados);
        ocultarResultados(); // Ocultar contenedor al inicio
    } else {
        console.error('No se encontró el contenedor del buscador');
    }
});

