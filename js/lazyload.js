// Obtener imágenes perezosas
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
