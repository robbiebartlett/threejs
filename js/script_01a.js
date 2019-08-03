/* ==========================================================================
  THREE.JS
============================================================================ */


//position var outside initialize to access within all functions
var camera, scene, controls, gui, renderer;

/* ==========================================================================
  Initialize - Scene 
============================================================================ */
function init() {

    //create a scene to hold elements - objects, lights, cameras
    scene = new THREE.Scene();

    //add a container for animation stats
    var stats = initStats();


/* ==========================================================================
  Geometry
============================================================================ */

    //Axis
    var axes = new THREE.AxesHelper(20);

    //add to scene
    scene.add(axes);


    //PLANE
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({color:0xd0d0d0});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    //recieve shadows
    plane.receiveShadow = true;

    //position
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0
    




    //SPHERE
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777FF, wireframe: false});
    var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

    //position
    sphere.position.set(0, 0, 0);

    //cast shadow
    sphere.castShadow = true;




    //Add objects to scene
    scene.add(sphere);
    scene.add(plane);
    
 



/* ==========================================================================
  Camera
============================================================================ */
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);


  // position and point the camera to the center of the scene
  camera.position.set(-30, 40, 30);
  camera.lookAt(scene.position);




/* ==========================================================================
  Lights
============================================================================ */

    //SPOTLIGHT
    var spotLight = new THREE.SpotLight(0xFFFFFF);

    //position
    spotLight.position.set(-40, 40, -15);

    //shadow start depth
    spotLight.shadowCameraNear = 40;

    //shadow end point
    spotLight.shadowCameraFar = 130;

    //cast shadows
    spotLight.castShadow = true;

    //add to scene;
    scene.add(spotLight);

    //Render pixel size
    spotLight.shadow.mapSize = new THREE.Vector2(2048, 2048);



  spotLight.shadow.camera.far = 130;
  spotLight.shadow.camera.near = 40;



  /* ==========================================================================
  GUI
============================================================================ */


controls = new function () {
    this.bouncingSpeed = 0.03;
};

gui = new dat.GUI();
gui.add(controls, 'bouncingSpeed', 0, 0.5);



/* ==========================================================================
  Renderer - calculate the scene object(s)
============================================================================ */
    renderer = new THREE.WebGLRenderer();

    //set background colour
    renderer.setClearColor(new THREE.Color(0x003D6E));

    //set renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);

    //render shadows
    renderer.shadowMap.enabled = true;

    //call the render function
    var step=0;

    function renderScene() {

    // update the stats and the controls
    trackballControls.update(clock.getDelta());
    stats.update();


    //Bounce the sphere
     //timing
     step += controls.bouncingSpeed;//controlled via GUI or use direct value, ie: 0.04;
     //position
     sphere.position.x = 0;
     sphere.position.y = 14 + 10*(Math.cos(step));


    //render using requestAnimationFrame
    requestAnimationFrame (renderScene);

    renderer.render(scene, camera);
    }



    //display output of the renderer to the html element
    document.getElementById("webgl-output").appendChild(renderer.domElement);   

    //controls respond to DOM events, place AFTER render call
    var trackballControls = initTrackballControls(camera, renderer);
    var clock = new THREE.Clock();



  // render the scene
  renderScene();



    //Initialize stats
    function initStats(type) {
    var panelType = (typeof type !== 'undefined' && type) && (!isNaN(type)) ? parseInt(type) : 0;
    var stats = new Stats();

    stats.showPanel(panelType); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
    return stats;
    }


}//end:initialize

//Resposive Browser
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }


//listen for resize events
window.addEventListener('resize', onResize, false);