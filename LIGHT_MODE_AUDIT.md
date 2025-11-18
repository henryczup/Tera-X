# Light Mode Contrast & Accessibility Audit

## Executive Summary

The current light mode implementation has several contrast and accessibility issues that need to be addressed to meet WCAG 2.1 AA standards (minimum 4.5:1 for normal text, 3:1 for large text). This audit identifies specific issues and provides actionable recommendations.

---

## Critical Issues (WCAG AA Failures)

### 1. **Hardcoded White Text on Light Backgrounds**
**Location**: Multiple components throughout `app/page.tsx`

**Issues**:
- `text-white` classes used extensively (lines 1236, 1293, 1357, 1494, 1497, etc.)
- White text on light backgrounds fails contrast requirements
- Orange buttons with white text may pass, but need verification

**Recommendations**:
- Replace `text-white` with `text-foreground` or theme-aware classes
- Use `dark:text-white` for dark mode only
- Ensure orange buttons have sufficient contrast (orange-500/600 on white should pass, but verify)

**Example Fix**:
```tsx
// Before
<ShimmerButton className="bg-orange-500 text-white">

// After
<ShimmerButton className="bg-orange-500 text-white dark:text-white">
// Or better - use semantic color
<ShimmerButton className="bg-orange-500 text-primary-foreground">
```

---

### 2. **Low Contrast Muted Text**
**Location**: `app/globals.css` line 19, `app/page.tsx` multiple locations

**Issue**:
- `--muted-foreground: oklch(0.556 0 0)` in light mode
- This is approximately `#8E8E8E` (medium gray)
- Contrast ratio against white (`#FFFFFF`): ~3.2:1
- **Fails WCAG AA for normal text** (needs 4.5:1)

**Recommendation**:
```css
/* Light mode - increase contrast */
--muted-foreground: oklch(0.45 0 0); /* Darker gray, ~#737373, ~4.8:1 contrast */
```

**Also check**: `--tera-text-muted: oklch(0.556 0 0)` has the same issue

---

### 3. **Insufficient Border Contrast**
**Location**: `app/globals.css` line 24, `app/page.tsx` line 1475

**Issues**:
- `--border: oklch(0.922 0 0)` in light mode (~#EBEBEB)
- Hardcoded `rgba(255, 255, 255, 0.2)` in line 1475
- Very light borders may not be visible enough

**Recommendations**:
```css
/* Light mode - darker borders */
--border: oklch(0.85 0 0); /* ~#D9D9D9, better visibility */
```

**For hardcoded values**:
```tsx
// Before
background: 'rgba(255, 255, 255, 0.2)'

// After
background: 'var(--border)' // or use rgba with theme-aware opacity
```

---

### 4. **Card Background Contrast**
**Location**: `app/page.tsx` - all card components

**Issue**:
- `bg-accent/50` uses `--accent: oklch(0.97 0 0)` in light mode
- This is ~#F7F7F7 (very light gray)
- Text contrast may be borderline, especially for muted text

**Recommendation**:
- Consider slightly darker card backgrounds in light mode
- Or ensure text colors are dark enough
- Test contrast ratios for all text on cards

**Suggested CSS**:
```css
/* Light mode - slightly darker cards for better definition */
--card: oklch(0.96 0 0); /* Slightly darker than current */
--accent: oklch(0.95 0 0); /* For card backgrounds */
```

---

### 5. **Hover States Not Visible in Light Mode**
**Location**: Multiple card components

**Issue**:
- `hover:bg-white/10` is used extensively
- In light mode, white/10 on white background is nearly invisible
- Users won't see hover feedback

**Recommendations**:
```tsx
// Before
hover:bg-white/10

// After - theme-aware hover
hover:bg-accent dark:hover:bg-white/10
// Or
hover:bg-black/5 dark:hover:bg-white/10
```

---

### 6. **Orange Accent Color Contrast**
**Location**: Orange buttons, icons, accents throughout

**Issue**:
- `--tera-accent: oklch(0.646 0.222 41.116)` (orange)
- Need to verify contrast against white background
- Orange-400/500 may need adjustment for light mode

**Recommendation**:
- Test orange-500 (#f97316) against white: ~3.1:1 (fails for normal text)
- For buttons with white text, this is acceptable (button text is usually large)
- For icons and small elements, consider darker orange variant in light mode

**Suggested Fix**:
```css
/* Light mode - slightly darker orange for better contrast */
--tera-accent: oklch(0.55 0.25 41.116); /* Darker orange */
```

---

## Moderate Issues (Enhancements)

### 7. **SVG Grid Lines Visibility**
**Location**: `NetworkVisualization` component

**Issue**:
- Grid lines use `var(--border)` which may be too light
- In light mode, light gray lines on white may be hard to see

**Recommendation**:
- Use slightly darker color for grid lines in light mode
- Or add opacity adjustment for light mode

---

### 8. **Logo Container Background**
**Location**: `app/page.tsx` line 1443

**Issue**:
- `bg-black/20 dark:bg-black` - black/20 on white may not provide enough contrast
- Consider using theme-aware background

**Recommendation**:
```tsx
// Before
bg-black/20 dark:bg-black

// After
bg-accent/30 dark:bg-black
```

---

### 9. **Focus States**
**Location**: Interactive elements

**Issue**:
- Need to ensure focus indicators are visible in light mode
- Current `outline-ring/50` may need adjustment

**Recommendation**:
- Test focus ring visibility
- Ensure sufficient contrast for keyboard navigation
- Consider adding visible focus styles

---

### 10. **Text Shadow on Light Background**
**Location**: `LineShadowText` component

**Issue**:
- Shadow color may need adjustment for light mode
- White shadow on white background won't be visible

**Recommendation**:
- Make shadow color theme-aware
- Use dark shadow in light mode, light shadow in dark mode

---

## Accessibility Best Practices

### 11. **Color-Only Information**
**Issue**: Some information may be conveyed only through color

**Recommendation**:
- Ensure icons, borders, or text accompany color indicators
- Don't rely solely on color to convey meaning

---

### 12. **Interactive Element Sizing**
**Good**: Minimum 44px height for touch targets (already implemented)

**Recommendation**: Continue maintaining this standard

---

## Priority Recommendations

### High Priority (Fix Immediately)
1. ✅ Replace all `text-white` with theme-aware classes
2. ✅ Increase `--muted-foreground` contrast in light mode
3. ✅ Fix `hover:bg-white/10` to be theme-aware
4. ✅ Test and adjust orange accent contrast

### Medium Priority (Fix Soon)
5. ✅ Improve border visibility in light mode
6. ✅ Adjust card background contrast
7. ✅ Fix hardcoded white colors in SVG/inline styles

### Low Priority (Enhancements)
8. ✅ Improve grid line visibility
9. ✅ Adjust logo container backgrounds
10. ✅ Enhance focus states

---

## Testing Checklist

- [ ] Test all text colors against backgrounds (aim for 4.5:1 minimum)
- [ ] Test large text (18pt+) for 3:1 minimum contrast
- [ ] Verify interactive elements have visible hover states
- [ ] Test with browser zoom at 200%
- [ ] Test with color blindness simulators
- [ ] Verify keyboard navigation focus indicators
- [ ] Test orange buttons with white text (should pass for large text)
- [ ] Verify all icons have sufficient contrast

---

## Tools for Testing

1. **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
2. **WAVE Browser Extension**: https://wave.webaim.org/
3. **axe DevTools**: Browser extension for accessibility testing
4. **Chrome DevTools**: Built-in contrast ratio checker in computed styles

---

## Implementation Notes

When implementing fixes:
1. Use CSS custom properties for theme-aware colors
2. Test in both light and dark modes
3. Maintain design consistency
4. Consider user preferences (respect system theme)
5. Document any intentional design decisions that affect accessibility

---

## Color Contrast Reference

### WCAG 2.1 Standards:
- **Normal text** (≤18pt, ≤14pt bold): 4.5:1 minimum
- **Large text** (>18pt, >14pt bold): 3:1 minimum
- **UI components** (icons, borders): 3:1 minimum
- **Non-text contrast** (focus indicators): 3:1 minimum

### Current Light Mode Colors (OKLCH):
- Background: `oklch(1 0 0)` - White (#FFFFFF)
- Foreground: `oklch(0.145 0 0)` - Black (#252525) ✅ Good contrast
- Muted: `oklch(0.556 0 0)` - Gray (#8E8E8E) ❌ Low contrast
- Border: `oklch(0.922 0 0)` - Light gray (#EBEBEB) ⚠️ May be too light
- Accent: `oklch(0.97 0 0)` - Very light gray (#F7F7F7) ⚠️ Low contrast

---

## Quick Wins

1. **Replace text-white**: Find and replace all instances with theme-aware alternatives
2. **Increase muted text darkness**: Change from 0.556 to 0.45 in light mode
3. **Fix hover states**: Replace `hover:bg-white/10` with theme-aware classes
4. **Darken borders**: Change from 0.922 to 0.85 in light mode

These four changes will significantly improve light mode accessibility with minimal effort.

