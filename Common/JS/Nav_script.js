
const links = document.querySelectorAll(".topnavigation a");

// Get the current URL
const currentURL = window.location.href;

// Loop through the links and compare their href attribute with the current URL
links.forEach(link => {
  if (link.href === currentURL) {
    link.style.color = "var(--GreenDay)"; 
  }
});