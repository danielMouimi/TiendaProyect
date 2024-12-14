var peticion = false;
var inicioProducto = 0;
var finalProducto = 10;
var categoria = "";

function cartcategories(cart,products) {
    let url = "https://api.escuelajs.co/api/v1/categories";

    fetch(url, {method : "GET" })
    .then((res) => res.json())
   .then((datos) => {

    Object.entries(datos).slice(0, 5).forEach(category => {
    console.log(category)

        let div = document.createElement("div");
        cart.appendChild(div);
        let img = document.createElement("img");
        img.src = category[1].image;
        img.addEventListener("error",(e)=> {
            e.target.src = "./images/notFound.jpg"
        });
        let h2 = document.createElement("h2");
        h2.innerHTML = category[1].name

        div.appendChild(img);
        div.appendChild(h2);
        div.addEventListener("click",()=> {
            products.style.opacity = 1;
            products.style.zIndex = 98;
            products.style.overflow = "auto";
            products.style.pointerEvents = "all";
            document.body.style.overflow = "hidden";
            document.getElementById("header").style.position = "fixed";
            categoria = category[1].id;
            mostrarProductos();
        });
    });

   })
   .catch((err) => console.log("error: " + err));
}



function heroproduct(product,numeroAleatorio) {
    
    let url = "https://api.escuelajs.co/api/v1/products/"+numeroAleatorio;
    
    fetch(url, {method : "GET" })
    .then((res) => res.json())
   .then((datos) => {

        product.innerHTML = "";
        product.style.backgroundImage = "url("+datos.images[0]+")";

        let div = document.createElement("div");
        product.appendChild(div);

        let h2 = document.createElement("h2");
        let price = document.createElement("p");
        h2.innerHTML = datos.title;
        price.innerHTML = datos.price + "€";
        div.appendChild(h2);
        div.appendChild(price);
        
        let button = document.createElement("button");
        button.innerHTML = "Descubre mas";

        div.appendChild(button);
        button.addEventListener("click",()=> {
            //mostrardetalle(producto);
        });


   })
   .catch((err) => {
    console.log("error: " + err);
   })
}


function insertproduct() {
    let product1 = document.getElementById("product1");
    let product2 = document.getElementById("product2");
    const numeros = [39,25,50,43,47]; // Los 4 números que quieres
    let numeroAleatorio1 = numeros[Math.floor(Math.random() * numeros.length)];
    let numeroAleatorio2 = numeros[Math.floor(Math.random() * numeros.length)];


    do {
        numeroAleatorio2 = numeros[Math.floor(Math.random() * numeros.length)];
    }while(numeroAleatorio1==numeroAleatorio2);

    heroproduct(product1,numeroAleatorio1);
    heroproduct(product2,numeroAleatorio2);
}



function mostrarProductos() {
    peticion = true;
    
    let url = "https://api.escuelajs.co/api/v1/products/?offset="+inicioProducto+"&limit="+finalProducto+"&categoryId="+categoria;

    fetch(url, {method : "GET" })
    .then((res) => res.json())
   .then((datos) => {
    console.log(datos);
    peticion = false;

    let products = document.getElementById("products");

    for (let dato of datos) {
    let div = document.createElement("div");
        products.appendChild(div);

        let img = document.createElement("img");
        img.src = dato.images[0];
        img.addEventListener("error",(e)=> {
            e.target.src = "./images/notFound.jpg"
        })
        div.appendChild(img);

    
        let div2 = document.createElement("div");
        div.appendChild(div2);
    
            let p = document.createElement("p");
            p.innerText = dato.title;
            div2.appendChild(p);

            let price = document.createElement("p");
            price.innerText = dato.price+"€";
            div2.appendChild(price);

            mostrardetalle(div,dato.id);
    }
    })
    .catch((err) => console.log("error: " + err));
}

function eventosNav() {
    
    document.getElementById("ropa").addEventListener("click",()=>{
        products.innerHTML = "";
        products.innerHTML = "";
        products.style.opacity = 1;
        products.style.zIndex = 98;
        products.style.overflow = "auto";
        products.style.pointerEvents = "all";
        document.body.style.overflow = "hidden";
        document.getElementById("header").style.position = "fixed";
        categoria = 1;
        mostrarProductos();
    });
    document.getElementById("electronica").addEventListener("click",()=>{
        products.innerHTML = "";
        products.style.opacity = 1;
        products.style.zIndex = 98;
        products.style.overflow = "auto";
        products.style.pointerEvents = "all";
        document.body.style.overflow = "hidden";
        document.getElementById("header").style.position = "fixed";
        categoria = 2;
        mostrarProductos();
    });
    document.getElementById("muebles").addEventListener("click",()=>{
        products.innerHTML = "";
        products.style.opacity = 1;
        products.style.zIndex = 98;
        products.style.overflow = "auto";
        products.style.pointerEvents = "all";
        document.body.style.overflow = "hidden";
        document.getElementById("header").style.position = "fixed";
        categoria = 3;
        mostrarProductos();
    });
    document.getElementById("zapatos").addEventListener("click",()=>{
        products.innerHTML = "";
        products.style.opacity = 1;
        products.style.zIndex = 98;
        products.style.overflow = "auto";
        products.style.pointerEvents = "all";
        document.body.style.overflow = "hidden";
        document.getElementById("header").style.position = "fixed";
        categoria = 4;
        mostrarProductos();
    });
    document.getElementById("varios").addEventListener("click",()=>{
        products.innerHTML = "";
        products.style.opacity = 1;
        products.style.zIndex = 98;
        products.style.overflow = "auto";
        products.style.pointerEvents = "all";
        document.body.style.overflow = "hidden";
        document.getElementById("header").style.position = "fixed";
        categoria = 5;
        mostrarProductos();
    });
    document.getElementById("navproductos").addEventListener("click",()=>{
        products.innerHTML = "";
        products.style.opacity = 1;
        products.style.zIndex = 98;
        products.style.overflow = "auto";
        products.style.pointerEvents = "all";
        document.body.style.overflow = "hidden";
        document.getElementById("header").style.position = "fixed";
        categoria = "";
        mostrarProductos();
    });
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push(producto);

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrardetalle(img, id) {
    img.addEventListener("click", (e) => {
        document.body.style.overflow = "hidden";
        e.stopPropagation();
        let url = "https://api.escuelajs.co/api/v1/products/" + id;

        fetch(url, { method: "GET" })
            .then((res) => res.json())
            .then((datos) => {
                const container = document.getElementById("product-container");

                // Crear título
                const titleElement = document.createElement("div");
                titleElement.className = "product-title";
                titleElement.textContent = datos.title;
                container.appendChild(titleElement);

                // Crear imágenes
                const imagesContainer = document.createElement("div");
                imagesContainer.className = "product-images";

                datos.images.forEach(imageUrl => {
                    const img = document.createElement("img");
                    img.src = imageUrl;
                    img.alt = datos.title;
                    imagesContainer.appendChild(img);
                });
                container.appendChild(imagesContainer);

                // Crear descripción
                const descriptionElement = document.createElement("div");
                descriptionElement.className = "product-description";
                descriptionElement.textContent = datos.description;
                container.appendChild(descriptionElement);

                // Crear precio
                const priceElement = document.createElement("div");
                priceElement.className = "product-price";
                priceElement.textContent = datos.price + "€";
                container.appendChild(priceElement);

                // Crear botones
                let botones = document.createElement("div");
                botones.className = "product-buttons";

                let añadir = document.createElement("button");
                añadir.innerHTML = "Añadir al carrito";
                añadir.setAttribute("id", "añadir");

                let salir = document.createElement("button");
                salir.innerHTML = "Salir";
                salir.setAttribute("id", "salir");
                salir.style.color = "red";

                botones.appendChild(salir);
                botones.appendChild(añadir);
                container.appendChild(botones);

                // Evento para añadir al carrito
                añadir.addEventListener("click", () => {
                    const producto = {
                        id: datos.id,
                        title: datos.title,
                        price: datos.price
                    };
                    agregarAlCarrito(producto);
                });

                let detalle = document.getElementById("detalle");
                detalle.style.opacity = 1;
                detalle.style.zIndex = 999;
                detalle.style.position = "fixed";
            })
            .catch((err) => { console.log(err) });
    });
}


function renderCart() {
    // Obtener carrito del localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Seleccionar el contenedor donde se mostrará el carrito
    let cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = ""; // Limpiar el contenedor antes de renderizar

    if (carrito.length === 0) {
        // Mostrar mensaje si el carrito está vacío
        let emptyMessage = document.createElement("p");
        emptyMessage.innerText = "El carrito está vacío.";
        cartContainer.appendChild(emptyMessage);
        return;
    }

    // Renderizar cada producto del carrito
    carrito.forEach((producto, index) => {
        // Crear un contenedor para el producto
        let productDiv = document.createElement("div");
        productDiv.className = "cart-item";

        // Título del producto
        let title = document.createElement("h3");
        title.innerText = producto.title;

        // Precio del producto
        let price = document.createElement("p");
        price.innerText = `${producto.price}€`;

        // Cantidad del producto
        let quantity = document.createElement("span");
        if (!producto.quantity){
            producto.quantity = 1;
        }
        quantity.innerText = `Cantidad: ${producto.quantity}`;

        // Botón "Añadir"
        let addButton = document.createElement("button");
        addButton.innerText = "+";
        addButton.addEventListener("click", () => {
            producto.quantity++;
            actualizarCarrito(carrito);
        });

        // Botón "Quitar"
        let subtractButton = document.createElement("button");
        subtractButton.innerText = "-";
        subtractButton.addEventListener("click", () => {
            if (producto.quantity > 1) {
                producto.quantity--;
            } else {
                carrito.splice(index, 1); // Si la cantidad es 0, eliminar del carrito
            }
            actualizarCarrito(carrito);
        });

        // Botón "Eliminar"
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Eliminar";
        deleteButton.style.color = "red";
        deleteButton.addEventListener("click", () => {
            carrito.splice(index, 1); // Eliminar producto
            actualizarCarrito(carrito);
        });

        // Añadir los elementos al contenedor del producto
        productDiv.appendChild(title);
        productDiv.appendChild(price);
        productDiv.appendChild(quantity);
        productDiv.appendChild(addButton);
        productDiv.appendChild(subtractButton);
        productDiv.appendChild(deleteButton);

        // Añadir el contenedor del producto al carrito
        cartContainer.appendChild(productDiv);
    });
}

// Función para actualizar el carrito y el localStorage
function actualizarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar localStorage
    renderCart(); // Volver a renderizar el carrito
}








window.onload = ()=> {
let cart = document.getElementById("categories");
let products = document.getElementById("products");
cartcategories(cart,products);

insertproduct();
eventosNav();

products.addEventListener("scroll", () => {
    let scrollTop = products.scrollTop; // Desplazamiento actual del contenedor
    let scrollHeight = products.scrollHeight; // Altura total del contenido del contenedor
    let clientHeight = products.clientHeight; // Altura visible del contenedor

    // Condición para determinar si estás cerca del final del contenedor
    let endOfPage = scrollTop + clientHeight >= (scrollHeight * 0.5);

    if (endOfPage) {
        //&& dentrodeproductos
        if (!peticion) {
        mostrarProductos();
        inicioProducto += 10;
        finalProducto += 10;
        }
    }
});


document.getElementById("comprarAhora").addEventListener("click",()=> {
    products.innerHTML = "";
    products.style.opacity = 1;
    products.style.zIndex = 98;
    products.style.overflow = "auto";
    products.style.pointerEvents = "all";
    document.body.style.overflow = "hidden";
    document.getElementById("header").style.position = "fixed";
    categoria = "";
    mostrarProductos();
});

let element = document.getElementById("detalle");
let contenedor = document.getElementById("product-container");
element.addEventListener("click", (e)=> {

    let salir = document.getElementById("salir");

     if (e.target == salir) {
    document.body.style.overflow = "";
    contenedor.innerHTML = "";
    element.style.opacity = "0%";
    element.style.zIndex = "0";
    }else if (e.target.closest("#product-container")) {

    }else {
        contenedor.innerHTML = "";
        document.body.style.overflow = "";
        element.style.opacity = "0%";
        element.style.zIndex = "0"; 
    }
});


document.getElementById("carrito").addEventListener("click",()=> {
    renderCart();
    let cart = document.getElementById("contenedorcarrito");
    cart.style.opacity = 1;
    cart.style.zIndex = 999;
    cart.style.pointerEvents = "all";
    cart.style.position = "absolute";
});




}