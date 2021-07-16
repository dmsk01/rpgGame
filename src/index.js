import './index.scss';
import SenseiWalk from './assets/Male-4-Walk.png';
import terrainAtlas from './assets/terrain.png';
import worldConfig from './configs/world.json';
import ClientGame from './client/ClientGame';

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const image = document.createElement('img');
image.src = SenseiWalk;

const terrain = document.createElement('img');
terrain.src = terrainAtlas;

const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 1;
let pY = (canvas.offsetHeight - spriteH) / 2; // Canvas Position on Y axis
let pX = (canvas.offsetWidth - spriteW) / 2; // Canvas Position on X axis
let direction = '';
let side = 0;

let bottomPressed = false;

function keyDownHandler(event) {
  if (event.key === 'Down' || event.key === 'ArrowDown') {
    bottomPressed = true;
    direction = 'down';
    side = spriteH * 0;
  }
  if (event.key === 'Left' || event.key === 'ArrowLeft') {
    bottomPressed = true;
    direction = 'left';
    side = spriteH * 1;
  }
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    bottomPressed = true;
    direction = 'right';
    side = spriteH * 2;
  }
  if (event.key === 'Up' || event.key === 'ArrowUp') {
    bottomPressed = true;
    direction = 'up';
    side = spriteH * 3;
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

function walk() {
  if (bottomPressed) {
    switch (direction) {
      case 'down':
        if (pY <= canvas.offsetHeight - spriteH) {
          pY += 10;
        }
        break;
      case 'up':
        if (pY >= 0) {
          pY -= 10;
        }
        break;
      case 'right':
        if (pX <= canvas.offsetWidth - spriteW) {
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
  context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  context.drawImage(image, cycle * spriteW, side, spriteW, spriteH, pX, pY, 48, 48);

  window.requestAnimationFrame(walk);
}

image.addEventListener('load', () => {
  window.requestAnimationFrame(walk);
});

const { map } = worldConfig;

window.addEventListener('load', () => {
  ClientGame.init({ tagId: 'game' });
});

setTimeout(() => {
  document.getElementById('loading').style.transition = 'all 0.5s ease';
  document.getElementById('loading').style.visibility = 'hidden';
  document.getElementById('loading').style.opacity = 0;
}, 500);
