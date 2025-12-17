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
        
        // --- Testimonials (Existing code) ---
        showTestimonial(0);
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

    // --- Existing Testimonial Logic ---
    let currentTestimonial = 0;
    function showTestimonial(index) {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (testimonials.length === 0) return;
        
        if (index >= testimonials.length) currentTestimonial = 0;
        else if (index < 0) currentTestimonial = testimonials.length - 1;
        else currentTestimonial = index;
        
        testimonials.forEach(card => card.classList.remove('active'));
        testimonials[currentTestimonial].classList.add('active');
    }

    window.changeTestimonial = function(direction) {
        showTestimonial(currentTestimonial + direction);
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

    initializePage();
});