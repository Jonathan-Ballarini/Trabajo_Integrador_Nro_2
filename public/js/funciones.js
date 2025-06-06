    function mostrarCategoria(categoria) {
    const contenedor = document.getElementById("contenedorTarjetas");
    const tarjetas = document.querySelectorAll(".producto");

    const categoriaActual = contenedor.getAttribute("data-visible");

    if (
        contenedor.classList.contains("mostrar") &&
        categoriaActual === categoria
    ) {
        contenedor.classList.remove("mostrar");
        setTimeout(() => {
        contenedor.style.display = "none";
        contenedor.setAttribute("data-visible", "");
        }, 300);
    } else {
        contenedor.style.display = "grid";
        setTimeout(() => {
        contenedor.classList.add("mostrar");
        }, 10);

        contenedor.setAttribute("data-visible", categoria);

        tarjetas.forEach((tarjeta) => {
        if (tarjeta.getAttribute("data-categoria") === categoria) {
            tarjeta.style.display = "grid";
        } else {
            tarjeta.style.display = "none";
        }
        });
    }
    }

    const videoSources = [
    "/assets/banner/cafeteria_borra.mp4",
    "/assets/banner/helado_salsa.mp4",
    "/assets/banner/cafeteria_interiores.mp4",
    "/assets/banner/cafe_servir.mp4",
    "/assets/banner/helado_cucharada.mp4",
    ];

    let currentIndex = 0;
    let isVideoAPlaying = true;

    const videoA = document.getElementById("videoA");
    const videoB = document.getElementById("videoB");

    videoA.src = videoSources[currentIndex];
    videoA.currentTime = 0;
    videoA.play();

    function playNextVideo() {
    currentIndex = (currentIndex + 1) % videoSources.length;
    const nextVideo = isVideoAPlaying ? videoB : videoA;
    const currentVideo = isVideoAPlaying ? videoA : videoB;

    nextVideo.src = videoSources[currentIndex];
    nextVideo.currentTime = 0;
    nextVideo.play();

    nextVideo.style.opacity = "1";
    currentVideo.style.opacity = "0";

    isVideoAPlaying = !isVideoAPlaying;
    }

    const botonesAgregar = document.querySelectorAll(".btn-agregar-carrito");

    botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
        const id = boton.dataset.id;
        const titulo = boton.dataset.titulo;
        const precio = parseFloat(boton.dataset.precio);
        const imagen = boton.dataset.imagen;

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const productoExistente = carrito.find((prod) => prod.productoId === id);

        if (productoExistente) {
        productoExistente.cantidad += 1;
        } else {
        carrito.push({ productoId: id, titulo, precio, imagen, cantidad: 1 });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`"${titulo}" se agregó al carrito`);
    });
    });

    setInterval(playNextVideo, 10000);
