//definir clase datos
const datos = {
    methods: {
      find: (id) => {
        return datos.items.find((item) => item.id === id);
      },
      remove: (items) => {
        items.forEach((item) => {
          const product = datos.methods.find(item.id);
          product.cantidad = product.cantidad - item.cantidad;
        });
  
        console.log(datos);
      },
    },
    items: [ // Accesorios
      {
        imagen: "./img/biberon.png",
        categoria: "Categoria: Bebes",
        id: 0,
        descripcion: "Biberón",
        precio: 25,
        pahora: 19.9,
        cantidad: 15,
      },
      {
        imagen: "./img/pañal.png",
        categoria: "Categoria: Bebes",
        id: 1,
        descripcion: "Pañales",
        precio:50,
        cantidad: 15,
      },
      {
        imagen: "./img/enterizo.png",
        categoria: "Categoria: Bebes",
        id: 2,
        descripcion: "Enterizo",
        precio: 17,
        cantidad: 20,
      },
      // Mejorar el catalogo del producto del carrito de compras, aumentado productos por categorias (3 Categorias)
      {
        imagen: "./img/cuna.png",
        categoria: "Categoria: Bebes", //Categoria es el tipo de producto que se esta ofertando
        id: 3,
        descripcion: "Cuna",
        precio: 500,
        cantidad: 10,
      },
      {
        imagen: "./img/babero.png",
        categoria: "Categoria: Bebes",
        id: 4,
        descripcion: "Baberos",
        precio: 20,
        cantidad: 50,
      },
      {
        imagen: "./img/pañalera.png",
        categoria: "Categoria: Bebes",
        id: 5,
        descripcion: "Pañaleras",
        precio: 300,
        cantidad: 20,
      },
      {
        imagen: "./img/pantalon.png",
        categoria: "Categoria: Niños",
        id: 6,
        descripcion: "Pantalones",
        precio: 29,
        cantidad: 50,
      },
      {
        imagen: "./img/polos.png",
        categoria: "Categoria: Niños",
        id: 7,
        descripcion: "Polos",
        precio: 9,
        cantidad: 70,   
      },
      {
        imagen: "./img/zapatillaniño.png",
        categoria: "Categoria: Niños",
        id: 8,
        descripcion: "Zapatillas",
        precio: 120,
        cantidad: 45,   
      },
      {
        imagen: "./img/triciclo.png",
        categoria: "Categoria: Niños",
        id: 9,
        descripcion: "Triciclo",
        precio: 199,
        cantidad: 10,   
      },
      {
        imagen: "./img/productobb.png",
        categoria: "Categoria: Niños",
        id: 10,
        descripcion: "Producto Bebes",
        precio: 20,
        cantidad: 20,   
      },
      {
        imagen: "./img/pijamaniño.png",
        categoria: "Categoria: Niños",
        id: 11,
        descripcion: "Pijama",
        precio: 45,
        cantidad: 15,   
      },
      {
        imagen: "./img/vestido.png",
        categoria: "Categoria: Niñas",
        id:12,
        descripcion: "Vestidos",
        precio: 29,
        cantidad: 22,
      },
      {
        imagen: "./img/muneca.png",
        categoria: "Categoria: Niñas",
        id:13,
        descripcion: "Muñeca",
        precio: 9,
        cantidad: 30,
      },
      {
        imagen: "./img/falda.png",
        categoria: "Categoria: Niñas",
        id:14,
        descripcion: "Falda",
        precio: 19,
        cantidad: 50,
      },
      {
        imagen: "./img/camisa.png",
        categoria: "Categoria: Niñas",
        id:15,
        descripcion: "Polos",
        precio: 9,
        cantidad: 70,
      },
      {
        imagen: "./img/pijamaniña.png",
        categoria: "Categoria: Niñas",
        id:16,
        descripcion: "Pijama",
        precio: 45,
        cantidad: 15,
      },
      {
        imagen: "./img/zapatosniña.png",
        categoria: "Categoria: Niñas",
        id:17,
        descripcion: "Zapatos",
        precio: 69,
        cantidad:20,
      }
    ],
  };

  //definir clase carrocompras
  const carrocompras = {
    items: [],
    methods: {
      add: (id, cantidad) => {
        const cartItem = carrocompras.methods.get(id);
        if (cartItem) {
          if (carrocompras.methods.hasInventory(id, cantidad + cartItem.cantidad)) {
            cartItem.cantidad++;
          } else {
            Swal.fire("No hay más inventario");
          }
        } else {
          carrocompras.items.push({ id, cantidad });z
        }
      },
      remove: (id, cantidad) => {
        const cartItem = carrocompras.methods.get(id);
  
        if (cartItem.cantidad - 1 > 0) {
          cartItem.cantidad--;
        } else {
          carrocompras.items = carrocompras.items.filter(
            (item) => item.id !== id
          );
        }
      },
      count: () => {
        return carrocompras.items.reduce((acc, item) => acc + item.qyt, 0);
      },
      get: (id) => {
        const index = carrocompras.items.findIndex((item) => item.id === id);
        return index >= 0 ? carrocompras.items[index] : null;
      },
      getTotal: () => {
        let total = 0;
        carrocompras.items.forEach((item) => {
          const found = datos.methods.find(item.id);
          total += found.precio * item.cantidad;
        });
        return total;
      },
      hasInventory: (id, cantidad) => {
        return datos.items.find((item) => item.id === id).cantidad - cantidad >= 0;
      },
      purchase: () => {
        datos.methods.remove(carrocompras.items);
      },
    },
  };
  // Nombres de productos.....
  renderStore();
  
  function renderStore() {
    const html = datos.items.map((item) => {
      return `
          <div class="item">
              <center><input type="image" src="${item.imagen}" height="150px" ></input></center>
              <center><b><div class="descripcion">${item.descripcion}</div></b></center>
              <div class="precio";>${numberToCurrency(item.precio)}</div>
              <div class="cantidad">${item.cantidad} unidades</div>
              <b> <div class="categoria">${item.categoria}</div> </b>
              <center><div class="actions"><button class="add" data-id="${item.id}">Añadir al carrito</button></div></center>
          </div>`;
    });
  
    document.querySelector("#store-container").innerHTML = html.join("");
  
    document.querySelectorAll(".item .actions .add").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(button.getAttribute("data-id"));
        const item = datos.methods.find(id);
  
        if (item && item.cantidad - 1 > 0) {
          carrocompras.methods.add(id, 1);
          console.log(datos, carrocompras);
          rendercarrocompras();
        } else {
          Swal.fire("Ya no hay existencia de ese artículo");
        }
      });
    });
  }
  // Nombres de productos dentro del carrito....
  function rendercarrocompras() {
    const html = carrocompras.items.map((item) => {
      const datosItem = datos.methods.find(item.id);
      return `
              <div class="item">
                  <div class="descripcion">${datosItem.descripcion}</div>
                  <div class="precio">${numberToCurrency(datosItem.precio)}</div>
                  <div class="cantidad">${item.cantidad} unidades</div>
                  <div class="subtotal">Subtotal: ${numberToCurrency 
                  (item.cantidad * datosItem.precio)}</div>
                  <div class="actions">
                      <button class="addOne" data-id="${datosItem.id}">+</button>
                      <button class="removeOne" data-id="${datosItem.id}">-</button>
                  </div>
              </div>
          `;
    });
    // carrito....
    const closeButton = `
    <div class="cart-header">
      <button id="bClose">Cerrar</button><br><br>
      <input type="image" src="./img/carrito.png" height="115px"></input>
    </div>`;
    const purchaseButton =
      carrocompras.items.length > 0
        ? `<div class="cart-actions">
      <center><button id="bPurchase">Terminar compra</button></center>
    </div>`
        : "";
    const total = carrocompras.methods.getTotal();
    const totalDiv = `<div class="total">Total: ${numberToCurrency(total)}</div>`;
    document.querySelector("#shopping-cart-container").innerHTML =
      closeButton + html.join("") + totalDiv + purchaseButton;
  
    document.querySelector("#shopping-cart-container").classList.remove("hide");
    document.querySelector("#shopping-cart-container").classList.add("show");
  
    document.querySelectorAll(".addOne").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(button.getAttribute("data-id"));
        carrocompras.methods.add(id, 1);
        rendercarrocompras();
      });
    });
  
    document.querySelectorAll(".removeOne").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(button.getAttribute("data-id"));
        carrocompras.methods.remove(id, 1);
        rendercarrocompras();
      });
    });
  
    document.querySelector("#bClose").addEventListener("click", (e) => {
      document.querySelector("#shopping-cart-container").classList.remove("show");
      document.querySelector("#shopping-cart-container").classList.add("hide");
    });
    const bPurchase = document.querySelector("#bPurchase");
    if (bPurchase) {
      bPurchase.addEventListener("click", (e) => {
        carrocompras.methods.purchase();
      });
    }
  }
  
  function numberToCurrency(n) {
    return new Intl.NumberFormat("en-US", {
      maximumSignificantDigits: 2,
      style: "currency",
      currency: "USD",
    }).format(n);
  }