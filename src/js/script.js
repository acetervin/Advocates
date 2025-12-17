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

    initializePage();
});