// Navigation Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // observer.unobserve(entry.target); // Uncomment to animate only once
        }
    });
};

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
// Future enhancement: Add sidebar menu logic if needed

// Dynamic Portfolio Modal Logic
const modal = document.getElementById('project-modal');
const modalBackdrop = document.querySelector('.modal-backdrop');
const closeModalBtn = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalGallery = document.getElementById('modal-gallery');

const portfolioItems = document.querySelectorAll('.portfolio-item');

// Project Data
const projectData = {
    'anatomy': {
        title: 'VR Human Anatomy Experience',
        desc: 'Unreal Engine real-time project. Modular 3D environment focusing on real-time lighting and optimized scene performance. Modular organ assets with clean topology using Maya/ZBrush, textured in Substance 3D Painter.',
        images: [
            'images/vrHospital.png',
            'images/vrHospital2.png',
            'images/VrHospital3.png',
            'images/VrHospital4.png',
            'images/model1.png',
            'images/model2.png',
            'images/model3.png'
        ]
    },
    'modular-env': {
        title: 'Environment Design',
        desc: 'Academic Project.environment assets created in Maya and 3ds Max. Textured with optimized PBR materials in Substance 3D Painter and assembled/lit inside Unreal Engine.',
        images: [
            'images/enviroment/Japanese eno1.jpg',
            'images/enviroment/Japanese eno2.jpg',
            'images/enviroment/Japanese eno3.jpg',
            'images/enviroment/Japanese eno4.jpg',
            'images/enviroment/convo0538.png',
            'images/enviroment/convo1060.png',
            'images/enviroment/convo1429.png'

        ]
    },
    'costume-design': {
        title: 'Costume Design',
        desc: 'Academic Project focusing on realistic garments designed in Marvelous Designer and seamlessly integrated as optimized cloth assets in Unreal Engine.',
        images: [
            'images/characters/japanese_cloth1.jpg',
            'images/characters/japanese_cloth2.jpg',
            'images/characters/japanese_cloth Wire.jpg',
            'images/characters/armor.jpg',
            'images/characters/armor long.jpg',
            'images/characters/armor wire.jpg'

        ]
    },
    'hard-surface': {
        title: 'Hard Surface Models',
        desc: 'A collection of complex hard surface models created using ZBrush and Maya, emphasizing detailed topology and mechanical precision.',
        images: [
            'images/scifi/Scifi- Drone.png',
            'images/scifi/drone close.jpeg',
            'images/scifi/sci-fi drone wire close.jpg',
            'images/scifi/Scifi- DroneWire.jpg',
            'images/HardSurfaces/strawHat.jpg',
            'images/HardSurfaces/strawHatColor.jpg',
            'images/HardSurfaces/strawHatColorClose.jpg',
            'images/HardSurfaces/strawHatWire.jpg',
            'images/HardSurfaces/strawHatWireL.jpg',
            'images/HardSurfaces/sketeboard3.jpg',
            'images/HardSurfaces/sketeboard4.jpg',
            'images/HardSurfaces/sketeboardwire.jpg',
            'images/HardSurfaces/sketeboardwire2.jpg'

        ]
    },
    'character-showcase': {
        title: 'Character Showcase',
        desc: 'Detailed 3D character models focused on anatomical accuracy, high-poly sculpting, and expressive posing.',
        images: [
            'images/characters/predator color.png',
            'images/characters/prewire close.png',
            'images/characters/predator.png',
            'images/characters/prewire.png'


        ]
    },
    'Enviroment Showcase': {
        title: 'Enviroment Showcase',
        desc: 'Academic Project.environment assets created in Maya and 3ds Max. Textured with optimized PBR materials in Substance 3D Painter and assembled/lit inside Unreal Engine.',
        images: [
            'images/F1 enviroment/drift.0004.png',
            'images/F1 enviroment/PitTrack.1222.png',
            'images/F1 enviroment/RaceTrack.0358.png',
            'images/F1 enviroment/RaceTrack.0645.png',
            'images/F1 enviroment/RaceTrack.0898.png',
            'images/F1 enviroment/ShutterOut.0147.png'


        ]
    },
    'modular-environment': {
        title: 'Modular Environment',
        desc: 'A showcase of modular environment pieces designed for seamless grid-snapping and optimized rendering in game engines.',
        images: [
            // Placeholder images, update with your own paths
            'images/space1.png',
            'images/space2.png',
            'images/space3.png',
            'images/space4.png',
            'images/space5.png',
            'images/space6.png'

        ]
    }
};

const openModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    // Clear previous images
    modalGallery.innerHTML = '';

    // Inject new images
    data.images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = data.title + " view";
        img.loading = "lazy";
        modalGallery.appendChild(img);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
};

const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
};

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const projectId = item.getAttribute('data-project');
        openModal(projectId);
    });
});

closeModalBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});


// --- Gradual Blur Effect ---
function createGradualBlur(position, height, zIndex = 1000) {
    const container = document.createElement('div');
    container.className = `gradual-blur gradual-blur-fixed gradual-blur-${position}`;

    // Style container
    Object.assign(container.style, {
        position: 'fixed',
        left: '0',
        right: '0',
        height: height,
        pointerEvents: 'none',
        zIndex: zIndex,
    });

    if (position === 'top') {
        container.style.top = '0';
    } else {
        container.style.bottom = '0';
    }

    const inner = document.createElement('div');
    inner.className = 'gradual-blur-inner';
    container.appendChild(inner);

    const divCount = 5;
    const strength = 2; // from preset
    const increment = 100 / divCount;
    const direction = position === 'top' ? 'to bottom' : 'to top';

    for (let i = 1; i <= divCount; i++) {
        const progress = i / divCount;

        // Non-exponential formula: blurValue = 0.0625 * (progress * divCount + 1) * strength
        const blurValue = 0.0625 * ((progress * divCount) + 1) * strength;

        const p1 = Math.round((increment * i - increment) * 10) / 10;
        const p2 = Math.round(increment * i * 10) / 10;
        const p3 = Math.round((increment * i + increment) * 10) / 10;
        const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

        let gradient = `transparent ${p1}%, black ${p2}%`;
        if (p3 <= 100) gradient += `, black ${p3}%`;
        if (p4 <= 100) gradient += `, transparent ${p4}%`;

        const div = document.createElement('div');
        Object.assign(div.style, {
            position: 'absolute',
            inset: '0',
            maskImage: `linear-gradient(${direction}, ${gradient})`,
            webkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
            backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            webkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            opacity: 1
        });

        inner.appendChild(div);
    }

    document.body.appendChild(container);
}

// Initialize Gradual Blurs on Load
document.addEventListener('DOMContentLoaded', () => {
    // Add top blur behind navbar (zIndex 990 keeps it behind the navbar's 1000)
    createGradualBlur('top', '8rem', 990);
    // Add bottom blur
    createGradualBlur('bottom', '8rem', 990);

    // --- Blur Visibility Logic ---
    const topBlur = document.querySelector('.gradual-blur-top');
    const bottomBlur = document.querySelector('.gradual-blur-bottom');

    const handleBlurVisibility = () => {
        // Hide top blur if at the very top of the page
        if (window.scrollY <= 10) {
            if (topBlur) topBlur.style.opacity = '0';
        } else {
            if (topBlur) topBlur.style.opacity = '1';
        }

        // Hide bottom blur if at the very bottom of the page
        const scrollPosition = window.scrollY + window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;

        // 10px buffer for mobile/sub-pixel rendering
        if (scrollPosition >= totalHeight - 10) {
            if (bottomBlur) bottomBlur.style.opacity = '0';
        } else {
            if (bottomBlur) bottomBlur.style.opacity = '1';
        }
    };

    // Initial check
    handleBlurVisibility();

    // Listen to scroll events
    window.addEventListener('scroll', handleBlurVisibility, { passive: true });
});



// --- Magic Bento Grid ---
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.magic-bento-card');
    if (cards.length === 0) return;

    const glowColor = '0, 238, 255'; // Cyan
    const spotlightRadius = 400;
    const particleCount = 12;
    const isMobile = window.innerWidth <= 768;

    // 1. Global Spotlight
    if (!document.querySelector('.global-spotlight')) {
        const spotlight = document.createElement('div');
        spotlight.className = 'global-spotlight';
        spotlight.style.cssText = `
            position: fixed;
            width: 800px;
            height: 800px;
            border-radius: 50%;
            pointer-events: none;
            background: radial-gradient(circle,
                rgba(${glowColor}, 0.15) 0%,
                rgba(${glowColor}, 0.08) 15%,
                rgba(${glowColor}, 0.04) 25%,
                rgba(${glowColor}, 0.02) 40%,
                rgba(${glowColor}, 0.01) 65%,
                transparent 70%
            );
            z-index: 200;
            opacity: 0;
            transform: translate(-50%, -50%);
            mix-blend-mode: screen;
        `;
        document.body.appendChild(spotlight);

        let isInsideAnySection = false;

        document.addEventListener('mousemove', (e) => {
            // Check if mouse is hovering over any .bento-section
            const hoveredSection = Array.from(document.querySelectorAll('.bento-section')).find(section => {
                const rect = section.getBoundingClientRect();
                return e.clientX >= rect.left && e.clientX <= rect.right &&
                    e.clientY >= rect.top && e.clientY <= rect.bottom;
            });

            isInsideAnySection = !!hoveredSection;

            if (!isInsideAnySection) {
                if (window.gsap) gsap.to(spotlight, { opacity: 0, duration: 0.3 });
                cards.forEach(card => card.style.setProperty('--glow-intensity', '0'));
                return;
            }

            const proximity = spotlightRadius * 0.5;
            const fadeDistance = spotlightRadius * 0.75;
            let minDistance = Infinity;

            cards.forEach(card => {
                // Only light up cards in the currently hovered section (optional optimization) or globally
                const cardRect = card.getBoundingClientRect();
                const centerX = cardRect.left + cardRect.width / 2;
                const centerY = cardRect.top + cardRect.height / 2;
                const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
                const effectiveDistance = Math.max(0, distance);

                minDistance = Math.min(minDistance, effectiveDistance);

                let glowIntensity = 0;
                if (effectiveDistance <= proximity) {
                    glowIntensity = 1;
                } else if (effectiveDistance <= fadeDistance) {
                    glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
                }

                // Update individual card glow
                const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
                const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100;
                card.style.setProperty('--glow-x', `${relativeX}%`);
                card.style.setProperty('--glow-y', `${relativeY}%`);
                card.style.setProperty('--glow-intensity', glowIntensity.toString());
                card.style.setProperty('--glow-radius', `${spotlightRadius}px`);
                card.style.setProperty('--glow-color', glowColor);
            });

            if (window.gsap) {
                gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1 });
                const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
                gsap.to(spotlight, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5 });
            }
        });

        document.addEventListener('mouseleave', () => {
            isInsideAnySection = false;
            cards.forEach(card => card.style.setProperty('--glow-intensity', '0'));
            if (window.gsap) gsap.to(spotlight, { opacity: 0, duration: 0.3 });
        });
    }

    // 2. Individual Card Effects (Particles, Tilt, Magnetism, Click)
    cards.forEach(card => {
        let isHovered = false;
        let particles = [];
        let particlesData = []; // DOM elements

        const createParticle = (x, y) => {
            const el = document.createElement('div');
            el.className = 'particle';
            el.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: rgba(${glowColor}, 1);
                box-shadow: 0 0 6px rgba(${glowColor}, 0.6);
                pointer-events: none;
                z-index: 100;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                opacity: 0;
            `;
            return el;
        };

        const handleMouseEnter = () => {
            isHovered = true;
            if (isMobile || !window.gsap) return;

            const rect = card.getBoundingClientRect();
            // Generate and animate particles
            for (let i = 0; i < particleCount; i++) {
                setTimeout(() => {
                    if (!isHovered) return;
                    const p = createParticle(Math.random() * rect.width, Math.random() * rect.height);
                    card.appendChild(p);
                    particlesData.push(p);

                    gsap.to(p, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
                    gsap.to(p, {
                        x: (Math.random() - 0.5) * 100,
                        y: (Math.random() - 0.5) * 100,
                        rotation: Math.random() * 360,
                        duration: 2 + Math.random() * 2,
                        ease: 'none',
                        repeat: -1,
                        yoyo: true
                    });
                    gsap.to(p, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
                }, i * 100);
            }

            // Tilt & Scale Pop
            gsap.to(card, { rotateX: 5, rotateY: 5, scale: 1.02, duration: 0.3, transformPerspective: 1000, zIndex: 10 });
        };

        const handleMouseLeave = () => {
            isHovered = false;
            if (isMobile || !window.gsap) return;

            // Clear particles
            particlesData.forEach(p => {
                gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, onComplete: () => p.remove() });
            });
            particlesData = [];

            // Reset Tilt, Magnetism & Scale
            gsap.to(card, { rotateX: 0, rotateY: 0, x: 0, y: 0, scale: 1, duration: 0.3, zIndex: 1 });
        };

        const handleMouseMove = (e) => {
            if (isMobile || !window.gsap) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Tilt
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;
            gsap.to(card, { rotateX, rotateY, duration: 0.1, transformPerspective: 1000 });

            // Magnetism (more pronounced)
            const magnetX = (x - centerX) * 0.15;
            const magnetY = (y - centerY) * 0.15;
            gsap.to(card, { x: magnetX, y: magnetY, duration: 0.3 });
        };

        const handleClick = (e) => {
            if (isMobile || !window.gsap) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const maxDist = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));

            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute; width: ${maxDist * 2}px; height: ${maxDist * 2}px; border-radius: 50%;
                background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                left: ${x - maxDist}px; top: ${y - maxDist}px; pointer-events: none; z-index: 1000;
            `;
            card.appendChild(ripple);
            gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, onComplete: () => ripple.remove() });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('click', handleClick);
    });
});
