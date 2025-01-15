import * as THREE from 'three';

const generate = (canvasId?: string) => {
    const canvas: HTMLCanvasElement | null = document.querySelector(canvasId || ".particles_design");
    if (!canvas) {
        console.error(`Canvas with selector '${canvasId || ".particles_design"}' not found.`);
        return;
    }

    // Sizes
    const sizes = {
        width: canvas.clientWidth || window.innerWidth,
        height: canvas.clientHeight || window.innerHeight,
    };

    // Textures
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load("/textures/particle.png");

    // Scene
    const scene = new THREE.Scene();

    // Particle Geometry
    const particleGeometry = new THREE.BufferGeometry();
    const count = 150; // Reduced count for better performance

    const positions: number[] = [];
    const colors: number[] = [];

    // Spread particles dynamically
    const width = sizes.width / 50;
    const height = sizes.height / 50;

    // Function to add a new particle at a specific Z position
    function addParticle(zOffset: number) {
        positions.push(
            (Math.random() - 0.5) * width,  // X-axis
            (Math.random() - 0.5) * height, // Y-axis
            zOffset                         // Z-axis
        );

        // Random colors
        colors.push(Math.random(), Math.random(), Math.random());
    }

    // Initialize particles
    for (let i = 0; i < count; i++) {
        addParticle((Math.random() - 0.5) * 50);
    }

    // Set attributes for geometry
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Particle Material
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.2,
        transparent: true,
        alphaMap: particleTexture,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    });

    // Create Points
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 4;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvas , alpha: true});
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Handle Resize
    window.addEventListener('resize', () => {
        sizes.width = canvas.clientWidth || window.innerWidth;
        sizes.height = canvas.clientHeight || window.innerHeight;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
    });

    // Animate Particles
    function animateParticles() {
        const positionAttribute = particleGeometry.attributes.position;
        const speed = 0.1;

        for (let i = 0; i < positionAttribute.count; i++) {
            positionAttribute.array[i * 3 + 2] += speed; // Move particles toward the camera

            // If particle is past the camera, reposition it behind
            if (positionAttribute.array[i * 3 + 2] > camera.position.z + 5) {
                positionAttribute.array[i * 3] = (Math.random() - 0.5) * width;  // New X
                positionAttribute.array[i * 3 + 1] = (Math.random() - 0.5) * height; // New Y
                positionAttribute.array[i * 3 + 2] = camera.position.z - 20;    // New Z behind camera
            }
        }

        positionAttribute.needsUpdate = true; // Update geometry
    }

    // Animation Loop
    const tick = () => {
        animateParticles();
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    };

    tick();
};

export default generate;
