/**
 * Stackly - Professional GSAP & ScrollTrigger Animation Engine
 * Comprehensive smooth scrolling, page load reveals, stagger animations,
 * scroll triggers, and interactive hover dynamics across all pages.
 */

(function () {
    'use strict';

    // 1. Accessibility Check: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        console.log('[Stackly GSAP] Prefers-reduced-motion enabled. Respecting user accessibility.');
        return;
    }

    // 2. Helper to load GSAP + ScrollTrigger dynamically if not already present
    function ensureGSAP(callback) {
        if (window.gsap && window.ScrollTrigger) {
            callback();
            return;
        }

        let pending = 0;
        function onScriptLoaded() {
            pending--;
            if (pending <= 0) {
                callback();
            }
        }

        if (!window.gsap) {
            pending++;
            const s1 = document.createElement('script');
            s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
            s1.onload = () => {
                if (!window.ScrollTrigger) {
                    pending++;
                    const s2 = document.createElement('script');
                    s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
                    s2.onload = onScriptLoaded;
                    document.head.appendChild(s2);
                }
                onScriptLoaded();
            };
            document.head.appendChild(s1);
        } else if (!window.ScrollTrigger) {
            pending++;
            const s2 = document.createElement('script');
            s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
            s2.onload = onScriptLoaded;
            document.head.appendChild(s2);
        }
    }

    // 3. Main Animation Initializer
    function initStacklyAnimations() {
        ensureGSAP(() => {
            gsap.registerPlugin(ScrollTrigger);

            const isMobile = window.innerWidth <= 768;

            // ----------------------------------------------------
            // A. GLOBAL HEADER REVEAL ON PAGE LOAD
            // ----------------------------------------------------
            const siteHeader = document.querySelector('header:not(.dashboard-top-bar)');
            if (siteHeader) {
                gsap.from(siteHeader, {
                    y: -25,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    clearProps: 'all'
                });
            }

            // ----------------------------------------------------
            // B. HERO SECTION (HOMEPAGE & INNER PAGES)
            // ----------------------------------------------------
            const hero = document.querySelector('.hero, .page-hero, .error-page');
            if (hero) {
                const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

                const tag = hero.querySelector('.tag, .hero-tag, .page-hero span, .section-tag, .error-code');
                if (tag) {
                    heroTl.from(tag, { y: -15, opacity: 0, duration: 0.6, clearProps: 'all' }, 0.1);
                }

                const h1 = hero.querySelector('h1, .error-title');
                if (h1) {
                    heroTl.from(h1, { y: 30, opacity: 0, duration: 0.85, clearProps: 'all' }, 0.2);
                }

                const heroP = hero.querySelector('p, .error-desc');
                if (heroP) {
                    heroTl.from(heroP, { y: 20, opacity: 0, duration: 0.7, clearProps: 'all' }, 0.35);
                }

                const heroBtns = hero.querySelectorAll('.hero-buttons a, .error-actions a, .btn-primary, .btn-outline');
                if (heroBtns.length > 0) {
                    heroTl.from(heroBtns, { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, clearProps: 'all' }, 0.45);
                }

                const heroStats = hero.querySelectorAll('.hero-stats div, .hero-stats .stat');
                if (heroStats.length > 0) {
                    heroTl.from(heroStats, { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, clearProps: 'all' }, 0.55);
                }

                const floatingCards = hero.querySelectorAll('.floating-card');
                if (floatingCards.length > 0) {
                    heroTl.from(floatingCards, { scale: 0.85, opacity: 0, duration: 0.7, stagger: 0.14, ease: 'back.out(1.4)', clearProps: 'all' }, 0.5);
                }

                const heroImg = hero.querySelector('.hero-image img, .hero-right img');
                if (heroImg) {
                    heroTl.from(heroImg, { scale: 0.94, opacity: 0, duration: 0.9, ease: 'power2.out', clearProps: 'all' }, 0.25);
                }
            }

            // ----------------------------------------------------
            // C. SECTION TITLES & SUBTITLES SCROLLTRIGGER REVEAL
            // ----------------------------------------------------
            const sectionTitles = document.querySelectorAll('.section-title');
            sectionTitles.forEach(title => {
                const tag = title.querySelector('span');
                const h2 = title.querySelector('h2');
                const lead = title.querySelector('.section-lead-text, p');

                const titleTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                        once: true
                    }
                });

                if (tag) {
                    titleTl.from(tag, { opacity: 0, y: -12, duration: 0.5, ease: 'power2.out', clearProps: 'all' });
                }
                if (h2) {
                    titleTl.from(h2, { opacity: 0, y: 25, duration: 0.7, ease: 'power3.out', clearProps: 'all' }, '-=0.3');
                }
                if (lead) {
                    titleTl.from(lead, { opacity: 0, y: 20, duration: 0.65, ease: 'power2.out', clearProps: 'all' }, '-=0.35');
                }
            });

            // ----------------------------------------------------
            // D. TWO-COLUMN SPLIT SECTIONS (ABOUT, COMPANY, STRATEGY)
            // ----------------------------------------------------
            const splitSections = document.querySelectorAll('.about, .about-company, .strategic-advisory, .mission-vision, .contact-wrapper, .service-overview');
            splitSections.forEach(sec => {
                const leftCol = sec.querySelector('.about-image, .service-image, .contact-info, .demo-left');
                const rightCol = sec.querySelector('.about-content, .service-content, .contact-form, .demo-right');

                if (leftCol && rightCol) {
                    const splitTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: sec,
                            start: 'top 82%',
                            toggleActions: 'play none none none',
                            once: true
                        }
                    });

                    if (isMobile) {
                        splitTl.from(leftCol, { opacity: 0, y: 30, duration: 0.7, ease: 'power2.out', clearProps: 'all' });
                        splitTl.from(rightCol, { opacity: 0, y: 30, duration: 0.7, ease: 'power2.out', clearProps: 'all' }, '-=0.4');
                    } else {
                        splitTl.from(leftCol, { opacity: 0, x: -35, duration: 0.85, ease: 'power2.out', clearProps: 'all' });
                        splitTl.from(rightCol, { opacity: 0, x: 35, duration: 0.85, ease: 'power2.out', clearProps: 'all' }, '-=0.6');
                    }
                }
            });

            // ----------------------------------------------------
            // E. CARD GRIDS STAGGER REVEAL
            // ----------------------------------------------------
            const gridConfigs = [
                { selector: '.services-grid', card: '.service-card' },
                { selector: '.price-grid, .pricing-grid', card: '.price-card' },
                { selector: '.blog-grid', card: '.blog-card' },
                { selector: '.insights-grid', card: '.insight-card' },
                { selector: '.about-grid', card: 'div' },
                { selector: '.mv-grid', card: '.mv-card' },
                { selector: '.stats-grid', card: '.stat-card, .counter-box' },
                { selector: '.tech-grid', card: '.tech-card' },
                { selector: '.timeline-wrapper', card: '.timeline-card' },
                { selector: '.channels-grid', card: '.channel-card' },
                { selector: '.process-steps-grid', card: '.contact-step-card' },
                { selector: '.trends-grid', card: '.trend-card' },
                { selector: '.techstack-grid', card: '.techstack-card' },
                { selector: '.engagement-grid', card: '.engagement-card' },
                { selector: '.addons-grid', card: '.addon-card' },
                { selector: '.guarantee-grid', card: '.guarantee-card' },
                { selector: '.advisory-grid', card: '.advisory-card' },
                { selector: '.faq-accordion', card: '.faq-item' },
                { selector: '.brand-slider', card: 'div' },
                { selector: '.dash-stats-grid', card: '.dash-stat-box' },
                { selector: '.dash-grid', card: '.dash-card, .dash-table-card' }
            ];

            gridConfigs.forEach(conf => {
                const containers = document.querySelectorAll(conf.selector);
                containers.forEach(container => {
                    const cards = container.querySelectorAll(conf.card);
                    if (cards.length > 0) {
                        gsap.from(cards, {
                            scrollTrigger: {
                                trigger: container,
                                start: 'top 85%',
                                toggleActions: 'play none none none',
                                once: true
                            },
                            opacity: 0,
                            y: 35,
                            duration: 0.75,
                            stagger: isMobile ? 0.08 : 0.12,
                            ease: 'power2.out',
                            clearProps: 'all'
                        });
                    }
                });
            });

            // ----------------------------------------------------
            // F. CTA BOXES & PROMO BANNERS
            // ----------------------------------------------------
            const ctaBoxes = document.querySelectorAll('.cta-box, .newsletter-box, .advisory-bottom-banner');
            ctaBoxes.forEach(box => {
                gsap.from(box, {
                    scrollTrigger: {
                        trigger: box,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    opacity: 0,
                    y: 30,
                    scale: 0.98,
                    duration: 0.8,
                    ease: 'power2.out',
                    clearProps: 'all'
                });
            });

            // ----------------------------------------------------
            // G. AUTH PAGES ANIMATIONS (LOGIN & SIGNUP)
            // ----------------------------------------------------
            const authSplit = document.querySelector('.auth-split-wrapper');
            if (authSplit) {
                const leftBrand = authSplit.querySelector('.auth-brand-side');
                const rightForm = authSplit.querySelector('.auth-form-side');
                const authTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

                if (leftBrand) {
                    authTl.from(leftBrand, { opacity: 0, x: isMobile ? 0 : -30, duration: 0.8, clearProps: 'all' });
                    const badges = leftBrand.querySelectorAll('.brand-feature-item, .auth-badge');
                    if (badges.length > 0) {
                        authTl.from(badges, { opacity: 0, y: 15, duration: 0.5, stagger: 0.1, clearProps: 'all' }, '-=0.4');
                    }
                }

                if (rightForm) {
                    authTl.from(rightForm, { opacity: 0, y: 25, duration: 0.8, clearProps: 'all' }, '-=0.5');
                    const formInputs = rightForm.querySelectorAll('.auth-input-group, .role-selector-card, .auth-options-row, .auth-submit-btn, .demo-creds-box');
                    if (formInputs.length > 0) {
                        authTl.from(formInputs, { opacity: 0, y: 12, duration: 0.5, stagger: 0.06, clearProps: 'all' }, '-=0.4');
                    }
                }
            }

            // ----------------------------------------------------
            // H. DASHBOARD PAGES ANIMATIONS
            // ----------------------------------------------------
            const dashTopBar = document.querySelector('.dashboard-top-bar');
            if (dashTopBar) {
                gsap.from(dashTopBar, {
                    opacity: 0,
                    y: -20,
                    duration: 0.65,
                    ease: 'power2.out',
                    clearProps: 'all'
                });
            }

            const sidebarNavItems = document.querySelectorAll('.sidebar-menu a');
            if (sidebarNavItems.length > 0) {
                gsap.from(sidebarNavItems, {
                    opacity: 0,
                    x: -15,
                    duration: 0.5,
                    stagger: 0.04,
                    ease: 'power2.out',
                    clearProps: 'all'
                });
            }

            // ----------------------------------------------------
            // I. INTERACTIVE BUTTON & CARD MICRO-INTERACTIONS
            // ----------------------------------------------------
            const interactiveButtons = document.querySelectorAll('.btn-primary, .btn-outline, .auth-submit-btn');
            interactiveButtons.forEach(btn => {
                btn.addEventListener('mouseenter', () => {
                    gsap.to(btn, { scale: 1.03, duration: 0.25, ease: 'power1.out' });
                });
                btn.addEventListener('mouseleave', () => {
                    gsap.to(btn, { scale: 1, duration: 0.25, ease: 'power1.out' });
                });
            });

            // ----------------------------------------------------
            // J. SMOOTH SCROLL ANCHOR NAVIGATION
            // ----------------------------------------------------
            document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const targetId = this.getAttribute('href');
                    if (targetId && targetId !== '#') {
                        const targetEl = document.querySelector(targetId);
                        if (targetEl) {
                            e.preventDefault();
                            const headerOffset = 90;
                            const elementPosition = targetEl.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });

            // ----------------------------------------------------
            // K. REFRESH SCROLLTRIGGER AFTER ASSETS LOAD
            // ----------------------------------------------------
            window.addEventListener('load', () => {
                ScrollTrigger.refresh();
            });
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 600);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStacklyAnimations);
    } else {
        initStacklyAnimations();
    }
})();
