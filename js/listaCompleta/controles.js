document.addEventListener('DOMContentLoaded', () => {
    const aLinks = document.querySelectorAll('.capitulo');
    const iframe = document.querySelector('iframe');
    const viendo = document.querySelector('.viendo');
   // const temporada = document.querySelectorAll('.temporada-titulo');
    const container = document.querySelector('.container');
    const ol = container.querySelectorAll('.temporada');
    const verPelicula = container.querySelector('.verPelicula');

    // Añadir event listeners a los enlaces de capítulos
    aLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            const href = this.getAttribute('href');
            const temporadaElement = this.closest('.temporada'); // Buscar el elemento con clase 'temporada' más cercano
            const temporada = temporadaElement.querySelector('.temporada-titulo').textContent; // Obtener el texto del título de la temporada
            
            iframe.currentTime = 0;
            viendo.textContent = `${temporada} ${link.textContent}`;
            
            // Actualizar el src del iframe con la nueva URL
            iframe.src = `https://terabox.com/sharing/embed?surl=${href}&resolution=480&autoplay=true&slid=`;
        });
    });

    // Añadir event listener al enlace de película
    if (verPelicula) {
        verPelicula.addEventListener('click', function(event){
            event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            const href = this.getAttribute('href');
            const titulo = document.querySelector('.titulo').textContent; // Obtener el texto del título de la temporada
            
            iframe.currentTime = 0;
            viendo.textContent = `${titulo}`;
            
            // Actualizar el src del iframe con la nueva URL
            iframe.src = `https://terabox.com/sharing/embed?surl=${href}&resolution=480&autoplay=true&slid=`;
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
});
