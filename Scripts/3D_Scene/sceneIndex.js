const container = document.getElementById(THREE_CONTAINER_ID);

const sceneManager = new SceneManager(container);

// Create cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffaf00 } );
const cube = new THREE.Mesh( geometry, material );

sceneManager.scene.add(cube);

let clock = new THREE.Clock();

function animate() 
{
	requestAnimationFrame( animate );

	cube.rotation.x += 0.005;
	cube.rotation.y += 0.005;

	sceneManager.update(clock.getDelta());
}
animate();


window.addEventListener('resize', function() {
	sceneManager.onSceneResize();
});
