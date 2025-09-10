const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Register GSAP ScrollTrigger plug-in 
gsap.registerPlugin(ScrollTrigger);


hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href.startsWith('#')) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navbarHeight = 80;
            const targetPosition = target.offsetTop - navbarHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// Scroll indicator 
gsap.to('.scroll-indicator', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    }
});

// Hero section animations 
const heroTl = gsap.timeline();

// Setting up the sequence of animations in hero section
heroTl
    .to('.hero h1', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
    .to('.product-image', { opacity: 1, scale: 1, rotation: 360, duration: 1.2, ease: 'back.out(1.7)' }, '-=0.6')
    .to('.cta-button', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.6')
    .to('.tagline', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.8');

// Small floating animation for product image
gsap.to('.product-image', {
    y: 35,
    duration: 2.6,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
});

// Added scroll-triggered rotation
gsap.to('.product-image', {
    rotation: 250,
    ease: 'power1.inOut',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// Features section animation 
gsap.fromTo('.feature-card',
    {
        rotationY: -90,
        opacity: 0,
        transformPerspective: 800
    },
    {
        rotationY: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)',
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 85%',
            toggleActions: 'play reverse play reverse'
        }
    }
);

// Gallery section animation 
gsap.fromTo('.gallery-item',
    {
        opacity: 0,
        scale: 0.5,
        y: 50
    },
    {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.6)',
        scrollTrigger: {
            trigger: '.gallery',
            start: 'top 85%',
            toggleActions: 'play reverse play reverse'
        }
    }
);

// Hover animations for gallery items using GSAP
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Reviews section animation 
gsap.to('.review-card', {
    opacity: 1,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.reviews',
        start: 'top 70%',
        toggleActions: 'play reverse play reverse'
    }
});

// Pricing section animation 
gsap.fromTo('.pricing-card',
    {
        opacity: 0,
        scale: 0.9,
        y: 60,
        filter: 'blur(8px) brightness(1.5)'
    },
    {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px) brightness(1)',
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.pricing',
            start: 'top 60%',
            toggleActions: 'play reverse play reverse'
        }
    }
);

// Contact section animation 
gsap.fromTo('.contact',
    {
        opacity: 0,
        x: 100
    },
    {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 85%',
            toggleActions: 'play reverse play reverse'
        }
    }
);

// Section titles animations 
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.fromTo(title,
        { y: 30, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 90%',
                toggleActions: 'play reverse play reverse'
            }
        });
});

// Typewriter effect 
(function typeWriter() {
    const element = document.getElementById('typewriter');
    const messages = [
        'The ultimate audio accessory',
        'Hear every note with clarity',
        'No wires to hold you back',
        'Just music to move you forward',
        'Amplify the sound of your peace'
    ];

    let index = 0;
    let char = 0;
    let forward = true;
    let delayAfter = 1100;

    function step() {
        const msg = messages[index];
        if (forward) {
            char++;
            element.textContent = msg.slice(0, char);
            if (char === msg.length) {
                forward = false;
                setTimeout(step, delayAfter);
                return;
            }
        } else {
            char--;
            element.textContent = msg.slice(0, char);
            if (char === 0) {
                forward = true;
                index = (index + 1) % messages.length;
            }
        }
        setTimeout(step, forward ? 38 : 22);
    }
    step();
})();

// Reviews infinite horizontal animation 
(function duplicateReviewsForLoop() {
    const inner = document.getElementById('reviewsInner');
    setTimeout(() => {
        // Ensuring content duplicates enough to allow translateX(-50%) loop
        const items = Array.from(inner.querySelectorAll('.review-card'));
        if (!items.length) return;

        // Clear any existing duplicates first
        while (inner.children.length > items.length) {
            inner.removeChild(inner.lastChild);
        }

        const trackWidth = inner.parentElement.offsetWidth;
        const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(inner).gap || 16);
        const itemsNeeded = Math.ceil(trackWidth / itemWidth) * 2;

        while (inner.children.length < itemsNeeded) {
            items.forEach(node => inner.appendChild(node.cloneNode(true)));

            if (inner.children.length > 50) break;
        }
    }, 500);
})();

// Pause animation on hover
document.querySelector('.reviews-track').addEventListener('mouseenter', () => {
    gsap.to('.reviews-inner', { animationPlayState: 'paused' });
});

document.querySelector('.reviews-track').addEventListener('mouseleave', () => {
    gsap.to('.reviews-inner', { animationPlayState: 'running' });
});

// Navbar active state 
(function navActiveOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksArr = document.querySelectorAll('.nav-links a');

    // Helper to remove active
    function clearActive() { navLinksArr.forEach(el => el.classList.remove('active')); }

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                clearActive();
                const link = document.querySelector('.nav-links a[data-target="' + id + '"]');
                if (link) {
                    link.classList.add('active');

                    history.replaceState(null, null, '#' + id);
                }
            }
        });
    }, observerOptions);

    sections.forEach(s => observer.observe(s));
})();

// Responsive Adjustments 
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {

        duplicateReviewsForLoop();
    }, 250);
});