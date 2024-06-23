document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact_form');
    var successMessage = document.getElementById('success_message');

    form.addEventListener('submit', function(event) {
        // Evita el envío del formulario por defecto
        event.preventDefault();

        // Muestra el mensaje de éxito
        successMessage.classList.remove('d-none'); // Elimina la clase que oculta el mensaje

        // Puedes agregar aquí código adicional para enviar el formulario via AJAX, etc.
    });
});


