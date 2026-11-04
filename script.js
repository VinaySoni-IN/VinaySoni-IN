// Fade sections in as they scroll into view.
// Content stays visible if JavaScript or IntersectionObserver is unavailable.
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var items = document.querySelectorAll("section, .project");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  items.forEach(function (el) {
    el.classList.add("reveal");
    io.observe(el);
  });
})();

// Open the embedded social-footprints page on startup. Once the iframe has
// fully loaded, count down for five seconds, close it, and draw attention to
// the floating launcher with a single wave animation.
(function () {
  var modal = document.getElementById("social-modal");
  var frame = document.getElementById("social-frame");
  var countdown = document.getElementById("social-countdown");
  var modalClose = document.getElementById("social-modal-close");
  var launcher = document.getElementById("social-launcher");
  var launcherOpen = document.getElementById("social-launcher-open");
  var launcherClose = document.getElementById("social-launcher-close");

  if (!modal || !frame || !countdown || !modalClose || !launcher || !launcherOpen || !launcherClose) return;

  var supportsDialog = typeof modal.showModal === "function";
  var countdownTimer = null;
  var remaining = 5;
  var initialAutoClosePending = true;
  var autoClosing = false;
  var restoreLauncherFocus = false;
  var waveCleanupTimer = null;

  function isModalOpen() {
    return supportsDialog ? modal.open : modal.hasAttribute("open");
  }

  function stopCountdown() {
    if (countdownTimer !== null) {
      window.clearInterval(countdownTimer);
      countdownTimer = null;
    }
    countdown.hidden = true;
  }

  function updateCountdown() {
    countdown.textContent = remaining + "s";
    countdown.setAttribute("aria-label", "Popup closes automatically in " + remaining + (remaining === 1 ? " second" : " seconds"));
  }

  function playWaveOnce() {
    launcher.classList.remove("wave-once");
    void launcher.offsetWidth;
    launcher.classList.add("wave-once");

    if (waveCleanupTimer !== null) window.clearTimeout(waveCleanupTimer);
    waveCleanupTimer = window.setTimeout(function () {
      launcher.classList.remove("wave-once");
      waveCleanupTimer = null;
    }, 1500);
  }

  function showLauncher(withWave, shouldFocus) {
    launcher.hidden = false;
    if (withWave) playWaveOnce();

    if (shouldFocus) {
      launcherOpen.focus();
    } else if (document.activeElement && (document.activeElement === modal || modal.contains(document.activeElement))) {
      document.activeElement.blur();
    }
  }

  function startCountdown() {
    if (!initialAutoClosePending || countdownTimer !== null || !isModalOpen()) return;

    remaining = 5;
    countdown.hidden = false;
    updateCountdown();

    countdownTimer = window.setInterval(function () {
      remaining -= 1;

      if (remaining <= 0) {
        initialAutoClosePending = false;
        autoClosing = true;
        stopCountdown();
        closeModal(true, false);
        return;
      }

      updateCountdown();
    }, 1000);
  }

  function openModal(isInitialOpen) {
    launcher.hidden = true;
    launcher.classList.remove("wave-once");
    document.body.classList.add("social-modal-open");

    if (!isInitialOpen) {
      initialAutoClosePending = false;
      stopCountdown();
    }

    if (supportsDialog) {
      if (!modal.open) modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }

    modal.focus({ preventScroll: true });
  }

  function closeModal(isAutomatic, shouldRestoreFocus) {
    restoreLauncherFocus = Boolean(shouldRestoreFocus);

    if (!isAutomatic) {
      initialAutoClosePending = false;
      autoClosing = false;
    }
    stopCountdown();

    if (supportsDialog && modal.open) {
      modal.close();
    } else {
      modal.removeAttribute("open");
      document.body.classList.remove("social-modal-open");
      showLauncher(Boolean(isAutomatic), restoreLauncherFocus);
      autoClosing = false;
      restoreLauncherFocus = false;
    }
  }

  frame.addEventListener("load", startCountdown, { once: true });
  window.addEventListener("load", startCountdown, { once: true });
  modalClose.addEventListener("click", function (event) {
    closeModal(false, event.detail === 0);
  });
  launcherOpen.addEventListener("click", function () {
    openModal(false);
  });
  launcherClose.addEventListener("click", function () {
    launcher.classList.remove("wave-once");
    launcher.hidden = true;
  });

  modal.addEventListener("cancel", function () {
    initialAutoClosePending = false;
    autoClosing = false;
    restoreLauncherFocus = true;
    stopCountdown();
  });

  modal.addEventListener("close", function () {
    stopCountdown();
    document.body.classList.remove("social-modal-open");
    showLauncher(autoClosing, restoreLauncherFocus);
    autoClosing = false;
    restoreLauncherFocus = false;
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal(false, false);
  });

  openModal(true);
})();
