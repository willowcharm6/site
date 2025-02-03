// Select hotspot elements, fact box, avatar, and modal elements
const hotspots = document.querySelectorAll('.hotspot');
const factBox = document.getElementById('fact-box');
const avatar = document.getElementById('avatar');
const gameContainer = document.getElementById('game-container');
const liveCamModal = document.getElementById('liveCamModal');
const closeButton = document.querySelector('.close-button');

hotspots.forEach(hotspot => {
  hotspot.addEventListener('click', function() {
    // Get the fun fact and live cam flag from the hotspot
    const fact = this.getAttribute('data-fact');
    const showLiveCam = this.getAttribute('data-livecam');
    
    // Get the hotspot's position relative to the game container
    const rect = this.getBoundingClientRect();
    const containerRect = gameContainer.getBoundingClientRect();
    const targetLeft = rect.left - containerRect.left;
    const targetTop = rect.top - containerRect.top;
    
    // Move the avatar to the hotspot location
    avatar.style.left = targetLeft + 'px';
    avatar.style.top = targetTop + 'px';
    
    // Display the fun fact
    factBox.textContent = fact;
    factBox.style.display = 'block';
    setTimeout(() => {
      factBox.style.display = 'none';
    }, 5000);
    
    // If the hotspot is associated with a live cam, open the modal
    if (showLiveCam === "true") {
      liveCamModal.style.display = "block";
    }
  });
});

// Close the modal when the close button is clicked
closeButton.addEventListener('click', function() {
  liveCamModal.style.display = "none";
});

// Close the modal when clicking outside of the modal content
window.addEventListener('click', function(event) {
  if (event.target === liveCamModal) {
    liveCamModal.style.display = "none";
  }
});