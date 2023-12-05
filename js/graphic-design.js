const images1 = [
  "images/gallery/identity/cover.png",
  "images/gallery/identity/mark.png",
  "images/gallery/identity/typography.png",
  "images/gallery/identity/scalability.png",
  "images/gallery/identity/free space.png",
  "images/gallery/identity/color.png",
  "images/gallery/identity/photo.png",
  "images/gallery/identity/application.png",
];

const images2 = [
  "images/gallery/Hi-fi mockups/Artboard 4.png",
  "images/gallery/Hi-fi mockups/Artboard 1.png",
  "images/gallery/Hi-fi mockups/Artboard 2.png",
  "images/gallery/Hi-fi mockups/Artboard 3.png",
];

let currentIndex1 = 0;
let currentIndex2 = 0;

document.getElementById("prev-button1").addEventListener("click", function () {
  if (currentIndex1 > 0) {
    currentIndex1--;
    updateImageAndButtons();
  }
});

document.getElementById("next-button1").addEventListener("click", function () {
  currentIndex1 = (currentIndex1 + 1) % images1.length;
  updateImageAndButtons();
});

document.getElementById("prev-button2").addEventListener("click", function () {
  if (currentIndex2 > 0) {
    currentIndex2--;
    updateImageAndButtons();
  }
});

document.getElementById("next-button2").addEventListener("click", function () {
  currentIndex2 = (currentIndex2 + 1) % images2.length;
  updateImageAndButtons();
});

function updateImageAndButtons() {
  document.getElementById("current-image1").src = images1[currentIndex1];
  document.getElementById("prev-button1").disabled = currentIndex1 <= 0;
  document.getElementById("current-image2").src = images2[currentIndex2];
  document.getElementById("prev-button2").disabled = currentIndex2 <= 0;
}

// Initialize the gallery
updateImageAndButtons();

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit-comment");
  const commentsList = document.getElementById("comments-list");

  submitBtn.addEventListener("click", addComment);

  function addComment() {
    const commentText = document.getElementById("new-comment").value;
    if (commentText.trim() === "") return;

    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.textContent = commentText;

    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
      commentsList.removeChild(commentDiv);
      updateLocalStorage();
    };

    commentDiv.appendChild(deleteBtn);
    commentsList.appendChild(commentDiv);

    updateLocalStorage();
    document.getElementById("new-comment").value = "";
  }

  function loadComments() {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.forEach((comment) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      commentDiv.textContent = comment;

      const deleteBtn = document.createElement("span");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = function () {
        commentsList.removeChild(commentDiv);
        updateLocalStorage();
      };

      commentDiv.appendChild(deleteBtn);
      commentsList.appendChild(commentDiv);
    });
  }

  function updateLocalStorage() {
    const comments = [];
    document.querySelectorAll(".comment").forEach((commentDiv) => {
      comments.push(commentDiv.textContent.replace("Delete", "").trim());
    });
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  loadComments();
});
