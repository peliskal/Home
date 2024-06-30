document.addEventListener('DOMContentLoaded', () => {
    const aLinks = document.querySelectorAll('.capitulo');
    const iframe = document.querySelector('iframe');
    const viendo = document.querySelector('.viendo');
    const container = document.querySelector('.container');
    const ol = container.querySelectorAll('.temporada');
    const verPelicula = container.querySelector('.verPelicula');
    const anterior = document.querySelector('.anterior');
    const siguiente = document.querySelector('.siguiente');
    
    // Variable global para saber el link actual
    let currentChapterIndex = 0;

    // Función para actualizar la visibilidad de los botones
    function updateButtonVisibility() {
        if (aLinks.length > 0) {
            anterior.style.display = 'block';
            siguiente.style.display = 'block';
        } else {
            anterior.style.display = 'none';
            siguiente.style.display = 'none';
        }
    }

    // Añadir event listeners a los enlaces de capítulos
    aLinks.forEach((link, index) => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            const href = this.getAttribute('href');
            const temporadaElement = this.closest('.temporada'); // Buscar el elemento con clase 'temporada' más cercano
            const temporada = temporadaElement.querySelector('.temporada-titulo').textContent; // Obtener el texto del título de la temporada

            currentChapterIndex = index; // Actualizar el índice del capítulo actual
            viendoActual = href; // Actualizar el link actual

            iframe.currentTime = 0;
            viendo.textContent = `${temporada} ${link.textContent}`;
            
            // Actualizar el src del iframe con la nueva URL
            iframe.src = `https://terabox.com/sharing/embed?surl=${href}&resolution=1080&autoplay=true&slid=`;
        });
    });

    // Añadir event listener al enlace de película
    if (verPelicula) {
        verPelicula.addEventListener('click', function(event){
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            const href = this.getAttribute('href');
            viendoActual = href; // Actualizar el link actual
            const titulo = document.querySelector('.titulo').textContent; // Obtener el texto del título de la temporada
            
            iframe.currentTime = 0;
            viendo.textContent = `${titulo}`;
            
            // Actualizar el src del iframe con la nueva URL
            iframe.src = `https://terabox.com/sharing/embed?surl=${href}&resolution=1080&autoplay=true&slid=`;
        });
    }

    // Iterar sobre cada <ol> para manejar el colapso/expansión de temporadas
    ol.forEach(ol => {
        // Obtener el <h3> dentro de este <ol>
        const h3 = ol.querySelector('h3');
        
        // Agregar un evento de clic al <h3>
        h3.addEventListener('click', function() {
            // Obtener todos los <li> dentro de este <ol>
            const elementosLi = ol.querySelectorAll('li');

            // Iterar sobre cada <li> y hacer toggle para mostrar/ocultar
            elementosLi.forEach(li => {
                li.classList.toggle('visible');
            });
        });
    });

    // Función para actualizar el capítulo en el iframe
    function updateChapter(index) {
        if (index >= 0 && index < aLinks.length) {
            const link = aLinks[index];
            const href = link.getAttribute('href');
            const temporadaElement = link.closest('.temporada'); // Buscar el elemento con clase 'temporada' más cercano
            const temporada = temporadaElement.querySelector('.temporada-titulo').textContent; // Obtener el texto del título de la temporada

            iframe.currentTime = 0;
            viendo.textContent = `${temporada} ${link.textContent}`;

            // Actualizar el src del iframe con la nueva URL
            iframe.src = `https://terabox.com/sharing/embed?surl=${href}&resolution=1080&autoplay=true&slid=`;

            currentChapterIndex = index;
            viendoActual = href;
        }
    }

    // Event listener para el botón de capítulo anterior
    anterior.addEventListener('click', () => {
        if (currentChapterIndex > 0) {
            updateChapter(currentChapterIndex - 1);
        }
    });

    // Event listener para el botón de siguiente capítulo
    siguiente.addEventListener('click', () => {
        if (currentChapterIndex < aLinks.length - 1) {
            updateChapter(currentChapterIndex + 1);
        }
    });

    // Inicializar la visibilidad de los botones
    updateButtonVisibility();
});

