import * as THREE from 'three';
import { onCleanup } from "solid-js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import titlepath from '../assets/title.glb?url';
import lipath from '../assets/linkedin.glb?url';
import borderpath from '../assets/border.glb?url';

export function Scene() {
  const params = {
    exposure: 1.1,
    bloomStrength: 1.3,
    bloomThreshold: 0,
    bloomRadius: 0
  };

  const canvas:HTMLCanvasElement = document.querySelector('#c')!;
  const renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias: true});
  renderer.toneMapping = THREE.ReinhardToneMapping;
  
  function makeScene(elem:Element) {
    const scene = new THREE.Scene();

    const fov = 50;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);

    const mesh = new THREE.Object3D

    return {scene, camera, elem, mesh};
  }

  function setupTitle() {
    const sceneInfo = makeScene(document.querySelector('#title')!);
    
    sceneInfo.camera.position.set(1.6,0.3,1.3);

    sceneInfo.scene.add( new THREE.AmbientLight( 0x404040 ) );

    const pointLight = new THREE.PointLight( 0xffffff, 1 );
    sceneInfo.camera.add( pointLight );
    const renderScene = new RenderPass( sceneInfo.scene, sceneInfo.camera );
    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;
    const em = new THREE.MeshStandardMaterial({color:0xffc409,emissive:0xf9f06b})
    const composer = new EffectComposer( renderer );
    composer.addPass( renderScene );
    composer.addPass( bloomPass );
    const loader = new GLTFLoader();
      
    loader.load(titlepath, (gltf) => {
      const model = gltf.scene;
      model.traverse((o:any) => {
        if (o.isMesh) o.material = em;
      });
      sceneInfo.scene.add(model);
    });
    const color = new THREE.Color("rgb(0, 0, 0)")
    sceneInfo.scene.background = color;
    return {sceneInfo,composer};
  }

  function setuplin() {
    const sceneInfo = makeScene(document.querySelector('#linkedin')!);
    
    sceneInfo.camera.position.set(0.265,0.28,0.68);

    sceneInfo.scene.add( new THREE.AmbientLight( 0x404040 ) );

    const pointLight = new THREE.PointLight( 0xffffff, 1 );
    sceneInfo.camera.add( pointLight );
    const renderScene = new RenderPass( sceneInfo.scene, sceneInfo.camera );
    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;
    const em_border = new THREE.MeshStandardMaterial({color:0x3267fa,emissive:0x3267fa})
    const em_logo = new THREE.MeshStandardMaterial({color:0xf7eded,emissive:0xf7eded})
    const composer = new EffectComposer( renderer );
    composer.addPass( renderScene );
    composer.addPass( bloomPass );
    const loader = new GLTFLoader();
    
    loader.load(lipath, (gltf) => {
      const model = gltf.scene;
      model.traverse((o:any) => {
        if (o.isMesh) o.material = em_logo;
      });
      sceneInfo.scene.add(model);
    });

    loader.load(borderpath, (gltf) => {
      const model = gltf.scene;
      model.traverse((o:any) => {
        if (o.isMesh) o.material = em_border;
      });
      sceneInfo.scene.add(model);
    });
    const color = new THREE.Color("rgb(0, 0, 0)")
    sceneInfo.scene.background = color;
    return {sceneInfo, composer};
  }

  const sceneTitle = setupTitle();
  const linkedin = setuplin();

  function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function rendenerSceneInfo(sceneInfo: { scene: THREE.Scene; camera: THREE.PerspectiveCamera; elem: Element; mesh:THREE.Object3D }) {
    const {scene, camera, elem} = sceneInfo;

    // get the viewport relative position opf this element
    const {left, right, top, bottom, width, height} =
        elem.getBoundingClientRect();

    const isOffscreen =
        bottom < 0 ||
        top > renderer.domElement.clientHeight ||
        right < 0 ||
        left > renderer.domElement.clientWidth;

    if (isOffscreen) {
      return;
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
    renderer.setScissor(left, positiveYUpBottom, width, height);
    renderer.setViewport(left, positiveYUpBottom, width, height);

    renderer.render(scene, camera);
  }

  function neon(val:number){
    val += 0.075
    if (val >= 1.2){
      val = 0.9
    }

    return val;

  }
  
  var temp = 0.9;
  let frame = requestAnimationFrame(function loop(time) {
    frame = requestAnimationFrame(loop);
    time *= 0.01;
    temp = neon(temp);
    resizeRendererToDisplaySize(renderer);
    renderer.setScissorTest(false);
    renderer.clear(true, true);
    renderer.setScissorTest(true);
    rendenerSceneInfo(sceneTitle.sceneInfo);
    rendenerSceneInfo(linkedin.sceneInfo);
    sceneTitle.composer.render();
    linkedin.composer.render();
    renderer.setClearColor( 0x000000, 2 );
    renderer.toneMappingExposure = Math.pow(temp, 4.0 );
  });

  onCleanup(() => {
    cancelAnimationFrame(frame);
  });
}
