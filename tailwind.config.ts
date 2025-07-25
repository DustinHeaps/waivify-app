import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      typography: (theme: (key: string) => string) => ({
        DEFAULT: {
          css: {
            "--tw-prose-links": theme("colors.blue.500"),
            a: {
              color: "var(--tw-prose-links)",
              "&:hover": {
                color: theme("colors.blue.700"),
              },
            },
          },
        },
        // Blog style Override
        blog: {
          css: {
            maxWidth: "100%",
            fontSize: theme("fontSize.base"),
            color: theme("colors.foreground"),

            h1: {
              fontWeight: "700",
              fontSize: theme("fontSize.4xl"),
              marginBottom: theme("spacing.4"),
            },
            h2: {
              fontSize: theme("fontSize.2xl"),
              fontWeight: "600",
              marginTop: theme("spacing.10"),
              marginBottom: theme("spacing.4"),
            },
            h3: {
              fontSize: theme("fontSize.xl"),
              fontWeight: "600",
              marginTop: theme("spacing.8"),
              marginBottom: theme("spacing.2"),
            },
            p: {
              marginTop: theme("spacing.4"),
              marginBottom: theme("spacing.4"),
              lineHeight: theme("lineHeight.relaxed"),
            },
            ul: {
              marginTop: theme("spacing.4"),
              paddingLeft: theme("spacing.6"),
            },
            li: {
              marginTop: theme("spacing.2"),
            },
            strong: { fontWeight: "600" },
            code: { backgroundColor: theme("colors.muted.DEFAULT") },
          },
        },
      }),
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        navy: "#000080",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    typography,
    function ({ addComponents }: any) {
      addComponents({
        ".btn-navy": {
          backgroundColor: "#000080",
          color: "white",
          transition: "background-color 0.2s",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 128, 0.85)",
          },
        },
        ".btn-secondary": {
          backgroundColor: "#fff",
          border: "1px solid #000080",
          color: "#000080",
          transition: "background-color 0.2s",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 128, 0.1)",
          },
        },
      });
    },
  ],
};
module.exports = config;
