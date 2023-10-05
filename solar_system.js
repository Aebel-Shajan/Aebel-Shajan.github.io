import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
// Doesnt work for mobile yet

// I used vec instead of new THREE.Vector3() because im lazy
function vec(x, y, z) {
    return new THREE.Vector3(x, y, z);
}

// Loaders
const textureLoader = new THREE.TextureLoader();
const normalMaps = [
  textureLoader.load('assets/normal-map1.jpg'),
  textureLoader.load('assets/normal-map2.jpg'), 
  textureLoader.load('assets/normal-map3.jpg'),
  textureLoader.load('assets/normal-map4.jpg'),
];


////// Setup //////
let width = 0.95*window.innerWidth;
let height = 0.6*window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 3, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
camera.position.setZ(30);
camera.up = vec(0,1,0);
camera.lookAt(vec(0,0,0));
scene.add(camera);
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    width = 0.95*window.innerWidth;
    height = 0.6*window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight, pointLight);


////// Objects //////
// Stars
const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
function addStar() {
  const geometry = new THREE.SphereGeometry(0.5*Math.random(100)/100 + 0.1, 8, 8);
  const star = new THREE.Mesh(geometry, starMaterial);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// Torus
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(10, 3, 16, 100), 
  new THREE.MeshStandardMaterial({ color: 0xff6347 }));
torus.material.transparent = true;
scene.add(torus);

// Planet
class Planet {
  constructor(radius, c, distance) {
    // Variables
    this.radius = radius;
    this.distance = distance;
    this.color = c;
    this.speed = getRadialSpeed(distance);
    this.angle = 0;
    
    // Materials
    var planetMaterial = new THREE.MeshStandardMaterial(
      {
        map: planetTexture(c), 
        normalMap: normalMaps[Math.floor(Math.random()*normalMaps.length)]
      });
    planetMaterial.transparent = true;


    // Meshes
    this.mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 64),
      planetMaterial);
    scene.add(this.mesh);
  }
  orbit() {
    this.angle += this.speed;
    const x = Math.cos(this.angle) * this.distance;
    const z = Math.sin(this.angle) * this.distance;
    this.setPosition(vec(x, 0, z));
    this.mesh.rotation.y -= 0.01;
  }
  setPosition(pos) {
    this.mesh.position.copy(pos);

  }
  getPosition() {
    return this.mesh.position;
  }

  setOpacity(opacity) {
    this.mesh.material.opacity = opacity;

  }
  setVisibility(value) {
    this.mesh.visible = value;

  }
}

// Create Planets
const orange2Yellow = ["#D4145A", "#FBB03B"];
const blue2Green = ["#02AABD", "#00CDAC"];
const purple2Pink = ["#662D8C", "#ED1E79"];
const celestial = ["#09203F", "#537895"];
const quepal = ["#34e89e", "#0f3443"];
let sun = new Planet(10, orange2Yellow, 0);
let planet_1 = new Planet(2, quepal, 30);
let planet_2 = new Planet(3, purple2Pink, 40);
let planet_3 = new Planet(1, celestial, 50);
let objects = [sun, planet_1, planet_2, planet_3];
let targetIndex = 0;


// Animation Loop
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);


  // Rotate the torus
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // Calculate the planet's new position
  for (let i = 0; i < objects.length; i++) {
    objects[i].orbit();
  }
  
  // Move the camera towards the target position
  const minCamDistance = 5*objects[targetIndex].radius/(0.001*Math.min(window.innerWidth, window.innerHeight));
  const targetPosition = vec().copy(objects[targetIndex].mesh.position).add(vec(0, 10, minCamDistance));
  const cameraPosition = vec().copy(camera.position);
  const cameraDirection = vec().subVectors(
    targetPosition,
    cameraPosition
  );
  let cameraSpeed = Math.max(1.5*cameraPosition.length()*getRadialSpeed(cameraPosition.length()), cameraDirection.length()/25);
  let cameraMove = vec(0,0,0);
  if (cameraDirection.length() > 0.2) {
    cameraMove = cameraDirection.normalize().multiplyScalar(cameraSpeed);
    camera.position.add(cameraMove);
  } else {
    camera.position.copy(targetPosition);
  }

  // Fade in/out the planets
  for (let i = 0; i < objects.length; i++) {
    if (i == targetIndex) {
      objects[i].setOpacity(1);
    } else {
      if (targetIndex == 0) {
        objects[i].setOpacity(1);
        torus.material.opacity = 1;
      } else {
        const offOpacity = 0.2;
        objects[i].setOpacity(offOpacity);
        torus.material.opacity = offOpacity;
      }
    }
  }
  renderer.render(scene, camera);
}
animate();




// Planet functions
function getRadialSpeed(distance) {
  if (distance == 0) {
    return 0;
  } else {
    return Math.sqrt(0.4/distance)/distance;
  }
}

function planetTexture(c) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext("2d");
  var grd = ctx.createLinearGradient(0, 0, 0, 150);
  for (var i = 0; i < c.length; i++) {
    grd.addColorStop(i/(c.length-1), c[i]);
  }
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let texture = new THREE.CanvasTexture(canvas);
  return texture;
}