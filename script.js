// FTNEONEZZZ LOADING SYSTEM

window.addEventListener("load", function () {
  setTimeout(function () {
    const loader = document.getElementById("loader");

    if (loader) {
      loader.classList.add("loader-hidden");
    }
  }, 2200);
});


// FTNEONEZZZ CURSOR SYSTEM

const cursor = document.querySelector(".custom-cursor");
const ring = document.querySelector(".cursor-ring");

if (cursor && ring && window.matchMedia("(pointer: fine)").matches) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => ring.classList.add("active"));
    el.addEventListener("mouseleave", () => ring.classList.remove("active"));
  });
}


// FTNEONEZZZ FEEDBACK ENGINE

(() => {

  const stars = document.querySelectorAll(
    "#ratingStars button"
  );

  const message = document.getElementById(
    "feedbackMessage"
  );

  const ratingText = document.getElementById(
    "ratingText"
  );

  const submit = document.getElementById(
    "submitFeedback"
  );

  const status = document.getElementById(
    "feedbackStatus"
  );

  const counter = document.getElementById(
    "feedbackCount"
  );

  const charCount = document.getElementById(
    "charCount"
  );

  if (!stars.length || !message || !submit) return;

  let selectedRating = 0;
  let feedbackTotal = 0;

  const ratingLabels = [
    "Poor",
    "Fair",
    "Good",
    "Very Good",
    "Excellent"
  ];

  function updateStars() {
    stars.forEach((star, index) => {
      star.classList.toggle(
        "active",
        index < selectedRating
      );
    });

    ratingText.textContent = selectedRating
      ? ratingLabels[selectedRating - 1]
      : "Select your rating";
  }

  stars.forEach(star => {
    star.addEventListener("click", () => {
      selectedRating = Number(
        star.dataset.rating
      );

      updateStars();
    });
  });

  message.addEventListener("input", () => {
    charCount.textContent =
      `${message.value.length} / 500`;
  });

  submit.addEventListener("click", () => {

    const feedback = message.value.trim();

    if (!selectedRating) {
      status.textContent = "Please select a star rating.";
      status.style.color = "#f87171";
      return;
    }

    if (feedback.length < 3) {
      status.textContent = "Please write at least 3 characters.";
      status.style.color = "#f87171";
      return;
    }

    // Demo mode: no server submission
    feedbackTotal++;

    counter.textContent = feedbackTotal;

    status.textContent =
      "✓ THANK YOU! FEEDBACK RECEIVED.";

    status.style.color = "#4ade80";

    console.log("Demo feedback:", {
      rating: selectedRating,
      message: feedback
    });

    selectedRating = 0;
    message.value = "";

    charCount.textContent = "0 / 500";

    updateStars();

  });

})();
