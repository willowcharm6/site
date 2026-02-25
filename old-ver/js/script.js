document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
    // Mobile menu toggle
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    if (hamburger) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show")
        hamburger.classList.toggle("active")
      })
    }
  
    // Project filters
    const filterTabs = document.querySelectorAll(".filter-tab")
    const projectCards = document.querySelectorAll(".project-card")
  
    if (filterTabs.length > 0) {
      filterTabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          // Remove active class from all tabs
          filterTabs.forEach((t) => t.classList.remove("active"))
  
          // Add active class to clicked tab
          this.classList.add("active")
  
          const filter = this.getAttribute("data-filter")
  
          // Show/hide projects based on filter
          projectCards.forEach((card) => {
            if (filter === "all" || card.getAttribute("data-category") === filter) {
              card.style.display = "block"
            } else {
              card.style.display = "none"
            }
          })
        })
      })
    }
  
    // Hobbies tabs
    const tabButtons = document.querySelectorAll(".tab-button")
    const tabPanes = document.querySelectorAll(".tab-pane")
  
    if (tabButtons.length > 0) {
      tabButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Remove active class from all buttons and panes
          tabButtons.forEach((b) => b.classList.remove("active"))
          tabPanes.forEach((p) => p.classList.remove("active"))
  
          // Add active class to clicked button
          this.classList.add("active")
  
          // Show corresponding tab pane
          const tabId = this.getAttribute("data-tab")
          document.getElementById(tabId).classList.add("active")
        })
      })
    }
  
    // Resume PDF viewer
    const pdfIframe = document.getElementById("pdf-iframe")
    const pdfLoading = document.getElementById("pdf-loading")
  
    if (pdfIframe && pdfLoading) {
      pdfIframe.addEventListener("load", () => {
        pdfLoading.style.display = "none"
      })
    }
  
    // Gallery category filters
    const galleryCategories = document.querySelectorAll(".gallery-category")
    const galleryItems = document.querySelectorAll(".carousel-item")
  
    if (galleryCategories.length > 0) {
      galleryCategories.forEach((category) => {
        category.addEventListener("click", function () {
          // Remove active class from all categories
          galleryCategories.forEach((c) => c.classList.remove("active"))
  
          // Add active class to clicked category
          this.classList.add("active")
  
          const filter = this.getAttribute("data-filter")
  
          // Show/hide gallery items based on filter
          galleryItems.forEach((item) => {
            const itemCategory = item.getAttribute("data-category")
            if (filter === "all" || itemCategory === filter) {
              item.style.display = "block"
            } else {
              item.style.display = "none"
            }
          })
        })
      })
    }
  })
  