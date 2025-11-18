# Tera-X HiveLab - Comprehensive Style Guide

## Overview

The Tera-X HiveLab design system emphasizes **dark, immersive aesthetics with vibrant orange accents** featuring:
- Full-screen dark theme with animated SVG background
- Glassmorphism effects with backdrop blur
- Orange gradient accents for interactive elements
- Responsive, mobile-first design
- Smooth animations and transitions
- Modern typography using Geist font family

---

## Color Palette

### Primary Colors
```css
--black: #000000;        /* Primary background */
--white: #ffffff;         /* Primary text */
```

### Orange Accent Scale (Tailwind)
```css
--orange-400: #fb923c;   /* Lighter accent, icons */
--orange-500: #f97316;   /* Primary accent, buttons */
--orange-600: #ea580c;   /* Hover states */
--orange-700: #c2410c;   /* Active states */
```

### White Opacity Scale
```css
white/100: rgba(255, 255, 255, 1)      /* Full white */
white/80:  rgba(255, 255, 255, 0.8)    /* Navigation links */
white/70:  rgba(255, 255, 255, 0.7)    /* Body text */
white/60:  rgba(255, 255, 255, 0.6)    /* Muted text */
white/20:  rgba(255, 255, 255, 0.2)    /* Borders */
white/10:  rgba(255, 255, 255, 0.1)    /* Glassmorphism backgrounds */
white/5:   rgba(255, 255, 255, 0.05)   /* Subtle backgrounds */
```

### Orange Opacity Scale
```css
orange-500/10: rgba(249, 115, 22, 0.1)   /* Badge backgrounds */
orange-500/25: rgba(249, 115, 22, 0.25)  /* Shadow colors */
orange-400/30: rgba(251, 146, 60, 0.3)   /* Button borders */
```

### Semantic Usage
- **Background**: `#000` (black)
- **Primary Text**: `white` or `text-white`
- **Secondary Text**: `white/70` or `text-white/70`
- **Muted Text**: `white/60` or `text-white/60`
- **Interactive Elements**: Orange gradient (`from-orange-500 to-orange-600`)
- **Glassmorphism Cards**: `bg-white/5 backdrop-blur-sm border-white/10`
- **Hover States**: `hover:bg-white/10` or `hover:bg-orange-600`

---

## Typography

### Font Families

**Geist Sans** - Primary font for all text
```css
font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Geist Mono** - Monospace font (available but not currently used)
```css
font-family: var(--font-geist-mono), 'Courier New', monospace;
```

### Typography Scale

| Element | Size Classes | Weight | Line Height | Usage |
|---------|-------------|--------|-------------|-------|
| Hero Title | `text-4xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-8xl` | `font-bold` | `leading-tight` | Main hero heading |
| Section Title | `text-3xl sm:text-4xl md:text-5xl` | `font-bold` | `leading-tight` | Section headings |
| Card Title | `text-xl` | `font-semibold` | `normal` | Card headings |
| Body Large | `text-sm sm:text-base md:text-sm lg:text-2xl` | `400` | `normal` | Hero description |
| Body Regular | `text-sm lg:text-base` | `400` | `normal` | Standard body text |
| Navigation | `text-sm lg:text-base` | `400` | `normal` | Nav links |
| Button | `text-sm sm:text-base md:text-xs lg:text-lg` | `font-semibold` | `normal` | Button text |
| Badge | `text-xs md:text-xs` | `400` | `normal` | Badge text |

### Typography Rules
- Hero titles: Use `text-balance` for better wrapping
- Body text: Use `text-pretty` for improved readability
- Responsive sizing: Always use responsive classes (sm:, md:, lg:, xl:)
- Line heights: `leading-tight` for headings, `normal` for body
- Font weights: `font-bold` for headings, `font-semibold` for buttons, `400` for body

---

## Spacing System

### Tailwind Spacing Scale
Uses Tailwind's default 4px base unit (0.25rem increments)

### Common Spacing Values

**Padding**
```css
px-4 sm:px-6 lg:px-12    /* Horizontal container padding */
py-4                      /* Vertical padding */
px-3 sm:px-4             /* Compact horizontal padding */
px-6 sm:px-8              /* Button padding */
px-8 py-3                 /* Large button padding */
```

**Margins**
```css
mb-4 sm:mb-6              /* Section spacing */
mb-6 sm:mb-8              /* Large section spacing */
mb-16                     /* Section header spacing */
gap-6                     /* Grid gaps */
space-x-6 lg:space-x-8    /* Horizontal spacing between items */
space-y-4                 /* Vertical spacing between items */
```

**Gaps**
```css
gap-2                     /* Small gaps (8px) */
gap-4                     /* Medium gaps (16px) */
gap-6                     /* Large gaps (24px) */
gap-8                     /* Extra large gaps (32px) */
```

### Responsive Breakpoints
- **sm**: 640px (small tablets)
- **md**: 768px (tablets)
- **lg**: 1024px (desktops)
- **xl**: 1280px (large desktops)

---

## Component Styles

### Buttons

**Primary Button (Gradient)**
```css
background: linear-gradient(to right, #f97316, #ea580c);
color: white;
padding: 0.625rem 1.5rem; /* py-2.5 px-6 */
border-radius: 0.5rem;     /* rounded-lg */
font-weight: 600;          /* font-semibold */
border: 1px solid rgba(251, 146, 60, 0.3);
box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.25);
transition: all 0.3s;

:hover {
    background: linear-gradient(to right, #ea580c, #c2410c);
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.4);
}
```

**Shimmer Button**
```css
background: rgba(249, 115, 22, 1); /* orange-500 */
color: white;
padding: 0.5rem 1rem;              /* py-2 px-4 */
border-radius: 0.75rem;             /* rounded-xl */
font-weight: 500;                   /* font-medium */
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
/* Includes animated shimmer effect */
```

**Button Variants (shadcn/ui)**
- `default`: Primary button style
- `outline`: Border with transparent background
- `secondary`: Secondary background
- `ghost`: Transparent with hover effect
- `destructive`: Error/danger state

### Cards

**Glassmorphism Card**
```css
background: rgba(255, 255, 255, 0.05);  /* bg-white/5 */
backdrop-filter: blur(8px);             /* backdrop-blur-sm */
border: 1px solid rgba(255, 255, 255, 0.1); /* border-white/10 */
border-radius: 0.75rem;                  /* rounded-xl */
padding: 1.5rem;                         /* p-6 */
transition: all 0.3s;

:hover {
    background: rgba(255, 255, 255, 0.1); /* hover:bg-white/10 */
    border-color: rgba(249, 115, 22, 0.3); /* hover:border-orange-500/30 */
}
```

**Badge**
```css
background: rgba(249, 115, 22, 0.1);     /* bg-orange-500/10 */
color: #fb923c;                          /* text-orange-400 */
border: 1px solid rgba(249, 115, 22, 0.2); /* border-orange-500/20 */
border-radius: 9999px;                   /* rounded-full */
padding: 0.5rem 0.75rem;                 /* px-3 py-2 */
font-size: 0.75rem;                      /* text-xs */
```

### Navigation

**Header**
```css
position: relative;
z-index: 10;
display: flex;
align-items: center;
justify-content: space-between;
padding: 1rem 1.5rem;                    /* py-4 px-6 */
```

**Nav Links**
```css
color: rgba(255, 255, 255, 0.8);         /* text-white/80 */
font-size: 0.875rem;                     /* text-sm */
transition: color 0.2s;

:hover {
    color: white;                        /* hover:text-white */
}
```

**Mobile Menu**
```css
background: rgba(0, 0, 0, 0.95);         /* bg-black/95 */
backdrop-filter: blur(8px);              /* backdrop-blur-sm */
border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* border-white/10 */
```

---

## Shadows and Elevation

```css
/* Level 1 - Subtle glow */
box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.25);
/* shadow-lg shadow-orange-500/25 */

/* Level 2 - Medium glow */
box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.4);
/* shadow-xl shadow-orange-500/40 */

/* Level 3 - Card shadow */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
/* shadow */

/* Level 4 - Inset shadow (ShimmerButton) */
box-shadow: inset 0 -8px 10px rgba(255, 255, 255, 0.12);
/* shadow-[inset_0_-8px_10px_#ffffff1f] */
```

**Usage**: 
- Buttons: Level 1-2 with orange glow
- Cards: Level 3 for subtle elevation
- ShimmerButton: Level 4 inset for depth

---

## Animations and Transitions

### Animation Durations
```css
0.2s    /* Fast transitions (nav links, color changes) */
0.3s    /* Standard transitions (buttons, cards, transforms) */
15s     /* Line shadow animation (infinite) */
3s      /* Shimmer animation duration */
4-6s    /* SVG thread animation durations */
```

### Transform Animations
```css
/* Button hover */
transform: scale(1.05) translateY(-2px);
/* hover:scale-105 hover:-translate-y-0.5 */

/* Icon animation */
transform: translateX(4px) rotate(-12deg);
/* group-hover:translate-x-1 group-hover:-rotate-12 */

/* Card hover */
transform: translateY(-4px);
/* hover:-translate-y-1 */
```

### Keyframe Animations

**Line Shadow Animation**
```css
@keyframes line-shadow {
  0% { background-position: 0 0; }
  100% { background-position: 100% -100%; }
}
/* Applied via --animate-line-shadow: line-shadow 15s linear infinite */
```

**Shimmer Slide Animation**
```css
@keyframes shimmer-slide {
  to { transform: translate(calc(100cqw - 100%), 0); }
}
```

**Spin Around Animation**
```css
@keyframes spin-around {
  0% { transform: translateZ(0) rotate(0); }
  15%, 35% { transform: translateZ(0) rotate(90deg); }
  65%, 85% { transform: translateZ(0) rotate(270deg); }
  100% { transform: translateZ(0) rotate(360deg); }
}
```

### SVG Animations
- **Animated Threads**: 36 flowing paths with animated circles
- **Animation Duration**: 4.0s to 6.3s (varied for visual interest)
- **Gradient Fades**: Linear gradients with opacity stops
- **Neon Glow**: Gaussian blur filters for glow effects

### Transition Principles
- Use `transition-all duration-300` for most interactive elements
- Combine `transform` and `opacity` for smooth effects
- Use `ease-in-out` for natural motion
- Keep durations short (0.2s-0.3s) for responsiveness

---

## Border Radius

```css
0.25rem (4px)   /* rounded-sm - Small elements */
0.5rem (8px)    /* rounded-lg - Buttons, badges */
0.75rem (12px)  /* rounded-xl - Cards, large buttons */
1rem (16px)     /* rounded-2xl - Extra large cards */
9999px          /* rounded-full - Pills, badges */
```

**Usage**:
- Buttons: `rounded-lg` (8px) or `rounded-xl` (12px)
- Badges: `rounded-full` (pill shape)
- Cards: `rounded-xl` (12px)
- Icons containers: `rounded-lg` (8px)

---

## Opacity and Transparency

```css
opacity: 1      /* Full opacity - Primary text */
opacity: 0.8    /* 80% - Navigation links */
opacity: 0.7    /* 70% - Body text */
opacity: 0.6    /* 60% - Muted text */
opacity: 0.5    /* 50% - Disabled states */
opacity: 0.3    /* 30% - Borders, subtle elements */
opacity: 0.2    /* 20% - Very subtle borders */
opacity: 0.1    /* 10% - Glassmorphism backgrounds */
opacity: 0.05   /* 5% - Very subtle backgrounds */
```

**Border Transparency**: Use Tailwind opacity syntax (`/10`, `/20`, `/30`, etc.)

---

## Layout Patterns

### Container
```css
max-width: 72rem;        /* max-w-6xl - Hero content */
max-width: 80rem;        /* max-w-7xl - Section content */
margin: 0 auto;          /* mx-auto - Center alignment */
padding: 0 1rem;         /* px-4 - Mobile */
padding: 0 1.5rem;       /* sm:px-6 - Tablet */
padding: 0 3rem;         /* lg:px-12 - Desktop */
```

### Grid Layouts
```css
/* Single column (mobile) */
grid-template-columns: 1fr;
gap: 1.5rem;             /* gap-6 */

/* Two columns (tablet) */
grid-template-columns: repeat(2, 1fr);
gap: 1.5rem;

/* Three columns (desktop) */
grid-template-columns: repeat(3, 1fr);
gap: 1.5rem;
```

### Full-Screen Layout
```css
min-height: 100vh;       /* min-h-screen */
position: relative;      /* relative */
overflow: hidden;        /* overflow-hidden */
```

### Absolute Positioning (Background)
```css
position: absolute;       /* absolute */
inset: 0;                /* inset-0 - Full coverage */
z-index: 0;              /* Behind content */
```

### Z-Index Layers
```css
z-0    /* Background SVG */
z-10   /* Main content, header */
z-20   /* Mobile menu overlay */
z-30   /* Shimmer button spark effect */
```

---

## Interactive States

### Button States
- **Default**: Orange gradient (`from-orange-500 to-orange-600`), white text
- **Hover**: Darker gradient (`from-orange-600 to-orange-700`), scale + translateY, enhanced shadow
- **Active**: Slight translateY down (`active:translate-y-px`)
- **Disabled**: `opacity-50`, `pointer-events-none`

### Card States
- **Default**: `bg-white/5`, `border-white/10`
- **Hover**: `bg-white/10`, `border-orange-500/30`, slight translateY

### Link States
- **Default**: `text-white/80`
- **Hover**: `text-white`, `transition-colors`

### Focus States
```css
outline: 2px solid rgba(249, 115, 22, 0.5);
outline-offset: 2px;
/* focus-visible:ring-ring/50 focus-visible:ring-[3px] */
```

---

## Special Components

### LineShadowText
Animated text component with diagonal line shadow effect.

**Props**:
- `shadowColor`: Color of the shadow (default: "black")
- `className`: Additional CSS classes
- `children`: String content only

**Usage**:
```tsx
<LineShadowText className="italic font-light" shadowColor="white">
  Tera
</LineShadowText>
```

**Styling**:
- Uses `::after` pseudo-element for shadow
- Animated gradient background
- 15s linear infinite animation
- Offset positioning (`left-[0.04em] top-[0.04em]`)

### ShimmerButton
Animated button with rotating shimmer effect.

**Props**:
- `shimmerColor`: Color of shimmer (default: "#ffffff")
- `shimmerSize`: Size of cut (default: "0.05em")
- `shimmerDuration`: Animation duration (default: "3s")
- `borderRadius`: Button radius (default: "100px")
- `background`: Button background (default: "rgba(0, 0, 0, 1)")

**Features**:
- Rotating conic gradient shimmer
- Inset shadow for depth
- Transform animations on hover/active

### SVG Background Threads
36 animated flowing paths with glowing circles.

**Characteristics**:
- Various stroke widths (0.3px to 1.5px)
- Opacity range (0.4 to 0.9)
- Animation durations (4.0s to 6.3s)
- Orange gradient strokes
- Radial gradient fills for circles
- Gaussian blur filters for glow

---

## Responsive Design Patterns

### Mobile-First Approach
Always start with mobile styles, then add breakpoints:
```css
/* Mobile (default) */
text-4xl px-4

/* Tablet (sm: 640px) */
sm:text-3xl sm:px-6

/* Desktop (lg: 1024px) */
lg:text-6xl lg:px-12

/* Large Desktop (xl: 1280px) */
xl:text-8xl
```

### Common Responsive Patterns

**Typography**
```css
text-4xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-8xl
text-sm sm:text-base md:text-sm lg:text-2xl
```

**Spacing**
```css
px-4 sm:px-6 lg:px-12
mb-4 sm:mb-6
py-2.5 sm:py-3
```

**Layout**
```css
flex-col sm:flex-row
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
hidden md:flex
```

---

## Example Component Code

### Complete Hero Button
```tsx
<Button className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base md:text-xs lg:text-lg font-semibold flex items-center gap-2 backdrop-blur-sm border border-orange-400/30 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5">
  Get Started
  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-rotate-12 transition-transform duration-300" />
  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
</Button>
```

### Complete Glassmorphism Card
```tsx
<Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-orange-500/30">
  <CardHeader>
    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-orange-400" />
    </div>
    <CardTitle className="text-white text-xl">Title</CardTitle>
    <CardDescription className="text-white/60">
      Description text
    </CardDescription>
  </CardHeader>
</Card>
```

### Complete Badge
```tsx
<Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 mb-4">
  Label
</Badge>
```

---

## Design System Summary

### Key Principles
1. **Dark-First**: Black background with white text as foundation
2. **Orange Accents**: Vibrant orange gradients for interactive elements
3. **Glassmorphism**: Translucent cards with backdrop blur
4. **Responsive Typography**: Fluid scaling across breakpoints
5. **Smooth Animations**: 0.3s transitions with transform effects
6. **Layered Depth**: Z-index system for proper stacking
7. **Accessibility**: High contrast, focus states, semantic HTML

### Component Checklist
- ✓ Use orange gradients for primary buttons
- ✓ Apply glassmorphism (`bg-white/5 backdrop-blur-sm`) to cards
- ✓ Use responsive text classes (sm:, md:, lg:, xl:)
- ✓ Add hover states with transform and shadow
- ✓ Use `transition-all duration-300` for smooth animations
- ✓ Apply `rounded-lg` or `rounded-xl` to buttons/cards
- ✓ Use opacity scale for text hierarchy (white/80, white/70, white/60)
- ✓ Include focus-visible states for accessibility
- ✓ Test responsive breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- ✓ Use z-index layers properly (background: 0, content: 10, overlays: 20)

### Color Usage Guidelines
- **Orange-500/600**: Primary interactive elements (buttons, accents)
- **Orange-400**: Icons, lighter accents
- **White/80**: Navigation links
- **White/70**: Body text
- **White/60**: Muted/secondary text
- **White/10-20**: Borders, subtle backgrounds
- **White/5**: Glassmorphism backgrounds

### Animation Guidelines
- Keep durations short (0.2s-0.3s) for interactions
- Use `ease-in-out` for natural motion
- Combine `transform` and `opacity` for smooth effects
- Use `scale` sparingly (1.05 max for buttons)
- Prefer `translateY` over `translateX` for depth

---

**Version**: 1.0  
**Last Updated**: December 2024  
**Project**: Tera-X HiveLab Landing Page

