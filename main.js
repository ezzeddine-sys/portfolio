// ============================================
// Main JavaScript - Interactions & Animations
// ============================================

(function () {
    'use strict';

    // ===== DOM Ready =====
    document.addEventListener('DOMContentLoaded', function () {
        initNavbar();
        initTypewriter();
        initScrollReveal();
        initSkillBars();
        initStatsCounter();
        initBackToTop();
        initContactForm();
        initSmoothScroll();
        initMobileNav();
    });

    // ===== Sticky Navbar with Blur =====
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide navbar on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ===== Mobile Navigation =====
    function initMobileNav() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close mobile nav on link click
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ===== Typewriter Effect =====
    function initTypewriter() {
        const roles = [
            'SOC Analyst',
            'Threat Hunter',
            'Incident Responder',
            'Digital Forensics',
            'Vulnerability Researcher',
            'Malware Analyst'
        ];

        const el = document.getElementById('typewriter');
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;
        let deletingSpeed = 40;
        let pauseBeforeDelete = 2000;
        let pauseBeforeType = 500;

        function type() {
            const currentRole = roles[roleIndex];

            if (!isDeleting) {
                // Typing
                el.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    setTimeout(type, pauseBeforeDelete);
                    return;
                }

                setTimeout(type, typingSpeed);
            } else {
                // Deleting
                el.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(type, pauseBeforeType);
                    return;
                }

                setTimeout(type, deletingSpeed);
            }
        }

        // Start after a slight delay
        setTimeout(type, 1500);
    }

    // ===== Scroll-Triggered Reveal Animations =====
    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Animate skill bars when skills section is visible
                    if (entry.target.id === 'skills' || entry.target.closest('#skills')) {
                        animateSkillBars();
                    }
                }
            });
        }, observerOptions);

        // Observe all revealable elements
        document.querySelectorAll('.reveal').forEach(function (el) {
            observer.observe(el);
        });

        // Observe section titles
        document.querySelectorAll('.section-title').forEach(function (el) {
            el.classList.add('reveal');
            observer.observe(el);
        });

        // Observe cards with delay
        document.querySelectorAll('.project-card, .blog-card, .cert-card, .skill-card, .hex-item').forEach(function (el) {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    // ===== Animated Skill Bars =====
    function initSkillBars() {
        // Bars will animate when scrolled into view
    }

    function animateSkillBars() {
        document.querySelectorAll('.skill-progress').forEach(function (bar) {
            const targetWidth = bar.getAttribute('data-width');
            if (bar.style.width !== targetWidth) {
                bar.style.width = targetWidth;
            }
        });
    }

    // ===== Stats Counter Animation =====
    function initStatsCounter() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        let animated = false;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    counters.forEach(function (counter) {
                        const target = parseInt(counter.getAttribute('data-count'), 10);
                        const suffix = counter.getAttribute('data-suffix') || '';
                        let current = 0;
                        const increment = target / 40;
                        const duration = 2000;
                        const stepTime = duration / 40;

                        function updateCount() {
                            current += increment;
                            if (current < target) {
                                counter.textContent = Math.floor(current);
                                setTimeout(updateCount, stepTime);
                            } else {
                                counter.textContent = target;
                                // Re-add suffix after animation
                                const suffixEl = counter.nextElementSibling;
                                if (suffixEl && suffixEl.classList.contains('stat-suffix')) {
                                    suffixEl.textContent = suffix;
                                }
                            }
                        }

                        updateCount();
                    });
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.querySelector('.hero-stats'));
        document.querySelectorAll('.stat').forEach(function (stat) {
            observer.observe(stat);
        });
    }

    // ===== Back to Top Button =====
    function initBackToTop() {
        const btn = document.getElementById('backToTop');

        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== Contact Form =====
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            // Simulate form submission
            setTimeout(function () {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.style.background = 'var(--accent-green)';
                btn.style.boxShadow = 'var(--glow-green)';

                setTimeout(function () {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    btn.style.boxShadow = '';
                    form.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ===== Smooth Scroll for Anchor Links =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== Active Nav Link on Scroll =====
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        let current = '';

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', function () {
        updateActiveNav();
    }, { passive: true });

    // ===== Parallax Effect for Hero =====
    window.addEventListener('scroll', function () {
        const hero = document.getElementById('hero');
        const scrollPosition = window.pageYOffset;
        if (scrollPosition < window.innerHeight) {
            hero.style.transform = 'translateY(' + scrollPosition * 0.3 + 'px)';
        }
    }, { passive: true });

})();