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
            'images/scifi/Scifi- DroneWire.jpg'
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
