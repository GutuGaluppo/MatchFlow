/**
 * Design Tokens - Centralized styling configuration
 * This file defines all colors, spacing, typography, and other design constants
 * Update here to maintain consistency across the application
 */

export const designTokens = {
  // ========== COLORS ==========
  colors: {
    // Brand
    primary: "#0066ff", // Blue
    primaryHover: "#0052cc",
    primaryLight: "#e6f2ff",

    // Status Colors
    status: {
      new: "#0066ff",
      shortlisted: "#7c3aed",
      interview: "#059669",
      rejected: "#dc2626",
    },

    // Neutrals
    white: "#ffffff",
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },

    // Semantic
    success: "#059669",
    successLight: "#ecfdf5",
    warning: "#f59e0b",
    warningLight: "#fffbeb",
    error: "#dc2626",
    errorLight: "#fee2e2",
    info: "#0066ff",
    infoLight: "#e6f2ff",

    // Gradients
    gradient: {
      blue: "from-blue-400 to-purple-500",
      purple: "from-purple-400 to-pink-500",
      cyan: "from-cyan-400 to-blue-500",
      emerald: "from-emerald-400 to-teal-500",
      orange: "from-orange-400 to-red-500",
    },
  },

  // ========== SPACING ==========
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "2.5rem", // 40px
    "3xl": "3rem", // 48px
  },

  // ========== TYPOGRAPHY ==========
  typography: {
    // Font families
    font: {
      sans: "system-ui, -apple-system, sans-serif",
      mono: "ui-monospace, monospace",
    },

    // Font sizes
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
    },

    // Font weights
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    // Line heights
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.625,
    },
  },

  // ========== BORDERS ==========
  borders: {
    radius: {
      sm: "0.375rem", // 6px
      md: "0.5rem", // 8px
      lg: "0.75rem", // 12px
      full: "9999px",
    },
    width: {
      thin: "1px",
      normal: "2px",
      thick: "3px",
    },
    color: {
      light: "#e5e7eb", // gray-200
      medium: "#d1d5db", // gray-300
      dark: "#6b7280", // gray-500
    },
  },

  // ========== SHADOWS ==========
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },

  // ========== TRANSITIONS ==========
  transitions: {
    fast: "150ms ease-in-out",
    normal: "300ms ease-in-out",
    slow: "500ms ease-in-out",
  },

  // ========== Z-INDEX ==========
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    popover: 30,
    modal: 40,
    tooltip: 50,
  },
} as const;

// ========== UTILITY FUNCTIONS ==========

/**
 * Get spacing value with Tailwind-compatible output
 */
export function getSpacing(key: keyof typeof designTokens.spacing): string {
  return designTokens.spacing[key];
}

/**
 * Get color value
 */
export function getColor(
  colorPath: string
): string | Record<string, string> {
  const parts = colorPath.split(".");
  let value: any = designTokens.colors;

  for (const part of parts) {
    value = value[part];
    if (!value) return "";
  }

  return value;
}

/**
 * Example Tailwind class builder (optional for future use)
 */
export const tailwindTokens = {
  // These would be used if converting to Tailwind config
  colors: designTokens.colors,
  spacing: designTokens.spacing,
  borderRadius: designTokens.borders.radius,
  boxShadow: designTokens.shadows,
  transitionDuration: designTokens.transitions,
};
