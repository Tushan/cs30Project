let openingPage;
let coffeeCup, coffee, milk, done, cafeReference; // Game assets
let gameState = "start"; // Possible states: "start", "makingCoffee"
let currentStep = 0; // Track the current step
let backgroundMusic;

let fadeAlpha = 0; // For fade-in animation of text
let titleY = -100; // Y position for the title (starting off-screen)
let titleDirection = 1; // For the animation (moving up and down)

let coffeeCupPos, coffeePos, milkPos; // Static positions for images
let doneX, doneY; // Position of the done image
let doneXSpeed = 3; // Speed for bouncing animation (horizontal)
let doneYSpeed = 2; // Speed for bouncing animation (vertical)
let doneScale = 1; // Scale for zooming animation
let doneScaleDirection = 0.02; // Scale speed for zooming animation

function preload() {
  // Load images for the coffee-making game
  openingPage = loadImage("assets/images/open_page.jpg");
  coffeeCup = loadImage("assets/images/coffee_cup.png");
  coffee = loadImage("assets/images/coffee.png");
  milk = loadImage("assets/images/milk.png");
  done = loadImage("assets/images/done.png");
  cafeReference = loadImage("assets/images/cafe_basic_reference.jpg"); // Updated cafe reference image

  // Load background music
  backgroundMusic = loadSound("assets/audio/background-music.mp3");
}

function setup() {
  createCanvas(800, 600);
  backgroundMusic.loop(); // Start looping background music

  // Set static positions for the images
  coffeeCupPos = { x: width / 4 - 50, y: height / 2 - 50 };
  coffeePos = { x: width / 2 - 50, y: height / 2 - 50 };
  milkPos = { x: (3 * width) / 4 - 50, y: height / 2 - 50 };

  // Set initial position for the `done` image
  doneX = width / 2 - 50;
  doneY = height / 2 - 50;
}

function draw() {
  clear(); // Clears the canvas to remove the trail
  
  if (gameState === "start") {
    showOpeningPage(); // Show the opening page with `open_page.jpg`
  } else if (gameState === "makingCoffee") {
    playMakingCoffeeGame(); // Show the cafe reference image while making coffee
  } else if (gameState === "done") {
    image(cafeReference, 0, 0, width, height); // Draw the cafe reference image as the background
    bounceAndZoomDoneImage(); // Show the bouncing and zooming `done.png` image
  }
}



function showOpeningPage() {
  background(255);
  image(openingPage, 0, 0, width, height); // Use the opening page image as the background

  // Animate the title
  animateTitle();

  // Button for "Start Game"
  drawStartButton();
}

function drawStartButton() {
  // Define the button dimensions and position
  let buttonWidth = 200;
  let buttonHeight = 50;
  let buttonX = width / 2 - buttonWidth / 2;
  let buttonY = height / 2 + 25;

  // Draw the button with a rounded rectangle
  fill(200, 100, 50);
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 10);

  // Button text
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Start Game", width / 2, height / 2 + 50);
}

function mousePressed() {
  if (gameState === "start") {
    // Define the button area (where the user can click)
    let buttonWidth = 200;
    let buttonHeight = 50;
    let buttonX = width / 2 - buttonWidth / 2;
    let buttonY = height / 2 + 25;

    // Check if the mouse click is within the button boundaries
    if (
      mouseX > buttonX &&
      mouseX < buttonX + buttonWidth &&
      mouseY > buttonY &&
      mouseY < buttonY + buttonHeight
    ) {
      gameState = "makingCoffee"; // Change to making coffee phase
    }
  } else if (gameState === "makingCoffee") {
    // Check if the player clicked the correct image for the current step
    let clickedImage;
    if (currentStep === 0) {
      clickedImage = coffeeCupPos;
    } else if (currentStep === 1) {
      clickedImage = coffeePos;
    } else if (currentStep === 2) {
      clickedImage = milkPos;
    }

    if (clickedImage && isMouseOver(clickedImage.x, clickedImage.y, 100, 100)) {
      currentStep++; // Move to the next step
      if (currentStep > 2) {
        currentStep = 3; // End the steps
      }
    }
  } else if (gameState === "done") {
    // If clicked on the "done" image, return to the start page
    if (isMouseOver(doneX - 50, doneY - 50, 100, 100)) {
      gameState = "start"; // Reset the game to the opening page
      currentStep = 0; // Reset the step
      doneX = width / 2 - 50; // Reset the done image position
      doneY = height / 2 - 50;
    }
  }
}

function isMouseOver(x, y, w, h) {
  // Check if the mouse is within the bounds of an image
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function animateTitle() {
  fill(255); // White text
  textAlign(CENTER, CENTER);
  textSize(50);
  textFont("Georgia"); // Use the inbuilt "Georgia" font
  textStyle(BOLD);

  // Move the title vertically and fade it in
  if (titleY < height / 5) {
    titleY += 1; // Move the title down slowly
  }

  // Create a simple oscillating effect for the title
  if (titleY >= height / 5) {
    titleDirection = -titleDirection; // Change direction
  }

  // Apply the oscillation effect
  titleY += titleDirection * 2; // Add small oscillation

  // Display the title with fade-in animation
  if (fadeAlpha < 255) {
    fadeAlpha += 5; // Gradually increase opacity
  }

  fill(255, 255, 255, fadeAlpha);
  text("Relaxing Cafe Game", width / 2, titleY);
}

function playMakingCoffeeGame() {
  background(255);
  image(cafeReference, 0, 0, width, height); // Use the updated cafe reference image as the background

  // Display step instructions
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);

  if (currentStep === 0) {
    text("Step 1: Click to select a coffee cup", width / 2, 50);
  } else if (currentStep === 1) {
    text("Step 2: Add coffee", width / 2, 50);
  } else if (currentStep === 2) {
    text("Step 3: Pour milk", width / 2, 50);
  } else if (currentStep === 3) {
    text("Your coffee is ready!", width / 2, 50);
    gameState = "done"; // Set gameState to "done" when coffee is ready
    return; // Exit to avoid drawing other images
  }

  // Draw all images (coffee cup, coffee, milk) in static positions
  image(coffeeCup, coffeeCupPos.x, coffeeCupPos.y, 100, 100);
  image(coffee, coffeePos.x, coffeePos.y, 100, 100);
  image(milk, milkPos.x, milkPos.y, 100, 100);

  // Highlight the image that is being hovered over
  highlightHoveredImage();
}

function highlightHoveredImage() {
  // Check if the mouse is over each image and highlight it with a green border
  if (isMouseOver(coffeeCupPos.x, coffeeCupPos.y, 100, 100)) {
    stroke(0, 255, 0); // Green border
    noFill();
    rect(coffeeCupPos.x, coffeeCupPos.y, 100, 100); // Highlight coffee cup
  }
  if (isMouseOver(coffeePos.x, coffeePos.y, 100, 100)) {
    stroke(0, 255, 0); // Green border
    noFill();
    rect(coffeePos.x, coffeePos.y, 100, 100); // Highlight coffee
  }
  if (isMouseOver(milkPos.x, milkPos.y, 100, 100)) {
    stroke(0, 255, 0); // Green border
    noFill();
    rect(milkPos.x, milkPos.y, 100, 100); // Highlight milk
  }
  if (gameState === "done" && isMouseOver(doneX - 50, doneY - 50, 100, 100)) {
    stroke(0, 255, 0); // Green border
    noFill();
    rect(doneX - 50, doneY - 50, 100, 100); // Highlight done image
  }
}

function bounceAndZoomDoneImage() {
  push();
  translate(doneX, doneY);
  scale(doneScale);
  image(done, -50, -50, 100, 100); // Center the image while scaling
  pop();

  // Update the position of the `done.png` image
  doneX += doneXSpeed;
  doneY += doneYSpeed;

  // Reverse direction if the image hits the edge of the canvas
  if (doneX < 0 || doneX > width) {
    doneXSpeed *= -1; // Reverse horizontal direction
  }
  if (doneY < 0 || doneY > height) {
    doneYSpeed *= -1; // Reverse vertical direction
  }

  // Zoom in and out
  doneScale += doneScaleDirection;
  if (doneScale > 1.5 || doneScale < 1) {
    doneScaleDirection *= -1; // Reverse the zoom direction
  }
}
