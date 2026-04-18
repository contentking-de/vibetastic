# Design System Specification: The Tactile Manuscript

## 1. Overview & Creative North Star
**Creative North Star: The Tactile Manuscript**
This design system rejects the clinical coldness of traditional coding environments in favor of a high-end, editorial experience. It is designed to feel like a premium physical workspace—think heavy-weight cream paper, charcoal ink, and the warmth of a sunlit studio. 

To move beyond "template" UI, we utilize **Intentional Asymmetry**. Instead of perfectly centered grids, we use generous, uneven whitespace to guide the eye. We break the rigid box-model by overlapping elements and using extreme typographic scale. This is not just a tool; it is a curated environment for "vibe coding."

---

## 2. Colors & Tonal Architecture
The palette is built on a foundation of warm neutrals and organic earth tones. We avoid all synthetic neons, purples, and turquoises to maintain a grounded, professional atmosphere.

### The "No-Line" Rule
**Strict Directive:** 1px solid borders are prohibited for sectioning. 
Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit on a `surface` background to create a soft edge. This forces a cleaner, more sophisticated layout that relies on proximity and tone rather than structural "cages."

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked physical layers. Use the surface tiers to define importance:
- **Base Layer:** `surface` (#FAF9F6) – The primary canvas.
- **Structural Nesting:** Use `surface-container-low` (#F4F4F0) for large layout blocks.
- **Component Floating:** Use `surface-container-lowest` (#FFFFFF) for cards or interactive elements to create a "lifted" effect against the cream background.

### The Glass & Gradient Rule
To prevent the design from feeling "flat," use Glassmorphism for floating navigation or overlays. 
- **Effect:** Apply `surface` with 80% opacity and a `20px` backdrop-blur.
- **Signature Gradients:** For primary CTAs, use a subtle linear gradient from `primary` (#605E5C) to `primary-dim` (#545250). This adds a "lithographic" depth that flat hex codes cannot achieve.

---

## 3. Typography
We utilize **Manrope** for its geometric clarity and modern warmth. The hierarchy is designed to feel like a high-end magazine.

- **Display (display-lg/md):** Used sparingly for hero moments. These should have a slight negative letter-spacing (-0.02em) to feel "tight" and authoritative.
- **Headlines (headline-lg/md):** The workhorse for section titles. Always paired with generous `surface-container` padding.
- **Body (body-lg/md):** Set in `on-surface-variant` (#5C605C) to reduce eye strain and provide a softer contrast than pure black.
- **Labels (label-md/sm):** These are our "metadata" markers. Use `primary` (#605E5C) in all-caps with +0.05em tracking for a technical, yet sophisticated feel.

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering**, not shadows.

### The Layering Principle
Instead of a drop shadow, place a `surface-container-highest` (#E0E4DE) element behind a `surface-container-lowest` (#FFFFFF) element. The delta in luminance creates a natural "step" in space.

### Ambient Shadows
When a floating state is required (e.g., a dropdown), use an **Ambient Shadow**:
- **Color:** `on-surface` (#2F3430) at 5% opacity.
- **Blur:** 24px - 40px. 
- **Offset:** 8px Y-axis.
This mimics natural light diffusion rather than a digital "glow."

### The "Ghost Border" Fallback
If a border is required for accessibility in input fields:
- **Token:** `outline-variant` (#AFB3AE) at 20% opacity. 
- **Style:** It should be nearly invisible, felt rather than seen.

---

## 5. Components

### Buttons
- **Primary:** `primary` (#605E5C) background with `on-primary` (#FBF7F3) text. Roundedness: `md` (0.375rem).
- **Secondary:** `secondary-container` (#FFDCBD) with `on-secondary-container` (#6E4A25). Use this for "warm" actions.
- **Tertiary/Ghost:** No background. Use `label-md` styling with a subtle `primary` underline on hover.

### Cards & Lists
**Strict Rule:** No divider lines. 
- Separate list items using 16px of vertical whitespace. 
- For cards, use `surface-container-low` with a corner radius of `xl` (0.75rem). The generous rounding softens the "coding" aesthetic into something more "lifestyle."

### Input Fields
- **Background:** `surface-container-high` (#E6E9E4).
- **Border:** Ghost Border (20% `outline-variant`).
- **Focus State:** Transition the border to 100% `primary` and add a 4px soft outer "glow" using `primary-fixed-dim` at 30% opacity.

### Vibe-Specific Components
- **The "Code Block":** Use `inverse-surface` (#0D0F0D) with `primary-fixed` (#E6E2DE) text. This provides the only high-contrast dark moment in the UI, making code feel like a "precious object" within the soft environment.
- **Status Chips:** Use `tertiary-container` (#FFCDD7) for "in-progress" and `secondary-container` (#FFDCBD) for "completed." Avoid green/red clichés; use these earthy tones to signal state.

---

## 6. Do’s and Don’ts

### Do
- **Use "White Space as a Border":** If two elements feel cluttered, add space, don't add a line.
- **Embrace Earth Tones:** Use `secondary` (#7D5731) for moments of delight or human connection.
- **Typography as Graphic:** Let large `display-sm` text overlap onto `surface-container` blocks for an editorial feel.

### Don’t
- **Don't use pure black:** Use `on-surface` (#2F3430) for text to maintain the "warm" vibe.
- **Don't use Turquoise or Purple:** These are strictly forbidden to ensure the palette remains grounded.
- **Don't use "Full" rounding on everything:** Reserve `full` (9999px) for chips/pills only. Use `xl` or `md` for containers to maintain a professional structure.
- **Don't use standard Dividers:** If you need to separate content, use a 1px tall block of `surface-variant` (#E0E4DE) that doesn't span the full width of the container.