import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Text color utilities for brand palette
        "text-primary": "#0000ff",
        "text-primary-dark": "#0000ad",
        "text-secondary": "#e68a00",
        "text-secondary-dark": "#cc7a00",
        "text-success": "#00b368",
        "text-error": "#dc3545",
        "text-warning": "#ffc107",
        "text-info": "#2196f3",
        "text-accent": "#9c27b0",
        "text-foreground": "#212121",
        "text-muted-foreground": "#6b7280",
        "text-card": "#212121",
        "text-popover": "#212121",
        "text-sidebar": "#3c4257",
        "text-sidebar-primary": "#ffffff",
        "text-sidebar-accent": "#3c4257",
        "text-paper": "#ffffff",
        // New Brand Colors from provided palette
        paper: "#ffffff",
        "background-light": "#fafbff",
        "background-default": "#f5f6fa",

        // Primary (Blue - Enhanced palette)
        primary: {
          50: "#f5f5ff",
          75: "#eceeff",
          100: "#e8e9ff",
          110: "#d6d7ff",
          120: "#c4c5ff",
          130: "#b3b4ff",
          150: "#b3b3ff",
          200: "#7a7aff",
          250: "#6666ff",
          300: "#5252ff",
          350: "#3d3dff",
          400: "#2929ff",
          450: "#1414ff",
          500: "#0000ff",
          550: "#0000eb",
          600: "#0000d6",
          650: "#0000c2",
          700: "#0000ad",
          750: "#0d0da6",
          800: "#0c0c90",
          850: "#0a0a7b",
          900: "#060655",
          DEFAULT: "#2c2ce0",
          light: "#e8e9ff",
          lighter: "#f0f1ff",
          dark: "#1e1ede",
          darker: "#15157b",
        },

        // Secondary (Orange - Enhanced harmony)
        secondary: {
          50: "#fff8f0",
          75: "#fff4e5",
          100: "#fff0e0",
          110: "#ffe8cc",
          120: "#ffe0b8",
          130: "#ffd8a4",
          150: "#ffd499",
          200: "#ffb84d",
          250: "#ffae38",
          300: "#ffa929",
          350: "#ff9f14",
          400: "#ff9900",
          450: "#f29100",
          500: "#e68a00",
          550: "#d98200",
          600: "#cc7a00",
          650: "#bf7200",
          700: "#b36b00",
          750: "#a66400",
          800: "#995c00",
          850: "#8c5500",
          900: "#804d00",
          DEFAULT: "#e68a00",
          light: "#fff0e0",
          lighter: "#fff5eb",
          dark: "#cc7a00",
          darker: "#995c00",
        },

        // Success (Refined brand aesthetic)
        success: {
          50: "#f2fcf6",
          100: "#e6f7ed",
          200: "#66d19e",
          300: "#33c585",
          400: "#00b368",
          500: "#009e5a",
          600: "#008c52",
          700: "#007745",
          800: "#006b3f",
          900: "#004d2d",
          DEFAULT: "#00b368",
          light: "#e6f7ed",
          lighter: "#f0faf4",
          dark: "#008c52",
          darker: "#006b3f",
        },

        // Error (Enhanced visibility)
        error: {
          50: "#fff5f5",
          100: "#ffe8e8",
          200: "#f5aaaa",
          300: "#eb7777",
          400: "#e14444",
          500: "#dc3545",
          600: "#b02a37",
          700: "#842029",
          800: "#58151b",
          900: "#2c0b0e",
          DEFAULT: "#dc3545",
          light: "#ffe8e8",
          lighter: "#fff0f0",
          dark: "#b02a37",
          darker: "#842029",
        },

        // Warning (Brand harmony)
        warning: {
          50: "#fffdf5",
          100: "#fff8e6",
          200: "#ffe066",
          300: "#ffd333",
          400: "#ffc107",
          500: "#e6ac00",
          600: "#cc9a06",
          700: "#b38600",
          800: "#997404",
          900: "#805f02",
          DEFAULT: "#ffc107",
          light: "#fff8e6",
          lighter: "#fffbf0",
          dark: "#cc9a06",
          darker: "#997404",
        },

        // Info (Complementary blue)
        info: {
          50: "#f0f7ff",
          100: "#e3f2fd",
          200: "#90caf9",
          300: "#42a5f5",
          400: "#2196f3",
          500: "#1e88e5",
          600: "#1976d2",
          700: "#1565c0",
          800: "#0d47a1",
          900: "#0a2472",
          DEFAULT: "#2196f3",
          light: "#e3f2fd",
          lighter: "#f0f7ff",
          dark: "#1976d2",
          darker: "#0d47a1",
        },

        // Enhanced Grayscale
        grey: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9e9e9e",
          600: "#757575",
          700: "#424242",
          800: "#303030",
          900: "#212121",
        },

        // Accent (Purple accent)
        accent: {
          50: "#f8f0f9",
          100: "#f3e5f5",
          200: "#e1bee7",
          300: "#ce93d8",
          400: "#ab47bc",
          500: "#9c27b0",
          600: "#8e24aa",
          700: "#7b1fa2",
          800: "#6a1b9a",
          900: "#4a148c",
          DEFAULT: "#9c27b0",
          light: "#f3e5f5",
          lighter: "#f8f0f9",
          dark: "#7b1fa2",
          darker: "#4a148c",
        },

        // Keep existing shadcn colors for compatibility
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Keep existing emerald for backward compatibility
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },

        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      ringColor: {
        DEFAULT: "transparent",
      },
      ringOffsetColor: {
        DEFAULT: "transparent",
      },
      ringWidth: {
        DEFAULT: "0",
      },
      outline: {
        none: "none",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        arabic: ["Noto Sans Arabic", "sans-serif"],
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(100px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(44, 44, 224, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(44, 44, 224, 0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.8s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
