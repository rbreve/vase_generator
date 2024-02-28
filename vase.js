// Ensure you have Three.js and dat.GUI included in your HTML

let scene, camera, renderer, curveObject, curve;
const controlPoints = [
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(-5, 5, 0),
    new THREE.Vector3(5, 5, 0),
    new THREE.Vector3(10, 0, 0)
];

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-1, -1, -1);
    scene.add(directionalLight);
    
    updateGeometry();

    // GUI setup
    const gui = new dat.GUI();
    controlPoints.forEach((point, index) => {
        const folder = gui.addFolder(`Point ${index + 1}`);
        folder.add(point, 'x', -20, 20).onChange(updateGeometry);
        folder.add(point, 'y', -20, 20).onChange(updateGeometry);
        folder.add(point, 'z', -20, 20).onChange(updateGeometry);
        folder.open();
    });
}

function updateGeometry() {
    if (curveObject) scene.remove(curveObject);

     

    //curve = new THREE.CatmullRomCurve3(controlPoints);
    const tubeGeometry = new THREE.LatheGeometry(controlPoints, 12, 0, Math.PI);
    const material = new THREE.MeshPhongMaterial({ color: 0xff5533, side: THREE.FrontSide });
    curveObject = new THREE.Mesh(tubeGeometry, material);
    scene.add(curveObject);


}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
