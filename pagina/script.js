const productos = document.querySelectorAll('.producto-item');
const listaCompra = document.getElementById('lista-compra');
const compraLista = document.getElementById('compra-lista');
const comprarBtn = document.getElementById('comprar-btn');
const ticketModal = document.getElementById('ticket-modal');
const ticketLista = document.getElementById('ticket-lista');
const totalPagar = document.getElementById('total-pagar');
const cerrarTicketBtn = document.getElementById('cerrar-ticket');

let productosSeleccionados = obtenerCarritoDeCookie();

// Actualizar la lista de compra
function actualizarListaCompra() {
  compraLista.innerHTML = '';
  if (productosSeleccionados.length === 0) {
    compraLista.innerHTML = '<li>No hay productos en el carrito.</li>';
  } else {
    productosSeleccionados.forEach((producto, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${producto.nombre} - ${producto.precio.toFixed(2)}€ x ${producto.cantidad}
        <button class="eliminar-btn" data-index="${index}">🗑️</button>`;
      compraLista.appendChild(li);
    });
  }
}

// Guardar el carrito en la cookie
function actualizarCarritoEnCookie() {
  const carritoString = productosSeleccionados.map(producto => 
    `${producto.nombre}@${producto.precio}@${producto.cantidad}`).join(',');
  document.cookie = `carrito=${carritoString}; path=/;`;
}

// Obtener el carrito de la cookie
function obtenerCarritoDeCookie() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('carrito=')) {
      const carritoString = cookie.substring(8);
      return carritoString.split(',').map(producto => {
        const [nombre, precio, cantidad] = producto.split('@');
        return { nombre, precio: parseFloat(precio), cantidad: parseInt(cantidad) };
      });
    }
  }
  return [];
}

// Agregar producto al carrito
function agregarProducto(nombre, precio) {
  const productoExistente = productosSeleccionados.find(p => p.nombre === nombre);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    productosSeleccionados.push({ nombre, precio, cantidad: 1 });
  }
  listaCompra.style.display = 'block';
  actualizarCarritoEnCookie(); 
  actualizarListaCompra();
} 

// Eliminar producto del carrito
compraLista.addEventListener('click', e => {
  if (e.target.classList.contains('eliminar-btn')) {
    const index = e.target.dataset.index;
    productosSeleccionados.splice(index, 1);
    actualizarCarritoEnCookie(); 
    actualizarListaCompra();
  }
});

// Generar ticket de compra
function generarTicket() {
  ticketLista.innerHTML = '';
  let total = 0;

  productosSeleccionados.forEach(producto => {
    const li = document.createElement('li');
    const subtotal = producto.precio * producto.cantidad;
    li.textContent = `${producto.cantidad} x ${producto.nombre} - ${subtotal.toFixed(2)}€`;
    ticketLista.appendChild(li);
    total += subtotal;
  });

  totalPagar.textContent = `Total: ${total.toFixed(2)}€`;
  ticketModal.style.display = 'flex';
}

// Cerrar el ticket
cerrarTicketBtn.addEventListener('click', () => {
  ticketModal.style.display = 'none';
});

// Manejo de clics en los productos
productos.forEach(producto => {
  producto.querySelector('.agregar-btn').addEventListener('click', () => {
    const nombre = producto.dataset.nombre;
    const precio = parseFloat(producto.dataset.precio);
    agregarProducto(nombre, precio);
  });
});

// Comprar
comprarBtn.addEventListener('click', generarTicket);
