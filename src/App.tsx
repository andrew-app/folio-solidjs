import { Component, onMount } from 'solid-js';
import logo from './logo.svg';
import { Scene } from './components/Scene';
import About from './components/About';
import Tech from './components/Tech';
import Nav from './components/Nav';
const App: Component = () => {
  onMount(async  () => {
    Scene();
  });
  return (
    <div>
      <Nav/>
      <canvas id="c" class="-z-[1] w-[100vw] h-[100vh] block fixed"></canvas>
    <h1>
        <span id="title" class="my-px sm:w-[365px] h-32 inline-block 2k:mx-[43%] desktop:mx-[40%] mx-[30%]"></span>
    </h1>
      <main class="relative">
      <About/>
      <Tech/>
      </main>
    </div>
  );
};
export default App;
