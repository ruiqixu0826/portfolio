document.querySelectorAll(".accordion-button").forEach((button) => {
  button.addEventListener("click", () => {
    const accordionContent = button.nextElementSibling;

    button.classList.toggle("active");

    if (button.classList.contains("active")) {
      accordionContent.style.display = "";
    } else {
      accordionContent.style.display = "none";
    }
  });
});

document.querySelectorAll(".accordion-content").forEach((content) => {
  content.style.display = "none";
});
