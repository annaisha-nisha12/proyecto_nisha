const fotografiaContenedor = document.getElementById("fotografia-contenedor");

// Obtener los datos de fotografía desde el archivo JSON
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        // Almacenar los datos de fotografía en una variable global
        window.fotografia = data.fotografia;
        // Mostrar los productos de fotografía en la página
        mostrarProductosFotografia();
    })
    .catch(error => console.error(error));

// Función para mostrar los productos de fotografía en la página
function mostrarProductosFotografia() {
    const fotografiaContenedor = document.getElementById("fotografia-contenedor");
    fotografiaContenedor.innerHTML = "";

    // Obtener los valores seleccionados en los filtros
    const filtroTipo = document.getElementById("filtro-modelo").value;
    const filtroPrecio = parseFloat(document.getElementById("filtro-precio").value);

    // Recorrer cada producto de fotografía
    window.fotografia.forEach(function (producto) {
        // Comprobar si el producto de fotografía cumple con los criterios de los filtros
        if ((filtroTipo === "" || producto.tipo === filtroTipo) && (filtroPrecio === 0 || producto.precio <= filtroPrecio)) {
            // Crear un elemento div para el producto de fotografía
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto");

            // Crear una imagen para el producto de fotografía
            const productoImg = document.createElement("img");
            productoImg.src = producto.img;
            productoImg.alt = producto.nombre;
            productoDiv.appendChild(productoImg);

            // Crear un h3 para el nombre del producto de fotografía
            const productoNombre = document.createElement("h3");
            productoNombre.innerHTML = producto.nombre;
            productoDiv.appendChild(productoNombre);

            // Crear un p para el tipo del producto de fotografía
            const productoTipo = document.createElement("p");
            productoTipo.innerHTML = "Tipo: " + producto.tipo;
            productoDiv.appendChild(productoTipo);

            // Crear un p para el precio del producto de fotografía
            const productoPrecio = document.createElement("p");
            productoPrecio.innerHTML = "$" + producto.precio;
            productoDiv.appendChild(productoPrecio);

            // Agregar el elemento div a la página
            fotografiaContenedor.appendChild(productoDiv);
        }
    });
}

// Agregar eventos a los filtros para que, al cambiar su valor, se vuelva a mostrar los productos de fotografía
document.getElementById("filtro-modelo").addEventListener("change", mostrarProductosFotografia);
document.getElementById("filtro-precio").addEventListener("change", mostrarProductosFotografia);
