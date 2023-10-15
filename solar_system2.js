import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';


// I used vec instead of new THREE.Vector3() because im lazy
function vec(x, y, z) {
    return new THREE.Vector3(x, y, z);
}

let camera, scene, renderer;
let canvas = document.getElementById("bg");
scene = new THREE.Scene();

// camera
camera = new THREE.PerspectiveCamera(75, canvas.clientWidth 
    / canvas.clientHeight, 3, 1000);
camera.position.setY(70);
camera.lookAt(vec(0,0,0));

// renderer
renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight, pointLight);

// objects
// stars
const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 8, 8);
  const star = new THREE.Mesh(geometry, starMaterial);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// Planet
class Planet {
    constructor(texture, radius, distance, speed) {
        radius = 2*Math.log(radius);
        // Variables
        this.radius = radius;
        this.distance = 4*distance;
        this.speed = speed;
        this.angle = Math.random() * Math.PI * 2;
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 32, 32),
            new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.8,
                metalness: 0.2
            })
        );
        this.mesh.position.set(distance, 0, 0);
        scene.add(this.mesh);
    }

    update() {
        this.angle += this.speed;
        this.mesh.position.set(
            this.distance * Math.cos(this.angle),
            0,
            this.distance * Math.sin(this.angle)
            
        );
        this.mesh.rotation.y -= 0.01;
    }


}

// Planets
let sun = new Planet(new THREE.TextureLoader().load("assets/8k_sun.jpg"), 20, 0, 0);
let mercury = new Planet(new THREE.TextureLoader().load("assets/mercury.jpeg"), 0.383, 2, 0.03);
let venus = new Planet(new THREE.TextureLoader().load("assets/venus.jpeg"), 0.949, 4, 0.02);
let earth = new Planet(new THREE.TextureLoader().load("assets/earth.jpg"), 1, 6, 0.01);
let mars = new Planet(new THREE.TextureLoader().load("assets/8k_mars.jpg"), 0.532, 8, 0.005);
let jupiter = new Planet(new THREE.TextureLoader().load("assets/jupiter.jpg"), 11.21, 10, 0.001);
let saturn = new Planet(new THREE.TextureLoader().load("assets/saturn.jpeg"), 9.45, 12, 0.0005);
let uranus = new Planet(new THREE.TextureLoader().load("assets/uranus.jpeg"), 4.01, 14, 0.0001);
let neptune = new Planet(new THREE.TextureLoader().load("assets/neptune.jpg"), 3.88, 16, 0.00005);

function animate() {
    requestAnimationFrame(animate);
    sun.update();
    earth.update();
    mars.update();
    venus.update();
    mercury.update();
    jupiter.update();
    saturn.update();
    uranus.update();
    neptune.update();
    renderer.render(scene, camera);
}


animate();