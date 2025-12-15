document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENÚ MÓVIL ---
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('mobile-overlay');

    function toggleMenu() {
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    }

    if(menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if(closeBtn) closeBtn.addEventListener('click', toggleMenu);
    if(overlay) overlay.addEventListener('click', toggleMenu);

    // --- 2. VER MÁS CATEGORÍAS (TOGGLE) ---
    const toggleCatsBtn = document.getElementById('toggle-cats-btn');
    const moreCatsDiv = document.getElementById('more-cats');

    if(toggleCatsBtn && moreCatsDiv) {
        toggleCatsBtn.addEventListener('click', () => {
            moreCatsDiv.classList.toggle('active');
            
            // Cambiar texto del botón
            if(moreCatsDiv.classList.contains('active')) {
                toggleCatsBtn.innerHTML = 'Ver menos categorías <i class="fas fa-chevron-up"></i>';
            } else {
                toggleCatsBtn.innerHTML = 'Ver más categorías <i class="fas fa-chevron-down"></i>';
            }
        });
    }

    // --- 3. ANIMACIONES AL SCROLLEAR (SCROLL REVEAL) ---
    const reveals = document.querySelectorAll('.reveal');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85; // Punto de activación

        reveals.forEach(reveal => {
            const boxTop = reveal.getBoundingClientRect().top;
            if(boxTop < triggerBottom) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Chequear al inicio
});