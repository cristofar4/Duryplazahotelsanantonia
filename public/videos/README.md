# Cinematic story footage

The home page "Journey Inside" section (`CinematicStory`) plays a GSAP
scroll-driven fly-through from the building exterior to the interior. It works
fully with imagery alone.

To layer **real footage** over the final (interior) stage, drop a file here:

```
public/videos/story-tour.mp4
```

Recommended: a short (8–20s), muted, looping MP4 (H.264, ~1080p, < 8 MB) of a
smooth dolly shot moving from the exterior toward the interior. It will autoplay
muted and loop. If the file is absent, the interior still frame is shown instead
— nothing breaks.

To point at a hosted URL instead, edit `STORY_VIDEO` in
`src/components/sections/home/CinematicStory.tsx`.
