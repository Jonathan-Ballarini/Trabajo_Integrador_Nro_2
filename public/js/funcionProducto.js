document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === '1') {
        alert('Producto creado correctamente');
        history.replaceState(null, '', window.location.pathname);
    }

    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    const botonesEditar = document.querySelectorAll('.btn-editar');

    const form = document.querySelector('.contenedor_forms');
    const legend = form.querySelector('legend');
    const tituloInput = document.getElementById('titulo');
    const precioInput = document.getElementById('precio');
    const descripcionInput = document.getElementById('descripcion');
    const categoriaInputs = document.querySelectorAll('input[name="categoria"]');
    const imagenInput = document.getElementById('imagen');
    const submitBtn = form.querySelector('button[type="submit"]');

    let productoEditandoId = null;

    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', async function () {
            const id = this.dataset.id;
            const confirmar = confirm('¿Estás seguro de que querés eliminar este producto?');

            if (!confirmar) return;

            try {
                const respuesta = await fetch(`/api/productos/${id}`, {
                    method: 'DELETE',
                });

                if (respuesta.ok) {
                    alert('Producto eliminado correctamente');
                    location.reload();
                } else {
                    alert('Error al eliminar el producto');
                }
            } catch (error) {
                console.error('Error al eliminar:', error);
                alert('Ocurrió un error al intentar eliminar el producto');
            }
        });
    });

    botonesEditar.forEach(boton => {
        boton.addEventListener('click', function () {
            productoEditandoId = this.dataset.id;

            tituloInput.value = this.dataset.titulo;
            precioInput.value = this.dataset.precio;
            descripcionInput.value = this.dataset.descripcion;

            categoriaInputs.forEach(input => {
                input.checked = input.value === this.dataset.categoria;
            });

            legend.textContent = 'Editar Producto';
            submitBtn.textContent = 'Actualizar Producto';

            window.scrollTo({ top: 0, behavior: 'smooth' });

        });
    });

    form.addEventListener('submit', async function (e) {
        const imagenArchivo = imagenInput.files[0];

        if (!productoEditandoId) {
        if (!imagenArchivo) {
            e.preventDefault();
            alert('Debe seleccionar una imagen para el producto.');
            return;
        }

        return;
    }

        e.preventDefault();

        const formData = new FormData(form);

        try {
            const respuesta = await fetch(`/api/productos/${productoEditandoId}`, {
                method: 'PUT',
                body: formData,
            });

            if (respuesta.ok) {
                alert('Producto actualizado correctamente');
                location.reload();
            } else {
                alert('Error al actualizar el producto');
            }
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('Ocurrió un error al intentar actualizar el producto');
        }
    });

    const botonesVer = document.querySelectorAll('.btn-ver');

    botonesVer.forEach(boton => {
        boton.addEventListener('click', function () {
            const id = this.dataset.id;
            window.location.href = `/api/productos/${id}`;
        });
    });

    const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const id = boton.dataset.id;
            const titulo = boton.dataset.titulo;
            const precio = parseFloat(boton.dataset.precio);
            const imagen = boton.dataset.imagen;

            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            const productoExistente = carrito.find(prod => prod.productoId === id);

            if (productoExistente) {
                productoExistente.cantidad += 1;
            } else {
                carrito.push({ productoId: id, titulo, precio, imagen, cantidad: 1 });
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert(`"${titulo}" se agregó al carrito`);
        });
    });

});


