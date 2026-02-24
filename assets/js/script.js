/**
 * script.js
 * Main JavaScript file for Tushar Jain's Portfolio Redesign
 */

/* =========================================
   MOUSE BLOB EFFECT
========================================= */
const blob = document.getElementById("blob");

document.body.onpointermove = event => {
  const { clientX, clientY } = event;
  
  // Use animate to make it smooth
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: "forwards" });
};

/* =========================================
   TYPEWRITER EFFECT
========================================= */
const roles = ["Data Enthusiast.", "Product Manager.", "Software Developer.", "Problem Solver."];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeWriterElement = document.getElementById("typewriter");
const typeSpeed = 100;
const deleteSpeed = 50;
const delayBetweenRoles = 2000;

function typeWriter() {
    if (!typeWriterElement) return;

    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typeWriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeWriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = delayBetweenRoles;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
    }

    setTimeout(typeWriter, speed);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeWriter, 1000);
});

/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */
const revealElements = document.querySelectorAll(".reveal");

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Only animate once
        }
    });
};

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));


/* =========================================
   NAVBAR & HAMBURGER
========================================= */
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Active Link Highlighting
    let current = "";
    document.querySelectorAll("section").forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinksContainer.classList.toggle("active");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinksContainer.classList.remove("active");
    });
});

/* =========================================
   PORTFOLIO FILTERING
========================================= */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'flex';
                // Small animation trigger
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});