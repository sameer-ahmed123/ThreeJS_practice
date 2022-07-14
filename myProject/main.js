import './style.css'

import * as THREE from "three";
import { Scene } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);    // first argument is field of view , and the  second argument is aspect ratio. last argument is view fustrum
// const renderer = new THREE.WebGL1Renderer({
//   canvas: document.querySelector('#bg'),
// });
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);
  // render == draw


const geomerty = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color:0xFF6347});
const torus = new THREE.Mesh(geomerty, material);

scene.add(torus);  // use this method to add to the existing secen
// add lighting 
const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(20, 20, 20);
const ambientlight = new THREE.AmbientLight(0xfffff);
scene.add(pointlight, ambientlight);

// helper 
// const lighthelper = new THREE.PointLightHelper(pointlight);
// const gridhelper = new THREE.GridHelper(200,50);
// scene.add(lighthelper, gridhelper)

// moving mouse around 
const controls = new OrbitControls(camera, renderer.domElement)

// add stars with mathhelper 
function addStar(){
  const geomerty = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh( geomerty, material);

  const[x, y ,z] = Array(3).fill().map( ()=> THREE.MathUtils.randFloatSpread(100) )
  star.position.set(x, y, z)
  scene.add(star)
}
// how many stars to be added 
Array(200).fill().forEach(addStar)
// add a background texture
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


// avatar me 
const sameerTexture = new THREE.TextureLoader().load('sameer.jpg');

const sameer = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: sameerTexture }));

scene.add(sameer);


// moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
// bumps
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({map:moonTexture, normalMap:normalTexture,})
  
);
moon.position.z = 30;
moon.position.setX(-10);
scene.add(moon);
sameer.position.z = -5;
sameer.position.x = 2;


// move camera 
function moveCamera(){

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  sameer.rotation.y += 0.01;
  sameer.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;


// renderer.render(scene, camera);  // to see the changes ( secen.add() ) again call the render method
function animate(){  // we dont want to call renderer.render() method each time so we use a function to prefrom infinte loop to animate 
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();  // call controls.update(); in animation loop so it can be reflected acording to animation loop
}
animate()
