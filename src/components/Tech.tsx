import type { Component } from 'solid-js';
const Tech: Component = () => {
  
    return (
      <div class="flex flex-col mx-auto max-w-5xl min-h-screen snap-y" id="tech">
        <h1 class="text-center my-8">Technical Skills</h1>
        <div class="p-3 rounded-lg flex items-center justify-center bg-gradient-to-r from-cyan-500 to-teal-500 shadow-lg snap-start my-36 pb-8">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    );
    
  };

export default Tech;