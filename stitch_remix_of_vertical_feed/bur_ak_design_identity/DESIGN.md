---
name: Burçak Design Identity
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#383939'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#292a2a'
  surface-container-highest: '#343535'
  on-surface: '#e3e2e2'
  on-surface-variant: '#d1c5b4'
  inverse-surface: '#e3e2e2'
  inverse-on-surface: '#2f3031'
  outline: '#9a8f80'
  outline-variant: '#4e4639'
  surface-tint: '#e9c176'
  primary: '#e9c176'
  on-primary: '#412d00'
  primary-container: '#c5a059'
  on-primary-container: '#4e3700'
  inverse-primary: '#775a19'
  secondary: '#c9c6c5'
  on-secondary: '#313030'
  secondary-container: '#4a4949'
  on-secondary-container: '#bab8b7'
  tertiary: '#c8c6c5'
  on-tertiary: '#303030'
  tertiary-container: '#a7a5a5'
  on-tertiary-container: '#3b3b3b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#e9c176'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5d4201'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c9c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1b1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#121414'
  on-background: '#e3e2e2'
  surface-variant: '#343535'
typography:
  display-xl:
    fontFamily: notoSerif
    fontSize: 80px
    fontWeight: '300'
    lineHeight: 90px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: notoSerif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: notoSerif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  body-lg:
    fontFamily: manrope
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 28px
    letterSpacing: 0.03em
  body-md:
    fontFamily: manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.2em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 80px
  section-padding: 160px
---

## Brand & Style

The design system is anchored in the concept of **"The Art of Shadow."** It moves away from the clinical brightness of standard modernism toward a "Moody Luxury" aesthetic that prioritizes atmosphere, exclusivity, and tactile materiality. The target audience consists of high-net-worth individuals who value discretion, craftsmanship, and bespoke architectural solutions.

The visual style is a blend of **High-End Minimalism** and **Tactile Modernism**. It leverages the psychological impact of "darkspace"—using vast, unlit areas to draw the eye toward illuminated focal points, much like a gallery or a high-end showroom. The UI is not just a container but a digital extension of the premium materials found in the firm's portfolio: Nero Marquina marble, smoked oak, and hand-brushed brass. Every interaction should feel deliberate, quiet, and weighted.

## Colors

The palette is monochromatic and grounded, punctuated only by metallic accents. 
- **Obsidian (#0A0A0A):** The primary background color. It is a deep, near-black that provides the canvas for "darkspace."
- **Charcoal (#1F1F1F):** Used for elevated surfaces, such as cards or navigation drawers, to create a subtle sense of depth without relying on shadows.
- **Brushed Gold (#C5A059):** The primary interactive color. Used for calls to action, active states, and highlighting key architectural details.
- **Champagne (#E3D2B4):** A softer metallic used for secondary accents and delicate text highlights.
- **Border Tone:** An ultra-thin, low-opacity white is used to define structural boundaries without interrupting the moody flow of the layout.

## Typography

This design system employs a high-contrast typographic pairing to evoke a sense of editorial prestige.

**Headlines:** *notoSerif* is the voice of the brand. It is used in large sizes with tight tracking for a dramatic, classic feel. The high contrast between thin and thick strokes in the serif mirrors the fine edges of architectural glass and metal.

**Body & Navigation:** *manrope* provides a clean, technical counterpoint. To maintain the luxury feel, body copy should be set with generous tracking (letter spacing) and ample line height. This "breathable" text ensures readability against the dark backgrounds and prevents the interface from feeling cramped.

**Labels:** Small-caps labels with wide tracking are used for categories and metadata, mimicking the labeling found on architectural blueprints.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model with extreme margins. 
- **Darkspace:** Generous vertical padding (160px+) between sections is mandatory to allow project photography to "breathe" and to signal luxury through "wasted" space.
- **The 12-Column Grid:** A standard 12-column grid is used for content, but elements should frequently "break" the grid or span large widths (8-10 columns) to create an asymmetrical, custom-designed feel.
- **Rhythm:** All spacing is derived from an 8px base unit. Consistent use of large gutters (32px) ensures that even dense information remains elegant.

## Elevation & Depth

Depth in this design system is achieved through **Tonal Layering** rather than traditional drop shadows. 
- **Level 0 (Base):** Obsidian (#0A0A0A) for the main page background.
- **Level 1 (Surface):** Charcoal (#1F1F1F) for interactive elements like cards and hover states.
- **Ultra-Thin Borders:** 0.5px to 1px borders in low-opacity champagne or grey are used to define the "skeletal" structure of the UI.
- **Atmospheric Lighting:** Instead of shadows, use subtle radial gradients (20% opacity gold) behind key images to simulate a spotlight effect on a physical wall. 
- **Glassmorphism:** Use high-diffusion backdrop blurs (30px+) for navigation bars to maintain the "Moody" atmosphere while scrolling over content.

## Shapes

The shape language of the design system is **Architectural and Sharp**. 
- **0px Radius:** All buttons, input fields, and image containers must use sharp 90-degree corners. This reflects the precision of high-end renovation and the "hard" materials (marble, steel, wood) used in the firm's work.
- **Consistency:** Roundness is strictly forbidden, as it leans toward "friendly" consumer tech rather than "exclusive" bespoke design.

## Components

### Buttons
- **Primary:** Solid Brushed Gold with black text. Sharp corners. No shadow.
- **Secondary:** Transparent background with an ultra-thin (1px) Gold border.
- **Ghost:** All-caps Manrope text with a gold underline that expands on hover.

### Cards
- **Project Cards:** Full-bleed imagery. The title and category appear on hover via a smooth charcoal overlay (80% opacity). Borders should be 0.5px champagne.
- **Material Swatches:** Square containers showing textures (marble, oak) with technical labels below in wide-tracked Manrope.

### Input Fields
- Underline-only style. A 1px grey line that turns Gold on focus. Label sits above in small-caps Manrope.

### Navigation
- A "Floating" top bar with a heavy backdrop blur. Links are Manrope 14px, all-caps, with 0.15em tracking.

### Interactive Elements
- **Cursors:** Custom circular cursor (Gold, 8px) that expands when hovering over images or links.
- **Dividers:** Horizontal and vertical lines at 0.5px thickness to separate content blocks, mimicking architectural drafting lines.