import * as THREE from "three"; // Import the Three.js library
import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // Import OrbitControls for camera control

const canvas = document.getElementById("canvas"); // Get the canvas element from the HTML

// Create Scene
const scene = new THREE.Scene(); // Create a new scene
scene.background = new THREE.Color("#F0F0F0"); // Set the scene background color

// Add the camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 5; // Position the camera 5 units away from the origin

// Create and add a cube object
const geometry = new THREE.DodecahedronGeometry(); // Create a dodecahedron geometry
const material = new THREE.MeshLambertMaterial({
  color: "#468585", // Material color
  emissive: "#468585",
});

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2); // Create a box geometry
const boxMaterial = new THREE.MeshStandardMaterial({
  color: "#B4B4B3", // Material color
  emissive: "#B4B4B3",
});

const box = new THREE.Mesh(boxGeometry, boxMaterial); // Create a mesh from the box geometry and material
box.position.y = -1.5; // Position the box 1.5 units below the origin
const dodecahedron = new THREE.Mesh(geometry, material); // Create a mesh from the dodecahedron geometry and material
scene.add(dodecahedron); // Add the dodecahedron to the scene
scene.add(box); // Add the box to the scene

// Add lighting
const light = new THREE.SpotLight(0x006769, 100); // Create a spot light
light.position.set(1, 1, 1); // Position the light
scene.add(light); // Add the light to the scene

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ canvas }); // Create a WebGL renderer and attach it to the canvas
renderer.setSize(window.innerWidth, window.innerHeight); // Set the renderer size to the window size
renderer.setPixelRatio(window.devicePixelRatio); // Set the pixel ratio to the device's pixel ratio

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement); // Create OrbitControls for camera control
controls.enableDamping = true; // Enable damping for smoother camera movement
controls.dampingFactor = 0.05; // Set the damping factor
controls.enableZoom = true; // Enable zooming
controls.enablePan = true; // Enable panning

// Animate the scene
function animate() {
  requestAnimationFrame(animate); // Request the next frame

  dodecahedron.rotation.x += 0.01; // Rotate the dodecahedron around the x-axis
  dodecahedron.rotation.y += 0.01; // Rotate the dodecahedron around the y-axis

  box.rotation.y += 0.005; // Rotate the box around the y-axis

  controls.update(); // Update the OrbitControls

  renderer.render(scene, camera); // Render the scene
}

// Handle Window Resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

animate(); // Start the animation
