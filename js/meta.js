 //agregar canonical y palabras claves

        // Función para crear y agregar una etiqueta <meta>
        function agregarMeta(name, content) {
            const meta = document.createElement('meta');
            meta.setAttribute('name', name);
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
        }
  
        // Función para crear y agregar la etiqueta <link> canonical
        function agregarCanonical(url) {
            const link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            link.setAttribute('href', url);
            document.head.appendChild(link);
        }
  
        // Agregar palabras clave
        const palabrasClave = 'peliskal, peliculas, cartoons, series';
        agregarMeta('keywords', palabrasClave);
  
        // Agregar descripción (opcional)
        const descripcion = 'Disfruta de series, películas y dibujos animados gratis en Peliskal. ¡Tu portal de entretenimiento sin límites!';
        agregarMeta('description', descripcion);
  
        // Agregar enlace canonical
        const urlCanonical = 'https://peliskal.com.ar/index.html'; // Utiliza la URL actual
        agregarCanonical(urlCanonical);