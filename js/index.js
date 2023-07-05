const URL = "js/productos.json"

const productos = []

function cargarProductos() {
    container.innerHTML = ''
    productos.forEach((producto) => {
        container.innerHTML += retornoCardHTML(producto)
    })
    llenarCarrito()
}

function recuperarProductos() {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => productos.push(...data))
        .then(() => cargarProductos())
        .catch((error) => console.error("ERROR AL CARGAR LOS PRODUCTOS.", error))
}

const container = document.getElementById('container')

function retornoCardHTML(producto) {
    return `<div class="card">
                <div class="imagen"><img alt= "${producto.nombre}" src= "${producto.imagen}"></div>
                <div class="divInfoProducto">
                <h3 class="nombre">${producto.nombre}</h3>
                <h4 class="precio">$ ${producto.precio}</h4>
                <div class="comprar"><button id="${producto.codigo}" class="botonCompra">Comprar</button></div>
                </div>
            </div>`
}

recuperarProductos()
let productosElegidos = []

function lanzarAlertAgregadoCarrito() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado al carrito!',
        toast: true,
        showConfirmButton: false,
        timer: 1500
    })
}

function llenarCarrito() {
    const botones = document.querySelectorAll('button.botonCompra')
    const carritoCantidad = document.querySelector("span.carritoCantidad")

    for (let boton of botones) {
        boton.addEventListener('click', (e) => {
            const productoElegido = productos.find((producto) => producto.codigo === e.target.id)
            productosElegidos.push(productoElegido)
            carritoCantidad.innerHTML = productosElegidos.length
            localStorage.setItem("productosElegidos", JSON.stringify(productosElegidos))
            lanzarAlertAgregadoCarrito()
        })
    }
}

function cerrarCompra() {
    const botonFinalizar = document.querySelector('button.botonFin')

    botonFinalizar.addEventListener("click", () => {
        location.href = "../pages/checkout.html"
    })
}

cerrarCompra()