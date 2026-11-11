document.addEventListener('DOMContentLoaded', () => {

    // ==============================================================
    // TU CORREO DE DESTINO:
    const miCorreo = 'aguileragarcialuy@gmail.com';
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

        const datosFormulario = new FormData(formulario);

        fetch(`https://formsubmit.co{miCorreo}`, {
            method: 'POST',
            body: datosFormulario,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.success === 'true' || datos.success === true) {
                mensajeEstado.textContent = '✓ ¡Todo correcto! Hemos recibido tu solicitud y te responderemos en menos de 24 horas.';
                mensajeEstado.classList.add('exito');
                formulario.reset();
            } else {
                throw new Error('Error en el envío');
            }
        })
        .catch(error => {
            mensajeEstado.textContent = `Hubo un problema al enviar el mensaje. Por favor, escríbenos directamente a ${miCorreo}.`;
            mensajeEstado.classList.add('error');
        })
        .finally(() => {
            botonEnviar.textContent = 'Enviar Solicitud de Presupuesto';
            botonEnviar.disabled = false;
        });
    });

});
