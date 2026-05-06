(function () {
  // Create the CSS for the overlay popup
  const style = document.createElement("style");

  style.textContent = `
    #custom-image-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
    }

    #custom-image-popup {
      position: relative;
      background: white;
      padding: 20px;
      border-radius: 12px;
      max-width: 90vw;
      max-height: 90vh;
    }

    #custom-image-popup img {
      max-width: 80vw;
      max-height: 80vh;
      display: block;
    }

    #custom-image-close {
      position: absolute;
      top: -12px;
      right: -12px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      font-weight: bold;
      background: white;
      color: black;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
    }
  `;

  document.head.appendChild(style);

  // Listen for the M key
  document.addEventListener("keydown", function (event) {
    // Ignore the key press if the user is typing in an input/textarea
    const typingElement = ["INPUT", "TEXTAREA", "SELECT"].includes(
      document.activeElement.tagName
    );

    if (typingElement) return;

    // Only continue if the key pressed was M
    if (event.key.toLowerCase() !== "m") return;

    // If the overlay already exists, remove it
    const existingOverlay = document.getElementById("custom-image-overlay");

    if (existingOverlay) {
      existingOverlay.remove();
      return;
    }

    // Create the overlay
    const overlay = document.createElement("div");
    overlay.id = "custom-image-overlay";

    overlay.innerHTML = `
      <div id="custom-image-popup">
        <button id="custom-image-close" type="button">X</button>
        <img src="https://cdn.jsdelivr.net/gh/blanecincpro-star/site-scripts@main/map%20of%20gotham.png?v=2">
      </div>
    `;

    document.body.appendChild(overlay);

    // Close when clicking the X button
    document
      .getElementById("custom-image-close")
      .addEventListener("click", function () {
        overlay.remove();
      });

    // Close when clicking outside the image popup
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        overlay.remove();
      }
    });
  });
})();
