export function getCtx(id) {
  const canvas = document.getElementById(id);
  return canvas.getContext('2d');
}

export function drawCanvasFillRect() {
  const ctx = getCtx('canvas-fillRect');
  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(10, 10, 100, 100);
  ctx.fillStyle = 'rgb(0 0 200 / 50%)';
  ctx.fillRect(60, 60, 100, 100);
}

export function drawCanvasLineTo() {
  const ctx = getCtx('canvas-lineTo');
  ctx.strokeStyle = 'hotpink';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(110, 10);
  ctx.lineTo(110, 60);
  ctx.lineTo(40, 60);
  ctx.stroke();
}

export function drawCanvasArc() {
  const ctx = getCtx('canvas-arc');
  ctx.strokeStyle = 'hotpink';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(100, 100, 40, 0, 2 * Math.PI);
  ctx.stroke();
}

export function drawCanvasArcNoBeginPath() {
  const ctx = getCtx('canvas-arc-no-beginPath');
  ctx.strokeStyle = 'hotpink';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(50, 50, 40, 0, 2 * Math.PI)
  ctx.stroke();
  ctx.strokeStyle = 'deepskyblue';
  ctx.arc(150, 80, 40, 0, 2 * Math.PI)
  ctx.stroke();
  
  ctx.beginPath();
  ctx.strokeStyle = 'darkorange';
  ctx.arc(70, 150, 40, 0, 2 * Math.PI)
  ctx.stroke();
}

export function drawCanvasBezierCurveTo() {
  const ctx = getCtx('canvas-bezierCurveTo');
  // starting point
  const xStart = 20;
  const yStart =100;
  const xEnd = 180;
  const yEnd = 100;
  const cp1x = 60;
  const cp1y = 20;
  const cp2x = 120;
  const cp2y = 160;
  const r = 6;

  // start
  ctx.beginPath();
  ctx.arc(xStart, yStart, r, 0, 2 * Math.PI);
  ctx.strokeStyle = 'deepskyblue';
  ctx.stroke();

  // cp 1
  ctx.beginPath();
  ctx.arc(cp1x, cp1y, r, 0, 2 * Math.PI);
  ctx.strokeStyle = 'darkorange';
  ctx.stroke();

  // start tangent
  ctx.beginPath();
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(cp1x, cp1y);
  ctx.strokeStyle = '#999';
  ctx.stroke();

  // end
  ctx.beginPath();
  ctx.arc(xEnd, yEnd, r, 0, 2 * Math.PI);
  ctx.strokeStyle = 'deepskyblue';
  ctx.stroke();

  // cp 2
  ctx.beginPath();
  ctx.arc(cp2x, cp2y, r, 0, 2 * Math.PI);
  ctx.strokeStyle = 'darkorange';
  ctx.stroke();

  // end tangent
  ctx.beginPath();
  ctx.moveTo(xEnd, yEnd);
  ctx.lineTo(cp2x, cp2y);
  ctx.strokeStyle = '#999';
  ctx.stroke();

  // bezier curve
  ctx.beginPath();
  ctx.moveTo(xStart, yStart);
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, xEnd, yEnd);
  ctx.strokeStyle = 'hotpink';
  ctx.lineWidth = 4;
  ctx.stroke();
}