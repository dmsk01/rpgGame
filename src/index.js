import './index.scss';
import SenseiWalk from './assets/Male-4-Walk.png';

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const image = document.createElement('img');
image.src = SenseiWalk;

const spriteWidth = 48;
const spriteHeigth = 48;
const shots = 3;
let cycle = 1;
let pY = 270; // Canvas Position on Y axis
let pX = 270; // Canvas Position on X axis
let direction = '';
let side = 0;

let bottomPressed = false;

function keyDownHandler(event) {
  if (event.key === 'Down' || event.key === 'ArrowDown') {
    bottomPressed = true;
    direction = 'down';
    side = 0;
  }
  if (event.key === 'Up' || event.key === 'ArrowUp') {
    bottomPressed = true;
    direction = 'up';
    side = 144;
  }
  if (event.key === 'Left' || event.key === 'ArrowLeft') {
    bottomPressed = true;
    direction = 'left';
    side = 48;
  }
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    bottomPressed = true;
    direction = 'right';
    side = 96;
  }
}

function keyUpHandler(event) {
  if (event.key === 'Down' || event.key === 'ArrowDown') {
    bottomPressed = false;
  }
  if (event.key === 'Up' || event.key === 'ArrowUp') {
    bottomPressed = false;
  }
  if (event.key === 'Left' || event.key === 'ArrowLeft') {
    bottomPressed = false;
  }
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    bottomPressed = false;
  }
  cycle = 1;
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

image.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPressed) {
      switch (direction) {
        case 'down':
          if (pY <= 600 - spriteHeigth) {
            pY += 10;
          }
          break;
        case 'up':
          if (pY >= 0) {
            pY -= 10;
          }
          break;
        case 'right':
          if (pX <= 600 - spriteWidth) {
            pX += 10;
          }
          break;
        case 'left':
          if (pX >= 0) {
            pX -= 10;
          }
          break;
        default:
          break;
      }
      cycle = (cycle + 1) % shots;
    }
    context.clearRect(0, 0, 600, 600);
    context.drawImage(image, cycle * spriteWidth, side, spriteWidth, spriteHeigth, pX, pY, 48, 48);
  }, 120);
});

setTimeout(() => {
  document.getElementById('loading').style.transition = 'all 0.5s ease';
  document.getElementById('loading').style.visibility = 'hidden';
  document.getElementById('loading').style.opacity = 'none';
}, 500);
