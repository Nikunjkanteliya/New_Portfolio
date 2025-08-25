# Navbar Component Requirements

## General
- Create a responsive, centered **top navbar** positioned at the very top-middle of the page.
- Navbar should have a **rounded-pill** style container (slightly transparent, blurred background).
- Use **Material UI (MUI)** components for styling and layout.
- Animate appearance & transitions using **GSAP** for smoothness.
- Tabs: **Home**, **My Work**, **Contact**.

## Active Tab Indicator
- Active tab should be highlighted:
  - Slightly larger font weight
  - Different text color
  - A small glowing dot under or next to it (green #00FF6A or similar).
- Active state should update based on the current section/route.

## Animation (GSAP)
- Navbar should **fade in & slide down** from the top when the page loads.
- On hover over a tab:
  - Tab text color should smoothly transition.
  - The glowing dot (if active) should subtly pulse.

## Responsiveness
- On desktop: show all tabs horizontally, centered in the navbar.
- On mobile:
  - Navbar still stays top-centered, but with slightly smaller padding.
  - Consider stacking icons + text or use a minimal icon-only mode.
  - The active indicator must still work.

## Implementation Notes
- Use `AppBar`, `Toolbar`, `Tabs`, and `Tab` components from MUI.
- Use `sx` prop for MUI styling with theme-based values.
- Import and initialize GSAP for the navbar container animation in `useEffect`.
- Maintain active tab state using React state or `useLocation` (if React Router is used).
- Use `position: fixed;` with a `z-index` high enough to stay above content.

