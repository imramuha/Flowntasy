import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage.jsx';

const video = ReactDOM.findDOMNode(HomePage).querySelector('.cube');
console.log(video);
    console.log(video);

    // Get the button
    const btn = document.getElementById("myBtn");

    // Pause and play the video, and change the button text
    function myFunction() {
    if (video.paused) {
        video.play();
        btn.innerHTML = "Pause";
    } else {
        video.pause();
        btn.innerHTML = "Play";
    }
    }

    // randomize spots for our chatboxes
    const spot = Math.random();
    const cube = document.querySelectorAll('cube');
    cube.style.setProperty('--left', spot +'vh');