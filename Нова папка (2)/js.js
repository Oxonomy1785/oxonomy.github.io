   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
        // КУРСОР
        const cursor = document.getElementById('magic-cursor');
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX - 11, y: e.clientY - 11, duration: 0.12 });
        });

        const interactives = document.querySelectorAll('a, button, .service-card, .gallery-item-marquee, input, textarea');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
        });

        // ПРЕЛОАДЕР ТА ПОЯВА HERO
        window.addEventListener('load', () => {
            const tl = gsap.timeline();
            tl.to("#introLogo", { opacity: 1, scale: 1, duration: 1 });
            tl.to("#loader", { y: "-100%", duration: 1, ease: "power4.inOut", delay: 0.5 });
            tl.to("#mainHeader", { onStart: () => document.getElementById('mainHeader').classList.add('show') });
            tl.to("#heroTitle", { opacity: 1, y: 0, duration: 1 }, "-=0.2");
            tl.to("#heroTagline", { opacity: 1, duration: 1 }, "-=0.5");
            tl.to("#heroBtn", { opacity: 1, duration: 1 }, "-=0.5");
        });

        // СПОСТЕРЕЖЕННЯ ЗА СКРОЛОМ
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('section').forEach(s => observer.observe(s));

        // --- ЛОГІКА МОБІЛЬНОГО МЕНЮ ---
const menuToggle = document.querySelector('.mobile-toggle');
const menuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-links a');
const body = document.body;

menuToggle.addEventListener('click', () => {
    // Перемикаємо класи
    menuOverlay.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Анімація посилань (GSAP або CSS delay)
    if (menuOverlay.classList.contains('active')) {
        mobileLinks.forEach((link, index) => {
            // Затримка появи кожного пункту
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    } else {
        // Скидаємо стилі при закритті
        mobileLinks.forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(30px)';
        });
    }
});

// Закриваємо меню при кліку на посилання
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        // Скидаємо стилі
        mobileLinks.forEach(l => {
            l.style.opacity = '0';
            l.style.transform = 'translateY(30px)';
        });
    });
});