document.addEventListener('DOMContentLoaded', () => {
   let carrito = [];
   let precio = 0;

   let cards = document.querySelectorAll('.card');

   cards.forEach(card => {
      let btnClic = card.querySelector('button');
      const productTitle = card.querySelector('h2').textContent;
      const productLabel = card.querySelector('label');
      const img = card.querySelector('img').src;
      const productPrice = productLabel ? productLabel.textContent.replace('$', '') : '0';

      btnClic.addEventListener('click', () => {
         const product = {
            title: productTitle,
            price: productPrice,
            image: img,
            cantidad: 1
         };

         const productoExistente = carrito.find(p => p.title === product.title);

       if (productoExistente) {
         productoExistente.cantidad += 1;
       } else {
        carrito.push(product);
       }  

         

         precio = carrito.reduce((acc, prod) => acc + (parseFloat(prod.price) * prod.cantidad), 0);

         localStorage.setItem('productos', JSON.stringify(carrito));
         localStorage.setItem('total', precio);

         const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
         document.querySelector('.count').innerText = totalCantidad;
      });
   });
});
