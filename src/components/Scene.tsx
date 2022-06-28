import * as THREE from 'three';
import { onCleanup } from "solid-js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export function Scene() {

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
    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }

    const mesh = new THREE.Object3D

    return {scene, camera, elem, mesh};
  }

  function setupTitle() {
    const sceneInfo = makeScene(document.querySelector('#title')!);
    const loader = new GLTFLoader();
      
      loader.load("src/assets/title.gltf", (gltf) => {
        const model = gltf.scene;
        sceneInfo.scene.add(model);
    });
    sceneInfo.camera.position.set(1.6,0.3,1.3);

    sceneInfo.scene.add( new THREE.AmbientLight( 0x404040 ) );

    const pointLight = new THREE.PointLight( 0xffffff, 1 );
    sceneInfo.camera.add( pointLight );
    const color = new THREE.Color("rgb(0, 0, 0)")
    sceneInfo.scene.background = color;
    return sceneInfo;
  }

  const sceneTitle = setupTitle();

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

  let frame = requestAnimationFrame(function loop(time) {
    time *= 0.01;
    resizeRendererToDisplaySize(renderer);
  
    renderer.setScissorTest(false);
    renderer.clear(true, true);
    renderer.setScissorTest(true);
    rendenerSceneInfo(sceneTitle);
    renderer.setClearColor( 0x000000, 0 );
    frame = requestAnimationFrame(loop);
  });

  onCleanup(() => {
    cancelAnimationFrame(frame);
  });
}
