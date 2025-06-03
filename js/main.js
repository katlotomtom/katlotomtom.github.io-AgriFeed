document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (hamburger.classList.contains("active")) {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      }
    })
  })

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial")
  const dots = document.querySelectorAll(".dot")
  let currentTestimonial = 0

  if (testimonials.length > 0 && dots.length > 0) {
    // Hide all testimonials except the first one
    for (let i = 1; i < testimonials.length; i++) {
      testimonials[i].style.display = "none"
    }

    // Add click event to dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showTestimonial(index)
      })
    })

    // Auto slide testimonials
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length
      showTestimonial(currentTestimonial)
    }, 5000)

    function showTestimonial(index) {
      // Hide all testimonials
      testimonials.forEach((testimonial) => {
        testimonial.style.display = "none"
      })

      // Remove active class from all dots
      dots.forEach((dot) => {
        dot.classList.remove("active")
      })

      // Show the selected testimonial and activate the corresponding dot
      testimonials[index].style.display = "block"
      dots[index].classList.add("active")
      currentTestimonial = index
    }
  }

  // Product Filters
  const filterButtons = document.querySelectorAll(".filter-btn")
  const productItems = document.querySelectorAll(".product-item")

  if (filterButtons.length > 0 && productItems.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => {
          btn.classList.remove("active")
        })

        // Add active class to clicked button
        this.classList.add("active")

        const filter = this.getAttribute("data-filter")

        // Show/hide products based on filter
        productItems.forEach((item) => {
          if (filter === "all" || item.classList.contains(filter)) {
            item.style.display = "grid"
          } else {
            item.style.display = "none"
          }
        })
      })
    })
  }

  // Accordion
  const accordionItems = document.querySelectorAll(".accordion-item")

  if (accordionItems.length > 0) {
    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header")

      header.addEventListener("click", () => {
        // Toggle active class on clicked item
        item.classList.toggle("active")

        // Close other accordion items
        accordionItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active")
          }
        })
      })
    })
  }

  // Form Validation
  const contactForm = document.getElementById("contactForm")
  const feedbackForm = document.getElementById("feedbackForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Validate form
      if (validateForm(contactForm)) {
        // Form is valid, show success message
        alert("Thank you for your message! We will get back to you soon.")
        contactForm.reset()
      }
    })
  }

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Validate form
      if (validateForm(feedbackForm)) {
        // Form is valid, show success message
        alert("Thank you for your feedback! We appreciate your input.")
        feedbackForm.reset()
      }
    })
  }

  function validateForm(form) {
    let isValid = true
    const requiredFields = form.querySelectorAll("[required]")

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false
        field.classList.add("error")
      } else {
        field.classList.remove("error")
      }

      // Email validation
      if (field.type === "email" && field.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(field.value)) {
          isValid = false
          field.classList.add("error")
        }
      }
    })

    return isValid
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")

      if (targetId !== "#") {
        e.preventDefault()

        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })
        }
      }
    })
  })
})
