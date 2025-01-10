import * as THREE from 'three';

/* SCENE: create an empty scene, that will hold all the elements */
const scene = new THREE.Scene();

/* CAMERA: create a camera, which defines where we're looking at */
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.y = -10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("LIGHTGREEN");
document.body.appendChild(renderer.domElement);

let cortaRelva = new THREE.Group();

function rodas() {
    let roda = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 14);
    let material = new THREE.MeshNormalMaterial();
    
    // Roda frente direita
    const rodaFR = new THREE.Mesh(roda, material);
    rodaFR.position.x = 2;
    rodaFR.position.y = -2;

    // Roda frente esquerda
    const rodaFL = new THREE.Mesh(roda, material);
    rodaFL.position.x = 2;
    rodaFL.position.y = 2;

    // Roda traseira direita
    const rodaBR = new THREE.Mesh(roda, material);
    rodaBR.position.x = -2;
    rodaBR.position.y = -2;

    // Roda traseira esquerda
    const rodaBL = new THREE.Mesh(roda, material);
    rodaBL.position.x = -2;
    rodaBL.position.y = 2;

    cortaRelva.add(rodaFL, rodaFR, rodaBR, rodaBL);
}

function createObject() {
    rodas();
    scene.add(cortaRelva);
}

// Key controls
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        // Move forward
        cortaRelva.position.x += Math.cos(cortaRelva.rotation.z) * 0.1;
        cortaRelva.position.y += Math.sin(cortaRelva.rotation.z) * 0.1;
    } else if (event.key === 'ArrowDown') {
        // Move backward
        cortaRelva.position.x -= Math.cos(cortaRelva.rotation.z) * 0.1;
        cortaRelva.position.y -= Math.sin(cortaRelva.rotation.z) * 0.1;
    } else if (event.key === 'ArrowLeft') {
        // Rotate left
        cortaRelva.rotation.z += 0.1;
    } else if (event.key === 'ArrowRight') {
        // Rotate right
        cortaRelva.rotation.z -= 0.1;
    }
});

createObject();

// Animation loop
renderer.setAnimationLoop(() => {
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
});
