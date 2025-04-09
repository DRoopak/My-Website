// Sidebar Navigation Setup
const sidebar = document.createElement('div');
sidebar.className = 'sidebar';
sidebar.innerHTML = `
    <nav>
        <ul class="sidebar-nav">
            <li><a href="#about" data-tooltip="About Me">About</a></li>
            <li><a href="#skills" data-tooltip="My Skills">Skills</a></li>
            <li><a href="#work-experience" data-tooltip="Experience">Experience</a></li>
            <li><a href="#projects" data-tooltip="Projects">Projects</a></li>
            <li><a href="#education" data-tooltip="Education">Education</a></li>
            <li><a href="#contact" data-tooltip="Contact">Contact</a></li>
        </ul>
    </nav>
`;
document.body.appendChild(sidebar);

const sidebarToggle = document.createElement('button');
sidebarToggle.className = 'sidebar-toggle';
sidebarToggle.innerHTML = '☰';
document.body.appendChild(sidebarToggle);

const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

// Initialize Sidebar Functionality
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
const sections = document.querySelectorAll('section');

// IntersectionObserver for active section highlighting
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.sidebar-nav a[href="#${id}"]`);
        
        if (entry.isIntersecting) {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));

// Smooth scroll with offset
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerOffset = 80;
        
        window.scrollTo({
            top: targetSection.offsetTop - headerOffset,
            behavior: 'smooth'
        });
        
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = (winScroll / height) * 100 + '%';
});

// Mobile sidebar toggle
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside (mobile)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

// Enhanced Three.js Background
const container = document.getElementById('canvas-container');

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Enhanced Particles
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 10000;

const posArray = new Float32Array(particleCount * 3);
const colorArray = new Float32Array(particleCount * 3);

for(let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
    colorArray[i] = Math.random();
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Mouse interaction
const mouse = new THREE.Vector2();
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.0005 + mouse.y * 0.0005;
    particlesMesh.rotation.y += 0.001 + mouse.x * 0.0005;
    
    // Color animation
    const colors = particlesGeometry.attributes.color.array;
    for(let i = 0; i < particleCount * 3; i += 3) {
        colors[i] += 0.01;
        if(colors[i] > 1) colors[i] = 0;
    }
    particlesGeometry.attributes.color.needsUpdate = true;
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
