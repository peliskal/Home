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

    // Variable para rastrear la temporada actualmente abierta
    let currentOpenSeason = null;

    // Función para guardar el último capítulo visto en localStorage
    function saveLastWatched(href) {
        localStorage.setItem('lastWatched', href);
    }

    // Función para obtener el último capítulo visto de localStorage
    function getLastWatched() {
        return localStorage.getItem('lastWatched');
    }

    // Función para cargar el último capítulo visto en el iframe
    function loadLastWatched() {
        const lastWatched = getLastWatched();
        if (lastWatched) {
            const link = document.querySelector(`.capitulo[href="${lastWatched}"]`);
            if (link) {
                const temporadaElement = link.closest('.temporada');
                const temporada = temporadaElement.querySelector('.temporada-titulo').textContent;
                iframe.src = `https://terabox.com/sharing/embed?surl=${lastWatched}&resolution=1080&autoplay=true&uk=4401246120582&slid=`;
                viendo.textContent = `${temporada} ${link.textContent}`;
                currentChapterIndex = Array.from(aLinks).indexOf(link);
            }
        }
    }

    // Cargar el último capítulo visto al cargar la página
    loadLastWatched();

    // Añadir event listeners a los enlaces de capítulos
    aLinks.forEach((link, index) => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            const href = this.getAttribute('href');
            const temporadaElement = this.closest('.temporada'); // Buscar el elemento con clase 'temporada' más cercano
            const temporada = temporadaElement.querySelector('.temporada-titulo').textContent; // Obtener el texto del título de la temporada

            currentChapterIndex = index; // Actualizar el índice del capítulo actual
            saveLastWatched(href); // Guardar el capítulo actual como el último visto

            iframe.src = `https://terabox.com/sharing/embed?surl=${href}&resolution=1080&autoplay=true&uk=4401246120582&slid=`;
            viendo.textContent = `${temporada} ${link.textContent}`;

            // Cerrar la temporada actualmente abierta
            if (currentOpenSeason) {
                const openLiElements = currentOpenSeason.querySelectorAll('li');
                openLiElements.forEach(li => li.classList.remove('visible'));
            }

            // Desplazar la vista al iframe del reproductor
            iframe.scrollIntoView({ behavior: 'smooth' });

            // Actualizar la temporada abierta actualmente
            currentOpenSeason = null;
        });
    });

    // Añadir event listener al enlace de película
    if (verPelicula) {
        verPelicula.addEventListener('click', function(event){
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            const href = this.getAttribute('href');
            saveLastWatched(href); // Guardar el capítulo actual como el último visto
            const titulo = document.querySelector('.titulo').textContent; // Obtener el texto del título de la temporada
            
            iframe.src = `https://terabox.com/sharing/embed?surl=${href}&resolution=1080&autoplay=true&uk=4401246120582&slid=`;
            viendo.textContent = `${titulo}`;

            // Desplazar la vista al iframe del reproductor
            iframe.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Iterar sobre cada <ol> para manejar el colapso/expansión de temporadas
    ol.forEach(ol => {
        // Obtener el <h3> dentro de este <ol>
        const h3 = ol.querySelector('h3');
        
        // Agregar un evento de clic al <h3>
        h3.addEventListener('click', function() {
            // Cerrar la temporada abierta anteriormente, si existe
            if (currentOpenSeason && currentOpenSeason !== ol) {
                const openLiElements = currentOpenSeason.querySelectorAll('li');
                openLiElements.forEach(li => li.classList.remove('visible'));
            }

            // Alternar la visibilidad de los <li> en la temporada actual
            const elementosLi = ol.querySelectorAll('li');
            elementosLi.forEach(li => li.classList.toggle('visible'));

            // Actualizar la temporada abierta actualmente
            currentOpenSeason = ol.classList.contains('visible') ? null : ol;
        });
    });

    // Función para actualizar el capítulo en el iframe
    function updateChapter(index) {
        if (index >= 0 && index < aLinks.length) {
            const link = aLinks[index];
            const href = link.getAttribute('href');
            const temporadaElement = link.closest('.temporada'); // Buscar el elemento con clase 'temporada' más cercano
            const temporada = temporadaElement.querySelector('.temporada-titulo').textContent; // Obtener el texto del título de la temporada

            iframe.src = `https://terabox.com/sharing/embed?surl=${href}&resolution=1080&autoplay=true&uk=4401246120582&slid=`;
            viendo.textContent = `${temporada} ${link.textContent}`;

            currentChapterIndex = index;
            saveLastWatched(href); // Guardar el capítulo actual como el último visto
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

    // Mostrar/ocultar botones según la cantidad de capítulos
    if (aLinks.length === 0) {
        anterior.style.display = 'none';
        siguiente.style.display = 'none';
    } else {
        anterior.style.display = 'block';
        siguiente.style.display = 'block';
    }
});

