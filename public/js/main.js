// The animation for the hamburger menu
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links .nav-item");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });
    burger.classList.toggle("toggle");
  });
};

// The animation intro
const introAnimation = () => {
  const tl = gsap.timeline({
    defaults: {
      ease: "power1.out",
    },
  });

  tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
  tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
  tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");
  tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 });
  tl.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");
  tl.fromTo(".lead", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");
};

// The cursor style on desktop
const cursorStyle = () => {
  const mouseCursor = document.querySelector(".cursor");
  const navLinks = document.querySelectorAll(".nav-links .nav-item a");

  window.addEventListener("mousemove", (e) => {
    mouseCursor.style.top = `${e.pageY}px`;
    mouseCursor.style.left = `${e.pageX}px`;
  });

  navLinks.forEach((link) => {
    link.addEventListener("mouseleave", () => {
      mouseCursor.classList.remove("link-grow");
      link.classList.remove("hovered-link");
    });
    link.addEventListener("mouseover", () => {
      mouseCursor.classList.add("link-grow");
      link.classList.add("hovered-link");
    });
  });
};

// The nav will be positioned fixed when the user scrolls down
const fixedNav = () => {
  // Grab the navbar
  const nav = document.querySelector(".navbar");
  // When the user scrolls a certain distance and the width of the screen is more than
  document.addEventListener("scroll", () => {
    if (window.scrollY >= 62 && window.innerWidth > 900) {
      nav.classList.add("fixed-nav");
    } else {
      nav.classList.remove("fixed-nav");
    }
  });
};

// The whole app functionality
const app = () => {
  navSlide();
  introAnimation();
  cursorStyle();
  fixedNav();
};

app();
