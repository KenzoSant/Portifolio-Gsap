/**
 * ProDev Premium Portfolio
 * GSAP Animations & Interactions
 */

// Wait for DOM to load before initializing anything
document.addEventListener("DOMContentLoaded", () => {

    // ---------------------------------------------------------
    // 0. Mobile Menu Toggle
    // ---------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link, .nav-btn');

    if (menuToggle && navLinks) {
        console.log('Menu toggle and nav links found');
        // Toggle menu on button click
        menuToggle.addEventListener('click', () => {
            console.log('Menu toggle clicked');
            console.log('Before toggle - menuToggle classes:', menuToggle.classList.toString());
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            console.log('After toggle - menuToggle classes:', menuToggle.classList.toString());

            // Add/remove class to navbar for styling
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.classList.toggle('menu-active');
            }

            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';

                // Remove class from navbar
                const navbar = document.querySelector('.navbar');
                if (navbar) {
                    navbar.classList.remove('menu-active');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';

                // Remove class from navbar
                const navbar = document.querySelector('.navbar');
                if (navbar) {
                    navbar.classList.remove('menu-active');
                }
            }
        });
    }


    // ---------------------------------------------------------
    // 1. Core Setup & Registration
    // ---------------------------------------------------------
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Integration lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // ---------------------------------------------------------
    // 2. Custom Cursor
    // ---------------------------------------------------------
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .magnetic-btn, input, textarea');

    let cursorX = gsap.quickTo(cursor, "left", { duration: 0.1, ease: "power3", xPercent: -50, yPercent: -50 });
    let cursorY = gsap.quickTo(cursor, "top", { duration: 0.1, ease: "power3", xPercent: -50, yPercent: -50 });
    let followerX = gsap.quickTo(cursorFollower, "left", { duration: 0.4, ease: "power3", xPercent: -50, yPercent: -50 });
    let followerY = gsap.quickTo(cursorFollower, "top", { duration: 0.4, ease: "power3", xPercent: -50, yPercent: -50 });

    window.addEventListener('mousemove', (e) => {
        cursorX(e.clientX);
        cursorY(e.clientY);
        followerX(e.clientX);
        followerY(e.clientY);
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        link.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // ---------------------------------------------------------
    // 3. Magnetic Button Effect
    // ---------------------------------------------------------
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        let xTo = gsap.quickTo(btn, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
        let yTo = gsap.quickTo(btn, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });

        const btnText = btn.querySelector('.btn-text');
        const btnIcon = btn.querySelector('i');

        let textXTo = btnText ? gsap.quickTo(btnText, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" }) : null;
        let textYTo = btnText ? gsap.quickTo(btnText, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" }) : null;
        let iconTo = btnIcon ? gsap.quickTo(btnIcon, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" }) : null;

        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;

            xTo((relX - rect.width / 2) * 0.4);
            yTo((relY - rect.height / 2) * 0.4);
            if (textXTo) textXTo((relX - rect.width / 2) * 0.2);
            if (textYTo) textYTo((relY - rect.height / 2) * 0.2);
            if (iconTo) iconTo((relX - rect.width / 2) * 0.2);
        });

        btn.addEventListener("mouseleave", () => {
            xTo(0);
            yTo(0);
            if (textXTo) textXTo(0);
            if (textYTo) textYTo(0);
            if (iconTo) iconTo(0);
        });
    });

    // ---------------------------------------------------------
    // 4. Loading Sequence & Hero Animations
    // ---------------------------------------------------------
    const heroTitle = new SplitType('.hero-title', { types: 'lines, chars', lineClass: 'line' });
    const heroDesc = new SplitType('.hero-desc', { types: 'chars' });
    const sectionTitles = new SplitType('.section-title', { types: 'lines, chars', lineClass: 'line' });

    const tlLoader = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = "auto";
        }
    });

    let counterDict = { val: 0 };
    tlLoader.to(counterDict, {
        val: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
            document.querySelector('.counter').innerHTML = Math.round(counterDict.val) + "%";
            document.querySelector('.progress-bar').style.width = Math.round(counterDict.val) + "%";
        }
    })
        .to('.loader-logo', { y: -20, opacity: 0, duration: 0.5, ease: "power2.in" }, "-=0.2")
        .to('.loader-progress', { scaleX: 0, transformOrigin: 'right', duration: 0.5, ease: "power2.inOut" }, "-=0.2")
        .to('.loader-text', { opacity: 0, duration: 0.4 }, "-=0.4")
        .to('.loader-wrapper', { yPercent: -100, duration: 1, ease: "expo.inOut" })
        .fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .fromTo((heroTitle.chars && heroTitle.chars.length) ? heroTitle.chars : '.hero-title',
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.02, duration: 1, ease: "back.out(1.7)" }, "-=0.5")
        .fromTo(heroDesc.chars,
            { opacity: 0 },
            {
                opacity: 1,
                stagger: {
                    each: 0.02,
                    from: "start"
                },
                duration: 0.1,
                ease: "none",
                onComplete: () => heroDesc.revert()
            }, "-=0.6")
        .fromTo('.hero-actions', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .fromTo('.navbar', { yPercent: -100 }, { yPercent: 0, duration: 1, ease: "power3.out" }, "-=1");

    // ---------------------------------------------------------
    // 5. Scroll Animations
    // ---------------------------------------------------------

    ScrollTrigger.create({
        start: 'top -230px',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: '.navbar' }
    });

    document.querySelectorAll('.section').forEach((section, index) => {
        const titleChars = section.querySelectorAll('.section-title .char');
        const subtitle = section.querySelector('.section-subtitle');
        const underline = section.querySelector('.title-underline');

        const tlSection = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        if (subtitle) {
            tlSection.fromTo(subtitle, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
        }
        if (titleChars.length) {
            tlSection.fromTo(titleChars,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.015, duration: 0.8, ease: "back.out(1.5)" }, "<0.2");
        }
        if (underline) {
            tlSection.fromTo(underline, { width: 0 }, { width: 60, duration: 0.6, ease: "power2.out" }, "-=0.4");
        }
    });

    // Services Background Grow & Cards Entrance
    gsap.to('.services-bg-grow', {
        width: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: "#services",
            start: "top 75%",
            end: "top 30%",
            scrub: true
        }
    });

    gsap.fromTo('.service-card-ethos',
        { y: 150, opacity: 0, rotation: 2 },
        {
            y: 0,
            opacity: 1,
            rotation: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: '.services-cards-row',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // ---------------------------------------------------------
    // 6. SKILLS SECTION - PINNED SLIDES (MODIFIED)
    // ---------------------------------------------------------

    function initSkillsSlides() {
        const skillsSection = document.querySelector('#skills');
        const skillsRight = document.querySelector('.skills-right');
        const skillItems = document.querySelectorAll('.skill-item');

        if (!skillsSection || !skillsRight || skillItems.length === 0) return;

        // Create progress indicator
        const progressContainer = document.createElement('div');
        progressContainer.className = 'skills-progress';
        skillItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            dot.setAttribute('data-index', index);
            dot.addEventListener('click', () => {
                const targetY = skillItems[index].getBoundingClientRect().top + window.scrollY;
                lenis.scrollTo(targetY, {
                    duration: 1.2
                });
            });
            progressContainer.appendChild(dot);
        });
        skillsRight.parentElement.appendChild(progressContainer);

        const progressDots = document.querySelectorAll('.progress-dot');

        // Show/Hide progress indicator based on section visibility - Refined trigger
        ScrollTrigger.create({
            trigger: "#skills",
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => progressContainer.classList.add('is-visible'),
            onLeave: () => progressContainer.classList.remove('is-visible'),
            onEnterBack: () => progressContainer.classList.add('is-visible'),
            onLeaveBack: () => progressContainer.classList.remove('is-visible'),
        });

        const progressDotsQuery = document.querySelectorAll('.progress-dot');

        // Update active dot based on scroll position - Fixed nesting bug
        function updateActiveDot() {
            let closestIndex = 0;
            let minDistance = Infinity;

            skillItems.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const center = rect.top + rect.height / 2;
                const distance = Math.abs(window.innerHeight / 2 - center);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });

            progressDotsQuery.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === closestIndex);
                skillItems[idx].classList.toggle('is-active', idx === closestIndex);
            });
        }

        // Animate each skill slide
        skillItems.forEach((item, index) => {
            const icon = item.querySelector('.skill-icon');
            const title = item.querySelector('h3');
            const desc = item.querySelector('p');
            const elements = [icon, title, desc].filter(el => el !== null);

            // Entrance animation for each slide
            gsap.fromTo(item,
                { opacity: 0, y: 100, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "top 20%",
                        toggleActions: "play none none reverse",
                        onEnter: () => {
                            item.classList.add('is-active');
                        },
                        onLeaveBack: () => {
                            item.classList.remove('is-active');
                        }
                    }
                }
            );

            // Animate internal elements with stagger
            if (elements.length) {
                gsap.fromTo(elements,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.15,
                        duration: 0.6,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 75%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

        // Pinning configuration for desktop
        let mm = gsap.matchMedia();
        mm.add("(min-width: 901px)", () => {
            // Pin left column while scrolling through skills
            ScrollTrigger.create({
                trigger: ".skills-container",
                start: "top top",
                end: "bottom bottom",
                pin: ".skills-left",
                pinSpacing: true // 🔥 ESSENCIAL
            });

            // Parallax effect on icons
            skillItems.forEach(item => {
                const icon = item.querySelector('.skill-icon');
                if (icon) {
                    gsap.to(icon, {
                        y: 30,
                        rotation: 5,
                        ease: "none",
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.5
                        }
                    });
                }
            });
        });

        // Mobile effects for tablets and phones
        mm.add("(max-width: 900px)", () => {
            // Stagger animation for skill items on mobile
            gsap.fromTo(skillItems,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: ".skills-container",
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Simple fade-in for left content
            const skillsLeft = document.querySelector('.skills-left');
            if (skillsLeft) {
                gsap.fromTo(skillsLeft,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: skillsLeft,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // Subtle hover effect for mobile (touch)
            skillItems.forEach(item => {
                item.addEventListener('touchstart', () => {
                    gsap.to(item, {
                        scale: 1.02,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                });

                item.addEventListener('touchend', () => {
                    gsap.to(item, {
                        scale: 1,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                });
            });
        });

        // Update dots on scroll
        lenis.on('scroll', () => {
            updateActiveDot();
        });

    }

    // Initialize skills slides
    initSkillsSlides();

    // ---------------------------------------------------------
    // 7. SKILL CARDS - Efeito 3D Tilt (Carta de Baralho) + Glow
    // ---------------------------------------------------------
    const skillCards = document.querySelectorAll('.skill-item');

    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();

            // Atualiza posição do spotlight via CSS custom properties
            const pctX = ((e.clientX - rect.left) / rect.width) * 100;
            const pctY = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${pctX}%`);
            card.style.setProperty('--mouse-y', `${pctY}%`);
        });

        card.addEventListener('mouseleave', () => {
            // Reseta o spotlight para o centro
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });

    // Projects Image Parallax & Reveal
    const projects = document.querySelectorAll('.project-item');
    projects.forEach(project => {
        const imgContainer = project.querySelector('.project-image');
        const img = project.querySelector('.project-image img');
        const contentElems = project.querySelectorAll('.project-content > *');

        if (imgContainer) {
            gsap.fromTo(imgContainer,
                { clipPath: 'inset(0 100% 0 0)' },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 1.5,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: project,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        if (img) {
            // Zoom-out Reveal
            gsap.fromTo(img,
                { scale: 1.3 },
                {
                    scale: 1,
                    duration: 2,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: project,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Per-scroll Parallax
            gsap.to(img, {
                y: "10%",
                ease: "none",
                scrollTrigger: {
                    trigger: project,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        if (contentElems.length) {
            gsap.fromTo(contentElems,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: project,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });

    // About Section Animation & Counter
    gsap.fromTo('.about-grid .about-desc',
        { y: 30, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.about-grid',
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter-num');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2;

        ScrollTrigger.create({
            trigger: counter,
            start: "top 85%",
            once: true,
            onEnter: () => {
                let current = { val: 0 };
                gsap.to(current, {
                    val: target,
                    duration: duration,
                    ease: "power2.out",
                    onUpdate: function () {
                        counter.innerHTML = Math.round(current.val);
                    }
                });
            }
        });
    });

    // Floating Badge Animation
    gsap.to('.floating-badge', {
        y: -15,
        rotation: 2,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });

    // About Images Parallax
    gsap.to('.img-back', {
        y: -30,
        ease: "none",
        scrollTrigger: {
            trigger: '.about-visual',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Contact Form Reveal
    gsap.fromTo('.contact-info > *',
        { x: -50, opacity: 0 },
        {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.contact-wrapper',
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        }
    );

    gsap.fromTo('.input-group, .submit-btn',
        { y: 30, opacity: 0, rotationX: -15 },
        {
            y: 0,
            opacity: 1,
            rotationX: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
                trigger: '.contact-form',
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                lenis.scrollTo(targetElement, {
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            lenis.scrollTo(0, { duration: 1.5, ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        });
    }

    ScrollTrigger.refresh();
});

/// ================= EMAILJS =================
emailjs.init("6ieuhHqd1xQ9ojY2q");

const form = document.getElementById("contactForm");
const notification = document.getElementById("successNotification");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        time: new Date().toLocaleString(),
        to_name: "Kenzo Santos"
    };

    emailjs.send("service_l4jftwt", "template_zy7nmkk", data)
        .then(() => {

            notification.style.display = "block";

            gsap.fromTo(notification,
                { y: -40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4 }
            );

            setTimeout(() => {
                gsap.to(notification, {
                    y: -40,
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => notification.style.display = "none"
                });
            }, 3000);

            form.reset();

        })
        .catch((err) => {
            console.error(err);
            alert("Erro ao enviar email");
        });
});

