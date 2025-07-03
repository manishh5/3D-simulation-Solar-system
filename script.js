import * as THREE from "./three.module.js";

const container = document.getElementById("container");
const controlsDiv = document.getElementById("controls");

let isPaused = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / (0.8 * window.innerHeight),
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
container.appendChild(renderer.domElement);

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
scene.add(sun);

const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(0, 0, 0);
scene.add(light);

camera.position.z = 40;

const planets = [
  { name: "Mercury", color: 0xaaaaaa, distance: 6, size: 0.5, speed: 0.04 },
  { name: "Venus", color: 0xffddaa, distance: 8, size: 0.7, speed: 0.03 },
  { name: "Earth", color: 0x2233ff, distance: 10, size: 0.75, speed: 0.025 },
  { name: "Mars", color: 0xff3300, distance: 12, size: 0.6, speed: 0.02 },
  { name: "Jupiter", color: 0xffa500, distance: 15, size: 1.2, speed: 0.015 },
  { name: "Saturn", color: 0xffe066, distance: 18, size: 1.1, speed: 0.012 },
  { name: "Uranus", color: 0x66ccff, distance: 21, size: 1, speed: 0.009 },
  { name: "Neptune", color: 0x0000ff, distance: 24, size: 1, speed: 0.007 },
];

planets.forEach((planet) => {
  planet.mesh = new THREE.Mesh(
    new THREE.SphereGeometry(planet.size, 32, 32),
    new THREE.MeshStandardMaterial({ color: planet.color })
  );
  scene.add(planet.mesh);
  planet.angle = Math.random() * Math.PI * 2;

  const label = document.createElement("label");
  label.innerText = planet.name;
  const input = document.createElement("input");
  input.type = "range";
  input.min = 0.001;
  input.max = 0.1;
  input.step = 0.001;
  input.value = planet.speed;
  input.oninput = () => (planet.speed = parseFloat(input.value));

  controlsDiv.appendChild(label);
  controlsDiv.appendChild(input);
});

function animate() {
  if (!isPaused) {
    planets.forEach((planet) => {
      planet.angle += planet.speed;
      planet.mesh.position.x = planet.distance * Math.cos(planet.angle);
      planet.mesh.position.z = planet.distance * Math.sin(planet.angle);
    });
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

document.getElementById("pauseBtn").onclick = () => (isPaused = true);
document.getElementById("resumeBtn").onclick = () => (isPaused = false);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / (0.8 * window.innerHeight);
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
});
