// Mobile nav toggle, smooth scrolling, and year fallback

(function () {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');

    // Toggle nav on small screens
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = nav.getAttribute('data-open') === 'true';
            if (isOpen) {
                nav.style.display = '';
                nav.setAttribute('data-open', 'false');
                menuToggle.setAttribute('aria-expanded', 'false');
            } else {
                // use flex to match desktop nav layout
                nav.style.display = 'flex';
                nav.setAttribute('data-open', 'true');
                menuToggle.setAttribute('aria-expanded', 'true');
            }
        });

        // Reset nav display when resizing to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 600) {
                nav.style.display = '';
                nav.setAttribute('data-open', 'false');
                if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // close nav on mobile after clicking
                if (nav && window.innerWidth <= 600) {
                    nav.style.display = '';
                    nav.setAttribute('data-open', 'false');
                    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Ensure year is set if the inline script didn't run
    const yearEl = document.getElementById('year');
    if (yearEl && !yearEl.textContent.trim()) {
        yearEl.textContent = new Date().getFullYear();
    }
})();