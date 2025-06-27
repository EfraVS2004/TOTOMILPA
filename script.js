document.addEventListener('DOMContentLoaded', function() {
    // Abrir formulario
    document.getElementById('abrir-formulario').addEventListener('click', function() {
        document.getElementById('formulario-correo').style.display = 'block';
        document.body.insertAdjacentHTML('beforeend', '<div class="fondo-oscuro"></div>');
    });

    // Cerrar formulario
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cerrar') || e.target.classList.contains('fondo-oscuro')) {
            cerrarFormulario();
        }
    });

    // Validación en tiempo real
    const form = document.getElementById('form-pedido');
    const campos = form.querySelectorAll('input, textarea');

    campos.forEach(campo => {
        campo.addEventListener('input', function() {
            validarCampo(this);
        });
    });

    // Envío profesional
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let esValido = true;

        campos.forEach(campo => {
            if (!validarCampo(campo)) esValido = false;
        });

        if (esValido) {
            const btnEnviar = form.querySelector('button[type="submit"]');
            btnEnviar.innerHTML = '<i class="fas fa-spinner"></i> Enviando...';
            btnEnviar.classList.add('loading');

            // Simular envío (en producción quita el setTimeout)
            setTimeout(() => {
                btnEnviar.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                setTimeout(() => {
                    form.submit();
                }, 1000);
            }, 1500);
        }
    });

    // Funciones auxiliares
    function validarCampo(campo) {
        const error = campo.nextElementSibling;
        
        if (campo.validity.valid) {
            error.style.display = 'none';
            return true;
        } else {
            error.textContent = obtenerMensajeError(campo);
            error.style.display = 'block';
            return false;
        }
    }

    function obtenerMensajeError(campo) {
        if (campo.validity.valueMissing) {
            return 'Este campo es obligatorio';
        } else if (campo.validity.patternMismatch) {
            return campo.title; // Usa el título como mensaje de error
        } else if (campo.validity.typeMismatch) {
            return 'Formato inválido';
        }
    }

    function cerrarFormulario() {
        document.getElementById('formulario-correo').style.display = 'none';
        document.querySelector('.fondo-oscuro')?.remove();
    }
});