import * as THREE from 'three';

/* SCENE: create an empty scene, that will hold all the elements */
const scene = new THREE.Scene();

/* CAMERA: create a camera, which defines where we're looking at */
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10 ;
camera.position.y = -6;
// camera.position.x=1

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("LIGHTGREEN");
document.body.appendChild(renderer.domElement);

// Inicialização de Grupos de Objetos
// Objeto Principal
const cortaRelva = new THREE.Group();
// Volante
const Volante=new THREE.Group()
// Grupo de jantes+ Pneu
    const RodaFrenteEsquerda=new THREE.Group();
    const RodaFrenteDireita=new THREE.Group();
    const RodaTrasDireita=new THREE.Group();
    const RodaTrasEsquerda=new THREE.Group();
// Rodas a rodar
    const RodasRodarDireita=new THREE.Group()
    const RodasRodarEsquerda=new THREE.Group()
// Banco
    const Banco=new THREE.Group()

function rodas() {
    let roda = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 14);
    let Pneu= new THREE.CylinderGeometry(0.3, 0.3, 0.6, 14);
    let material = new THREE.MeshBasicMaterial({color:"black"});
    let borracha= new THREE.MeshBasicMaterial({color:"white"});

    
    
    // Roda frente direita
    const rodaFR = new THREE.Mesh(roda, material);
    const pneuFR= new THREE.Mesh(Pneu,borracha)
    RodaFrenteDireita.add(rodaFR,pneuFR,fixe())    
    RodasRodarDireita.add(RodaFrenteDireita)
    RodasRodarDireita.position.x = 2;
    RodasRodarDireita.position.y = -2;



    // Roda frente esquerda
    
    const rodaFL = new THREE.Mesh(roda, material);
    const pneuFL= new THREE.Mesh(Pneu,borracha);
    RodaFrenteEsquerda.add(rodaFL,pneuFL,fixe());
    RodasRodarEsquerda.add(RodaFrenteEsquerda)

    RodasRodarEsquerda.position.x = 2;
    RodasRodarEsquerda.position.y = 2;

    // Roda traseira direita
    
    const rodaBR = new THREE.Mesh(roda, material);
    const pneuBR= new THREE.Mesh(Pneu,borracha);
    RodaTrasDireita.add(rodaBR,pneuBR,fixe())
    RodaTrasDireita.position.x = -2;
    RodaTrasDireita.position.y = -2;

    // Roda traseira esquerda
    
    const rodaBL = new THREE.Mesh(roda, material);
    const pneuBL= new THREE.Mesh(Pneu,borracha)
    RodaTrasEsquerda.position.x = -2;
    RodaTrasEsquerda.position.y = 2;
    RodaTrasEsquerda.add(rodaBL,pneuBL,fixe())
    // grupo rodas
    cortaRelva.add( RodasRodarDireita,RodasRodarEsquerda,RodaTrasDireita,RodaTrasEsquerda);
}
function CriarVolante(){
    const Divisions=new THREE.Group()
    const VolanteMaterial2 = new THREE.MeshBasicMaterial({ color: "grey"});
    // Circulo
    const radius = 0.3;  
    const tubeRadius = 0.05;  
    const radialSegments = 8;  
    const tubularSegments = 14;  
    const VolanteMaterial1 = new THREE.MeshBasicMaterial({ color: "black"});
    const circulo = new THREE.TorusGeometry(
        radius, tubeRadius,
        radialSegments, tubularSegments );
    const circuloObjeto =new THREE.Mesh(circulo,VolanteMaterial1)
    circuloObjeto.position.z=2
    // Divisões do Volante
    const cilDivis= new THREE.CylinderGeometry(0.06,0.06,0.3,20)
    const Div1=new THREE.Mesh(cilDivis,VolanteMaterial2)
    Div1.position.y=0.1
    Div1.position.x=-0.11
    Div1.rotation.z=Math.PI/4
    const Div2=new THREE.Mesh(cilDivis,VolanteMaterial2)
    Div2.position.y=0.1
    Div2.position.x=0.11
    Div2.rotation.z=-Math.PI/4
    const Div3=new THREE.Mesh(cilDivis,VolanteMaterial2)
    Div3.position.y=-0.11
    Div3.rotation.z=0
    Divisions.add(Div1, Div2,Div3)
    Divisions.position.z=2
    Volante.add(circuloObjeto,Divisions)
    Volante.rotation.z=-Math.PI/2
    Volante.position.x=1
    cortaRelva.add(Volante)
}
function CriarBanco(){
    const BancoMaterial = new THREE.MeshBasicMaterial({ color: "brown"});
    const BlocoBanco = new THREE.BoxGeometry( 0.5, 1, 1 );
// Costas
    const CostasBanco=new THREE.Mesh(BlocoBanco,BancoMaterial)
    CostasBanco.position.z=0.5
// Assento
    const AssentoBanco=new THREE.Mesh(BlocoBanco,BancoMaterial)
    AssentoBanco.rotation.y=Math.PI/2
    AssentoBanco.position.x=0.5
    AssentoBanco.position.z=0.25
// posição do banco no corta relva
    Banco.position.z=0.5
    Banco.add(CostasBanco,AssentoBanco)

    cortaRelva.add(Banco)



}
function fixe(){
    const CoisinhosGrupo=new THREE.Group()
    let roda = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 14);
    let material = new THREE.MeshBasicMaterial({color:"black"});
    let quadradinho=new THREE.BoxGeometry(0.2,0.5,0.3)
    let a1=new THREE.Mesh(quadradinho,material)
    a1.position.z=-0.5;
    a1.rotation.y=Math.PI/2
    let a2=new THREE.Mesh(quadradinho,material)
    a2.position.z=0.5;
    a2.rotation.y=Math.PI/2
    let a3=new THREE.Mesh(quadradinho,material)
    a3.position.x=0.5
    let a4=new THREE.Mesh(quadradinho,material)
    a4.position.x=-0.5
    let a5=new THREE.Mesh(quadradinho,material)
    a5.position.x=0.5*Math.cos(Math.PI/4)
    a5.position.z=0.5*Math.cos(Math.PI/4)
    a5.rotation.y=-Math.PI/4
    let a6=new THREE.Mesh(quadradinho,material)
    a6.position.x=-0.5*Math.cos(Math.PI/4)
    a6.position.z=0.5*Math.cos(Math.PI/4)
    a6.rotation.y=Math.PI/4
    let a7=new THREE.Mesh(quadradinho,material)
    a7.position.x=-0.5*Math.cos(Math.PI/4)
    a7.position.z=-0.5*Math.cos(Math.PI/4)
    a7.rotation.y=-Math.PI/4
    let a8=new THREE.Mesh(quadradinho,material)
    a8.position.x=0.5*Math.cos(Math.PI/4)
    a8.position.z=-0.5*Math.cos(Math.PI/4)
    a8.rotation.y=Math.PI/4
    CoisinhosGrupo.add(a1,a2,a3,a4,a5,a6,a7,a8)
    return CoisinhosGrupo
}
// function corpoCortaRelva(){
    
// }
function createObject() {
    CriarBanco()
    rodas();
    CriarVolante()
    scene.add(cortaRelva);
}

const keys = {};

// duas teclas ao mesmo tempo
document.addEventListener('keydown', (event) => {
    keys[event.key] = true; 

    // Cima direita
    if (keys['ArrowUp'] && keys['ArrowRight']) {
        // Rodas da frente a mudar de direção
        RodasRodarEsquerda.rotation.z = -Math.PI/6
        RodasRodarDireita.rotation.z = -Math.PI/6
        // Todas as rodas a rodarem
        RodaFrenteDireita.rotation.y+=0.1
        RodaFrenteEsquerda.rotation.y+=0.1
        RodaTrasDireita.rotation.y+=0.1
        RodaTrasEsquerda.rotation.y+=0.1

        Volante.rotation.z=8*Math.PI/7
        cortaRelva.rotation.z -= 0.01;
        cortaRelva.position.x += Math.cos(cortaRelva.rotation.z) * 0.1;
        cortaRelva.position.y += Math.sin(cortaRelva.rotation.z) * 0.1;
    }else if (keys['ArrowUp'] && keys['ArrowLeft']) {
        // Rodas da frente a mudar de direção
        RodasRodarEsquerda.rotation.z = Math.PI/6
        RodasRodarDireita.rotation.z=Math.PI/6

        // Todas as rodas a rodarem
        RodaFrenteDireita.rotation.y+=0.1
        RodaFrenteEsquerda.rotation.y+=0.1
        RodaTrasDireita.rotation.y+=0.1
        RodaTrasEsquerda.rotation.y+=0.1
        // Volante
        Volante.rotation.z=-Math.PI/7
        // Corta Relva a mover-se no espaço
        cortaRelva.rotation.z += 0.01;
        cortaRelva.position.x += Math.cos(cortaRelva.rotation.z) * 0.1;
        cortaRelva.position.y += Math.sin(cortaRelva.rotation.z) * 0.1;

    }else if (keys['ArrowDown'] && keys['ArrowLeft']) {
        // Volante
        Volante.rotation.z=-Math.PI/7
        // Rodas da frente a mudar de direção
        RodasRodarEsquerda.rotation.z = Math.PI/6
        RodasRodarDireita.rotation.z=Math.PI/6
        // Rodas a rodar
        RodaFrenteDireita.rotation.y-=0.1
        RodaFrenteEsquerda.rotation.y-=0.1
        RodaTrasDireita.rotation.y-=0.1
        RodaTrasEsquerda.rotation.y-=0.1
        // Corta Relva a mover-se no espaço
        cortaRelva.rotation.z -= 0.01;
        cortaRelva.position.x -= Math.cos(cortaRelva.rotation.z) * 0.1;
        cortaRelva.position.y -= Math.sin(cortaRelva.rotation.z) * 0.1;
    }else if (keys['ArrowDown'] && keys['ArrowRight']) {
        // Volante
        Volante.rotation.z=8*Math.PI/7
         // Rodas da frente a mudar de direção
         RodasRodarEsquerda.rotation.z = -Math.PI/6
         RodasRodarDireita.rotation.z = -Math.PI/6
        // Rodas a rodar
        RodaFrenteDireita.rotation.y-=0.1
        RodaFrenteEsquerda.rotation.y-=0.1
        RodaTrasDireita.rotation.y-=0.1
        RodaTrasEsquerda.rotation.y-=0.1

    // Corta Relva a mover-se no espaço
        cortaRelva.rotation.z += 0.01;
        cortaRelva.position.x -= Math.cos(cortaRelva.rotation.z) * 0.1;
        cortaRelva.position.y -= Math.sin(cortaRelva.rotation.z) * 0.1;
    }else if(keys['ArrowUp']){
        // Rodas a rodar
        RodaFrenteDireita.rotation.y+=0.1
        RodaFrenteEsquerda.rotation.y+=0.1
        RodaTrasDireita.rotation.y+=0.1
        RodaTrasEsquerda.rotation.y+=0.1 
        // Corta Relva a mover-se no espaço
        cortaRelva.position.x += Math.cos(cortaRelva.rotation.z) * 0.1;
        cortaRelva.position.y += Math.sin(cortaRelva.rotation.z) * 0.1;
    } else if (keys[ 'ArrowDown']) {
        // Rodas a rodar
        RodaFrenteDireita.rotation.y-=0.1
        RodaFrenteEsquerda.rotation.y-=0.1
        RodaTrasDireita.rotation.y-=0.1
        RodaTrasEsquerda.rotation.y-=0.1
        // Corta Relva a mover-se no espaço
        cortaRelva.position.x -= Math.cos(cortaRelva.rotation.z) * 0.1;
        cortaRelva.position.y -= Math.sin(cortaRelva.rotation.z) * 0.1;

    } else if (keys[ 'ArrowLeft']) {
        // Rodas da frente para a esquerda
        RodasRodarDireita.rotation.z=Math.PI/6
        RodasRodarEsquerda.rotation.z=Math.PI/6
        Volante.rotation.z=-Math.PI/7
    }else if(keys['ArrowRight']){
        // Rodas da frente para a direita
        RodasRodarDireita.rotation.z=-Math.PI/6
        RodasRodarEsquerda.rotation.z=-Math.PI/6
        Volante.rotation.z=8*Math.PI/7
    }
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false; 
});



document.addEventListener("keyup", (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        // Reset wheels to the neutral position when the key is released
        RodasRodarDireita.rotation.z = 0;
        RodasRodarEsquerda.rotation.z = 0;
        Volante.rotation.z=-Math.PI/2
    }
});
createObject();

// Animation loop
renderer.setAnimationLoop(() => {
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
});
