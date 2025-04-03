const canvas = document.getElementById("mygame");
const ctx = canvas.getContext("2d");
let over = false;

// Ball properties
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballRadius = 10;
let ballDx = 2;
let ballDy = -2;

// Paddle properties
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// Brick properties
let brickRowCount = 4;
let brickColumnCount = 6;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

// Create bricks array
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Draw paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Draw bricks
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// Draw everything
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw ball
  drawBall();

  // Draw paddle
  drawPaddle();

  // Draw bricks
  drawBricks();
}

// Move ball
function moveBall() {
  ballX += ballDx;
  ballY += ballDy;

  // Bounce off walls
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    ballDx = -ballDx;
  }
  if (ballY - ballRadius < 0) {
    ballDy = -ballDy;
  } else if (ballY + ballRadius > canvas.height - paddleHeight) {
    // Check if ball hits paddle
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      ballDy = -ballDy;
    } else {
      // Game over
      ovre = true;
      alert("GAME OVER");

      //   document.location.reload();
    }
  }

  // Check if ball hits bricks
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (
          ballX > b.x &&
          ballX < b.x + brickWidth &&
          ballY > b.y &&
          ballY < b.y + brickHeight
        ) {
          ballDy = -ballDy;
          b.status = 0;
        }
      }
    }
  }
}

// Move paddle with keyboard input
function movePaddle(e) {
  // Check if left arrow key is pressed
  if (e.keyCode == 37) {
    paddleX -= 20;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
  // Check if right arrow key is pressed
  else if (e.keyCode == 39) {
    paddleX += 20;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  }
}

// Event listener for keyboard input
document.addEventListener("keydown", movePaddle, false);

// Game loop
function gameLoop() {
  draw();
  moveBall();
  if (!over) {
    requestAnimationFrame(gameLoop);
  } else {
    return;
  }
}

// Start game loop
gameLoop();
