const items = document.querySelectorAll(".carousel-item");
let currentIndex = 0;

function updateCarousel() {
    items.forEach((item, index) => {
        item.classList.remove("active");
        if (index === currentIndex) {
            item.classList.add("active");
        }
    });
    // Scroll the active image into view
    items[currentIndex].scrollIntoView({ behavior: "smooth", inline: "center" });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % items.length; // Loop to start
    updateCarousel();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + items.length) % items.length; // Loop to end
    updateCarousel();
}

// Initialize the carousel
updateCarousel();
