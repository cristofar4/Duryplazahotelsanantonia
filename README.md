# Drury Plaza Hotel · San Antonio Riverwalk

A cinematic, award-calibre redesign of the Drury Plaza Hotel San Antonio
Riverwalk — reimagining a historic 1929 landmark as a five-star digital
destination experience.

> Built as a complete, production-ready ground-up rebuild. The hotel's
> identity, services, amenities, and brand positioning are retained; the
> user experience, visual design, storytelling, interactions, and
> animations are entirely reinvented.

## ✦ Experience Highlights

- **Cinematic hero** with layered parallax, mask-based text reveals, and an
  integrated booking widget.
- **Pinned horizontal storytelling** timeline of the landmark's history
  (1929 → today) powered by GSAP ScrollTrigger.
- **Immersive River Walk parallax** section with depth-driven motion.
- **Interactive room showcase** with category filtering, comparison table,
  and full room detail pages with switchable galleries.
- **Editorial dining, amenities, meetings & events** layouts.
- **Masonry gallery** with category filtering and a full-screen, keyboard-
  navigable lightbox.
- **Premium multi-step booking flow** — dates → room → details →
  confirmation, with a live pricing summary.
- **Bespoke preloader, full-screen overlay menu, page transitions,** counter
  animations, magnetic interactions, and a film-grain finish.

## ✦ Tech Stack

| Concern            | Choice                                            |
| ------------------ | ------------------------------------------------- |
| Framework          | **Next.js 15** (App Router) + **TypeScript**      |
| Styling            | **Tailwind CSS** with a bespoke luxury token set  |
| Scroll animation   | **GSAP** + **ScrollTrigger**                      |
| Motion / UI        | **Framer Motion**                                 |
| Smooth scrolling   | **Lenis**                                         |
| Component patterns | **Shadcn-style** primitives (Radix UI + CVA)      |
| Type               | Cormorant Garamond (display) · Jost (sans)        |

## ✦ Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## ✦ Pages

`/` Home · `/rooms` & `/rooms/[slug]` · `/dining` · `/amenities` ·
`/meetings` · `/gallery` · `/offers` · `/about` · `/contact` · `/booking`

## ✦ Project Structure

```
src/
├── app/                    # App Router pages, layout, template, sitemap, robots
├── components/
│   ├── anim/               # GSAP/Framer primitives (Reveal, TextReveal, Parallax,
│   │                       #   Counter, RevealImage, Marquee, Magnetic, Media)
│   ├── booking/            # BookingWidget + multi-step BookingFlow
│   ├── cards/              # RoomCard, OfferCard
│   ├── forms/              # InquiryForm
│   ├── layout/             # Navbar, Footer, Preloader
│   ├── providers/          # SmoothScroll (Lenis ⇄ GSAP sync)
│   ├── sections/           # Page sections (home, rooms, gallery, about, …)
│   └── ui/                 # Shadcn-style primitives
└── lib/
    ├── data.ts             # Central content model (rooms, dining, offers, …)
    └── utils.ts            # cn(), image + currency helpers
```

## ✦ Imagery

All photography is sourced from [Unsplash](https://unsplash.com) and
centralised in `src/lib/data.ts` (`IMAGES`) so it can be swapped for licensed
brand photography in one place. Sizing is handled by the `img()` helper in
`src/lib/utils.ts` and Next.js Image optimisation (`next.config.mjs` allows the
Unsplash host).

## ✦ Performance & Accessibility

- Static generation for all routes; responsive `next/image` with AVIF/WebP.
- `prefers-reduced-motion` is honoured across every animation primitive.
- Semantic landmarks, descriptive `alt` text, `aria-label`s on icon controls,
  visible focus rings, and full keyboard support in the gallery lightbox.
- SEO: per-page metadata, Open Graph/Twitter cards, `sitemap.xml`, `robots.txt`.

---

_This is a conceptual design showcase and is not affiliated with or endorsed by
Drury Hotels. Booking and form flows are illustrative front-end experiences._
