# Design System Specification: Tactile Elegance

## 1. Overview & Creative North Star: "The Organic Archive"
This design system is a departure from the sterile, grid-locked patterns of modern SaaS. Our Creative North Star is **"The Organic Archive."** We treat the digital interface as a curated, physical space—reminiscent of a high-end editorial spread or a bespoke physical atelier. 

The aesthetic is driven by **intentional asymmetry** and **tonal depth**. We reject the "template" look by utilizing breathing room as a functional element. By layering soft, earth-toned surfaces and utilizing bold, oversized typography against a tactile beige canvas, we create an experience that feels human, intentional, and premium.

---

## 2. Color & Surface Philosophy
The palette has been re-orchestrated to favor warmth and groundedness, using rich ochres and deep teals to guide the eye.

### Primary Palette
- **Primary (`#703210`)**: A deep, scorched earth tone. Used for brand-critical moments and high-emphasis actions.
- **Secondary (`#745b20`)**: A muted gold/olive. Used for secondary actions and supporting brand elements.
- **Tertiary (`#004b56`)**: A deep teal. Used for specialized accents or highlighting specific content streams.
- **Background (`#fff8f1`)**: Our "Linen" base. Every element lives on this warm, organic foundation.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined solely through background color shifts or subtle tonal transitions. 
- Use `surface-container-low` (`#faf2ea`) against the `surface` (`#fff8f1`) background to define a region.
- Use `surface-container-high` (`#eee7df`) for elements that require immediate focus.

### The "Glass & Gradient" Rule
To avoid a flat, "out-of-the-box" feel, primary CTAs should utilize a subtle linear gradient from `primary` (`#703210`) to `primary_container` (`#8d4925`). For floating overlays (menus, tooltips), employ **Glassmorphism**: use a semi-transparent `surface_container_lowest` with a `20px` backdrop-blur to allow the organic background tones to bleed through.

---

## 3. Typography: Editorial Authority
We use **Manrope** exclusively, but we treat it with editorial variety. The hierarchy is designed to create a rhythmic flow down the page.

| Level | Size | Token | Intent |
| :--- | :--- | :--- | :--- |
| **Display LG** | 3.5rem | `display-lg` | Hero moments. Use tight letter-spacing (-0.02em). |
| **Headline MD**| 1.75rem | `headline-md` | Section headers. Always paired with generous top-padding. |
| **Title SM**   | 1.0rem  | `title-sm` | Card headings. Bold and authoritative. |
| **Body LG**    | 1.0rem  | `body-lg` | Primary reading experience. Increased line-height for air. |
| **Label MD**   | 0.75rem | `label-md` | Metadata and secondary calls. Often all-caps. |

**Stylistic Note:** Do not center-align long-form text. Maintain left-alignment to respect the "editorial" grid, but allow images or secondary "pull-quotes" to sit offset from the main text column to create visual soul.

---

## 4. Elevation & Depth: Tonal Layering
We do not use structural lines to define hierarchy. We use the **Layering Principle**.

- **Surface Nesting:** Place a `surface-container-lowest` (#ffffff) card on top of a `surface-container-low` (#faf2ea) section. This creates a soft, natural lift that mimics stacked fine paper.
- **Ambient Shadows:** When a floating effect is required (e.g., a Modal), use a shadow tinted with `on-surface` (`#1e1b17`).
    - *Spec:* `0px 20px 40px rgba(30, 27, 23, 0.06)` (Extra-diffused, very low opacity).
- **The "Ghost Border" Fallback:** If a container requires definition for accessibility (e.g., Input fields), use the `outline-variant` (`#d9c2b8`) at **20% opacity**. Never use a 100% opaque border.

---

## 5. Component Guidelines

### Buttons: The Tactile Touch
- **Primary:** Gradient fill (`primary` to `primary_container`), `full` roundedness, `body-lg` typography. 
- **Secondary:** Surface-tinted. Use `primary_fixed` (`#ffdbcc`) background with `on_primary_fixed` (`#351000`) text.
- **Tertiary:** Text-only with a subtle `label-md` underline that expands on hover.

### Cards & Lists: The Separation of Space
- **No Dividers:** Forbid the use of divider lines. Separate list items using `1.5rem` (xl) vertical white space.
- **Composition:** Cards should use `lg` (1rem) rounded corners. Use a `surface-container-low` fill rather than a shadow for standard cards.

### Input Fields: Minimalist Utility
- **Background:** `surface_container_highest` (`#e8e1da`) with a 0.5rem (DEFAULT) bottom radius only, creating a "tab" feel.
- **States:** Active state shifts the background to `primary_fixed` with a 2px "Ghost Border" at the bottom.

### Additional Signature Component: "The Curator Chip"
For filtering or tagging, use `secondary_container` (`#ffdb94`) with `on_secondary_container` (`#795f24`) text. These should be `full` rounded (pills) and feel like soft, tactile pebbles on the screen.

---

## 6. Do’s and Don'ts

### Do
- **Use Asymmetry:** Offset your images from your text containers by 24px-48px to break the "standard web" feel.
- **Trust the Beige:** Allow the `surface` color to provide warmth. Pure white should only be used as a "highlight" layer (`surface-container-lowest`).
- **Embrace Negative Space:** If a section feels crowded, double the padding. This system thrives on "air."

### Don't
- **Don't use 1px solid lines:** This is the quickest way to kill the "Atelier" aesthetic.
- **Don't use pure black:** Always use `on_surface` (`#1e1b17`) for text to maintain the organic, ink-on-paper look.
- **Don't use harsh corners:** Unless specified as `none`, always use at least `sm` (0.25rem) rounding to keep the tactile, organic feel.