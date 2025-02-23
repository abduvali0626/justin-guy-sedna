// Game Initialization
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 30,
  speed: 5,
};

let shiftStatus = "None";
let shiftTimer = 0;

// Game Update Loop
function update() {
  // Adjust canvas size on window resize
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the environment: sky, clouds, ground
  drawEnvironment();

  // Handle player movement
  if (keys.up && player.y > 0) player.y -= player.speed;
  if (keys.down && player.y < canvas.height - player.size)
    player.y += player.speed;
  if (keys.left && player.x > 0) player.x -= player.speed;
  if (keys.right && player.x < canvas.width - player.size)
    player.x += player.speed;

  // Simulate shifting reality periodically
  if (Math.random() < 0.01) {
    triggerRealityShift();
  }

  // Draw player
  ctx.fillStyle = "#ff5733";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fill();

  // Update HUD info
  document.getElementById("playerInfo").textContent = `Position: (${Math.round(
    player.x
  )}, ${Math.round(player.y)})`;
  document.getElementById(
    "shiftInfo"
  ).textContent = `Reality Shift: ${shiftStatus}`;

  // Request next frame
  requestAnimationFrame(update);
}

// Draw the environment: sky, clouds, ground
function drawEnvironment() {
  // Draw sky
  ctx.fillStyle = shiftTimer > 0 ? "#cc33ff" : "#5fa8d3"; // Sky is purple when shifted
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Randomly create distortions
  if (shiftTimer > 0) {
    distortEnvironment();
  }

  // Draw clouds
  ctx.fillStyle = shiftTimer > 0 ? "#e6b3ff" : "#ffffff"; // Change cloud color when shifted
  drawClouds();

  // Draw distorted ground
  ctx.fillStyle = shiftTimer > 0 ? "#800080" : "#32cd32"; // Ground is purple during the shift
  ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
}

// Draw cloud shapes in random locations
function drawClouds() {
  let cloudCount = 10 + Math.random() * 5;
  for (let i = 0; i < cloudCount; i++) {
    let cloudX = Math.random() * canvas.width;
    let cloudY = Math.random() * (canvas.height / 2);
    let cloudSize = Math.random() * 50 + 50;

    ctx.beginPath();
    ctx.arc(cloudX, cloudY, cloudSize, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Introduce distortions and random changes in the environment
function distortEnvironment() {
  let distortionChance = Math.random();
  if (distortionChance < 0.05) {
    // Create random distortions in the sky
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      (Math.random() * canvas.height) / 2,
      Math.random() * 100 + 50,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  if (distortionChance < 0.1) {
    // Distort clouds
    ctx.fillStyle = "#e6b3ff";
    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * (canvas.height / 2),
      Math.random() * 100 + 50,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  if (distortionChance < 0.07) {
    // Flickering ground or adding strange objects
    ctx.fillStyle = "#800080";
    ctx.fillRect(
      Math.random() * canvas.width,
      canvas.height - 100,
      Math.random() * 100,
      10
    );
  }
}

// Reality Shift Effect
function triggerRealityShift() {
  if (shiftTimer <= 0) {
    shiftStatus = "Shifting...";

    setTimeout(() => {
      shiftTimer = 100; // Set the shift duration
      // After shift, reset status after the shift timer ends
      setTimeout(() => {
        shiftStatus = "None";
        shiftTimer = 0;
      }, 2000); // Shift duration of 2 seconds
    }, 100);
  }
}

// Key event listeners for movement
let keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") keys.up = true;
  if (e.key === "ArrowDown") keys.down = true;
  if (e.key === "ArrowLeft") keys.left = true;
  if (e.key === "ArrowRight") keys.right = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") keys.up = false;
  if (e.key === "ArrowDown") keys.down = false;
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
});

// Start the game loop
update();
