/**Variables */
const btnEnviar = document.querySelector('#enviar');
const fromulario = document.querySelector('#enviar-mail');
const btnReset = document.querySelector('#resetBtn');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


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

    // Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

    //Enviar Email
    fromulario.addEventListener('submit', enviarEmails);
}


/**Funciones */

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

//Valida el formulario
function validarFormulario(e) {

    //console.log(e.target.type);
    if (e.target.value.length > 0) {

        // console.log('Hay algo');

        //Elimina los errores...
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        //e.target.style.borderBottomColor = 'red';
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {
        // e.target hace referencia al campo actual

        if (er.test(e.target.value)) {
            // Elimina los errores...
            const error = document.querySelector('p.error');

            if (error) {
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');

        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('Email no válido');
        }

    }

    // El primero hace referencia a los valores que tenemos declarados en la parte superior 
    if (er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
        
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

// Envía el email
function enviarEmails(e) {
    e.preventDefault();

    // Mostrar el spinner 
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Después de 3 seg. ocultar el spinner y mostrar el mensaje

    // Existen 2 formas de crear spinners, Settimeout(se ejecuta una vez) ,Setinteval(se ejecuca cada vez en un intervalo de tiempo)

    setTimeout(() => {
        spinner.style.display = 'none';

        // Mensaje que se envió 
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'fontbold', 'uppercase');

        //Inserta el párrafo antes del sínner
        fromulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); // Eliminar el mensaje de éxito
            resetearFormulario();
        }, 2000);
    }, 2000);
}

//Funtion que resetea el formulario
function resetearFormulario () {
    fromulario.reset();
    iniciarApp();
}