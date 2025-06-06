    function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const container = document.getElementById("carrito-container");
    const totalSpan = document.getElementById("total");

    container.innerHTML = "";
    let totalGeneral = 0;

    carrito.forEach((producto, index) => {
        const totalProducto = producto.precio * producto.cantidad;
        totalGeneral += totalProducto;

        const div = document.createElement("div");
        div.classList.add("producto-carrito");
        div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.titulo}" width="100">
        <h3>${producto.titulo}</h3>
        <p>Precio<br>$${producto.precio}</p> 
        <div>
            <button class="btn-restar" data-index="${index}">-</button>
            <span>${producto.cantidad}</span>
            <button class="btn-sumar" data-index="${index}">+</button>
        </div>
        <p>Total<br>$${totalProducto}</p>
        <button class="btn-eliminar" data-index="${index}">🗑️ Eliminar</button>
        <hr>
        `;
        container.appendChild(div);
    });

    totalSpan.textContent = totalGeneral;
    }

    function actualizarCantidad(index, cambio) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad < 1) carrito[index].cantidad = 1;

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
    }

    document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();


    document
        .getElementById("carrito-container")
        .addEventListener("click", (e) => {
            
            const index = parseInt(e.target.dataset.index);

        if (e.target.classList.contains("btn-sumar")) {
            actualizarCantidad(index, 1);
        }
        if (e.target.classList.contains("btn-restar")) {
            actualizarCantidad(index, -1);
        }

        if (e.target.classList.contains("btn-eliminar")) {
            const confirmacion = confirm("¿Deseás eliminar este producto del carrito?");
            if (confirmacion) {
                eliminarProducto(index);
            }
        }

        });

        function eliminarProducto(index) {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
        mostrarMensaje("Producto eliminado del carrito.");
        }

        function mostrarMensaje(texto) {
        const mensajeDiv = document.getElementById("mensaje-carrito");
        mensajeDiv.textContent = texto;
        mensajeDiv.classList.add("mostrar");

        setTimeout(() => {
            mensajeDiv.classList.remove("mostrar");
        }, 2000);
        }

        document.getElementById("btn-comprar").addEventListener("click", async () => {
        const confirmar = confirm("¿Deseás confirmar tu compra?");
        if (!confirmar) return;

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        if (carrito.length === 0) {
            mostrarMensaje("El carrito está vacío.");
            return;
        }

        const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

        try {
            const respuesta = await fetch("/api/carrito", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productos: carrito, total })
            });

            if (!respuesta.ok) {
            throw new Error("Error al enviar el carrito");
            }

            localStorage.removeItem("carrito");
            renderizarCarrito();
            mostrarMensaje("¡Compra realizada con éxito!");
        } catch (error) {
            console.error("❌ Error al enviar el carrito:", error);
            mostrarMensaje("Ocurrió un error al procesar tu compra.");
        }
        });
    });
