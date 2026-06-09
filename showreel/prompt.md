
## Javascript video player showreel lightbox 

We have a gallery page with a grid of videos, each one with a vignette and description. 

At the top we have a “showreel” video element, but we’re showing short clips from the videos listed below.

Here’s a simple pseudocode snippet of how we’d initialise the showreel: file name, starting time(minutes, seconds, frames), ending time.

```
let showreel = [
	["video1.mp4", "1.00:00", "1.45:23"],
	["video2.mp4", "0.10:00", "0.20:00"],
	["video3.mp4", "0.25:20", "0.30:00"],
];
```

We’ll probably want to pre-load the videos, and we might want to wait until we have enough data to start the showreel playing.

Clicking on the showreel will open the currently showing video (i.e. whole file, not just a sample) in a Lightbox overly.

Clicking any video in the gallery will open that video in a Lightbox overlay.

After a video is done playing, the next one in the gallery loads automatically in the Lightbox overlay.

Showreel pauses while Lightbox is open, continues again after closing.

Showreel has a pause button bottom left, is muted by default with a unmute button bottom right.

Lightbox is also muted by default also (but make this a variable on initialisation). 

Lightbox has a fullscreen button top right.

Simple javascript, no dependencies.

Write simple clear, understandable code, with separate functions and explicit steps instead of complicated chains or nested statements, and no fancy syntax.

Keep HTML and CSS skeletal, we’ll do the design. 

Interview me with questions during the planning phase.