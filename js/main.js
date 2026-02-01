/**
 * Ellie & Piper - Main JavaScript
 * Handles scroll-triggered storybook animation using GSAP ScrollTrigger
 */

(function() {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mobile breakpoint
    const isMobile = () => window.innerWidth < 768;

    /**
     * Initialize GSAP plugins
     */
    function initGSAP() {
        gsap.registerPlugin(ScrollTrigger);
    }

    /**
     * Initialize the horizontal scroll storybook animation
     */
    function initStorybookAnimation() {
        // Skip horizontal scroll on mobile or if user prefers reduced motion
        if (isMobile() || prefersReducedMotion) {
            initMobileStorybook();
            return;
        }

        const section = document.querySelector('.storybook-section');
        const container = document.querySelector('.storybook-container');
        const track = document.querySelector('.storybook-track');
        const scenes = document.querySelectorAll('.storybook-scene');
        const dots = document.querySelectorAll('.progress-dot');

        if (!section || !track || scenes.length === 0) return;

        // Calculate the total scroll distance
        const totalScenes = scenes.length;
        const scrollDistance = track.scrollWidth - window.innerWidth;

        // Create the horizontal scroll animation
        const scrollTween = gsap.to(track, {
            x: -scrollDistance,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => `+=${scrollDistance}`,
                scrub: 1,
                pin: container,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    updateActiveScene(self.progress, scenes, dots);
                }
            }
        });

        // Add parallax effect to scene images
        scenes.forEach((scene, index) => {
            const image = scene.querySelector('.scene-image');
            if (image) {
                gsap.to(image, {
                    x: -50,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: () => `+=${scrollDistance}`,
                        scrub: 1
                    }
                });
            }
        });

        // Handle dot clicks for navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const targetProgress = index / (totalScenes - 1);
                const targetScroll = section.offsetTop + (scrollDistance * targetProgress);

                gsap.to(window, {
                    scrollTo: { y: targetScroll, autoKill: false },
                    duration: 1,
                    ease: 'power2.inOut'
                });
            });
        });
    }

    /**
     * Update active scene based on scroll progress
     */
    function updateActiveScene(progress, scenes, dots) {
        const totalScenes = scenes.length;
        const sceneIndex = Math.min(
            Math.floor(progress * totalScenes),
            totalScenes - 1
        );

        scenes.forEach((scene, index) => {
            if (index === sceneIndex) {
                scene.classList.add('active');
            } else {
                scene.classList.remove('active');
            }
        });

        dots.forEach((dot, index) => {
            if (index === sceneIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    /**
     * Initialize mobile storybook (fade-in on scroll)
     */
    function initMobileStorybook() {
        const scenes = document.querySelectorAll('.storybook-scene');

        if (prefersReducedMotion) {
            // Just show all scenes without animation
            scenes.forEach(scene => scene.classList.add('active'));
            return;
        }

        // Fade in scenes as they enter viewport
        scenes.forEach((scene) => {
            gsap.fromTo(scene,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: scene,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }

    /**
     * Initialize hero parallax effects
     */
    function initHeroEffects() {
        if (isMobile() || prefersReducedMotion) return;

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
        initStorybookAnimation();
        initHeroEffects();
        initPhilosophyAnimations();
        handleResize();

        // Set first scene as active on load
        const firstScene = document.querySelector('.storybook-scene');
        if (firstScene) {
            firstScene.classList.add('active');
        }
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
