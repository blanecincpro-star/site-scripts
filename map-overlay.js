(function () {
  var IMAGE_URL = "https://raw.githubusercontent.com/blanecincpro-star/site-scripts/refs/heads/main/office%20map.png";

  function isTypingInField() {
    var el = document.activeElement;
    if (!el) return false;

    var tag = el.tagName;

    return (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT" ||
      el.isContentEditable
    );
  }

  function addOverlayStyles() {
    if (document.getElementById("custom-image-overlay-style")) return;

    var style = document.createElement("style");
    style.id = "custom-image-overlay-style";

    style.textContent =
      "#custom-image-overlay{" +
        "position:fixed;" +
        "top:0;" +
        "left:0;" +
        "right:0;" +
        "bottom:0;" +
        "background:rgba(0,0,0,.75);" +
        "display:flex;" +
        "align-items:center;" +
        "justify-content:center;" +
        "z-index:999999;" +
      "}" +

      "#custom-image-popup{" +
        "position:relative;" +
        "background:white;" +
        "padding:20px;" +
        "border-radius:12px;" +
        "max-width:90vw;" +
        "max-height:90vh;" +
        "box-shadow:0 10px 40px rgba(0,0,0,.35);" +
      "}" +

      "#custom-image-popup img{" +
        "max-width:80vw;" +
        "max-height:80vh;" +
        "display:block;" +
      "}" +

      "#custom-image-close{" +
        "position:absolute;" +
        "top:-12px;" +
        "right:-12px;" +
        "width:32px;" +
        "height:32px;" +
        "border-radius:50%;" +
        "border:0;" +
        "cursor:pointer;" +
        "font-weight:bold;" +
        "background:#fff;" +
        "box-shadow:0 2px 10px rgba(0,0,0,.35);" +
      "}";

    document.head.appendChild(style);
  }

  function removeOverlay() {
    var oldOverlay = document.getElementById("custom-image-overlay");

    if (oldOverlay) {
      oldOverlay.remove();
    }
  }

  function showOverlay() {
    addOverlayStyles();

    var existingOverlay = document.getElementById("custom-image-overlay");

    if (existingOverlay) {
      existingOverlay.remove();
      return;
    }

    var overlay = document.createElement("div");
    overlay.id = "custom-image-overlay";

    var popup = document.createElement("div");
    popup.id = "custom-image-popup";

    var closeButton = document.createElement("button");
    closeButton.id = "custom-image-close";
    closeButton.type = "button";
    closeButton.textContent = "X";

    var image = document.createElement("img");
    image.src = IMAGE_URL;
    image.alt = "Popup image";

    closeButton.addEventListener("click", function () {
      removeOverlay();
    });

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) {
        removeOverlay();
      }
    });

    popup.appendChild(closeButton);
    popup.appendChild(image);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  }

  if (!window.customImageOverlayLoaded) {
    window.customImageOverlayLoaded = true;

    document.addEventListener("keydown", function (event) {
      var key = event.key || "";

      if (key.toLowerCase() === "m" && !isTypingInField()) {
        showOverlay();
      }

      if (key === "Escape") {
        removeOverlay();
      }
    });
  }
})();
