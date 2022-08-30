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
    
    if(e.target.value.lenght > 0) {
        console.log('Hay algo');
    } else {
        //e.target.style.borderBottomColor = 'red';
        e.target.classList.add('border','border-red-500');

        mostrarError();
    }
}


function mostrarError() {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = 'Todos los campos son obligatorios';
    mensajeError.classList.add('border','border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mb-5','text-center', 'error');

    //Buscamos que ya no haya más clases de .error, como se crean varias veces, se crean más clases 
    const errores = document.querySelectorAll('.error'); //querySelector para un sólo elemento y .lenght sólo con querySelectorAll
    if(errores.length === 0) {
        fromulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
    }
   
}

