let canvas = document.getElementById("mygame");
let ctx = canvas.getContext("2d");

let over = false;
let nobrick = false;
//  ball
let ballx = canvas.width / 2;
let bally = canvas.height - 30;
let ballRadius = 10;
let ballDx = 2;
let ballDy = 2;

//  pad
let padHeight = 10;
let padWidth = 80;
let padx = (canvas.width - padWidth) / 2;

//  brick
let brickRow = 3;
let brickCol = 6;
let brickWidth = 80;
let brickHeight = 20;
let brickPadding = 10;
let brickTop = 30;
let brickLeft = 30;

let brick = [];
for (let i = 0; i < brickCol; i++) {
  brick[i] = [];
  for (let j = 0; j < brickRow; j++) {
    brick[i][j] = {
      x: 0,
      y: 0,
      s: 1,
    };
  }
}

function drawball() {
  ctx.beginPath();
  ctx.arc(ballx, bally, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function drawpad() {
  ctx.beginPath();
  ctx.rect(padx, canvas.height - padHeight, padWidth, padHeight);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function drawbrick() {
  for (let x = 0; x < brickCol; x++) {
    for (let y = 0; y < brickRow; y++) {
      if (brick[x][y].s == 1) {
        let brickx = x * (brickWidth + brickPadding) + brickLeft;
        let bricky = y * (brickHeight + brickPadding) + brickTop;
        brick[x][y].x = brickx;
        brick[x][y].y = bricky;
        ctx.beginPath();
        ctx.rect(brickx, bricky, brickWidth, brickHeight);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawball();
  drawpad();
  drawbrick();
}

function moveball() {
  ballx += ballDx;
  bally += ballDy;
  if (ballx + ballRadius > canvas.width || ballx + ballRadius < 0) {
    ballDx = -ballDx;
  }
  if (bally - ballRadius < 0) {
    ballDy = -ballDy;
  } else if (bally + ballRadius > canvas.height - padHeight) {
    if (ballx > padx && ballx < padx + padWidth) {
      ballDy = -ballDy;
    } else {
      over = true;
      alert("Game over!!");
    }
  }
  for (let x = 0; x < brickCol; x++) {
    for (let y = 0; y < brickRow; y++) {
      let b = brick[x][y];
      if (b.s == 1) {
        if (
          ballx > b.x &&
          ballx < b.x + brickWidth &&
          bally > b.y &&
          bally < b.y + brickHeight
        ) {
          ballDy = -ballDy;
          b.s = 0;
        }
      }
    }
  }
}

function cheakbrick() {
  nobrick = brick.every((col) => col.every((row) => row.s == 0));
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawball();
  drawpad();
}

function win() {
  alert("恭喜獲勝");
}

function gamestart() {
  draw();
  moveball();
  cheakbrick();
  cheakbrick();
  if (!over && !nobrick) {
    requestAnimationFrame(gamestart);
  } else {
    clear();
    setTimeout(win, 500);
    return;
  }
}

gamestart();
