const game = document.getElementById('game');
const scoreEl = document.getElementById('score');
let score = 0;

// Birds data: each bird requires a specific food.
const birdsData = [
    { name: "Bali Myna", src: "pictures/bali-myna.png", requiredFood: "seed" },
    { name: "Laughing Kookaburra", src: "pictures/laughing-kookaburra.png", requiredFood: "worm" },
    { name: "Mandarin Duck", src: "pictures/mandarin-duck.png", requiredFood: "grain" },
    { name: "Scarlet Ibis", src: "pictures/scarlet-ibis.png", requiredFood: "fruit" },
    { name: "Guam Kingfisher", src: "pictures/guam-kingfisher.png", requiredFood: "fish" }
];

const birds = [];

// Create bird elements on the screen with random positions.
birdsData.forEach(birdData => {
    const bird = document.createElement('img');
    bird.classList.add('bird');
    bird.src = birdData.src || 'bali-myna2.png';
    bird.setAttribute('data-required-food', birdData.requiredFood);
    bird.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    bird.style.top = Math.random() * (window.innerHeight - 100) + 'px';
    game.appendChild(bird);
    birds.push(bird);
});

// Function to update the score.
function updateScore(val) {
    score += val;
    scoreEl.textContent = "Score: " + score;
}

// Variables for the food element controlled by the player.
let currentFood = null;
let currentFoodType = null;
const foodSpeed = 5; // Movement speed in pixels per key press.

// Create and add the food element for the selected food type.
function createFood(foodType) {
    // Remove previous food if it exists.
    if (currentFood) {
    currentFood.remove();
    }
    currentFoodType = foodType;
    currentFood = document.createElement('div');
    currentFood.classList.add('food');
    let bgImage;
    switch (foodType) {
    case 'seed': bgImage = 'pictures/seed.png'; break;
    case 'worm': bgImage = 'pictures/worm.png'; break;
    case 'grain': bgImage = 'pictures/grain.png'; break;
    case 'fruit': bgImage = 'pictures/fruit.png'; break;
    case 'fish': bgImage = 'pictures/fish.png'; break;
    default: bgImage = 'placeholder-food.png';
    }
    currentFood.style.backgroundImage = `url(${bgImage})`;
    // Position the food at the center bottom of the screen.
    currentFood.style.left = (window.innerWidth/2 - 25) + 'px';
    currentFood.style.top = (window.innerHeight - 100) + 'px';
    game.appendChild(currentFood);
}

// Listen for clicks on the food selection panel.
document.getElementById('food-panel').addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'button') {
    const selectedFood = e.target.getAttribute('data-food');
    createFood(selectedFood);
    }
});

// Allow the player to control the food element with the arrow keys.
document.addEventListener('keydown', (e) => {
    if (!currentFood) return;
    let left = parseFloat(currentFood.style.left);
    let top = parseFloat(currentFood.style.top);
    switch(e.key) {
    case 'ArrowLeft':
        left = Math.max(0, left - foodSpeed);
        break;
    case 'ArrowRight':
        left = Math.min(window.innerWidth - 50, left + foodSpeed);
        break;
    case 'ArrowUp':
        top = Math.max(0, top - foodSpeed);
        break;
    case 'ArrowDown':
        top = Math.min(window.innerHeight - 50, top + foodSpeed);
        break;
    }
    currentFood.style.left = left + 'px';
    currentFood.style.top = top + 'px';
    // Check for collisions after each movement.
    checkCollision();
});

// Check for collisions between the food and any bird.
function checkCollision() {
    if (!currentFood) return;
    const foodRect = currentFood.getBoundingClientRect();
    birds.forEach(bird => {
    const birdRect = bird.getBoundingClientRect();
    if (
        foodRect.left < birdRect.right &&
        foodRect.right > birdRect.left &&
        foodRect.top < birdRect.bottom &&
        foodRect.bottom > birdRect.top
    ) {
        const requiredFood = bird.getAttribute('data-required-food');
        if (currentFoodType === requiredFood) {
        updateScore(10);
        bird.style.transform = 'scale(1.2)';
        setTimeout(() => { bird.style.transform = 'scale(1)'; }, 300);
        } else {
        updateScore(-5);
        }
        // Remove the food after a collision.
        currentFood.remove();
        currentFood = null;
        currentFoodType = null;
    }
    });
}
document.getElementById('close-btn').addEventListener('click', function() {
    // Redirect to the index page (or any page you prefer)
    window.location.href = "../lpz_game.html";
  });
  