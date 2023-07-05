const containerCheckout = document.querySelector("section.containerCheckout")
const productosElegidos = JSON.parse(localStorage.getItem("productosElegidos"))
const carritoCantidad = document.querySelector("span.carritoCantidad")

function imprimirCarrito({ codigo, nombre, precio } = productosElegidos) {
    return `<div class="divTabla">
    <table class="tablaCheckout">
        <tbody>
            <tr>
                <td>Codigo: ${codigo}</td>
                <td>${nombre}</td>
                <td> $ ${precio}</td>
                <td><button class="botonEliminarItem" id="${codigo}">Eliminar</button></td>
            </tr>
        </tbody>
        </table>
        </div>`
}

function imprimirTotal() {
    productosElegidos.length > 0 && productosElegidos.forEach((productoElegido) => containerCheckout.innerHTML += imprimirCarrito(productoElegido))
    carritoCantidad.innerHTML = productosElegidos.length
}

function imprimirCarritoVacio() {
    return `<div class="divSaludoFinal">
    <p class="parrafoSaludoFinal">El carrito esta vacio.</p>
        </div>`
}

imprimirTotal()

function activarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll("button.botonEliminarItem")

    for (let botonEliminar of botonesEliminar) {
        botonEliminar.addEventListener('click', (e) => {
            const productoElegido = productosElegidos.find((producto) => producto.codigo === e.target.id)
            productosElegidos.splice(productosElegidos.indexOf(productoElegido), 1)
            localStorage.setItem("productosElegidos", JSON.stringify(productosElegidos))
            containerCheckout.innerHTML = ""
            imprimirTotal()
            activarBotonesEliminar()
            productosElegidos.length === 0 && (containerCheckout.innerHTML = imprimirCarritoVacio())
        })
    }
}
activarBotonesEliminar()

function imprimirSaludoFinal() {
    return `<div class="divSaludoFinal">
    <p class="parrafoSaludoFinal">Gracias por tu compra!</p>
        </div>`
}

function lanzarAlertFinalizarCompra() {
    Swal.fire({
        icon: 'success',
        title: 'Gracias por tu compra!',
        text: 'El total de tu compra es: $' + productosElegidos.reduce((acc, productoElegido) => acc + productoElegido.precio, 0),
        })
}

function finalizarCompra() {
    const botonFinalizarCompra = document.querySelector("button.botonFinalizarCompra")
    botonFinalizarCompra.addEventListener("click", () => {
        let productosElegidos = []
        localStorage.clear()
        containerCheckout.innerHTML = imprimirSaludoFinal()
        carritoCantidad.innerHTML = productosElegidos.length
        botonFinalizarCompra.style.display = 'none'
        lanzarAlertFinalizarCompra()
    })
}

finalizarCompra()