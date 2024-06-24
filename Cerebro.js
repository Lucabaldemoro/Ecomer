let listador = document.querySelector(".contenedor-figuras");
let Carritocontainer = document.querySelector(".Carrito-container");
let carritoprevio = document.querySelector(".Carrito-previa");
let carritocompra = document.querySelector(".carrito-compra");
let total = document.querySelector(".preciocompra");
let botonatras = document.querySelector(".atras");
let CerrarCarritoprevia = document.querySelector(".CerrarCarritoprevia");
let preciototal = document.querySelector(".preciototal");
const listajugos = [
  {
    id: "1",
    nombre: "REMERA SEET",
    imagen: "remera1 copy.webp",
    precio: "$19.200",
  },

  {
    id: "2",
    nombre: " REMERA ICE CUBE",
    imagen: "remera2.webp",
    precio: "$19.200",
  },

  {
    id: "3",
    nombre: "REMERA ANGELS      ",
    imagen: "remera3.webp",
    precio: "$23.400",
  },

  {
    id: "4",
    nombre: "REMERA HORSE      ",
    imagen: "remera4.webp",
    precio: "$23.400",
  },

  {
    id: "5",
    nombre: "REMERA BANANA      ",
    imagen: "remera5.webp",
    precio: "$23.400",
  },
  {
    id: "6",
    nombre: "REMERA RELAX      ",
    imagen: "remera6.webp",
    precio: "$23.400",
  },
  {
    id: "7",
    nombre: "REMERA FUTURE      ",
    imagen: "remera7.webp",
    precio: "$23.400",
  },
  {
    id: "8",
    nombre: "REMERA PEANUTS      ",
    imagen: "remera8.webp",
    precio: "$23.400",
  },

  {
    id: "9",
    nombre: "REMERA DAVID      ",
    imagen: "remera david.webp",
    precio: "$23.400",
  },

  {
    id: "10",
    nombre: "REMERA RELAX      ",
    imagen: "remera relax.webp",
    precio: "$23.400",
  },

  {
    id: "11",
    nombre: "REMERA BANANA      ",
    imagen: "remera-banana.webp",
    precio: "$23.400",
  },

  {
    id: "12",
    nombre: "REMERA GLOW      ",
    imagen: "remeraglog.webp",
    precio: "$23.400",
  },
];

//  el forEach y lo siguiente de abajo se hizo asi ya que me surgio un problema
//el cual era  es que estába intentando agregar un event listener a una NodeList (tarjeta), lo cual no es posible directamente.

let tarjetasHTML = "";

listajugos.forEach((item) => {
  tarjetasHTML += `
    <div class='Card' data-id='${item.id}'>
                      <div class="contenido"></div>

            <img src='${item.imagen}' class = 'imagen-producto'>
            <h4>${item.nombre}</h4>
                <div class="card-compra">
                  <span class="precio-producto">${item.precio}</span>
                  <span class="coutasprecio">3 cuotas sin interés de $6.400</span>

                                      <hr>

                    <div class="destalle-zona">

                        <a href="" class="compra-producto" >Comprar</a>
                       <a href="" class="vistaprevia" >Detalles</a>
                 
                    </div>
              </div>
      </div>`;
});

// Asignar el HTML generado al contenedor
listador.innerHTML = tarjetasHTML;

let inputTexto = document.querySelector("#inputTexto");
inputTexto.addEventListener("input", function () {
  let valortexto = inputTexto.value.trim().toLowerCase();
  console.log("Valor de texto:", valortexto);

  // Limpiar la lista de productos antes de mostrar nuevos resultados
  listador.innerHTML = "";

  // Filtrar los productos
  let productosBuscados = listajugos.filter((producto) =>
    producto.nombre.toLowerCase().includes(valortexto)
  );

  // Mostrar los productos filtrados
  productosBuscados.forEach((producto) => {
    listador.innerHTML += `
      <div class='Card' data-id='${producto.id}'>
        <div class="contenido"></div>
        <img src='${producto.imagen}' class='imagen-producto'>
        <h4>${producto.nombre}</h4>
        <div class="card-compra">
          <span class="precio-producto">${producto.precio}</span>
          <span class="coutasprecio">3 cuotas sin interés de $6.400</span>
          <hr>
          <div class="destalle-zona">
            <a href="#" class="compra-producto">Comprar</a>
            <a href="#" class="vistaprevia">Detalles</a>
          </div>
        </div>
      </div>`;
  });
});

// Agregar event listeners a cada tarjeta
let tarjetas = document.querySelectorAll(".Card");

// de esta parte para abajo es la zona donde agrego productos y al carrit
// y cuento cuantos tiene en el

tarjetas.forEach((tarjeta) => {
  // zona donde tomo el precio de cada producto en formato en texto y lo combierto en numero
  let botonvistaprevia = tarjeta.querySelector(".vistaprevia");
  let botoncompra = tarjeta.querySelector(".compra-producto");
  let totalnumero = 0;

  // zona donde edita la parte baja de las tarjetas para ocularla y mostrarlas

  let Divdestallezona = tarjeta.querySelector(".destalle-zona");

  tarjeta.addEventListener("mousemove", function () {
    Divdestallezona.style.visibility = "visible";
  });

  tarjeta.addEventListener("mouseleave", () => {
    Divdestallezona.style.visibility = "hidden";
  });

  botoncompra.addEventListener("click", function () {
    event.preventDefault();
    let valorreal = parseInt(total.textContent);
    total.textContent = valorreal + 1;
    Carritocontainer.innerHTML += `
              <div class="card-finalcotenedor">
                                      <a href="" class="borraElemento" ></a>
                    <div class="card-final" idproducto='${tarjeta.id}'>
                      <img src='${tarjeta
                        .querySelector("img")
                        .getAttribute("src")}'>
                          <div class= "datosDeproducto">
                              <h4>${
                                tarjeta.querySelector("h4").textContent
                              }</h4>
                                    <span class="productoPrecio">${
                                      tarjeta.querySelector(".precio-producto")
                                        .textContent
                                    }</span>
                                    <span class="coutasprecio">3 cuotas sin interés de $6.400</span>

                          </div>
                    
                    </div>
              </div>

                <hr/>  `;

    let precioTexto = tarjeta.querySelector(".precio-producto").textContent;
    let precioNumero = parseInt(precioTexto.replace(/[^0-9-]+/g, ""));

    totalnumero += precioNumero;
    preciototal.textContent = totalnumero;

    actualizarBotonesEliminar();
  });

  let modal = document.querySelector(".modal");

  // Función para realizar la petición AJAX y cargar el contenido
  function peticionajax(event) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "ropa.html", true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.querySelector(".modal").innerHTML = this.responseText;
      } else if (this.readyState == 4) {
        document.querySelector(".modal").innerHTML =
          "<p>Error al cargar el contenido.</p>";
      }
    };

    xhttp.onerror = function () {
      document.querySelector(".modal").innerHTML = "<p>Error de red.</p>";
    };
  }

  botonvistaprevia.addEventListener("click", function () {
    event.preventDefault();
    modal.showModal();
    peticionajax();
  });

  function actualizarBotonesEliminar() {
    let botonesEliminar = document.querySelectorAll(".borraElemento");
    botonesEliminar.forEach((boton) => {
      boton.addEventListener("click", function (event) {
        event.preventDefault();
        let elementoParaEliminar = boton.closest(".card-finalcotenedor");
        let precioTexto =
          elementoParaEliminar.querySelector(".productoPrecio").textContent;
        let precioNumero = parseInt(precioTexto.replace(/[^0-9-]+/g, ""));

        if (elementoParaEliminar) {
          elementoParaEliminar.remove();

          // Actualizar el total de elementos en el carrito
          let valorreal = parseInt(total.textContent);
          total.textContent = valorreal - 1;

          // Actualizar el precio total
          totalnumero -= precioNumero;
          preciototal.textContent = totalnumero;
        }
      });
    });
  }

  carritocompra.addEventListener("click", function (event) {
    event.preventDefault();
    carritoprevio.style.visibility = "visible";
  });
});

carritocompra.addEventListener("click", function () {
  event.preventDefault();
  carritoprevio.style.visibility = "visible";
});

botonatras.addEventListener("click", function () {
  event.preventDefault();

  carritoprevio.style.visibility = "hidden";
});

CerrarCarritoprevia.addEventListener("click", function () {
  event.preventDefault();

  carritoprevio.style.visibility = "hidden";
});

let compraproductofinal = document.querySelector(".compraproductofinal");

compraproductofinal.addEventListener("click", function () {
  event.preventDefault();

  if (Carritocontainer.textContent.trim() === "") {
    
    Swal.fire({
      icon: "info",
      title: "no hay ningun producto selecionado...",
    });
  } else {
    Carritocontainer.innerHTML = "";
    total.textContent = 0;
    preciototal.textContent = "0";

    Swal.fire({
      icon: "success",
      title: "Productos comprados...",
    });
  }
});

let Perfil = document.querySelector(".Perfil");

Perfil.addEventListener("click", function () {
  event.preventDefault();

  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Funcion no disponible",
  });
});
