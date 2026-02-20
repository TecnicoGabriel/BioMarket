// =========================================
// 1. MENÚ MÓVIL (Hamburguesa)
// =========================================
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-toggle');
    if (navLinks && menuIcon) {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('change');
    }
}

// =========================================
// 2. SUBMENÚ PRODUCTOS (Desplegable)
// =========================================
function toggleSubmenu(event) {
    event.preventDefault(); 
    event.stopPropagation(); 
    const dropdownLi = document.getElementById('productosDropdown');
    if (dropdownLi) {
        dropdownLi.classList.toggle('active');
    }
}

// =========================================
// 3. CARRUSEL (Slider)
// =========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
    });
}

function moveSlide(direction) {
    if (slides.length === 0) return;
    currentSlide += direction;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    showSlide(currentSlide);
}
if (slides.length > 0) {
    setInterval(() => moveSlide(1), 5000);
}
// =========================================
// 4. CARRITO DE COMPRAS (CON MEMORIA)
// =========================================
let cart = [];
const cartCountDOM = document.getElementById('cart-count');
const cartItemsDOM = document.getElementById('cart-items');
const cartTotalDOM = document.getElementById('cart-total');

// 1. CARGAR AL INICIO: Verificamos si hay algo guardado
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('primaveritaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI(); // Actualizamos la vista con lo guardado
    }
});

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// Función para GUARDAR en la memoria del navegador
function saveCartToStorage() {
    localStorage.setItem('primaveritaCart', JSON.stringify(cart));
}

function addToCart(name, price) {
    cart.push({ name, price });
    saveCartToStorage(); // <--- Guardamos cada vez que agregamos
    updateCartUI();
    toggleCart(); 
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToStorage(); // <--- Guardamos cada vez que borramos
    updateCartUI();
}

function updateCartUI() {
    if (!cartCountDOM) return;
    
    cartCountDOM.innerText = cart.length;
    cartItemsDOM.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsDOM.innerHTML = '<p class="empty-msg">Tu carrito está vacío 🍃</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <div>
                    <strong>${item.name}</strong>
                    <div style="color: #777; font-size: 0.9rem;">S/ ${item.price.toFixed(2)}</div>
                </div>
                <i class="fas fa-trash" style="color: #e74c3c; cursor: pointer; padding: 5px;" onclick="removeFromCart(${index})"></i>
            `;
            cartItemsDOM.appendChild(itemDiv);
        });
    }
    
    if (cartTotalDOM) {
        cartTotalDOM.innerText = total.toFixed(2);
    }
}
// =========================================
// 5. CHECKOUT WHATSAPP
// =========================================
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Agrega productos a tu canasta primero.");
        return;
    }

    const phoneNumber = "51906550385"; 
    let message = "Hola *Primaverita Naturales* 🌿, deseo realizar el siguiente pedido:%0A%0A";
    let total = 0;

    cart.forEach(item => {
        message += `- ${item.name}: S/ ${item.price}%0A`;
        total += item.price;
    });

    message += `%0A*Total a pagar: S/ ${total.toFixed(2)}*`;
    message += "%0A%0AQuedo atento a los métodos de pago. ¡Gracias!";

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// =========================================
// 6. BUSCADOR Y ORDENAMIENTO (PARA PRODUCTOS HTML)
// =========================================

// Función 1: Contar productos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
});

function actualizarContador() {
    const contadorElemento = document.getElementById('product-counter');
    if (!contadorElemento) return;
    
    // Cuenta cuántas tarjetas están visibles (display no es 'none')
    const tarjetasVisibles = Array.from(document.querySelectorAll('#grid-productos .product-card'))
                                 .filter(card => card.style.display !== 'none');
    
    contadorElemento.innerText = tarjetasVisibles.length;
}

// Función 2: El Buscador
function filtrarHTML() {
    const textoBuscado = document.getElementById('searchInput').value.toLowerCase();
    const tarjetas = document.querySelectorAll('#grid-productos .product-card');

    tarjetas.forEach(tarjeta => {
        // Busca el texto dentro del <h3>
        const titulo = tarjeta.querySelector('h3').innerText.toLowerCase();
        
        if (titulo.includes(textoBuscado)) {
            tarjeta.style.display = 'flex'; // Si coincide, lo muestra
        } else {
            tarjeta.style.display = 'none'; // Si no, lo oculta
        }
    });

    // Quitamos la clase 'active' de los botones de orden porque la búsqueda es nueva
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
    
    actualizarContador();
}

// Función 3: Los Botones de Ordenamiento
function ordenarHTML(criterio) {
    const grid = document.getElementById('grid-productos');
    if (!grid) return;

    // Pintar el botón activo
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btn-' + criterio).classList.add('active');

    // Convertimos las cajas de productos en un Array para poder ordenarlas
    let tarjetas = Array.from(grid.querySelectorAll('.product-card'));

    tarjetas.sort((a, b) => {
        if (criterio === 'az' || criterio === 'za') {
            // Saca el texto del h3 para comparar
            const nombreA = a.querySelector('h3').innerText.trim();
            const nombreB = b.querySelector('h3').innerText.trim();
            
            if (criterio === 'az') return nombreA.localeCompare(nombreB);
            if (criterio === 'za') return nombreB.localeCompare(nombreA);
        } 
        else if (criterio === 'min' || criterio === 'max') {
            // Saca el texto del precio (ej: "S/ 45.00") y lo convierte en número (45.00)
            const textoPrecioA = a.querySelector('.new-price').innerText.replace(/[^\d.-]/g, '');
            const textoPrecioB = b.querySelector('.new-price').innerText.replace(/[^\d.-]/g, '');
            
            const precioA = parseFloat(textoPrecioA);
            const precioB = parseFloat(textoPrecioB);

            if (criterio === 'min') return precioA - precioB;
            if (criterio === 'max') return precioB - precioA;
        }
    });

    // Limpia el grid y vuelve a meter las tarjetas en el nuevo orden
    grid.innerHTML = '';
    tarjetas.forEach(tarjeta => grid.appendChild(tarjeta));
}
// Importante: Aquí llamamos a la función por si la necesitas al cargar la página
window.onload = function() {
    cargarProductosPagina();
};

// =========================================
// 7. LÓGICA DEL MODAL (SUPERVISTA MEJORADA)
// =========================================
let currentProduct = {}; 

// Nota: Se añadieron 3 parámetros: precioViejo, tamano, descuento
function openModal(nombre, precioNuevo, precioViejo, imagen, descripcion, tamano, descuento) {
    const modal = document.getElementById('productModal');
    
    if(!modal) {
        alert("¡Error! El navegador no encuentra el HTML del modal. Revisa que esté en tu index.html");
        return;
    }

    // 1. Llenar datos principales
    document.getElementById('m-title').innerText = nombre;
    document.getElementById('m-price').innerText = precioNuevo.toFixed(2);
    document.getElementById('m-img').src = imagen;
    document.getElementById('m-desc').innerText = descripcion || "Producto 100% natural seleccionado para ti.";
    
    // 2. Manejar datos opcionales (Precio Viejo, Tamaño, Descuento)
    const oldPriceEl = document.getElementById('m-old-price');
    if (oldPriceEl) {
        if (precioViejo && precioViejo > 0) {
            oldPriceEl.innerText = `S/ ${precioViejo.toFixed(2)}`;
            oldPriceEl.style.display = 'block';
        } else {
            oldPriceEl.style.display = 'none';
        }
    }

    const sizeEl = document.getElementById('m-size');
    if (sizeEl) {
        // Si no se pasa tamaño, ocultamos el contenedor completo para que no se vea "Tamaño: N/A"
        if (tamano && tamano !== 'N/A') {
            sizeEl.innerText = tamano;
            sizeEl.parentElement.style.display = 'block'; 
        } else {
            sizeEl.parentElement.style.display = 'none';
        }
    }

    const badgeEl = document.getElementById('m-discount');
    if (badgeEl) {
        if (descuento) {
            badgeEl.innerText = descuento;
            badgeEl.style.display = 'block';
        } else {
            badgeEl.style.display = 'none';
        }
    }

    // 3. Resetear cantidad a 1
    const qtyInput = document.getElementById('m-qty');
    if(qtyInput) qtyInput.value = 1;

    // 4. Guardar en variable temporal para el carrito y WhatsApp
    currentProduct = { nombre: nombre, precio: precioNuevo };

    // 5. Mostrar modal
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) modal.classList.remove('active');
}

// Cerrar si se hace click fuera de la caja blanca
const modalElement = document.getElementById('productModal');
if (modalElement) {
    modalElement.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
}

function updateModalQty(change) {
    const input = document.getElementById('m-qty');
    if (input) {
        let newValue = parseInt(input.value) + change;
        if (newValue < 1) newValue = 1;
        input.value = newValue;
    }
}

function addFromModalToCart() {
    const qtyInput = document.getElementById('m-qty');
    const qty = qtyInput ? parseInt(qtyInput.value) : 1;
    
    for (let i = 0; i < qty; i++) {
        // Usamos la función addToCart que ya tienes definida arriba
        addToCart(currentProduct.nombre, currentProduct.precio);
    }
    closeModal();
}

function buyNowWhatsApp() {
    const qtyInput = document.getElementById('m-qty');
    const qty = qtyInput ? qtyInput.value : 1;
    const total = (currentProduct.precio * qty).toFixed(2);
    const phoneNumber = "51906550385"; 

    const msg = `Hola Primaverita! 🌿%0AQuiero comprar el siguiente producto:%0A%0A` +
                `📦 *Producto:* ${currentProduct.nombre}%0A` +
                `🔢 *Cantidad:* ${qty}%0A` +
                `💰 *Precio Total:* S/ ${total}%0A%0A` +
                `Quedo atento para el pago.`;

    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
}
// =========================================
// 8. LÓGICA DE SUB-CATEGORÍAS MÓVIL
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const submenuLinks = document.querySelectorAll('.has-submenu > a');
    
    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo actuar si estamos en pantalla móvil
            if (window.innerWidth <= 900) {
                e.preventDefault(); // Evita navegar al enlace padre
                e.stopPropagation(); 
                
                const parent = this.parentElement;
                
                // Cerramos otros submenús abiertos para que no se amontonen
                document.querySelectorAll('.has-submenu').forEach(item => {
                    if (item !== parent) item.classList.remove('active-mobile');
                });

                // Abrimos/Cerramos el actual
                parent.classList.toggle('active-mobile');
            }
        });
    });
});
// =========================================
// 9. EXPANDIR CATEGORÍAS (VER MÁS / VER MENOS)
// =========================================
function toggleMoreCategories(btn) {
    // Seleccionamos todos los botones que tienen la clase 'extra-pill'
    const extraPills = document.querySelectorAll('.extra-pill');
    
    // Verificamos si el botón ya está expandido
    const isExpanded = btn.classList.contains('expanded');

    if (!isExpanded) {
        // MOSTRAR MÁS: Quitamos la clase que los oculta
        extraPills.forEach(pill => {
            pill.classList.remove('hidden-pill');
        });
        // Cambiamos el texto y el ícono
        btn.innerHTML = 'Ver menos <i class="fas fa-minus ml-1"></i>';
        btn.classList.add('expanded');
    } else {
        // VER MENOS: Volvemos a añadir la clase que los oculta
        extraPills.forEach(pill => {
            pill.classList.add('hidden-pill');
        });
        // Restauramos el texto original
        btn.innerHTML = 'Ver más <i class="fas fa-plus ml-1"></i>';
        btn.classList.remove('expanded');
    }
}