/**
 * Ellie & Piper - Main JavaScript
 * Handles click-based storybook navigation and page animations
 */

(function() {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mobile breakpoint
    const isMobile = () => window.innerWidth < 768;

    /**
     * Initialize GSAP plugins (for hero effects only now)
     */
    function initGSAP() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
    }

    /**
     * Initialize the click-based storybook navigation
     */
    function initStorybookNavigation() {
        const pages = document.querySelectorAll('.storybook-page');
        const dots = document.querySelectorAll('.storybook-dots .dot');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const currentPageEl = document.getElementById('currentPage');
        const totalPagesEl = document.getElementById('totalPages');
        const progressFill = document.getElementById('progressFill');
        const storybookContent = document.getElementById('storybookContent');

        if (!pages.length || !prevBtn || !nextBtn) return;

        let currentPage = 0;
        const totalPages = pages.length;

        // Set total pages
        if (totalPagesEl) {
            totalPagesEl.textContent = totalPages;
        }

        /**
         * Show specific page
         */
        function showPage(pageIndex) {
            if (pageIndex < 0 || pageIndex >= totalPages) return;

            // Update pages
            pages.forEach((page, index) => {
                if (index === pageIndex) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });

            // Update dots
            dots.forEach((dot, index) => {
                if (index === pageIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            // Update current page number
            currentPage = pageIndex;
            if (currentPageEl) {
                currentPageEl.textContent = currentPage + 1;
            }

            // Update progress bar
            if (progressFill) {
                const progress = ((currentPage + 1) / totalPages) * 100;
                progressFill.style.width = progress + '%';
            }

            // Update button states
            prevBtn.disabled = currentPage === 0;
            nextBtn.disabled = currentPage === totalPages - 1;
        }

        /**
         * Navigate to next/previous page
         */
        function changePage(direction) {
            showPage(currentPage + direction);
        }

        // Button click handlers
        prevBtn.addEventListener('click', () => changePage(-1));
        nextBtn.addEventListener('click', () => changePage(1));

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showPage(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Only respond if storybook is in viewport
            const section = document.getElementById('storybook');
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

            if (inViewport) {
                if (e.key === 'ArrowLeft') {
                    changePage(-1);
                } else if (e.key === 'ArrowRight') {
                    changePage(1);
                }
            }
        });

        // Touch/swipe support
        if (storybookContent) {
            let touchStartX = 0;
            let touchEndX = 0;

            storybookContent.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            storybookContent.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });

            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        changePage(1); // Swipe left = next
                    } else {
                        changePage(-1); // Swipe right = previous
                    }
                }
            }
        }

        // Initialize first page
        showPage(0);
    }

    /**
     * Initialize hero parallax effects
     */
    function initHeroEffects() {
        if (isMobile() || prefersReducedMotion) return;
        if (typeof gsap === 'undefined') return;

        const heroImages = document.querySelectorAll('#hero .parallax-zoom');

        heroImages.forEach((image) => {
            gsap.to(image, {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    }

    /**
     * Initialize philosophy section animations
     */
    function initPhilosophyAnimations() {
        if (prefersReducedMotion) return;
        if (typeof gsap === 'undefined') return;

        const cards = document.querySelectorAll('.group.cursor-pointer');

        cards.forEach((card, index) => {
            gsap.fromTo(card,
                {
                    opacity: 0,
                    y: 40
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }

    /**
     * Handle window resize
     */
    function handleResize() {
        if (typeof ScrollTrigger === 'undefined') return;

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 250);
        });
    }

    /**
     * Initialize everything when DOM is ready
     */
    function init() {
        initGSAP();
        initStorybookNavigation();
        initHeroEffects();
        initPhilosophyAnimations();
        handleResize();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
