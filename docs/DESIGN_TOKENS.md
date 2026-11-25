# Design Tokens

Centralized styling configuration for the MatchFlow application. All colors, spacing, typography, and other design constants are defined here to maintain consistency and reduce refactoring friction.

## 📍 Location

`src/shared/styles/design-tokens.ts`

## 🎨 Token Categories

### 1. Colors

#### Brand Colors
```typescript
primary: "#0066ff"      // Main brand blue
primaryHover: "#0052cc" // Hover state
primaryLight: "#e6f2ff" // Light background
```

#### Status Colors (Candidates)
```typescript
status.new: "#0066ff"           // Blue
status.shortlisted: "#7c3aed"   // Purple
status.interview: "#059669"     // Green
status.rejected: "#dc2626"      // Red
```

#### Semantic Colors
```typescript
success: "#059669"              // Green
error: "#dc2626"                // Red
warning: "#f59e0b"              // Amber
info: "#0066ff"                 // Blue
```

#### Gray Scale
```typescript
gray.50 through gray.900        // Neutral palette
```

### 2. Spacing

```typescript
xs: "0.25rem"   // 4px
sm: "0.5rem"    // 8px
md: "1rem"      // 16px (default)
lg: "1.5rem"    // 24px
xl: "2rem"      // 32px
2xl: "2.5rem"   // 40px
3xl: "3rem"     // 48px
```

### 3. Typography

#### Font Families
```typescript
font.sans: "system-ui, -apple-system, sans-serif"
font.mono: "ui-monospace, monospace"
```

#### Font Sizes
```typescript
fontSize.xs: "0.75rem"    // 12px
fontSize.sm: "0.875rem"   // 14px
fontSize.base: "1rem"     // 16px
fontSize.lg: "1.125rem"   // 18px
fontSize.xl: "1.25rem"    // 20px
fontSize.2xl: "1.5rem"    // 24px
fontSize.3xl: "1.875rem"  // 30px
```

#### Font Weights
```typescript
fontWeight.normal: 400
fontWeight.medium: 500
fontWeight.semibold: 600
fontWeight.bold: 700
```

### 4. Borders

#### Border Radius
```typescript
radius.sm: "0.375rem"   // 6px
radius.md: "0.5rem"     // 8px
radius.lg: "0.75rem"    // 12px
radius.full: "9999px"   // Fully rounded
```

#### Border Colors
```typescript
color.light: "#e5e7eb"  // Gray-200
color.medium: "#d1d5db" // Gray-300
color.dark: "#6b7280"   // Gray-500
```

### 5. Shadows

```typescript
shadows.sm   // Subtle elevation
shadows.md   // Medium elevation
shadows.lg   // Large elevation
shadows.xl   // Large prominent elevation
```

### 6. Transitions

```typescript
transitions.fast: "150ms ease-in-out"
transitions.normal: "300ms ease-in-out"
transitions.slow: "500ms ease-in-out"
```

### 7. Z-Index

```typescript
zIndex.base: 0          // Default
zIndex.dropdown: 10     // Dropdown menus
zIndex.sticky: 20       // Sticky elements
zIndex.popover: 30      // Popovers
zIndex.modal: 40        // Modals
zIndex.tooltip: 50      // Tooltips
```

## 💻 Usage Examples

### TypeScript/JavaScript

```typescript
import { designTokens, getColor, getSpacing } from "@/shared/styles/design-tokens";

// Direct access
const primaryColor = designTokens.colors.primary;
const mediumSpacing = designTokens.spacing.md;

// Using utility functions
const statusColor = getColor("colors.status.new");
const padding = getSpacing("lg");

// In component styles
const buttonStyle = {
  color: designTokens.colors.white,
  backgroundColor: designTokens.colors.primary,
  padding: designTokens.spacing.md,
  borderRadius: designTokens.borders.radius.md,
  transition: designTokens.transitions.normal,
};
```

### Tailwind CSS

Since we use Tailwind CSS, tokens map to class names:

```jsx
// Colors
className="text-blue-600"              // primary
className="bg-purple-700"              // status.shortlisted
className="text-gray-700"              // gray.700

// Spacing
className="px-4 py-2"                  // md spacing
className="gap-6"                      // lg spacing

// Border Radius
className="rounded-lg"                 // lg radius
className="rounded-full"               // full radius

// Shadows
className="shadow-md"                  // medium shadow

// Transitions
className="transition-all"             // normal duration
className="transition-colors"          // with property
```

## 🔄 When to Update

Update design tokens when:
- Brand colors change
- Typography scale is adjusted
- Spacing system is modified
- New semantic colors are needed
- Z-index needs reorganization

**Always update tokens.ts first, then adjust Tailwind classes in components.**

## 📋 Maintenance Checklist

Before deploying design changes:
- [ ] Update relevant token value
- [ ] Verify Tailwind classes still match (or update)
- [ ] Check all components using that token
- [ ] Run tests to ensure no visual regressions
- [ ] Update this documentation if needed

## 🚀 Future Enhancements

Potential improvements:
- Convert to Tailwind config file for automatic completion
- Add dark mode token variants
- Generate CSS custom properties for dynamic theming
- Create Figma tokens sync integration

---

**Last Updated**: 2026-11-25  
**Maintained By**: Development Team
