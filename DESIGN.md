# TripsGen design system

## Purpose

TripsGen uses a dark, editorial travel-planning aesthetic that blends Apple-like restraint, Airbnb-like warmth, and Notion-like clarity. The UI is mobile-first and uses translucent surfaces to keep the planning flow focused without feeling utilitarian.

The design is intentionally implemented with CSS custom properties and a small set of semantic classes. Change tokens and shared classes before changing individual components.

## Theme tokens

The primary tokens live at the top of `src/app/globals.css`.

| Decision | Current value | Change location |
| --- | --- | --- |
| Page background | `#090b10` | `:root --background` |
| Primary foreground | `#f7f8fb` | `:root --foreground` |
| Accent family | Orchid `#d491d9`, rose `#cf5899`, coral `#e37358` | Accent declarations in `globals.css` |
| Main gradient | Rose → coral | `.generate-button` |
| Brand gradient | Coral → magenta | `.brand-mark`, `.icon-well` |
| Ambient lighting | Purple and coral blurred orbs | `.ambient-orb-one`, `.ambient-orb-two` |
| Surface fill | Low-opacity white over the dark canvas | `.planner-card`, `.option-card`, `.date-card`, `.traveller-card` |
| Surface borders | White at 9–12% opacity | Shared surface rules and `.planner-card` |
| Typography | System sans stack, with native Apple system font preference | `body` |

To introduce a new theme, change the token values first, then update the grouped accent rules. Keep the light transparency values unless the new page background is much lighter; they create the glass effect.

## Layout and responsive behaviour

The page uses a single centered column with a maximum content width of `49rem` for the planner and `72rem` for the header.

- Mobile is the base layout. The header uses a compact menu affordance and the planner uses two-column date cards and vertically stacked choice cards.
- At `640px`, navigation links appear, planner padding increases, date cards switch to horizontal content, and helper text becomes visible.
- The hero scales with `clamp()` so its type remains proportionate between small phones and wide desktop screens.
- Ambient orbs are decorative only: they are behind content, ignore pointer events, and should never communicate required information.

Use the existing `640px` breakpoint for related component changes unless a new layout need requires a clearly distinct breakpoint.

## Visual language

### Type

- Headlines use tight negative tracking and a medium weight, rather than a heavy display face.
- Labels use uppercase, small, letter-spaced text in the orchid accent to establish the planning sequence.
- Supporting text uses white with reduced opacity; this preserves hierarchy on a dark background.
- Avoid introducing a remote font dependency. The current system stack keeps first render fast and the production build self-contained.

### Surfaces

- The planner is the main glass surface: a subtle white gradient, thin white border, soft inner highlight, backdrop blur, and a deep shadow.
- Inputs and selection cards use a darker translucent fill, so they read as nested layers inside the planner.
- Active choices have a rose/coral tint and a brighter orchid border. Inactive choices remain neutral and brighten on hover.
- Border radii are deliberately rounded: `1rem` for controls and `1.5rem` for the planner. Preserve this hierarchy when adding components.

### Motion and interaction

- Hover motion is minimal: cards lift by `2px`, buttons brighten, and press feedback scales slightly.
- Selection changes use CSS transitions only. Do not add animation libraries for this experience.
- All custom controls use real `button` or `input` elements. Keep visible focus states when extending the UI.

## Component guide

| Component | Role | Theme-sensitive classes |
| --- | --- | --- |
| `SiteHeader` | Brand and top navigation | `.brand`, `.brand-mark`, `.menu-button` |
| `TripHero` | Editorial introduction | `.hero`, `.hero-eyebrow`, `.hero-copy` |
| `TripPlanner` | Interactive planning form | `.planner-card`, `.planner-section`, `.generate-button` |
| `Choices` | Reusable selectable option grid | `.option-card`, `.option-card-active` |
| `Counter` | Reusable traveller stepper | `.count-button`, `.traveller-card` |
| `Icon` | Inline stroke icon system | Inherits the current text color |

Components receive display content through `src/data/trip-options.ts`. Add or change labels, descriptions, dates, and choices there; avoid putting new user-facing copy directly in the components.

## Accessibility and quality rules

- Keep the dark theme as the default. A future light theme should use semantic tokens rather than scattered color replacements.
- Maintain text contrast when adjusting reduced-opacity text, especially the `text-white/45` and `text-white/55` utility values.
- Icons are decorative unless paired with an accessible button label. Buttons with icon-only controls require `aria-label` text.
- Treat the planner as a structured sequence: keep each major prompt inside a `section` with a visible heading.
- Use local mock data until the product connects to a service. Do not let styling decisions depend on API response shape.

## Recommended theme-change workflow

1. Update `:root` colors and the associated accent declarations in `src/app/globals.css`.
2. Review the planner, selected option state, and generate button together; they are the three dominant color surfaces.
3. Check the small-screen layout first, then the `640px` desktop enhancement.
4. Run `npm run lint` and `npm run build -- --webpack` before merging.
