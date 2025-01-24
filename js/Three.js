import * as THREE from 'three';

/* SCENE: create an empty scene, that will hold all the elements */
const scene = new THREE.Scene();

/* CAMERA: create a camera, which defines where we're looking at */


// Luz
let light = new THREE.PointLight( 0xffffff,5 );
// add light to the scene
light.position.z=20
light.intensity=1000

scene.add( light );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("LIGHTGREEN");
document.body.appendChild(renderer.domElement);
// Variaveis
let maxSpeed=0.04
let minSpeed=-0.02
let speed=0
let lastpressed
let RodaRotation=0
let RodaMaxRotation=0.005
let RodaMinRotation=-0.005
let GrassGroup=[]
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
// Corpo corta relva(blocos e isso)
    const Corpo=new THREE.Group()

function CriarRelva(Tamanho){
    let grassBlocksNumber=0
    for (let i=0;i<Tamanho;i++){
        for(let k=0;k<Tamanho;k++){
            
            const relvaMaterial=new THREE.MeshBasicMaterial({color:"green"})
            const relvaAltaForma=new THREE.BoxGeometry(3,3,0.5)
            const relvaAlta=new THREE.Mesh(relvaAltaForma,relvaMaterial)
            
            relvaAlta.name=`Relva_${grassBlocksNumber}`
            relvaAlta.position.set(i*3,k*3,-0.5)
            GrassGroup.push(relvaAlta)
            grassBlocksNumber++
        }
    }
    console.log(GrassGroup)
    for(let i=0;i<GrassGroup.length;i++){
        scene.add(GrassGroup[i])
    }
}
function cortarRelva(){
    console.log(GrassGroup.length)
    for (let i=0;i<GrassGroup.length;i++){
        
        const objeto=scene.getObjectByName(`Relva_${i}`)
        if(-1.5<cortaRelva.position.x-objeto.position.x &&
             cortaRelva.position.x-objeto.position.x<1.5&&
             -1.5<cortaRelva.position.y-objeto.position.y&&
             cortaRelva.position.y-objeto.position.y<1.5){
            objeto.material.color.set("LIGHTGREEN");
        }
    }
}

function rodas() {
    let roda = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 14);
    let Pneu= new THREE.CylinderGeometry(0.3, 0.3, 0.6, 14);
    let material = new THREE.MeshBasicMaterial({color:"black"});
    let borracha= new THREE.MeshBasicMaterial({color:"white"});

    
    
    // Roda frente direita
    const rodaFR = new THREE.Mesh(roda, material);
    const pneuFR= new THREE.Mesh(Pneu,borracha)
    RodaFrenteDireita.add(rodaFR,pneuFR,picosPneus())    
    RodasRodarDireita.add(RodaFrenteDireita)
    RodasRodarDireita.position.x = 2;
    RodasRodarDireita.position.y = -2;


    // Roda frente esquerda
    
    const rodaFL = new THREE.Mesh(roda, material);
    const pneuFL= new THREE.Mesh(Pneu,borracha);
    RodaFrenteEsquerda.add(rodaFL,pneuFL,picosPneus());
    RodasRodarEsquerda.add(RodaFrenteEsquerda)

    RodasRodarEsquerda.position.x = 2;
    RodasRodarEsquerda.position.y = 2;

    // Roda traseira direita
    
    const rodaBR = new THREE.Mesh(roda, material);
    const pneuBR= new THREE.Mesh(Pneu,borracha);
    RodaTrasDireita.add(rodaBR,pneuBR,picosPneus())
    RodaTrasDireita.position.x = -2;
    RodaTrasDireita.position.y = -2;

    // Roda traseira esquerda
    
    const rodaBL = new THREE.Mesh(roda, material);
    const pneuBL= new THREE.Mesh(Pneu,borracha)
    RodaTrasEsquerda.position.x = -2;
    RodaTrasEsquerda.position.y = 2;
    RodaTrasEsquerda.add(rodaBL,pneuBL,picosPneus())
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
    // circuloObjeto.position.z=2
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
    // Divisions.position.z=2
    Volante.add(circuloObjeto,Divisions)
    Volante.rotation.z=-Math.PI/2
    Volante.rotation.y=-Math.PI/4
    Volante.position.z=1.8
    Volante.position.x=1.5
    // Volante
    cortaRelva.add(Volante)
}
function CriarBanco(){
    const BancoMaterial = new THREE.MeshBasicMaterial({ color: "#8B634B"});
    const BlocoBanco = new THREE.BoxGeometry( 0.5, 1, 1 );
// Costas
    const CostasBanco=new THREE.Mesh(BlocoBanco,BancoMaterial)
    CostasBanco.position.z=0.75
// Assento
    const AssentoBanco=new THREE.Mesh(BlocoBanco,BancoMaterial)
    AssentoBanco.rotation.y=Math.PI/2
    AssentoBanco.position.x=0.5
    AssentoBanco.position.z=0.5
// posição do banco no corta relva
    Banco.position.z=0.5
    Banco.position.x=-0.5
    Banco.add(CostasBanco,AssentoBanco)

    cortaRelva.add(Banco)
}
function picosPneus(){
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
function corpoCortaRelva(){
    const CorpoMaterial = new THREE.MeshPhongMaterial({
        color: 0x93c47d,
        shininess:100,
        emissive: 0x3424324,

    });

    // const BlocoBanco = new THREE.BoxGeometry( 0.5, 1, 1 );

    const PlataformaForma=new THREE.BoxGeometry(4,3.5,0.5)
    const Plataforma=new THREE.Mesh(PlataformaForma,CorpoMaterial)


    const MotorForma=new THREE.BoxGeometry(2,2,2)
    const motor=new THREE.Mesh(MotorForma,CorpoMaterial)
    motor.position.z=0.7
    motor.position.x=2.5

    const BlocoTrasForma=new THREE.BoxGeometry(2,3.5,0.5)
    const BlocoTras=new THREE.Mesh(BlocoTrasForma,CorpoMaterial)
    BlocoTras.position.z=0.5
    BlocoTras.position.x=-0.5
    

    // Adicionar ao grupo do objeto

    cortaRelva.add(motor,Plataforma,BlocoTras)

}
function createObject() {
    CriarRelva(5)
    CriarBanco()
    rodas();
    CriarVolante()
    corpoCortaRelva()
    scene.add(cortaRelva);    
    
}

const keys = {};
function movimento(){
    if (speed!=0){
        cortaRelva.position.x += Math.cos(cortaRelva.rotation.z) * speed;
        cortaRelva.position.y += Math.sin(cortaRelva.rotation.z) * speed;
        // Rodas
        RodaFrenteDireita.rotation.y+=RodaRotation
        RodaFrenteEsquerda.rotation.y+=RodaRotation
        RodaTrasDireita.rotation.y+=RodaRotation
        RodaTrasEsquerda.rotation.y+=RodaRotation
        
    }
}

document.addEventListener('keydown', (event) => {
    keys[event.key] = true; 

    // Cima direita
    if (keys['ArrowUp'] && keys['ArrowRight']) {
        lastpressed="ArrowUp"
        if(speed<maxSpeed){
            speed+=0.005
        } else if(speed==maxSpeed){
            speed=maxSpeed
        }
        if(RodaRotation<RodaMaxRotation){
            RodaRotation+=0.001
        }else if(RodaRotation==RodaMaxRotation){
            RodaRotation=RodaMaxRotation
        }
        // Rodas a rodar
        // Rodas da frente a mudar de direção
        RodasRodarEsquerda.rotation.z = -Math.PI/6
        RodasRodarDireita.rotation.z = -Math.PI/6
        // Todas as rodas a rodarem
        RodaFrenteDireita.rotation.y+=0.1
        RodaFrenteEsquerda.rotation.y+=0.1
        RodaTrasDireita.rotation.y+=0.1
        RodaTrasEsquerda.rotation.y+=0.1
        // Volante
        Volante.rotation.z=8*Math.PI/7
        // Rodar o corta relva
        cortaRelva.rotation.z -= 0.02;
    }else if (keys['ArrowUp'] && keys['ArrowLeft']) {
        lastpressed="ArrowUp"
        if(speed<maxSpeed){
            speed+=0.005
        } else if(speed==maxSpeed){
            speed=maxSpeed
        }
        if(RodaRotation<RodaMaxRotation){
            RodaRotation+=0.001
        }else if(RodaRotation==RodaMaxRotation){
            RodaRotation=RodaMaxRotation
        }
        // Rodas da frente a mudar de direção
        RodasRodarEsquerda.rotation.z = Math.PI/7
        RodasRodarDireita.rotation.z=Math.PI/7

        // Todas as rodas a rodarem
        RodaFrenteDireita.rotation.y+=0.1
        RodaFrenteEsquerda.rotation.y+=0.1
        RodaTrasDireita.rotation.y+=0.1
        RodaTrasEsquerda.rotation.y+=0.1
        // Volante
        Volante.rotation.z=-Math.PI/7
        // Corta Relva a mover-se no espaço
        cortaRelva.rotation.z += 0.02;

    }else if (keys['ArrowDown'] && keys['ArrowLeft']) {
        lastpressed="ArrowDown"
        if(speed>minSpeed){
            speed-=0.005
        } else if(speed==minSpeed){
            speed=minSpeed
        }
        if(RodaRotation>RodaMinRotation){
            RodaRotation-=0.001
        }else if(RodaRotation==RodaMinRotation){
            RodaRotation=RodaMaxRotation
        }
        // Volante
        Volante.rotation.z=-Math.PI/7
        // Rodas da frente a mudar de direção
        RodasRodarEsquerda.rotation.z = Math.PI/7
        RodasRodarDireita.rotation.z=Math.PI/7
        // Rodas a rodar
        RodaFrenteDireita.rotation.y-=0.1
        RodaFrenteEsquerda.rotation.y-=0.1
        RodaTrasDireita.rotation.y-=0.1
        RodaTrasEsquerda.rotation.y-=0.1
        // Corta Relva a mover-se no espaço
        cortaRelva.rotation.z -= 0.02;

    }else if (keys['ArrowDown'] && keys['ArrowRight']) {
        lastpressed="ArrowDown"
        if(speed>minSpeed){
            speed-=0.005
        } else if(speed==minSpeed){
            speed=minSpeed
        }
        if(RodaRotation>RodaMinRotation){
            RodaRotation-=0.001
        }else if(RodaRotation==RodaMinRotation){
            RodaRotation=RodaMaxRotation
        }
        // Volante
        Volante.rotation.z=8*Math.PI/7
         // Rodas da frente a mudar de direção
         RodasRodarEsquerda.rotation.z = -Math.PI/7
         RodasRodarDireita.rotation.z = -Math.PI/7
        // Rodas a rodar
        RodaFrenteDireita.rotation.y-=0.1
        RodaFrenteEsquerda.rotation.y-=0.1
        RodaTrasDireita.rotation.y-=0.1
        RodaTrasEsquerda.rotation.y-=0.1
        // Corta Relva a mover-se no espaço
        cortaRelva.rotation.z += 0.02;

    }else if(keys['ArrowUp']){
        lastpressed="ArrowUp"
        if(speed<maxSpeed){
            speed+=0.005
        } else if(speed==maxSpeed){
            speed=maxSpeed
        }
        if(RodaRotation<RodaMaxRotation){
            RodaRotation+=0.001
        }else if(RodaRotation==RodaMaxRotation){
            RodaRotation=RodaMaxRotation
        }
        // Rodas a rodar
        RodaFrenteDireita.rotation.y+=0.1
        RodaFrenteEsquerda.rotation.y+=0.1
        RodaTrasDireita.rotation.y+=0.1
        RodaTrasEsquerda.rotation.y+=0.1 
        // Corta Relva a mover-se no espaço
    } else if (keys[ 'ArrowDown']) {
        lastpressed="ArrowDown"
        if(speed>minSpeed){
            speed-=0.005
        } else if(speed==minSpeed){
            speed=minSpeed
        }
        if(RodaRotation>RodaMinRotation){
            RodaRotation-=0.001
        }else if(RodaRotation==RodaMinRotation){
            RodaRotation=RodaMaxRotation
        }
        // Rodas a rodar
        RodaFrenteDireita.rotation.y-=0.1
        RodaFrenteEsquerda.rotation.y-=0.1
        RodaTrasDireita.rotation.y-=0.1
        RodaTrasEsquerda.rotation.y-=0.1
        // Corta Relva a mover-se no espaço

    } else if (keys[ 'ArrowLeft']) {
                // Rodas da frente para a esquerda
        RodasRodarDireita.rotation.z=Math.PI/7
        RodasRodarEsquerda.rotation.z=Math.PI/7
        Volante.rotation.z=-Math.PI/7
    }else if(keys['ArrowRight']){
        // Rodas da frente para a direita
        RodasRodarDireita.rotation.z=-Math.PI/7
        RodasRodarEsquerda.rotation.z=-Math.PI/7
        Volante.rotation.z=8*Math.PI/7
    }
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});


function regulateMovimento(){    
    if(speed<0 &&lastpressed==="ArrowUp"){
        speed=0
        RodaRotation=0
    }else if(speed>0 &&lastpressed==="ArrowDown"){
        speed=0
        RodaRotation=0  
    }
    else if(speed!==0 && speed>0){
        speed-=0.0005
    }else if(speed!==0 && speed<0){
        speed+=0.0003
    }

}
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

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    let relativeOffset = new THREE.Vector3(0, 0,15);
    let cameraOffset = relativeOffset.applyMatrix4(cortaRelva.matrixWorld);
    camera.position.copy(cameraOffset);
    camera.rotation.set(0,0,-Math.PI/2)

    renderer.render(scene, camera);
    cortarRelva()
    movimento();
    regulateMovimento()
});