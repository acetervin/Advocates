// script.js

document.addEventListener('DOMContentLoaded', function() {
    
    const loadComponents = async () => {
        const fetchAndInsert = async (url, placeholderId) => {
            try {
                const response = await fetch(url);
                const data = await response.text();
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = data;
                }
            } catch (error) {
                console.error('Error loading component:', error);
            }
        };

        await Promise.all([
            fetchAndInsert('includes/_top-bar.html', 'top-bar-placeholder'),
            fetchAndInsert('includes/_navbar.html', 'navbar-placeholder'),
            fetchAndInsert('includes/_footer.html', 'footer-placeholder')
        ]);
    };

    const initializePage = async () => {
        await loadComponents();
        initializeNavigation();
        AOS.init();
        initStatCounters();
        initHeroCarousel();
    };

    function initializeNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const closeMenuBtn = document.getElementById('closeMenuBtn');
        const navMenu = document.getElementById('navMenu');
        const navOverlay = document.getElementById('navOverlay');
        const navLinks = document.querySelectorAll('.nav-menu a.nav-link');

        // 1. Highlight Active Link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // 2. Sticky Navbar Effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // 3. Mobile Menu Toggle Logic
        const toggleMenu = (isActive) => {
            if (isActive) {
                navMenu.classList.add('active');
                navOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling background
            } else {
                navMenu.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        // Open
        if (hamburger) {
            hamburger.addEventListener('click', () => toggleMenu(true));
        }

        // Close (X button)
        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', () => toggleMenu(false));
        }

        // Close (Clicking Overlay)
        if (navOverlay) {
            navOverlay.addEventListener('click', () => toggleMenu(false));
        }

        // Close (Escape Key)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
                toggleMenu(false);
            }
        });

        // Mobile Dropdown Handling (Optional: Click to toggle submenus on mobile)
        const dropdowns = document.querySelectorAll('.dropdown > .nav-link');
        dropdowns.forEach(drop => {
            drop.addEventListener('click', (e) => {
                // Only prevent default on mobile sizes
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    const submenu = drop.nextElementSibling;
                    if (submenu) {
                        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                    }
                }
            });
        });
    }

    // --- New Testimonial Carousel Logic ---
    const testimonials = [
        {
            quote: "Romlaw Advocates provided exceptional legal guidance for our corporate acquisition. Their attention to detail and strategic approach made the entire process smooth and stress-free. Highly recommended!",
            author: "Sarah Mwangi",
            title: "CEO, Tech Solutions Kenya",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            stars: 5
        },
        {
            quote: "When we faced a significant property dispute, Romlaw's expertise in real estate law was invaluable. They negotiated favorable terms and resolved our concerns efficiently. Outstanding service!",
            author: "James Kipchoge",
            title: "Property Developer",
            avatar: "https://randomuser.me/api/portraits/men/41.jpg",
            stars: 5
        },
        {
            quote: "Their tax and financial advisory services have been crucial for our business growth. The team's knowledge of Kenyan tax law is comprehensive, and they always find innovative solutions.",
            author: "Amina Hassan",
            title: "Founder, Hassan Imports Ltd",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            stars: 5
        },
        {
            quote: "Romlaw Advocates handled my intellectual property matters with precision and care. They successfully registered my trademarks and protected my brand from infringement.",
            author: "David Okeyo",
            title: "Business Owner & Innovator",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            stars: 5
        },
        {
            quote: "The team at Romlaw is not only highly skilled but also incredibly supportive. They guided me through a difficult family law matter with compassion and professionalism.",
            author: "Jane Muthoni",
            title: "Private Client",
            avatar: "https://randomuser.me/api/portraits/women/31.jpg",
            stars: 4
        }
    ];

    let currentTestimonial = 0;
    let testimonialInterval;

    function renderTestimonials() {
        const slider = document.querySelector('.testimonial-slider-container');
        const dotsContainer = document.querySelector('.testimonial-dots');
        if (!slider || !dotsContainer) return;

        slider.innerHTML = '';
        dotsContainer.innerHTML = '';

        testimonials.forEach((t, i) => {
            const card = document.createElement('div');
            card.classList.add('testimonial-card');
            
            let stars = '';
            for(let j = 0; j < 5; j++) {
                stars += `<i class="fas fa-star ${j < t.stars ? '' : 'far'}"></i>`;
            }

            card.innerHTML = `
                <img src="${t.avatar}" alt="${t.author}" class="testimonial-avatar">
                <div class="testimonial-author">
                    <h4>${t.author}</h4>
                    <p>${t.title}</p>
                </div>
                <div class="testimonial-stars">${stars}</div>
                <p class="testimonial-text">“${t.quote}”</p>
            `;
            slider.appendChild(card);

            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            dot.addEventListener('click', () => {
                currentTestimonial = i;
                showTestimonial();
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        showTestimonial();
        startInterval();
    }

    function showTestimonial() {
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.testimonial-dot');
        const numCards = cards.length;

        cards.forEach((card, i) => {
            const offset = i - currentTestimonial;
            let transform = '';
            let opacity = 0.5;
            let zIndex = 1;

            if (offset === 0) {
                // Active card
                transform = 'translateX(0) scale(1)';
                opacity = 1;
                zIndex = 10;
            } else if (offset === 1 || (currentTestimonial === numCards - 1 && i === 0)) {
                // Right card
                transform = 'translateX(100%) scale(0.8)';
            } else if (offset === -1 || (currentTestimonial === 0 && i === numCards - 1)) {
                // Left card
                transform = 'translateX(-100%) scale(0.8)';
            } else {
                // Hidden cards
                transform = `translateX(${offset * 100}%) scale(0.8)`;
                opacity = 0;
            }
            
            card.style.transform = transform;
            card.style.opacity = opacity;
            card.style.zIndex = zIndex;

            card.classList.remove('active');
            if(offset === 0) {
                card.classList.add('active');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentTestimonial);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial();
    }

    function startInterval() {
        testimonialInterval = setInterval(nextTestimonial, 5000); // Change every 5 seconds
    }

    function resetInterval() {
        clearInterval(testimonialInterval);
        startInterval();
    }

    renderTestimonials();

    // --- Hero Image Carousel ---
    function initHeroCarousel() {
        const carousel = document.querySelector('.hero-carousel');
        if (!carousel) return;

        const slidesContainer = carousel.querySelector('.hero-slides');
        let slides = Array.from(carousel.querySelectorAll('.hero-slide'));
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        let index = 0;
        let timer = null;
        const interval = 6000;

        // Create clones for seamless infinite loop
        if (slides.length > 1) {
            const firstClone = slides[0].cloneNode(true);
            const lastClone = slides[slides.length - 1].cloneNode(true);
            slidesContainer.appendChild(firstClone);
            slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);
            slides = Array.from(slidesContainer.querySelectorAll('.hero-slide'));
            // Start at the first real slide (index 1 because of prepended clone)
            index = 1;
            slidesContainer.style.transform = `translateX(${ -index * 100 }%)`;
        }

        // Build (hidden) dots for accessibility if needed
        slides.forEach((s, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => {
                // map clicked dot to real-slide index (if clones exist)
                const realIndex = slides.length > 2 ? i : i; // kept simple; dots are hidden
                goTo(realIndex);
                resetTimer();
            });
            dotsContainer.appendChild(dot);
        });

        // Helper to enable/disable transition for jump
        function setTransition(enabled) {
            slidesContainer.style.transition = enabled ? 'transform 0.7s cubic-bezier(.22,.9,.32,1)' : 'none';
        }

        function update() {
            slidesContainer.style.transform = `translateX(${ -index * 100 }%)`;
            // Active class for scale/opacity effect
            slides.forEach((s, i) => s.classList.toggle('active', i === index));
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((d, i) => d.classList.toggle('active', i === index));
        }

        function next() { index = index + 1; setTransition(true); update(); }
        function prev() { index = index - 1; setTransition(true); update(); }
        function goTo(i) { index = i; setTransition(true); update(); }

        function startTimer() { timer = setInterval(() => next(), interval); }
        function stopTimer() { if (timer) clearInterval(timer); }
        function resetTimer() { stopTimer(); startTimer(); }

        // When transition ends, if we're on a clone, jump to the real slide without transition
        slidesContainer.addEventListener('transitionend', () => {
            // If clone at end
            if (index === slides.length - 1) {
                // jump to first real slide
                setTransition(false);
                index = 1;
                update();
            }
            // If clone at start
            if (index === 0) {
                setTransition(false);
                index = slides.length - 2;
                update();
            }
        });

        if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetTimer(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetTimer(); });

        carousel.addEventListener('mouseenter', stopTimer);
        carousel.addEventListener('mouseleave', startTimer);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { prev(); resetTimer(); }
            if (e.key === 'ArrowRight') { next(); resetTimer(); }
        });

        // Initial styling setup
        setTransition(false);
        update();
        // allow paint then enable timer
        requestAnimationFrame(() => requestAnimationFrame(() => startTimer()));
    }

    // --- Video Modal Logic ---
    const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Example video

    window.openVideo = function() {
        const modal = document.createElement('div');
        modal.classList.add('video-modal-overlay');
        modal.innerHTML = `
            <div class="video-modal-content">
                <span class="video-modal-close" onclick="closeVideo()">&times;</span>
                <div class="video-aspect">
                    <iframe src="${videoUrl}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Close on escape key
        document.addEventListener('keydown', handleVideoEsc);
    }

    window.closeVideo = function() {
        const modal = document.querySelector('.video-modal-overlay');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleVideoEsc);
        }
    }
    
    function handleVideoEsc(e) {
        if (e.key === 'Escape') {
            closeVideo();
        }
    }

    /* --- Stats counter (animate numbers when scrolled into view) --- */
    function initStatCounters() {
        const statsSections = document.querySelectorAll('.stats-section');
        if (!statsSections.length) return;

        const animateNumber = (el, endValue, prefix = '', suffix = '', decimals = 0, duration = 1400) => {
            const start = performance.now();
            const startValue = 0;

            const tick = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = progress; // linear - can replace with easing if desired
                const current = startValue + (endValue - startValue) * eased;
                const formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
                el.textContent = prefix + formatted + suffix;
                if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const section = entry.target;
                const targets = section.querySelectorAll('h3, .stat-number');
                targets.forEach(node => {
                    const text = node.textContent.trim();
                    // parse prefix, numeric part, suffix
                    const m = text.match(/^([^0-9\-\.]*)?([0-9,.]+)?(.*)$/);
                    if (!m) return;
                    const prefix = m[1] || '';
                    const numStr = (m[2] || '').replace(/,/g, '');
                    const suffix = m[3] || '';
                    if (!numStr) return;
                    const isFloat = numStr.indexOf('.') !== -1;
                    const endVal = parseFloat(numStr);
                    const decimals = isFloat ? (numStr.split('.')[1] || '').length : 0;
                    // prevent re-animating
                    if (node.dataset.animated === 'true') return;
                    node.dataset.animated = 'true';
                    animateNumber(node, endVal, prefix, suffix, decimals);
                });
                obs.unobserve(section);
            });
        }, { threshold: 0.4 });

        statsSections.forEach(s => observer.observe(s));
    }

    initializePage();
});