document.addEventListener(`DOMContentLoaded`, () => {

    const email = {
        email: ``,
        asunto: ``,
        mensaje: ``
    }
    //seleccionar elementos interfaz
    const inputEmail = document.querySelector(`#email`);
    const asunto = document.querySelector(`#asunto`);
    const mensaje = document.querySelector(`#mensaje`);
    const formulario = document.querySelector(`#formulario`);
    const btnSubmit = document.querySelector(`#formulario button[type="submit"]`);
    const btnReset = document.querySelector(`#formulario button[type="reset"]`);
    const spinner = document.querySelector(`#spinner`)

    //asignar evento
    inputEmail.addEventListener(`input`, validar);
    asunto.addEventListener(`input`, validar);
    mensaje.addEventListener(`input`, validar);
    formulario.addEventListener(`submit`, enviarEmail);

    btnReset.addEventListener(`Click`, function (e) {
        e.preventDefault();

        reiniciarFormulario()

    })

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.remove(`hidden`)
        setTimeout(() => {
            spinner.classList.add(`hidden`)
            reiniciarFormulario();

            const alertaExito = document.createElement(`p`);
            alertaExito.classList.add(`claseSpiner`, `uppercase`)
            alertaExito.innerHTML = `mensaje enviado`;
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove()
            }, 3000);
        }, 3000);

        //CREAR ALERTA DE EXITO

    }

    function validar(e) {
        if (e.target.value.trim() === ``) {
            mostrarAlerta(`el campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = ``;
            comprobarEmail();
            return;
        }
        if (e.target.id === `email` && !validarEmail(e.target.value)) {
            mostrarAlerta(`el email no es valido`, e.target.parentElement);
            email[e.target.name] = ``;
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //comprovbar el objeto de elmail
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        //comprueba si ya existe una alerta
        const alerta = referencia.querySelector(`.bg-red-600`);
        if (alerta) {
            alerta.remove();
        }


        //generar alerta HTML
        const error = document.createElement(`P`);
        error.textContent = mensaje;
        error.classList.add(`bg-red-600`, `text-white`, `p-2`, `text-center`)

        //inyectar el error al elemento
        referencia.appendChild(error);

    }
    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector(`.bg-red-600`);
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        const resultado = emailRegex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if (Object.values(email).includes(``)) {
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
    }

    function reiniciarFormulario() {
        //REINICIAR FORMULARIO
        email.email = ``;
        email.asunto = ``;
        email.mensaje = ``;

        formulario.reset();
        comprobarEmail();
    }
});



