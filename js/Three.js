import * as THREE from 'three';

/* SCENE: create an empty scene, that will hold all the elements */
const scene = new THREE.Scene();

/* CAMERA: create a camera, which defines where we're looking at */
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = -5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("LIGHTGREEN");
document.body.appendChild(renderer.domElement);

let cortaRelva = new THREE.Group();

function rodas() {
    let roda = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 14);
    let Pneu= new THREE.CylinderGeometry(0.3, 0.3, 0.6, 14);
    let material = new THREE.MeshBasicMaterial({color:"black",
    flatShading :true,});
    let borracha= new THREE.MeshBasicMaterial({color:"white"});
    
    
    // Roda frente direita
    const RodaFrenteDireita=new THREE.Group();
    const rodaFR = new THREE.Mesh(roda, material);
    const pneuFR= new THREE.Mesh(Pneu,borracha)
    RodaFrenteDireita.add(rodaFR,pneuFR)
    RodaFrenteDireita.position.x = 2;
    RodaFrenteDireita.position.y = -2;


    // Roda frente esquerda
    const RodaFrenteEsquerda=new THREE.Group();
    const rodaFL = new THREE.Mesh(roda, material);
    const pneuFL= new THREE.Mesh(Pneu,borracha);
    RodaFrenteEsquerda.add(rodaFL,pneuFL);
    RodaFrenteEsquerda.position.x = 2;
    RodaFrenteEsquerda.position.y = 2;
    

    // Roda traseira direita
    const RodaTrasDireita=new THREE.Group();
    const rodaBR = new THREE.Mesh(roda, material);
    const pneuBR= new THREE.Mesh(Pneu,borracha);
    RodaTrasDireita.add(rodaBR,pneuBR)
    RodaTrasDireita.position.x = -2;
    RodaTrasDireita.position.y = -2;

    // Roda traseira esquerda
    const RodaTrasEsquerda=new THREE.Group();
    const rodaBL = new THREE.Mesh(roda, material);
    const pneuBL= new THREE.Mesh(Pneu,borracha)
    RodaTrasEsquerda.position.x = -2;
    RodaTrasEsquerda.position.y = 2;
    RodaTrasEsquerda.add(rodaBL,pneuBL)
    // grupo rodas
    cortaRelva.add( RodaFrenteDireita,RodaFrenteEsquerda,RodaTrasDireita,RodaTrasEsquerda);
}

function createObject() {
    rodas();
    scene.add(cortaRelva);
}
const keys = {};
// Key controls
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;

    // Verificar se duas teclas específicas estão pressionadas
    if (keys['ArrowUp'] && keys['ArrowRight']) {
        console.log("ArrowUp e ArrowRight pressionados!");
        // Adicione aqui a lógica para movimentar ou girar o veículo
    }
});
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
