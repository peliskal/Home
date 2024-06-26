window. listaPeliculas= [
  {
    nombre: "wonka 2023",
    url: "https://freeterabox.com/s/1A5IgJAeKPA38RuWw0teDxg",
    imagen: "https://i.ibb.co/x2wPqLb/wonka.webp"
  },
  {
    nombre: "Godzila x Kong: El nuevo imperio",
    url: "https://freeterabox.com/s/1yo5HShYicFgGxVmNW0GSpA",
    imagen: "https://i.ibb.co/N3RrGRq/godzilla-x-kong.webp"
  }
]
 
 
 
 
 
 
 //ordena alfabeticamente
 window.listaPeliculas.sort((a, b) => {
  const nombreA = a.nombre.toLowerCase(); // Convertir ambos nombres a minúsculas para comparación insensible a mayúsculas/minúsculas
  const nombreB = b.nombre.toLowerCase();

  if (nombreA < nombreB) {
    return -1;
  } else if (nombreA > nombreB) {
    return 1;
  } else {
    return 0; // Si los nombres son iguales, considerarlos iguales para la ordenación
  }
});

// Después de ordenar, la matriz `window.listaPeliculas` estará ordenada alfabéticamente por la propiedad 'nombre'
//console.log(window.listaPeliculas); // Imprimir la matriz ordenada en la consola







 