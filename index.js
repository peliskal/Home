
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
      const nombrePeliculaSpam = document.createElement('span');
      nombrePelicula.href = pelicula.url;
      nombrePelicula.setAttribute('target', '_blank');
      nombrePeliculaSpam.textContent = pelicula.nombre;
      nombrePelicula.classList.add("elementoA");
      nombrePelicula.appendChild(imagenPelicula);
      nombrePelicula.appendChild(nombrePeliculaSpam);
      elementoPelicula.appendChild(nombrePelicula);

  
      elementoPeliculas.appendChild(elementoPelicula);
    });
  
    elementoPrincipal.appendChild(elementoPeliculas);
  }
  
  generarPeliculas();
  
  function detectarNombre(nombre) {
    console.log(nombre);
   return nombre;
    // Puedes agregar aquí cualquier lógica que desees ejecutar cuando se haga clic en el enlace
  }
 






