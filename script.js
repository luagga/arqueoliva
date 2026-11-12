document.addEventListener('DOMContentLoaded', () => {

    // ==============================================================
    // PEGA AQUÍ TU ACCESS KEY DE WEB3FORMS ENTRE LAS COMILLAS:
    const claveAcceso = 'c6324214-3034-454a-a2f0-e5d909a1353b';
    // ==============================================================

    const formulario = document.getElementById('formulario-contacto');
    const botonEnviar = document.getElementById('btn-enviar');
    const mensajeEstado = document.getElementById('mensaje-estado');

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        botonEnviar.textContent = 'Enviando solicitud...';
        botonEnviar.disabled = true;
        mensajeEstado.className = 'mensaje-estado';
        mensajeEstado.textContent = '';

        // Convertimos los datos a formato JSON estándar (evita bloqueos en GitHub Pages)
        const formData = new FormData(formulario);
        formData.append('access_key', claveAcceso);
        const objetoDatos = Object.fromEntries(formData);
        const json = JSON.stringify(objetoDatos);

        fetch('https://web3forms.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (respuesta) => {
            const datos = await respuesta.json();
            if (respuesta.status === 200) {
                mensajeEstado.textContent = '✓ ¡Todo correcto! Hemos recibido tu solicitud y te responderemos en menos de 24 horas.';
                mensajeEstado.classList.add('exito');
                formulario.reset();
            } else {
                // Si falla, nos dirá el motivo exacto
                mensajeEstado.textContent = `Error: ${datos.message}`;
                mensajeEstado.classList.add('error');
            }
        })
        .catch(error => {
            mensajeEstado.textContent = 'Error de conexión. Comprueba tu internet o desactiva el bloqueador de anuncios.';
            mensajeEstado.classList.add('error');
        })
        .finally(() => {
            botonEnviar.textContent = 'Enviar Solicitud de Presupuesto';
            botonEnviar.disabled = false;
        });
    });

});
