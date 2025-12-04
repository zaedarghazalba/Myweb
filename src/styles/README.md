# Design System Documentation

## Overview
This portfolio uses a custom design system built with Tailwind CSS and custom CSS utilities.

---

## Color System

### Primary Colors (Purple/Indigo)
Used for CTAs, active states, and accents.

```css
/* Light Mode */
--primary: #667eea → #764ba2 (gradient)

/* Dark Mode */
--primary: #a78bfa → #c4b5fd (gradient)
```

### Neutral Colors
```css
/* Light Mode */
--background: #fafafa → #f5f5f5
--text-primary: #1a1a1a
--text-secondary: #262626
--text-muted: #737373

/* Dark Mode */
--background: #0a0a0a → #111111
--text-primary: #f5f5f5
--text-secondary: #e5e5e5
--text-muted: #a3a3a3
```

---

## Typography

### Font Stack
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont,
             'Segoe UI', 'Roboto', sans-serif;
```

### Font Sizes
- **Hero**: 36px (mobile) / 48px (desktop)
- **H1**: 32px / 40px
- **H2**: 24px / 28px
- **H3**: 20px / 24px
- **Body**: 16px
- **Small**: 14px
- **Tiny**: 12px

### Font Weights
- **Light**: 300 (rarely used)
- **Regular**: 400 (body text)
- **Medium**: 500 (labels, buttons)
- **Semibold**: 600 (headings)
- **Bold**: 700 (emphasis)

---

## Spacing System

Based on 8px grid:

```
4px  (0.5)   - Tiny gap
8px  (1)     - Small gap
12px (1.5)   - Between related items
16px (2)     - Default gap
24px (3)     - Section spacing
32px (4)     - Large gap
48px (6)     - Section padding
64px (8)     - Major sections
```

---

## Components

### Cards
```jsx
<div className="modern-card">
  {/* Content */}
</div>
```

**Features**:
- Glassmorphism effect
- Backdrop blur
- Subtle border
- Soft shadow
- Hover lift animation

### Buttons

**Primary**:
```jsx
<button className="modern-btn modern-btn-primary">
  Click Me
</button>
```

**Secondary**:
```jsx
<button className="modern-btn modern-btn-secondary">
  Click Me
</button>
```

### Badges
```jsx
<span className="modern-badge">Label</span>
```

### Links
```jsx
<a href="#" className="modern-link">Link Text</a>
```

### Dividers
```jsx
<div className="modern-divider"></div>
```

---

## Shadows

### Soft Shadow (Default)
```css
.shadow-soft {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04),
              0 1px 2px rgba(0, 0, 0, 0.06);
}
```

### Elevated Shadow (Hover/Focus)
```css
.shadow-elevated {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08),
              0 2px 6px rgba(0, 0, 0, 0.04);
}
```

---

## Animations

### Fade In Up
```jsx
<div className="animate-fadeInUp">Content</div>
```

### Staggered Children
```jsx
<div className="stagger-children">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Custom Animation Durations
- **Fast**: 200ms (buttons, links)
- **Normal**: 300ms (cards, modals)
- **Slow**: 600ms (page transitions)

---

## Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px)  { /* sm: tablet */ }
@media (min-width: 768px)  { /* md: tablet landscape */ }
@media (min-width: 1024px) { /* lg: desktop */ }
@media (min-width: 1280px) { /* xl: large desktop */ }
```

---

## Best Practices

### DO
- Use modern-card for all card components
- Keep animations subtle (< 300ms)
- Test in both light and dark mode
- Use semantic HTML
- Follow 8px grid spacing
- Maintain consistent border-radius (12px-16px)

### DON'T
- Overuse animations
- Ignore dark mode styles
- Use bright neon colors
- Create flashy effects
- Nest too many glassmorphism effects
- Forget hover states

---

## Accessibility

### Focus States
All interactive elements have visible focus rings:
```css
*:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
```

### Reduced Motion
Respects user preference:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

### Color Contrast
- Light mode: 4.5:1 minimum
- Dark mode: 4.5:1 minimum
- Primary buttons: 7:1

---

## Usage Examples

### Section Layout
```jsx
<section className="mb-16">
  <h2 className="section-title text-center mb-8">
    Section Title
  </h2>
  <div className="modern-card max-w-4xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Hero Card
```jsx
<div className="modern-card max-w-4xl mx-auto">
  <div className="flex flex-col md:flex-row gap-8">
    <div className="flex-shrink-0">
      <img className="rounded-2xl shadow-elevated" />
    </div>
    <div className="flex-1">
      <h1 className="text-gradient">Title</h1>
      <p className="text-gray-700 dark:text-gray-300">
        Description
      </p>
    </div>
  </div>
</div>
```

### Button Group
```jsx
<div className="flex flex-wrap gap-3">
  <button className="modern-btn modern-btn-primary">
    Primary Action
  </button>
  <button className="modern-btn modern-btn-secondary">
    Secondary Action
  </button>
</div>
```

---

## Maintenance

1. **Adding New Components**: Follow existing patterns
2. **Color Updates**: Update both light and dark mode
3. **Animation Changes**: Keep subtle and purposeful
4. **Responsive**: Test all breakpoints
5. **Accessibility**: Run axe-core or similar tools

---

For questions or improvements, refer to `DESIGN_CHANGELOG.md`
