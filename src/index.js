import './index.scss';
import SenseiWalk from './assets/Male-4-Walk.png';

const canvas = document.getElementById('game');
const map = document.getElementById('map');
const context = canvas.getContext('2d');
const mapContext = map.getContext('2d');

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

mapContext.fillStyle = '#c79a5b';

mapContext.fillRect(250, 400, 100, 200);
mapContext.fillRect(0, 400, 300, 100);
mapContext.fillRect(300, 400, 300, 100);
mapContext.fillRect(100, 0, 100, 400);
mapContext.fillRect(400, 0, 100, 400);

mapContext.fillStyle = '#3da5ff';
mapContext.fillRect(200, 0, 200, 200);

mapContext.fillStyle = '#1fb526';

mapContext.beginPath();
mapContext.moveTo(50, 50);
mapContext.lineTo(75, 100);
mapContext.lineTo(25, 100);
mapContext.fill();
mapContext.beginPath();
mapContext.moveTo(50, 70);
mapContext.lineTo(75, 120);
mapContext.lineTo(25, 120);
mapContext.fill();
mapContext.fillStyle = '#c79a5b';
mapContext.fillRect(45, 120, 10, 20);

mapContext.fillStyle = '#1fb526';

mapContext.beginPath();
mapContext.moveTo(550, 530);
mapContext.lineTo(575, 580);
mapContext.lineTo(525, 580);
mapContext.fill();
mapContext.beginPath();
mapContext.moveTo(550, 510);
mapContext.lineTo(575, 560);
mapContext.lineTo(525, 560);
mapContext.fill();
mapContext.fillStyle = '#c79a5b';
mapContext.fillRect(545, 580, 10, 20);

mapContext.fillStyle = '#1fb526';

mapContext.beginPath();
mapContext.moveTo(550, 250);
mapContext.lineTo(575, 300);
mapContext.lineTo(525, 300);
mapContext.fill();
mapContext.beginPath();
mapContext.moveTo(550, 220);
mapContext.lineTo(575, 270);
mapContext.lineTo(525, 270);
mapContext.fill();
mapContext.fillStyle = '#c79a5b';
mapContext.fillRect(545, 300, 10, 20);

mapContext.fillStyle = '#999';
mapContext.fillRect(520, 100, 70, 90);
mapContext.fillRect(510, 190, 90, 20);
mapContext.fillRect(510, 80, 90, 20);
mapContext.fillRect(510, 60, 20, 20);
mapContext.fillRect(545, 60, 20, 20);
mapContext.fillRect(580, 60, 20, 20);

mapContext.fillStyle = '#8a3f06';
mapContext.fillRect(540, 140, 30, 40);
