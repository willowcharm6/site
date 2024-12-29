// Gallery images and captions
const galleryData = [
    { src: "image1.jpg", caption: "Caption for Image 1" },
    { src: "image2.jpg", caption: "Caption for Image 2" },
    { src: "image3.jpg", caption: "Caption for Image 3" },
    { src: "image4.jpg", caption: "Caption for Image 4" }
];

let currentImageIndex = 0;

function updateGallery() {
    const imageElement = document.getElementById("gallery-image");
    const captionElement = document.getElementById("image-caption");

    // Update image source and caption
    imageElement.src = galleryData[currentImageIndex].src;
    captionElement.textContent = galleryData[currentImageIndex].caption;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryData.length; // Loop to the beginning
    updateGallery();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length; // Loop to the end
    updateGallery();
}

// Initialize the gallery
updateGallery();
