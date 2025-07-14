// ===== JAVASCRIPT FOR INTERACTIVITY =====

// --- Theme Toggle (Dark/Light Mode) ---
const themeToggleBtn = document.getElementById("theme-toggle");
const darkIcon = document.getElementById("theme-toggle-dark-icon");
const lightIcon = document.getElementById("theme-toggle-light-icon");

// Check for saved theme in localStorage and apply it on page load
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
  // toggle icons inside button
  darkIcon.classList.toggle("hidden");
  lightIcon.classList.toggle("hidden");

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
    // if NOT set via local storage previously
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

// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when a link is clicked
mobileMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    mobileMenu.classList.add("hidden");
  }
});

// --- Active Nav Link on Scroll ---
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const onScroll = () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 90) {
      // 90px offset for sticky header
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

// --- Initialize Lucide Icons ---
// This needs to be called after the DOM is loaded
document.addEventListener("DOMContentLoaded", (event) => {
  lucide.createIcons();

  // Re-run onScroll once at the beginning to set the initial active link
  onScroll();
});
