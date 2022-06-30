import type { Component } from 'solid-js';

const Nav: Component = () => {
    function handler(id:string) {
        return (document.getElementById(id)!.scrollIntoView({ block: 'start',  behavior: 'smooth' })!);
    }
    return (
        <header class="sticky top-0 z-[1] transparent text-yellow-400 text-right bg-black">
        <button onClick={[handler, "about"]}>About Me</button>
        <br/>
        <button onClick={[handler, "tech"]}>Tech</button>
        <br/>
        <button>Experience</button>
        <br/>
        <button>Projects</button>
        <br/>
        <button>Education</button>
        </header>
    );
  };

export default Nav;