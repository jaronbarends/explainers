const canvas = document.getElementById('canvas-animated-wave');
const ctx = canvas.getContext('2d');
const canvasW = canvas.offsetWidth;
const canvasH = canvas.offsetHeight;
// const xStart = 0;
// const yStart =100;
// const cp1x = 60;
// const cp1y = 20;

// const xEnd = canvasW;
// const yEnd = 200;
// const cp2x = 420;
// const cp2y = 160;

// const r = 6;
const rPoint = 4;
const rCp = 6;

const startPoint = {
  cx: 0,
  cy: 100,
  x: 0,
  y: 100,
  r: 0,
  turnDuration: 1000,
  cp: {
    cx: 60,
    cy: 20,
    x: 60,
    y: 20,
    r: 40,
    turnDuration: 1000,
  }
}

const endPoint = {
  cx: canvasW,
  cy: 200,
  x: canvasW,
  y: 200,
  r: 0,
  turnDuration: 1000,
  cp: {
    cx: 420,
    cy: 160,
    x: 420,
    y: 160,
    r: 40,
    turnDuration: 1000,
  }
}

// init();

export function init() {
  initAnimation();
  draw();
}

function draw() {
  drawWave();
  ctx.fillStyle = 'black';
  drawReferences();
}

function drawReferences() {
  drawReference(startPoint);
  drawReference(endPoint);
}

function drawReference(point) {
  drawCircle(point.x, point.y, rPoint);
  drawCircle(point.cp.x, point.cp.y, rCp);
  drawSingleLine(point.x, point.y, point.cp.x, point.cp.y);
}

function drawWave() {
  ctx.beginPath();
  ctx.fillStyle = 'hotpink';
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.bezierCurveTo(startPoint.cp.x, startPoint.cp.y, endPoint.cp.x, endPoint.cp.y, endPoint.x, endPoint.y);
  ctx.lineTo(endPoint.x, canvasH);
  ctx.lineTo(startPoint.x, canvasH);
  ctx.closePath();
  ctx.fill();
}

function drawCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
}

function drawSingleLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function initAnimation() {
  
}