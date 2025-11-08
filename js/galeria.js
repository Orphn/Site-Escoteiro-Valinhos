document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("galeriaTrack");
  if (!track) return;

  const items = Array.from(track.querySelectorAll(".galeria-item"));
  if (!items.length) return;

  const prevButton = document.getElementById("prevMedia");
  const nextButton = document.getElementById("nextMedia");
  const dotsContainer = document.getElementById("galeriaDots");
  const dots = [];
  let currentIndex = 0;
  let resizeTimeout;
  let touchStartX = null;

  if (dotsContainer) {
    items.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "galeria-dot";
      dot.setAttribute("aria-label", `Ir para destaque ${index + 1}`);
      dot.addEventListener("click", () => {
        if (currentIndex === index) return;
        currentIndex = index;
        pauseMedia();
        updateGallery();
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  function updateGallery(options = {}) {
    const { smooth = true } = options;
    const itemWidth = items[0].getBoundingClientRect().width;

    if (!smooth) {
      track.style.transition = "none";
    } else {
      track.style.transition = "";
    }

    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

    items.forEach((item, index) => {
      const isActive = index === currentIndex;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    if (!smooth) {
      requestAnimationFrame(() => {
        track.style.transition = "";
      });
    }
  }

  function pauseMedia() {
    track.querySelectorAll("video").forEach((video) => {
      video.pause();
    });

    track.querySelectorAll("iframe[data-yt]").forEach((iframe) => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "pauseVideo",
          args: [],
        }),
        "*"
      );
    });
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % items.length;
    pauseMedia();
    updateGallery();
  }

  function showPrevious() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    pauseMedia();
    updateGallery();
  }

  nextButton?.addEventListener("click", showNext);
  prevButton?.addEventListener("click", showPrevious);

  track.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0].clientX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (event) => {
      if (touchStartX === null) return;
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 60) {
        if (deltaX < 0) {
          showNext();
        } else {
          showPrevious();
        }
      }
      touchStartX = null;
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateGallery({ smooth: false });
    }, 150);
  });

  updateGallery({ smooth: false });
});
