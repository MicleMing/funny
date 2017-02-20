'use strict';

const baseCanvas = document.getElementById('base');
const ctx = baseCanvas.getContext('2d');

ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);
ctx.clearRect(20, 20, 80, 80);
ctx.strokeRect(30, 30, 60, 60);

ctx.beginPath();
ctx.moveTo(40, 40);
ctx.lineTo(80, 80);
ctx.lineTo(40, 80);
ctx.fill();


const cricleCanvas = document.getElementById('cricle');
const ctx1 = cricleCanvas.getContext('2d');

const drawCricle = (w, h) => {

    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            let x = 25 + j * 50;
            let y = 25 + i * 50;
            let r = 25;
            let start = 0;
            let end = Math.PI * 2;
            let action = false;

            ctx1.beginPath();
            ctx1.arc(x, y, r, start, end, action);
            ctx1.strokeStyle = '#' + Math.floor(1000000 * Math.random());
            ctx1.stroke();
            ctx1.closePath();
        }
    }
}

drawCricle(4, 5);

const colorCanvas = document.getElementById('color');
const ctx2 = colorCanvas.getContext('2d');

const drawColor = () => {
    ctx2.fillStyle = '#FD0';
    ctx2.fillRect(0, 0, 75, 75);

    ctx2.fillStyle = '#6C0';
    ctx2.fillRect(75, 0, 75, 75);

    ctx2.fillStyle = '#09F';
    ctx2.fillRect(75, 75, 75, 75);

    ctx2.fillStyle = '#F30';
    ctx2.fillRect(0, 75, 75, 75);

    ctx2.globalAlpha = 0.2;
    ctx2.fillStyle = '#FFF';

    for (let i = 0; i< 7; i++) {
        ctx2.beginPath();
        ctx2.arc(75, 75, i * 12.5, 0, Math.PI * 2, true);
        ctx2.fill();
    }
}

drawColor()

// setInterval(function () {
//     ctx2.clearRect(0, 0, 150, 150);
//     drawColor();
// }, 100)
