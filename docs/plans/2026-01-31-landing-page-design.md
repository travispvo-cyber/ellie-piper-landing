# Ellie & Piper Landing Page Design

## Overview

A luxury landing page for Ellie & Piper Party Boutique featuring two business verticals (e-commerce shop and balloon studio services) with an immersive scroll-triggered storybook section.

## Brand Story

Ellie and Piper is named in memory of founder Tina's two babies lost to miscarriage. The storybook "The Kingdom of Every Little Moment" imagines them as two Asian sisters who create a magical princess ball using household items and imagination when the power goes out—showing that magic comes from creativity and love, not store-bought perfection.

## Technical Stack

| Component | Technology |
|-----------|------------|
| Framework | Static HTML/CSS/JS |
| Styling | Tailwind CSS (CDN) |
| Animation | GSAP + ScrollTrigger |
| Fonts | Google Fonts (Newsreader, Montserrat) |
| Hosting | Render (static site) |

## Page Structure

```
┌─────────────────────────────────────┐
│            Fixed Nav                │
│     Shop | Ellie & Piper | Studio   │
├─────────────────────────────────────┤
│                                     │
│   ┌───────────┬───────────┐        │
│   │           │           │        │
│   │ The Shop  │ The Studio│  Hero  │
│   │           │           │        │
│   └───────────┴───────────┘        │
│                                     │
├─────────────────────────────────────┤
│                                     │
│   ← Scene 1 | 2 | 3 | 4 | 5 | 6 →  │  Storybook
│              ● ○ ○ ○ ○ ○           │  (horizontal scroll)
│                                     │
├─────────────────────────────────────┤
│                                     │
│         Our Philosophy              │
│    [Card] [Card] [Card]             │
│                                     │
├─────────────────────────────────────┤
│            Footer                   │
└─────────────────────────────────────┘
```

## Storybook Scenes

1. **Opening** - Ellie and Piper dreaming of their princess ball
2. **The Plan** - Getting ready to go to the mall
3. **The Setback** - Power goes out
4. **The Magic** - Using household items with imagination
5. **The Ball** - Their magical celebration comes to life
6. **The Ending** - Mom watching through the door with baby Nellie

## Animation Specifications

### Horizontal Scroll Behavior
- Container pins in place while user scrolls vertically
- Horizontal track moves left, revealing scenes one at a time
- Scroll distance: ~3-4x viewport height for smooth pacing

### Scene Transitions
- Soft opacity fade between scenes
- Subtle parallax: background moves slower than foreground
- Text captions fade in after image settles

### Progress Indicator
- Small dots centered at bottom
- Active dot: gold (#d4af37)
- Inactive dots: gray with low opacity

### Entry/Exit
- Entry: First scene fades in from right as hero scrolls out
- Exit: Fade to white, transition into Philosophy section

## Responsive Behavior

### Desktop (1024px+)
- Split hero side-by-side with gold divider
- Full horizontal scroll storybook
- 3-column philosophy grid

### Tablet (768px - 1023px)
- Split hero with tighter padding
- Horizontal scroll preserved
- 2-column philosophy grid

### Mobile (< 768px)
- Stacked hero (Shop on top, Studio below)
- Simplified vertical scroll (scenes fade in sequentially)
- Single column philosophy grid
- Larger touch-friendly dots

## Accessibility

- Alt text for all storybook scenes
- `prefers-reduced-motion`: simple fades instead of scroll animations
- Sufficient color contrast on text overlays

## Performance

- Lazy-load storybook images
- WebP format with PNG fallback
- Target: 200-400KB per scene image

## File Structure

```
ellie-piper-landing/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
│   ├── hero-shop.jpg
│   ├── hero-studio.jpg
│   └── storybook/
│       ├── scene-01.png
│       ├── scene-02.png
│       ├── scene-03.png
│       ├── scene-04.png
│       ├── scene-05.png
│       └── scene-06.png
└── docs/
    └── plans/
```

## External Links (Placeholders)

- "Shop the Boutique" → `#shop` (update when e-commerce ready)
- "Inquire Now" → `#studio` (update when booking ready)

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Gold (Primary) | #d4af37 | Accents, dividers, active states |
| Soft Pink | #fdf2f5 | Studio background, subtle fills |
| Deep Pink | #e64cb2 | Hover states (optional) |
| Luxury White | #ffffff | Primary background |
| Text | #2a2a2a | Body text |

## Typography

| Element | Font | Weight | Style |
|---------|------|--------|-------|
| Display/Headlines | Newsreader | 400-500 | Italic |
| Body/Labels | Montserrat | 300-500 | Normal |
| Uppercase Labels | Montserrat | 500-600 | Tracking: 0.2-0.3em |
