/**Variables */
const btnEnviar = document.querySelector('#enviar');
const fromulario = document.querySelector('#enviar-mail');


/**Variables para campos */
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


eventListeners();

function eventListeners() {
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario); // blur se ejecuta cuando esté en el input y me salga
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

}


/**Funciones */

function iniciarApp() {
    btnEnviar.disabled = true;
    //btnEnviar.classList.add('cursor-not-allowed', 'opacity-10');
}

//Valida el formulario
function validarFormulario(e) {

    //console.log(e.target.type);
    if (e.target.value.length > 0) {

        // console.log('Hay algo');

        //Elimina los errores...
        const error = document.querySelector('p.error');
        error.remove();

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        //e.target.style.borderBottomColor = 'red';
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {

        const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (er.test(e.target.value)) {
            //Elimina los errores...
            const error = document.querySelector('p.error');
            error.remove();

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
            
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('Email no válido');
        }

    }
}


function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mb-5', 'text-center', 'error');

    //Buscamos que ya no haya más clases de .error, como se crean varias veces, se crean más clases 
    const errores = document.querySelectorAll('.error'); //querySelector para un sólo elemento y .lenght sólo con querySelectorAll
    if (errores.length === 0) {
        fromulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
    }

}

