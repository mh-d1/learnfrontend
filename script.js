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

document.querySelectorAll(".project-preview").forEach((preview) => {
  const glass = preview.querySelector(".preview-glass");
  const close = preview.querySelector(".preview-close");

  glass.addEventListener("click", () => {
    preview.classList.add("is-open");
  });

  close.addEventListener("click", () => {
    preview.classList.remove("is-open");
  });
});
/* PROJECT PREVIEW */

const projectPreviews = document.querySelectorAll(".project-preview");

projectPreviews.forEach((preview) => {

  const glass = preview.querySelector(".preview-glass");
  const close = preview.querySelector(".preview-close");

  if (!glass || !close) {
    return;
  }

  glass.addEventListener("click", () => {
    preview.classList.add("is-open");
  });

  close.addEventListener("click", () => {
    preview.classList.remove("is-open");
  });

});

/* =========================================================
   WEB NOTIFICATION
========================================================= */

const notificationToggle = document.querySelector(
  ".notification-toggle"
);

const notificationLabel = document.querySelector(
  ".notification-label"
);

if (notificationToggle && "Notification" in window) {

  const updateNotificationUI = () => {

    if (Notification.permission === "granted") {

      notificationToggle.classList.add("is-enabled");

      if (notificationLabel) {
        notificationLabel.textContent = "notif on";
      }

    } else {

      notificationToggle.classList.remove("is-enabled");

      if (notificationLabel) {
        notificationLabel.textContent = "notif";
      }

    }
  };


  notificationToggle.addEventListener("click", async () => {

    try {

      const permission =
        await Notification.requestPermission();

      updateNotificationUI();

      if (permission === "granted") {

        new Notification("MH.DEV", {
          body: "Selamat datang di ruang kecil gue. 👋",
          icon: "aset/mh.png"
        });

      }

    } catch (error) {

      console.log(
        "Notification error:",
        error
      );

    }

  });


  updateNotificationUI();

} else {

  if (notificationToggle) {
    notificationToggle.style.display = "none";
  }

}
