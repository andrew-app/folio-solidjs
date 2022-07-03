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
      {/* <Nav/> */}
      <canvas id="c" class="-z-[1] w-[100vw] h-[300vh] block absolute"></canvas>
      <span id="title" class="mt-0 sm:w-[365px] h-32 flex 2k:mx-[43%] desktop:mx-[40%] mx-[30%]"></span>
      <a href="https://www.linkedin.com/in/andrew-a-81a828153/" id="linkedin" class="mt-[15px] sm:w-[120px] h-[120px] flex 2k:mx-[35%] desktop:mx-[40%] mx-[30%]"></a>
      <main class="relative">
      <About/>
      <Tech/>
      </main>
    </div>
  );
};
export default App;
