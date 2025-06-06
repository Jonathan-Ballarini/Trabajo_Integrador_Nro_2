function actualizarContadorComentarios() {
    let campoComentarios = document.getElementById("comentarios");
    let contadorComentarios = document.getElementById("contadorComentarios");

    let numCaracteres = campoComentarios.value.length;

    contadorComentarios.textContent = numCaracteres + "/600";

    if (numCaracteres > 600) {
        campoComentarios.value = campoComentarios.value.substring(0, 600);
        contadorComentarios.textContent = "600/600";
    }
}

function ajustarAltura() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
}

function validarTexto(textarea) {
    let pattern = /^[A-Za-zÁÉÍÓÚÜáéíóúü0-9\s.,;:!#()&=+%-]*$/;
    if (!pattern.test(textarea.value)) {
        alert("El texto contiene caracteres no permitidos.");
        textarea.value = textarea.value.replace(/[^A-Za-zÁÉÍÓÚÜáéíóúü0-9\s.,;:!#()&=+%-]/g, '');
    }
}

document.getElementById("comentarios").addEventListener("input", ajustarAltura);

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("ratingForm");

    form.addEventListener("submit", function (event) {
        const selectedRating = document.querySelector(".rating input:checked");

        if (!selectedRating) {
            alert("Aguardamos tu calificación");
            event.preventDefault();
        }
    });
});


