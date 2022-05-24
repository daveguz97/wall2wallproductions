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
cursorStyle();
