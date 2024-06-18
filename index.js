
  const peliculas = window.listaPeliculas;

  const imagenCarga = 'https://pa1.narvii.com/6707/510b0daee67fbc091f14b9d8ef40aeb6c0d4dc7d_hq.gif';
  
  function generarPeliculas() {
    const elementoPrincipal = document.querySelector('main'); // Seleccionar el elemento 'main'
  
    if (!elementoPrincipal) {
      console.error("Error: No se encontró el elemento 'main' en el documento.");
      return;
    }
  
    const elementoPeliculas = document.createElement('div');
    elementoPeliculas.classList.add('peliculas');
  
    peliculas.forEach(pelicula => {
      const elementoPelicula = document.createElement('div');
      elementoPelicula.classList.add('portadaPelicula');
  
      const imagenPelicula = document.createElement('img');
      imagenPelicula.src = imagenCarga;//carga
      imagenPelicula.setAttribute('data-src', pelicula.imagen);//creo el atributo para las imagenes reales
      imagenPelicula.classList.add('lazy-image');
      imagenPelicula.alt = pelicula.nombre;
  
      const nombrePelicula = document.createElement('a');
      nombrePelicula.href = '/Api/mostrar.html';
      nombrePelicula.setAttribute('target', '_blank');
      nombrePelicula.textContent = pelicula.nombre;
      nombrePelicula.classList.add("elementoA");
      nombrePelicula.onclick =  function(event) {
        event.preventDefault(); // Evita el comportamiento por defecto del enlace

        // Captura el texto dentro del enlace y lo almacena en una variable global
        const nombreGlobal = nombrePelicula.innerText.trim();
        console.log("Valor capturado:", nombreGlobal);
    
        // Despacha un evento personalizado indicando que la variable global se ha actualizado
        const eventNombreActualizado = new CustomEvent('nombreActualizado', { detail: nombreGlobal });
        document.dispatchEvent(eventNombreActualizado);
    
        // Redirecciona a otro archivo HTML después de un breve retraso
        setTimeout(() => {
            window.location.href = 'mostrar.html';
        }, 1000); // Cambia 1000 milisegundos (1 segundo) al valor deseado
     };
  
      elementoPelicula.appendChild(imagenPelicula);
      elementoPelicula.appendChild(nombrePelicula);
  
      elementoPeliculas.appendChild(elementoPelicula);
    });
  
    elementoPrincipal.appendChild(elementoPeliculas);
  }
  
  generarPeliculas();
  