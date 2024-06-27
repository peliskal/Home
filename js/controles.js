const aLinks = document.querySelectorAll('.capitulo');
const iframe = document.querySelector('iframe');
const viendo = document.querySelector('.viendo');

aLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
        const href = this.getAttribute('href');
        iframe.currentTime = 0;
        viendo.textContent = link.textContent;
       return iframe.src = `https://terabox.com/sharing/embed?surl=${href}&amp;resolution=480&amp;autoplay=trueslid=`;
       //console.log(iframe.src);
    });
});