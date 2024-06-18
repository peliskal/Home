// Definir la clave de la API
const ApiKey = '17049sk309d0oai7f7yu5';
// Construir la URL para la solicitud a la API, incluyendo la clave de la API
const url = `https://api.streamwish.com/api/file/list?key=${ApiKey}`;
const ListaCarpetas = `https://api.streamwish.com/api/folder/list?key=${ApiKey}`;
var ElegidoUser= null;




document.addEventListener('DOMContentLoaded', () => {
  // Recupera el valor de localStorage
  const nombreGlobal = localStorage.getItem('nombreGlobal');
  if (nombreGlobal) {
      console.log("Valor recibido desde localStorage:", nombreGlobal);
      return ElegidoUser = nombreGlobal;
      // Aquí puedes agregar cualquier lógica adicional que necesites usando nombreGlobal
  } else {
      console.log("No hay valor almacenado en localStorage.");
  }
});



// Usar fetch para realizar una solicitud HTTP a la URL de la API
fetch(ListaCarpetas)
  .then(response => {
    // Verificar si la respuesta HTTP es correcta (código de estado en el rango 200-299)
    if (!response.ok) {
      // Si no es correcta, lanzar un error con el mensaje de estado de la respuesta
      throw new Error('Network response was not ok ' + response.statusText);
    }
    // Si es correcta, convertir la respuesta a formato JSON y devolverla
    return response.json();
  })
  .then(data => {
    // Aquí se procesa el JSON recibido de la API
   //console.log("completo",data);
    const respuestaCarpetas = data.result.folders; //obtengo las carpetas 
    console.log("carpetas encontradas",respuestaCarpetas);
    respuestaCarpetas.forEach(element => {
      let elementMin = element.name.toLowerCase();
        if( elementMin == ElegidoUser.toLowerCase()){//en el nombre de reemplaza por el nombre de la carpeta seleccionada
            //una ves que el nombre de mi carpeta local coincide con el del servidor de videos
            //hago una peticion con el id de carpeta
            //console.log('carpeta encontrada ',element.name, 'carpeta id', element.code);
            const carpetaAbrir = `https://api.streamwish.com/api/file/list?key=${ApiKey}&fld_id= ${element.fld_id}`; //link de la carpeta especifica
            //paso el id de la carpeta para hacer una peticion comparando el id de carpeta
            pedir(carpetaAbrir);
        }else{
            console.log(`carpeta no encontrada`);
        }
    });
    
  })
  .catch(error => {
    // Capturar y manejar cualquier error ocurrido durante la solicitud fetch
    console.error('There was a problem with the fetch operation:', error);
  });


  //llamo a la carpeta y devuelvo el link y titulo del contenido
  function pedir(url){
    fetch(url)
  .then(response => {
    // Verificar si la respuesta HTTP es correcta (código de estado en el rango 200-299)
    if (!response.ok) {
      // Si no es correcta, lanzar un error con el mensaje de estado de la respuesta
      throw new Error('Network response was not ok ' + response.statusText);
    }
    // Si es correcta, convertir la respuesta a formato JSON y devolverla
    return response.json();
  })
  .then(data => {
    // Aquí se procesa el JSON recibido de la API
  
  let respuesta = data.result.files;
  

for (let i = respuesta.length - 1; i >= 0; i--) {
   GenerarLista(respuesta[i]);
}
  
  })
  }

 

  function GenerarLista(contenido){
    let iframe = document.querySelector('#reproductor');
    let link = "https://swdyu.com/e/"+contenido.file_code;
    iframe.src = link;
   // Seleccionar el contenedor por su ID
   let container = document.querySelector('#listaContainer');
// Ordenar y mostrar la lista ordenada
   
   // Crear un elemento <li>
   let li = document.createElement('li');
   let a = document.createElement('a');
   a.classList.add('capitulos');
   a.href = link;
   console.log(a.href);
   
   // Asignar el contenido al <li>
   a.textContent = contenido.title;
   // Agregar el <li> al contenedor
   return container.appendChild(li),li.appendChild(a);
   }




   //cambio de capitulo
   // Obtener todos los elementos <a>
   const listaContainer = document.querySelector('#listaContainer');
const elementosA = document.querySelectorAll('.capitulos');

// Obtener el iframe
const iframe = document.querySelector('#reproductor');

// Agregar evento de clic a cada elemento <a>
elementosA.forEach(a => {
    a.addEventListener('click', function(event) {
        event.preventDefault(); // Prevenir comportamiento por defecto del enlace (navegación)

        // Obtener el valor del atributo href del enlace tocado
        const href = this.getAttribute('href');

        // Asignar el valor del href como src del iframe
        iframe.src = href;
        console.log(iframe.src);
    });
});