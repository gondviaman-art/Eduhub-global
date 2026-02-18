// Global Styling and Theming System
export const PREMIUM_THEME = {
  // Colors - Modern, Professional Palette
  colors: {
    // Primary Brand Colors
    primary: '#6366F1', // Indigo
    primaryLight: '#818CF8',
    primaryDark: '#4F46E5',

    // Secondary Colors
    secondary: '#06B6D4', // Cyan
    secondaryLight: '#22D3EE',
    secondaryDark: '#0891B2',

    // Accent Colors
    success: '#10B981', // Green
    successLight: '#34D399',
    warning: '#F59E0B', // Amber
    warningLight: '#FBBF24',
    error: '#EF4444', // Red
    errorLight: '#F87171',
    info: '#3B82F6', // Blue
    infoLight: '#60A5FA',

    // Neutral Colors
    white: '#FFFFFF',
    black: '#000000',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',

    // Gradients
    gradientPrimary: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
    gradientSuccess: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    gradientWarning: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
    gradientDanger: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
  },

  // Typography
  typography: {
    // Font families
    fontFamily: {
      sans: "'Segoe UI', 'Roboto', '-apple-system', 'BlinkMacSystemFont', sans-serif",
      mono: "'Fira Code', 'Monaco', 'Courier New', monospace",
    },

    // Font sizes
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },

    // Font weights
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    // Line heights
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
  },

  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    xs: '0.25rem',    // 4px
    sm: '0.375rem',   // 6px
    base: '0.5rem',   // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    full: '9999px',
  },

  // Shadows
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    premium: '0 20px 40px rgba(0, 0, 0, 0.15)',
    glow: '0 0 30px rgba(99, 102, 241, 0.3)',
  },

  // Transitions
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slowest: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    dropdown: 1000,
    modal: 1050,
    popover: 1100,
    tooltip: 1200,
  },
};

// Reusable Component Styles
export const COMPONENT_STYLES = {
  // Button Styles
  button: {
    primary: {
      background: PREMIUM_THEME.colors.primary,
      color: PREMIUM_THEME.colors.white,
      padding: `${PREMIUM_THEME.spacing[2]} ${PREMIUM_THEME.spacing[4]}`,
      borderRadius: PREMIUM_THEME.borderRadius.md,
      border: 'none',
      fontSize: PREMIUM_THEME.typography.fontSize.base,
      fontWeight: PREMIUM_THEME.typography.fontWeight.semibold,
      cursor: 'pointer',
      boxShadow: PREMIUM_THEME.shadows.base,
      transition: `all ${PREMIUM_THEME.transitions.fast}`,
    },
    secondary: {
      background: PREMIUM_THEME.colors.secondary,
      color: PREMIUM_THEME.colors.white,
      padding: `${PREMIUM_THEME.spacing[2]} ${PREMIUM_THEME.spacing[4]}`,
      borderRadius: PREMIUM_THEME.borderRadius.md,
      border: 'none',
      fontSize: PREMIUM_THEME.typography.fontSize.base,
      fontWeight: PREMIUM_THEME.typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: `all ${PREMIUM_THEME.transitions.fast}`,
    },
    outline: {
      background: 'transparent',
      color: PREMIUM_THEME.colors.primary,
      padding: `${PREMIUM_THEME.spacing[2]} ${PREMIUM_THEME.spacing[4]}`,
      border: `2px solid ${PREMIUM_THEME.colors.primary}`,
      borderRadius: PREMIUM_THEME.borderRadius.md,
      fontSize: PREMIUM_THEME.typography.fontSize.base,
      fontWeight: PREMIUM_THEME.typography.fontWeight.semibold,
      cursor: 'pointer',
      transition: `all ${PREMIUM_THEME.transitions.fast}`,
    },
  },

  // Card Styles
  card: {
    base: {
      background: PREMIUM_THEME.colors.white,
      borderRadius: PREMIUM_THEME.borderRadius.lg,
      border: `1px solid ${PREMIUM_THEME.colors.gray200}`,
      boxShadow: PREMIUM_THEME.shadows.sm,
      padding: PREMIUM_THEME.spacing[6],
      transition: `all ${PREMIUM_THEME.transitions.base}`,
    },
    elevated: {
      background: PREMIUM_THEME.colors.white,
      borderRadius: PREMIUM_THEME.borderRadius.lg,
      boxShadow: PREMIUM_THEME.shadows.lg,
      padding: PREMIUM_THEME.spacing[6],
      transition: `all ${PREMIUM_THEME.transitions.base}`,
    },
    premium: {
      background: `linear-gradient(135deg, ${PREMIUM_THEME.colors.gray50} 0%, ${PREMIUM_THEME.colors.white} 100%)`,
      borderRadius: PREMIUM_THEME.borderRadius.xl,
      boxShadow: PREMIUM_THEME.shadows.premium,
      padding: PREMIUM_THEME.spacing[8],
      border: `1px solid ${PREMIUM_THEME.colors.gray100}`,
      transition: `all ${PREMIUM_THEME.transitions.base}`,
    },
  },

  // Input Styles
  input: {
    base: {
      padding: `${PREMIUM_THEME.spacing[2]} ${PREMIUM_THEME.spacing[4]}`,
      fontSize: PREMIUM_THEME.typography.fontSize.base,
      border: `2px solid ${PREMIUM_THEME.colors.gray300}`,
      borderRadius: PREMIUM_THEME.borderRadius.md,
      fontFamily: PREMIUM_THEME.typography.fontFamily.sans,
      transition: `all ${PREMIUM_THEME.transitions.fast}`,
    },
    focused: {
      borderColor: PREMIUM_THEME.colors.primary,
      boxShadow: `0 0 0 3px ${PREMIUM_THEME.colors.primary}25`,
    },
    error: {
      borderColor: PREMIUM_THEME.colors.error,
      boxShadow: `0 0 0 3px ${PREMIUM_THEME.colors.error}25`,
    },
  },

  // Badge Styles
  badge: {
    primary: {
      background: PREMIUM_THEME.colors.primary,
      color: PREMIUM_THEME.colors.white,
      padding: `${PREMIUM_THEME.spacing[1]} ${PREMIUM_THEME.spacing[3]}`,
      borderRadius: PREMIUM_THEME.borderRadius.full,
      fontSize: PREMIUM_THEME.typography.fontSize.xs,
      fontWeight: PREMIUM_THEME.typography.fontWeight.semibold,
      display: 'inline-block',
    },
    success: {
      background: PREMIUM_THEME.colors.success,
      color: PREMIUM_THEME.colors.white,
      padding: `${PREMIUM_THEME.spacing[1]} ${PREMIUM_THEME.spacing[3]}`,
      borderRadius: PREMIUM_THEME.borderRadius.full,
      fontSize: PREMIUM_THEME.typography.fontSize.xs,
      fontWeight: PREMIUM_THEME.typography.fontWeight.semibold,
    },
    warning: {
      background: PREMIUM_THEME.colors.warning,
      color: PREMIUM_THEME.colors.black,
      padding: `${PREMIUM_THEME.spacing[1]} ${PREMIUM_THEME.spacing[3]}`,
      borderRadius: PREMIUM_THEME.borderRadius.full,
      fontSize: PREMIUM_THEME.typography.fontSize.xs,
      fontWeight: PREMIUM_THEME.typography.fontWeight.semibold,
    },
  },
};

// Page Layout Styles
export const PAGE_STYLES = {
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: PREMIUM_THEME.spacing[6],
  },
  containerSmall: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: PREMIUM_THEME.spacing[6],
  },
  containerLarge: {
    maxWidth: '1536px',
    margin: '0 auto',
    padding: PREMIUM_THEME.spacing[6],
  },
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  xs: 0,       // Extra small devices
  sm: 640,     // Small devices
  md: 768,     // Medium devices
  lg: 1024,    // Large devices
  xl: 1280,    // Extra large devices
  '2xl': 1536, // 2XL devices
};

// Animation Keyframes
export const ANIMATIONS = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInLeft {
    from {
      transform: translateX(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes glow {
    0% {
      box-shadow: 0 0 5px rgba(99, 102, 241, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
    }
    100% {
      box-shadow: 0 0 5px rgba(99, 102, 241, 0.3);
    }
  }
`;

// Export all styles
export const STYLES = {
  PREMIUM_THEME,
  COMPONENT_STYLES,
  PAGE_STYLES,
  BREAKPOINTS,
  ANIMATIONS,
};
