document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MENÚ MÓVIL (Toggle)
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const closeMenu = document.getElementById('close-menu');

    if(menuToggle){
        menuToggle.addEventListener('click', () => {
            navbar.classList.add('active');
        });
    }

    if(closeMenu){
        closeMenu.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    }

    // 2. RENDERIZAR CARRUSEL (Usando js/productos.js)
    const track = document.getElementById('carrusel-track');
    
    if (track && typeof productos !== 'undefined') {
        // Mostramos solo los primeros 6 como "Destacados"
        const destacados = productos.slice(0, 6); 

        destacados.forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            
            // Si la imagen falla o es placeholder, usa una por defecto visual
            const imgUrl = producto.imagen || 'img/placeholder.jpg';

            card.innerHTML = `
                <div class="card-img">
                    <img src="${imgUrl}" alt="${producto.nombre}">
                </div>
                <div class="card-info">
                    <span class="card-cat">${producto.categoria}</span>
                    <h4>${producto.nombre}</h4>
                    <span class="card-price">S/ ${producto.precio.toFixed(2)}</span>
                    <button class="btn btn-primary" style="padding: 10px 20px; font-size: 0.8rem; width: 100%;">Ver Producto</button>
                </div>
            `;
            track.appendChild(card);
        });
    }

    // 3. BOTONES CARRUSEL
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn && nextBtn && track) {
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 320, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -320, behavior: 'smooth' });
        });
    }
});