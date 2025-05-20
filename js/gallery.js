// Gallery/Carousel functionality
const currentIndex = 0
const slidesPerView = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
}

// Initialize the carousel
function initCarousel() {
  const carousels = document.querySelectorAll(".carousel")

  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel-item")
    const totalSlides = slides.length

    // Set initial state
    updateCarousel(carousel)

    // Add event listeners for arrows if they exist
    const leftArrow = carousel.querySelector(".left-arrow")
    const rightArrow = carousel.querySelector(".right-arrow")

    if (leftArrow) {
      leftArrow.addEventListener("click", () => {
        navigateCarousel(carousel, "prev")
      })
    }

    if (rightArrow) {
      rightArrow.addEventListener("click", () => {
        navigateCarousel(carousel, "next")
      })
    }

    // Add touch swipe functionality
    let touchStartX = 0
    let touchEndX = 0

    carousel.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
      },
      { passive: true },
    )

    carousel.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe(carousel)
      },
      { passive: true },
    )

    function handleSwipe(carousel) {
      const swipeThreshold = 50
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - go to next
        navigateCarousel(carousel, "next")
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - go to prev
        navigateCarousel(carousel, "prev")
      }
    }
  })
}

// Navigate the carousel (prev/next)
function navigateCarousel(carousel, direction) {
  const slides = carousel.querySelectorAll(".carousel-item")
  const totalSlides = slides.length
  const carouselId = carousel.getAttribute("data-carousel-id") || "0"
  let currentIndex = Number.parseInt(carousel.getAttribute("data-current-index") || "0")

  // Determine how many slides to show based on screen width
  const slidesToShow = getSlidesToShow()

  if (direction === "prev") {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides
  } else {
    currentIndex = (currentIndex + 1) % totalSlides
  }

  carousel.setAttribute("data-current-index", currentIndex.toString())
  updateCarousel(carousel)
}

// Update carousel display
function updateCarousel(carousel) {
  const slides = carousel.querySelectorAll(".carousel-item")
  const totalSlides = slides.length
  const currentIndex = Number.parseInt(carousel.getAttribute("data-current-index") || "0")
  const slidesToShow = getSlidesToShow()

  // Calculate translation percentage
  const translateX = -currentIndex * (100 / slidesToShow)

  // Apply translation to the carousel slide container
  const slideContainer = carousel.querySelector(".carousel-slide")
  slideContainer.style.transform = `translateX(${translateX}%)`

  // Update the width of each item based on how many to show
  slides.forEach((slide) => {
    slide.style.width = `${100 / slidesToShow}%`
  })
}

// Determine how many slides to show based on screen width
function getSlidesToShow() {
  if (window.innerWidth < 576) {
    return slidesPerView.mobile
  } else if (window.innerWidth < 992) {
    return slidesPerView.tablet
  } else {
    return slidesPerView.desktop
  }
}

// Initialize on load and resize
window.addEventListener("DOMContentLoaded", () => {
  initCarousel()
})

window.addEventListener("resize", () => {
  const carousels = document.querySelectorAll(".carousel")
  carousels.forEach(updateCarousel)
})
