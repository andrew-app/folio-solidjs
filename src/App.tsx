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
      <canvas id="c" class="-z-[1] w-[100vw] h-[100vh] block absolute"></canvas>
      <span id="title" class="mt-0 sm:w-[365px] h-32 flex 2k:mx-[43%] desktop:mx-[40%] mx-[30%]"></span>
    
      <a href="https://www.linkedin.com/in/andrew-a-81a828153/" id="linkedin" class="rounded-[20px] mt-[15px] sm:w-[500px] h-[500px] flex 2k:mx-[20%] 2k:my-[10%] desktop:mx-[40%] mx-[30%]"></a>
    </div>
  );
};
export default App;
