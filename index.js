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
  textureLoader.load('assets/normal-map3.jpg')
];


////// Setup //////
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 3, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.up = vec(0,1,0);
camera.lookAt(vec(0,0,0));
scene.add(camera);
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
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
  constructor(radius, c, distance, text) {
    // Variables
    this.radius = radius;
    this.distance = distance;
    this.color = c;
    this.speed = getRadialSpeed(distance);
    this.angle = 0;
    
    // Materials
    var textMaterial = new THREE.MeshBasicMaterial({map: fontTexture(text)});
    var planetMaterial = new THREE.MeshStandardMaterial(
      {
        map: planetTexture(c), 
        normalMap: normalMaps[Math.floor(Math.random()*normalMaps.length)]
      });
    planetMaterial.transparent = true;
    textMaterial.transparent = true;

    // Meshes
    this.textMesh = new THREE.Mesh(new THREE.TorusGeometry(1.2*radius, 0.3*radius, 16, 100),
      textMaterial);
    this.mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 64),
      planetMaterial);
    this.textMesh.renderOrder = 2;
    this.textMesh.rotation.x = -Math.PI/2;
    scene.add(this.mesh, this.textMesh);
  }
  orbit() {
    this.angle += this.speed;
    const x = Math.cos(this.angle) * this.distance;
    const z = Math.sin(this.angle) * this.distance;
    this.setPlanetPosition(vec(x, 0, z));
    this.mesh.rotation.y -= 0.01;
  }
  setPlanetPosition(pos) {
    this.mesh.position.copy(pos);
    this.textMesh.position.copy(pos)
  }
  rotateText() {
    this.textMesh.rotation.z += 0.01;
  }
  setOpacity(opacity) {
    this.mesh.material.opacity = opacity;
    this.textMesh.material.opacity = opacity
  }
  setVisibility(value) {
    this.mesh.visible = value;
    this.textMesh.visible = value;
  }
}

// Create Planets
const orange2Yellow = ["#D4145A", "#FBB03B"];
const blue2Green = ["#02AABD", "#00CDAC"];
const purple2Pink = ["#662D8C", "#ED1E79"];
const celestial = ["#09203F", "#537895"];
const quepal = ["#34e89e", "#0f3443"];
let sun = new Planet(10, orange2Yellow, 0, "Aebel Shajan");
let planet_1 = new Planet(2, quepal, 30, "Skills");
let planet_2 = new Planet(3, purple2Pink, 40, "Projects");
let planet_3 = new Planet(1, celestial, 50, "Contact");
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
    objects[i].rotateText();
  }
  
  // Move the camera towards the target position
  const minCamDistance = 5*objects[targetIndex].radius/(0.0007*Math.max(window.innerWidth, window.innerHeight));
  const targetPosition = vec().copy(objects[targetIndex].mesh.position).add(vec(0, 0, minCamDistance));
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


// Button events
let buttons = document.getElementsByClassName('pages')[0].getElementsByTagName('button');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    targetIndex = i;
    let descriptionPages = document.body.getElementsByClassName("description")[0].getElementsByTagName('page');
    let panel1Pages = document.body.getElementsByClassName("panel-1")[0].getElementsByTagName('page');
    let panel2Pages = document.body.getElementsByClassName("panel-2")[0].getElementsByTagName('page');
    for (let j = 0; j < buttons.length; j++) {
      buttons[j].setAttribute('class', '');
      descriptionPages[j].setAttribute('class', 'hide');
      panel1Pages[j].setAttribute('class', 'hide');
      panel2Pages[j].setAttribute('class', 'hide');
    }
    buttons[i].setAttribute('class', 'active');
    descriptionPages[i].setAttribute('class', 'show');
    panel1Pages[i].setAttribute('class', 'show');
    panel2Pages[i].setAttribute('class', 'show');
  });
}


// Planet functions
function getRadialSpeed(distance) {
  if (distance == 0) {
    return 0;
  } else {
    return Math.sqrt(0.4/distance)/distance;
  }
}
function fontTexture(text) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 1024;
  var fontSize = canvas.width/text.length;
  canvas.height = 5*fontSize;
  context.font = "Bold " + String(1.3*fontSize) + "px Lucida Console";
  context.fillStyle = "rgba(255,255,255,1)";
  context.fillText(text, 0, 0.5*(fontSize + canvas.height));
  let texture = new THREE.CanvasTexture(canvas);
  texture.transparent = true;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3,1);
  texture.offset.set(0,0.5);
  texture.needsUpdate = true;
  return texture;
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