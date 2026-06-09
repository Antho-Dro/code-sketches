# js-video-showreel-lightbox

Vanilla-JavaScript video **showreel + lightbox** component for a gallery page. A showreel at the top loops short clips of the gallery's videos; clicking the showreel (or any gallery item) opens the full video in a lightbox overlay that auto-advances through the gallery.

The original spec is in **`prompt.md`** — kept for reference.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Markup + **all configuration** (showreel clips, gallery videos, flags) lives in an inline `<script>` block near the bottom |
| `app.js` | All behavior. Reads the globals declared in `index.html` |
| `style.css` | Skeletal layout — colors and sizing only, no design polish |
| `icons/*.svg` | Six control icons: `play`, `pause`, `mute`, `sound`, `fullscreen`, `close` |
| `clouds.mp4`, `demolition.mp4`, `eclipse.mp4` | Sample videos |

## Running it

Some browsers won't play local video over `file://`. Serve from this directory:

```
python3 -m http.server 8765
```

Then open `http://localhost:8765/`.

## Configuration

All configuration is in the `<script>` block at the bottom of `index.html`:

- **`FRAME_RATE`** — default fps when a gallery entry doesn't specify its own.
- **`showreelClips`** — array of `[filename, startTimecode, endTimecode]` triples. Timecodes are **SMPTE** (`"HH:MM:SS:FF"` or `"MM:SS:FF"` with HH = 00); `;` before frames is accepted for drop-frame.
- **`galleryVideos`** — array of `{ src, title, description, fps? }`. The optional `fps` overrides `FRAME_RATE` for that single video, and is used to convert the frames part of any showreel timecode that references it.
- **`lightboxStartsMuted`** — boolean. Lightbox audio default.
- **`lightboxShowsCaption`** — boolean. Whether title + description appear under the video in the lightbox.

## What's wired up

- **Showreel**: loops clips, muted by default, pause button (bottom-left), mute toggle (bottom-right). Clicking the video opens its full version in the lightbox.
- **Gallery**: grid of video thumbnails with title + description; click opens in lightbox.
- **Lightbox**: 2px progress bar under the video, optional caption (title + description), close (top-left), fullscreen (top-right), mute (bottom-right). Auto-advances to the next gallery item on `ended` (wrapping).
- **Keyboard**: `Esc` closes; `←` / `→` navigate between gallery videos.
- **Click outside** the video closes the lightbox.
- **Showreel pauses** while the lightbox is open and resumes on close, unless the user manually paused it.
- **Preloading**: hidden `<video preload="auto">` elements warm the cache for all sources at init.

## Coding conventions (from `prompt.md`)

- Vanilla JS, no dependencies.
- Simple, clear code: separate functions, explicit steps. No long chains or deep nesting.
- Skeletal HTML/CSS — design is deferred.

## Working with the user

The spec says "Interview me with questions during the planning phase." Interpret as: ask only when something in the prompt is genuinely ambiguous. Don't pad with routine confirmations.
