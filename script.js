

// --- Theme Toggle (Dark/Light Mode) ---
const themeToggleBtn = document.getElementById("theme-toggle");
const darkIcon = document.getElementById("theme-toggle-dark-icon");
const lightIcon = document.getElementById("theme-toggle-light-icon");


if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  if (lightIcon) lightIcon.classList.remove("hidden");
  if (darkIcon) darkIcon.classList.add("hidden");
} else {
  document.documentElement.classList.remove("dark");
  if (darkIcon) darkIcon.classList.remove("hidden");
  if (lightIcon) lightIcon.classList.add("hidden");
}

themeToggleBtn.addEventListener("click", function () {

  darkIcon.classList.toggle("hidden");
  lightIcon.classList.toggle("hidden");

  
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
    
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});

/
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});


mobileMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    mobileMenu.classList.add("hidden");
  }
});


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const onScroll = () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 90) {
      
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", onScroll);


document.addEventListener("DOMContentLoaded", (event) => {
  lucide.createIcons();

  
  onScroll();
});
