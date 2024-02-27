let scene, camera, renderer, vaseObject, curve, controlPoints;

init();
createVase();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl-output').appendChild(renderer.domElement);

    camera.position.z = 100;

    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-1, -1, -1);
    scene.add(directionalLight);

    controlPoints = [
        { x: 0, y: -20 }, // Base
        { x: 0, y: 0 },   // Middle
        { x: 0, y: 20 }   // Top
    ];

    animate();
}

function createVase() {
    if (vaseObject) scene.remove(vaseObject);

    const points = controlPoints.map(cp => new THREE.Vector2(cp.x, cp.y));
    const geometry = new THREE.LatheGeometry(points, 10);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    vaseObject = new THREE.Mesh(geometry, material);

    scene.add(vaseObject);
}

function updateShape() {
    controlPoints[0].x = parseFloat(document.getElementById('cp1').value);
    controlPoints[1].x = parseFloat(document.getElementById('cp2').value);
    controlPoints[2].x = parseFloat(document.getElementById('cp3').value);
    createVase();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
