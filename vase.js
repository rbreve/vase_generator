// Assuming Three.js and dat.GUI are included in your HTML

let scene, camera, renderer, latheMesh, curve;
let angularity = 10; // Initial value for angularity

const controlPoints = [
    new THREE.Vector3(-10, 2, 15),
    new THREE.Vector3(-5, 8, 6),
    new THREE.Vector3(5, 6, -7),
    new THREE.Vector3(10, 9, -20)
];

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(30, 20, 30);
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    document.body.appendChild(renderer.domElement);


    // OrbitControls setup
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Optional, but for a smoother damping effect
    controls.dampingFactor = 0.50;
    controls.screenSpacePanning = false;

    // Create a CatmullRomCurve3 and convert it to 2D points for LatheGeometry
    curve = new THREE.CatmullRomCurve3(controlPoints);
    const points2D = curve.getPoints(angularity).map(p => new THREE.Vector2(p.y, p.z));
    
    const geometry = new THREE.LatheGeometry(points2D, 20);
    
    const texture = new THREE.TextureLoader().load('t3.jpg' ); 
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    const material = new THREE.MeshPhongMaterial( { map:texture, side: THREE.DoubleSide } );
    // const material = new THREE.MeshPhongMaterial({ color: 0x6495ED, side: THREE.DoubleSide });

    latheMesh = new THREE.Mesh(geometry, material);
    scene.add(latheMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // GUI
    const gui = new dat.GUI();
    controlPoints.forEach((point, index) => {
        const folder = gui.addFolder(`Point ${index + 1}`);
        folder.add(point, 'y', -20, 20).onChange(updateLathe);
        folder.add(point, 'z', -40, 20).onChange(updateLathe);
        folder.open();
    });
    const folder = gui.addFolder(`Angularity`);
    folder.add({angularity: angularity}, 'angularity', 3, 15).step(1).onChange(value => {
        angularity = value;
        updateLathe();
    });
    folder.open();
 

}

function updateLathe() {
    curve = new THREE.CatmullRomCurve3(controlPoints);
    const points2D = curve.getPoints(angularity).map(p => new THREE.Vector2(p.y, p.z));
    latheMesh.geometry.dispose();
    latheMesh.geometry = new THREE.LatheGeometry(points2D, 20);
}

function animate() {
    requestAnimationFrame(animate);
    latheMesh.rotation.y += 0.01; // Add some rotation to the lathe object to view it from different angles
    controls.update(); 

    renderer.render(scene, camera);
}
