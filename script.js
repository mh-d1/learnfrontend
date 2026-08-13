const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const navigationLinks = document.querySelectorAll('a[href^="#"]');

navigationLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

const music = document.getElementById("background-music");
const musicToggle = document.querySelector(".music-toggle");
const musicLabel = document.querySelector(".music-label");

if (music && musicToggle) {
  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();

        musicToggle.classList.add("is-playing");
        musicToggle.setAttribute("aria-pressed", "true");

        if (musicLabel) {
          musicLabel.textContent = "sound on";
        }
      } catch (error) {
        console.log("Audio could not be played:", error);
      }
    } else {
      music.pause();

      musicToggle.classList.remove("is-playing");
      musicToggle.setAttribute("aria-pressed", "false");

      if (musicLabel) {
        musicLabel.textContent = "sound off";
      }
    }
  });
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden && music && !music.paused) {
    music.pause();

    if (musicToggle) {
      musicToggle.classList.remove("is-playing");
      musicToggle.setAttribute("aria-pressed", "false");
    }

    if (musicLabel) {
      musicLabel.textContent = "sound off";
    }
  }
});
