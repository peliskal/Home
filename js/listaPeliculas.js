window.listaPeliculas= [
  {
    nombre: "wonka 2023",
    url: "https://freeterabox.com/s/1A5IgJAeKPA38RuWw0teDxg",
    imagen: "https://i.ibb.co/x2wPqLb/wonka.webp"
  },
  {
    nombre: "Godzila x Kong: El nuevo imperio",
    url: "https://freeterabox.com/s/1yo5HShYicFgGxVmNW0GSpA",
    imagen: "https://i.ibb.co/N3RrGRq/godzilla-x-kong.webp"
  },
  {
    nombre: "El reino del Planeta de los Simios",
    imagen:"https://i.ibb.co/yhVRqMK/el-reino-del-planeta-de-los-simios-47778-c.webp",
    url:"https://1024terabox.com/s/1Ur6OViSXX_xnSK9FO0q2Nw"
  },
  {
    nombre: "Intensamente 2",
    imagen:"https://i.ibb.co/sFFJ3Fq/INTENSAMENTE-2.webp",
    url:"https://1024terabox.com/s/19Hs4rWnQ7j3yMUlivCVu5Q"
  },
  {
    nombre: "Damsel",
    imagen:"https://i.ibb.co/FzQXxsW/damsel-netflix-movie-poster.webp",
    url:"https://1024terabox.com/s/1VtmEV6XUotFo3jl6pK4MAg"
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







 