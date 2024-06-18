function usarNombreGlobal(event) {
    const nombreActualizado = event.detail; // Obtén el valor del evento
    console.log("Valor recibido desde otro index:", nombreActualizado);

    // Guarda el valor en localStorage
    localStorage.setItem('nombreGlobal', nombreActualizado);
}

// Escuchar el evento personalizado 'nombreActualizado'
document.addEventListener('nombreActualizado', usarNombreGlobal);
