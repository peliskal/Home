document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById('buscador');
    const botonBuscar = document.querySelector('.buscadorBtn');
    const resultNull = document.querySelector('.peliculas'); // Suponiendo que tienes un contenedor con la clase 'peliculas'

    const normalizarTexto = (texto) => {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    };

    const buscarSeries = () => {
        const query = normalizarTexto(buscador.value);
        let resultados = [];

        const buscarEnArray = (array) => {
            array.forEach(item => {
                const tituloNormalizado = normalizarTexto(item.nombre);
                if (tituloNormalizado.includes(query)) {
                    resultados.push(item);
                }
            });
        };

        if (window.listaCrearPelicula && window.listaCrearPelicula.length > 0) {
            buscarEnArray(window.listaCrearPelicula);
        }

        if (window.listaCompletaGeneral && window.listaCompletaGeneral.length > 0) {
            buscarEnArray(window.listaCompletaGeneral);
        }

        resultNull.innerHTML = '';

        if (resultados.length > 0) {
            resultados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            resultados.forEach(item => {
                const div = document.createElement('div');
                div.className = 'portadaPelicula';
                div.innerHTML = `
                    <a href="https://peliskal.com.ar/reproductor/reproducir.html?name=${item.nombre}" class="capitulo">
                        <img src="${item.imagen}" alt="${item.nombre}">
                        <span>${item.nombre}</span>
                    </a>
                `;
                resultNull.appendChild(div);
            });
        } else if (query !== '') {
            const noP = document.createElement('p');
            noP.textContent = 'No se encontraron resultados para tu búsqueda';
            noP.className = 'no-resultados';
            resultNull.appendChild(noP);
        } else {
           
        }
    };

    

    botonBuscar.addEventListener('click', (event) => {
        event.preventDefault();
        buscarSeries();
    });

    buscador.addEventListener('input', buscarSeries);

  
});
