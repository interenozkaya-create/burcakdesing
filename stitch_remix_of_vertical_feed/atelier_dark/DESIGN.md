---
name: Atelier Dark
colors:
  surface: '#16130b'
  surface-dim: '#16130b'
  surface-bright: '#3d392f'
  surface-container-lowest: '#110e07'
  surface-container-low: '#1f1b13'
  surface-container: '#231f17'
  surface-container-high: '#2d2a21'
  surface-container-highest: '#38342b'
  on-surface: '#eae1d4'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#eae1d4'
  inverse-on-surface: '#343027'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#eebd8e'
  on-secondary: '#472a06'
  secondary-container: '#64421d'
  on-secondary-container: '#dfaf81'
  tertiary: '#bfcdff'
  on-tertiary: '#082b72'
  tertiary-container: '#97b0ff'
  on-tertiary-container: '#254188'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#ffdcbd'
  secondary-fixed-dim: '#eebd8e'
  on-secondary-fixed: '#2c1600'
  on-secondary-fixed-variant: '#61401b'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#27438a'
  background: '#16130b'
  on-background: '#eae1d4'
  surface-variant: '#38342b'
typography:
  h1:
    fontFamily: Noto Serif
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
    letterSpacing: 0em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.2em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin: 64px
  section-gap: 128px
---

## Brand & Style
The brand identity for Burçak Design is rooted in the concept of "The Private Gallery." It evokes the quiet, atmospheric luxury of a high-end architectural atelier at dusk. The target audience consists of ultra-high-net-worth individuals and developers seeking bespoke, prestige interior solutions.

The visual style is **Minimalist with a Moody Twist**, characterized by:
- **Cinematic Lighting:** Utilizing deep blacks and dramatic shadows to create a sense of three-dimensional depth.
- **Prestige Materiality:** Mimicking physical high-end finishes like obsidian, brushed gold, and patinated bronze through digital gradients and borders.
- **Editorial Pace:** Heavy use of negative space to allow hero photography of architectural projects to breathe, emulating the layout of a physical high-end design monograph.

## Colors
The palette is dominated by the **Obsidian Night (#0A0A0A)** background, providing a void-like canvas that makes imagery and gold accents pop. 

- **Primary (Champagne Gold):** Used sparingly for call-to-actions, active states, and delicate hairline borders to signify value.
- **Secondary (Soft Bronze):** Employed for subtle hover states and secondary icons, adding warmth to the otherwise cold obsidian base.
- **Surface (Charcoal):** Used for cards, navigation bars, and modals to create a "layered stone" effect against the deep black background.
- **Typography:** Primary text uses a slightly off-white (#F5F5F5) to reduce eye strain while maintaining high contrast, while secondary text uses a muted grey to maintain hierarchy.

## Typography
The typography strategy pairings reflect a balance between heritage (Serif) and modern precision (Sans-Serif).

- **Headlines:** Noto Serif is the centerpiece. It should be set with tight tracking in larger sizes to emphasize its elegant curves. For ultra-premium sections, use italicized Noto Serif for emphasis.
- **Body:** Manrope provides a technical, high-contrast counterpoint. Its clean, geometric nature ensures readability against dark backgrounds.
- **Labels:** Use "label-caps" (Manrope Bold, All-Caps, High Tracking) for navigation items and section headers to create a disciplined, architectural feel.

## Layout & Spacing
This design system utilizes a **Fixed Grid** model with generous margins to mimic the layout of a luxury print magazine.

- **Grid:** A 12-column grid with wide 32px gutters to prevent content density.
- **Rhythm:** Spacing follows an 8px base unit. However, vertical section gaps are intentionally oversized (128px or more) to enforce a slow, deliberate scrolling experience.
- **Negative Space:** Never fill the width of the screen with text. Use 6 or 8-column spans for body copy to maintain comfortable line lengths and create a sophisticated "asymmetric" balance on the page.

## Elevation & Depth
Depth is not communicated through standard drop shadows, but through **Tonal Layering and Inner Glows**:

- **The Base:** The #0A0A0A background is the lowest level.
- **Elevated Surfaces:** Surface elements (#1A1A1A) use a 1px solid border in Champagne Gold at 15% opacity to define edges without "glowing."
- **Dramatic Shadows:** For floating elements like modals or dropdowns, use "Deep Velvet" shadows: large spread (60px+), low opacity (60%), and a slight bronze tint (#1A1200) to create a warm atmospheric bloom rather than a harsh black shadow.
- **Light Source:** Treat the top-center as a virtual light source; interactive elements can have a very subtle top-edge highlight (0.5px white at 10% opacity).

## Shapes
The shape language is **Strictly Sharp (0px)**. 

In interior architecture, precision is paramount. Sharp corners on buttons, cards, and input fields convey structural integrity and a modern, high-fashion aesthetic. 

- **Exception:** Small utility icons and circular profile avatars are the only rounded elements permitted.
- **Structural Lines:** Use vertical and horizontal hairlines (0.5pt to 1pt) in gold or charcoal to divide sections, mimicking floor plans and architectural drawings.

## Components
- **Buttons:** Primary buttons are solid Champagne Gold with black text. Secondary buttons are "Ghost" style: sharp 1px gold borders with no fill. On hover, they transition to a subtle bronze glow.
- **Inputs:** Minimalist bottom-border only. Labels use the `label-caps` style, floating above the input line. Focus state turns the bottom border from charcoal to gold.
- **Cards:** No background fill unless necessary for legibility. Instead, use a 1px charcoal border that brightens to gold on hover. Content inside cards should be heavily inset (32px padding).
- **Navigation:** A fixed top-bar with a backdrop blur (30px) that allows the imagery to peek through as the user scrolls, maintaining the atmospheric mood.
- **Project Gallery:** Use large-scale masonry grids with varying aspect ratios. Each image should have a "shimmer" gold loading state.
- **Custom Scrollbar:** Thin, dark charcoal track with a Champagne Gold thumb to ensure the browser's default UI doesn't break the immersion.