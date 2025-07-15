function handleCart() {
   //Carrito
   const CARRITO = JSON.parse(localStorage.getItem('productos')) || [];
   const TOTAL = localStorage.getItem('total') || 0;

   let carritoContainer = document.getElementById('contenedorProduct');

   carritoContainer.innerHTML = ''; 

   if (CARRITO.length === 0) {
      carritoContainer.innerHTML = `<p>No hay productos en el carrito.</p>`;
      return;
   }

   let tabla = document.createElement('table');
   tabla.classList.add('table');

   let encabezado = `
      <thead>
         <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Agregar</th>
            <th>Precio</th>
            <th>Eliminar</th>
            <th>Imagenes</th>
         </tr>
      </thead>
   `;

   let cuerpo = '<tbody>';
   CARRITO.forEach(producto => {
      cuerpo += `
         <tr>
            <td>${producto.title}</td>
            <td>${producto.cantidad}</td>
            <td><button class="agregar-btn" data-title="${producto.title}">+</button></td>
            <td>$${producto.price}</td>
            <td><button class="eliminar-btn" data-title="${producto.title}">-</button></td>
            <td><img src="${producto.image}" alt="${producto.title}" style="width: 100px;"></td>
         </tr>
      `;
   });
   cuerpo += '</tbody>';

   tabla.innerHTML = encabezado + cuerpo;
   carritoContainer.appendChild(tabla);

   const eliminarBtn = document.querySelectorAll('.eliminar-btn');
   eliminarBtn.forEach(eliminarB => {
      eliminarB.addEventListener('click', () => {
         const titulo = eliminarB.dataset.title;
         eliminarProducto(titulo);
      });
   });

   const agregarBtn = document.querySelectorAll('.agregar-btn')
   agregarBtn.forEach(agregarB => {
      agregarB.addEventListener('click', () => {
         const tituloG = agregarB.dataset.title
         agregarProducto(tituloG)
      })
   })
   

   let precioFinal = document.createElement('p');
   precioFinal.innerText = `Total a pagar: $${TOTAL}`;
   carritoContainer.appendChild(precioFinal);
   
   let finalizarCompra = document.createElement('button');
   finalizarCompra.innerText = 'Finalizar compra';
   finalizarCompra.classList.add('content-Center');
   finalizarCompra.addEventListener('click', comprarBtn);

  carritoContainer.appendChild(finalizarCompra);

}

function limpiarCarrito() {
   if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {

      localStorage.removeItem('productos');
      localStorage.removeItem('total');

      const carritoContainer = document.getElementById('contenedorProduct');
      carritoContainer.innerHTML = '';

      document.querySelector('.count').innerText = '0';
   }
}
function agregarProducto(tituloG) {
   let carrito = JSON.parse(localStorage.getItem('productos')) || [];

   let producto = carrito.find(p => p.title === tituloG);

   if (producto) {
      producto.cantidad += 1;
   } else {
      const card = Array.from(document.querySelectorAll('.card')).find(card =>
         card.querySelector('h2').textContent === tituloG
      );

      if (!card) return; 

      const precio = card.querySelector('label').textContent.replace('$', '');
      const imagen = card.querySelector('img').src;

      const nuevoProducto = {
         title: tituloG,
         price: precio,
         image: imagen,
         cantidad: 1
      };

      carrito.push(nuevoProducto);
   }

   const nuevoTotal = carrito.reduce((acc, p) => acc + (parseFloat(p.price) * p.cantidad), 0);
   localStorage.setItem('productos', JSON.stringify(carrito));
   localStorage.setItem('total', nuevoTotal);

   const totalCantidad = carrito.reduce((acc, p) => acc + p.cantidad, 0);
   document.querySelector('.count').innerText = totalCantidad;

   handleCart();
}

function eliminarProducto(titulo) {
   let carrito = JSON.parse(localStorage.getItem('productos')) || [];
   let producto = carrito.find(p => p.title === titulo);
   
   if (producto.cantidad > 1) {
      producto.cantidad-=1
   }else{
    carrito = carrito.filter(p => p.title !== titulo); 
   }
   const nuevoTotal = carrito.reduce((acc, p) => acc + (parseFloat(p.price) * p.cantidad), 0);

   localStorage.setItem('productos', JSON.stringify(carrito));
   localStorage.setItem('total', nuevoTotal);

   const totalCantidad = carrito.reduce((acc, p) => acc + p.cantidad, 0);
   document.querySelector('.count').innerText = totalCantidad;
  

   handleCart();

}

function comprarBtn() {
   localStorage.removeItem('productos');
   localStorage.removeItem('total');

   const carritoContainer = document.getElementById('contenedorProduct');
   carritoContainer.innerHTML = '';
   alert("Gracias por comprar nuestros productos")
   handleCart();
}

document.addEventListener('DOMContentLoaded', handleCart);


window.limpiarCarrito = limpiarCarrito;
