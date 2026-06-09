// Configuration (FRAME_RATE, showreelClips, galleryVideos,
// lightboxStartsMuted, lightboxShowsCaption) is declared in index.html.


// ----- Helpers -----

// Look up the frame rate for a given video file. Falls back to FRAME_RATE.
function fpsForSource(src) {
  for (const item of galleryVideos) {
    if (item.src === src && item.fps) return item.fps;
  }
  return FRAME_RATE;
}

// SMPTE timecode "HH:MM:SS:FF" (or "MM:SS:FF" with HH assumed 00) -> seconds.
// Also accepts ";" as the last separator for drop-frame notation.
function parseClipTime(str, fps) {
  const parts = str.split(/[:;]/).map(Number);
  let hours = 0, minutes = 0, seconds = 0, frames = 0;
  if (parts.length === 4) {
    [hours, minutes, seconds, frames] = parts;
  } else if (parts.length === 3) {
    [minutes, seconds, frames] = parts;
  } else {
    throw new Error("Invalid timecode: " + str);
  }
  return hours * 3600 + minutes * 60 + seconds + frames / fps;
}

// Warm the browser cache so the showreel and lightbox switch quickly
function preloadVideos(sources) {
  for (const src of sources) {
    const v = document.createElement("video");
    v.src = src;
    v.preload = "auto";
    v.muted = true;
    v.style.display = "none";
    document.body.appendChild(v);
  }
}


// ----- Showreel -----

const showreelVideo = document.getElementById("showreel-video");
const showreelPauseBtn = document.getElementById("showreel-pause-btn");
const showreelMuteBtn = document.getElementById("showreel-mute-btn");
const showreelPauseImg = showreelPauseBtn.querySelector("img");
const showreelMuteImg = showreelMuteBtn.querySelector("img");

let showreelIndex = 0;
let showreelPausedByUser = false;
let showreelCurrentSrc = null;

function getShowreelClip() {
  const [src, startStr, endStr] = showreelClips[showreelIndex];
  const fps = fpsForSource(src);
  return {
    src: src,
    start: parseClipTime(startStr, fps),
    end: parseClipTime(endStr, fps),
  };
}

function playShowreelIfAllowed() {
  if (showreelPausedByUser) return;
  const promise = showreelVideo.play();
  // Swallow autoplay rejections: the showreel is muted by default so this
  // normally succeeds, but some browsers still reject without a user gesture.
  if (promise && promise.catch) {
    promise.catch(function () {});
  }
}

function loadShowreelClip() {
  const clip = getShowreelClip();

  // Same source as currently loaded: just seek. Avoids re-fetching the file
  // when consecutive showreel clips come from the same video.
  if (clip.src === showreelCurrentSrc) {
    showreelVideo.currentTime = clip.start;
    playShowreelIfAllowed();
    return;
  }

  showreelCurrentSrc = clip.src;

  // Setting currentTime before metadata is loaded silently fails, so wait for
  // loadedmetadata before seeking to the clip start.
  function onReady() {
    showreelVideo.removeEventListener("loadedmetadata", onReady);
    showreelVideo.currentTime = clip.start;
    playShowreelIfAllowed();
  }
  showreelVideo.addEventListener("loadedmetadata", onReady);
  showreelVideo.src = clip.src;
}

function advanceShowreel() {
  showreelIndex = (showreelIndex + 1) % showreelClips.length;
  loadShowreelClip();
}

function onShowreelTimeUpdate() {
  // timeupdate fires ~every 250ms, so the switchover lands slightly past
  // clip.end. That's acceptable for showreel framing.
  const clip = getShowreelClip();
  if (showreelVideo.currentTime >= clip.end) {
    advanceShowreel();
  }
}

function togglePauseShowreel() {
  showreelPausedByUser = !showreelPausedByUser;
  if (showreelPausedByUser) {
    showreelVideo.pause();
    showreelPauseImg.src = "icons/play.svg";
    showreelPauseBtn.setAttribute("aria-label", "Play showreel");
  } else {
    showreelPauseImg.src = "icons/pause.svg";
    showreelPauseBtn.setAttribute("aria-label", "Pause showreel");
    playShowreelIfAllowed();
  }
}

function toggleMuteShowreel() {
  showreelVideo.muted = !showreelVideo.muted;
  if (showreelVideo.muted) {
    showreelMuteImg.src = "icons/mute.svg";
    showreelMuteBtn.setAttribute("aria-label", "Unmute showreel");
  } else {
    showreelMuteImg.src = "icons/sound.svg";
    showreelMuteBtn.setAttribute("aria-label", "Mute showreel");
  }
}

function pauseShowreelForLightbox() {
  showreelVideo.pause();
}

function resumeShowreelAfterLightbox() {
  playShowreelIfAllowed();
}

function setupShowreel() {
  showreelVideo.addEventListener("timeupdate", onShowreelTimeUpdate);
  showreelVideo.addEventListener("ended", advanceShowreel);
  showreelVideo.addEventListener("click", openLightboxFromShowreel);
  showreelPauseBtn.addEventListener("click", togglePauseShowreel);
  showreelMuteBtn.addEventListener("click", toggleMuteShowreel);
  loadShowreelClip();
}


// ----- Gallery -----

const galleryEl = document.getElementById("sh-gallery");

function buildGallery() {
  for (let i = 0; i < galleryVideos.length; i++) {
    const item = galleryVideos[i];

    const wrapper = document.createElement("div");
    wrapper.className = "sh-gallery-item";

    const video = document.createElement("video");
    video.src = item.src;
    video.muted = true;
    video.preload = "metadata";
    wrapper.appendChild(video);

    const titleEl = document.createElement("h3");
    titleEl.textContent = item.title;
    wrapper.appendChild(titleEl);

    const descEl = document.createElement("p");
    descEl.textContent = item.description;
    wrapper.appendChild(descEl);

    const indexForClick = i;
    wrapper.addEventListener("click", function () {
      openLightbox(indexForClick);
    });

    galleryEl.appendChild(wrapper);
  }
}


// ----- Lightbox -----

const lightboxEl = document.getElementById("lightbox");
const lightboxVideo = document.getElementById("lightbox-video");
const lightboxCloseBtn = document.getElementById("lightbox-close-btn");
const lightboxFullscreenBtn = document.getElementById("lightbox-fullscreen-btn");
const lightboxMuteBtn = document.getElementById("lightbox-mute-btn");
const lightboxMuteImg = lightboxMuteBtn.querySelector("img");
const lightboxProgressFill = document.getElementById("lightbox-progress-fill");
const lightboxCaptionEl = document.getElementById("lightbox-caption");
const lightboxTitleEl = document.getElementById("lightbox-title");
const lightboxDescriptionEl = document.getElementById("lightbox-description");

let lightboxIndex = 0;

function updateLightboxMuteIcon() {
  if (lightboxVideo.muted) {
    lightboxMuteImg.src = "icons/mute.svg";
    lightboxMuteBtn.setAttribute("aria-label", "Unmute");
  } else {
    lightboxMuteImg.src = "icons/sound.svg";
    lightboxMuteBtn.setAttribute("aria-label", "Mute");
  }
}

function resetLightboxProgress() {
  lightboxProgressFill.style.width = "0";
}

function updateLightboxProgress() {
  const duration = lightboxVideo.duration;
  if (!duration || !isFinite(duration)) return;
  const percent = (lightboxVideo.currentTime / duration) * 100;
  lightboxProgressFill.style.width = percent + "%";
}

function updateLightboxCaption(item) {
  if (!lightboxShowsCaption) {
    lightboxCaptionEl.hidden = true;
    return;
  }
  lightboxTitleEl.textContent = item.title;
  lightboxDescriptionEl.textContent = item.description;
  lightboxCaptionEl.hidden = false;
}

function openLightbox(index) {
  lightboxIndex = index;
  const item = galleryVideos[index];
  lightboxVideo.src = item.src;
  lightboxVideo.muted = lightboxStartsMuted;
  updateLightboxMuteIcon();
  resetLightboxProgress();
  updateLightboxCaption(item);
  lightboxEl.hidden = false;
  pauseShowreelForLightbox();
  const promise = lightboxVideo.play();
  if (promise && promise.catch) {
    promise.catch(function () {});
  }
}

function openLightboxFromShowreel() {
  const clip = getShowreelClip();
  let index = -1;
  for (let i = 0; i < galleryVideos.length; i++) {
    if (galleryVideos[i].src === clip.src) {
      index = i;
      break;
    }
  }
  if (index < 0) index = 0;
  openLightbox(index);
}

function closeLightbox() {
  lightboxVideo.pause();
  // Clear the src and call load() so the browser stops downloading the video
  // in the background after the lightbox is closed.
  lightboxVideo.removeAttribute("src");
  lightboxVideo.load();
  lightboxEl.hidden = true;
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(function () {});
  }
  resumeShowreelAfterLightbox();
}

function navigateLightbox(delta) {
  const count = galleryVideos.length;
  const next = (lightboxIndex + delta + count) % count;
  openLightbox(next);
}

function advanceLightbox() {
  navigateLightbox(1);
}

function toggleMuteLightbox() {
  lightboxVideo.muted = !lightboxVideo.muted;
  updateLightboxMuteIcon();
}

function toggleFullscreenLightbox() {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(function () {});
  } else {
    lightboxEl.requestFullscreen().catch(function () {});
  }
}

function onLightboxBackdropClick(e) {
  // Only close when the click lands directly on the dark backdrop, not on the
  // video, progress bar, caption, or any of the control buttons (which are
  // children of #lightbox and become e.target instead).
  if (e.target === lightboxEl) {
    closeLightbox();
  }
}

function onDocumentKeydown(e) {
  if (lightboxEl.hidden) return;
  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowRight") {
    // preventDefault stops the focused <video>'s built-in 5s seek-forward.
    e.preventDefault();
    navigateLightbox(1);
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    navigateLightbox(-1);
  }
}

function setupLightbox() {
  lightboxVideo.addEventListener("ended", advanceLightbox);
  lightboxVideo.addEventListener("timeupdate", updateLightboxProgress);
  lightboxCloseBtn.addEventListener("click", closeLightbox);
  lightboxFullscreenBtn.addEventListener("click", toggleFullscreenLightbox);
  lightboxMuteBtn.addEventListener("click", toggleMuteLightbox);
  lightboxEl.addEventListener("click", onLightboxBackdropClick);
  document.addEventListener("keydown", onDocumentKeydown);
}


// ----- Init -----

function collectAllSources() {
  const set = new Set();
  for (const clip of showreelClips) set.add(clip[0]);
  for (const item of galleryVideos) set.add(item.src);
  return Array.from(set);
}

function init() {
  preloadVideos(collectAllSources());
  buildGallery();
  setupShowreel();
  setupLightbox();
}

init();
