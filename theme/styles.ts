import { css } from "@emotion/react";
import { BackgroundType, colorTypes, spacingTypes, Strokes, Typography } from "./styles.types";

// Global style variables

export const background: BackgroundType = {
  app: "#f3f3f3",
  appInverse: "#1e1e1e",
  positive: "#E1FFD4",
  negative: "#FEDED2",
  warning: "#FFF5CF",
};

export const color: colorTypes = {
  primary: "#1E1E1E",
  secondary: "#533CDE",
  tertiary: "#FF9393",
  foreground: "#1E1E1E",
  foreground200: "#2C2C2C",
  foreground300: "#3C3C3C",
  foregroundInverse: "#f3f3f3",
  foregroundInverse200: "#e3e3e3",
  foregroundInverse300: "#d3d3d3",
  foregroundInverse400: "#c3c3c3",
  medium: "#DDDDDD",
  medium100: "#EEEEEE",
  medium200: "#999999",
  border: "rgba(255,255,255,0.1)",
  border100: "#FFFFFF",
  input100: "#E9E9E9",
  accent100: "#6F6DF1",
  accent200: "#FF7676",
  accent300: "#16FFD5",
  error: "#F52E2E",
  warning: "#FF9E44",
  positive: "#17AF81",
};

export const spacing: spacingTypes = {
  padding: {
    p0: "0.375rem", // 6px, minimal padding for very tight spaces
    p1: "0.5rem", // 8px, small padding for close elements
    p2: "0.75rem", // 12px, standard padding, ideal for grouped items
    p3: "1rem", // 16px, medium padding, commonly used in containers
    p4: "1.25rem", // 20px, moderate padding, good for larger sections
    p5: "1.5rem", // 24px, spacious padding, used in major sections or large containers
  },
  borderRadius: {
    r0: "0.25rem", // 4px
    r1: "0.5rem", // 8px
    r2: "0.75rem", // 12px
    r3: "1rem", // 16px
    r4: "1.5rem", // 24px
    r5: "2rem", // 32px
  },
};

export const typography: Typography = {
  type: {
    primary: '"Poppins", "Helvetica Neue", Helvetica, Arial, sans-serif',
    title: 'var(--title)',
    code: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  weight: {
    regular: "400",
    medium: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
  size: {
    h1: "2.25rem", // 36px
    h2: "2rem", // 32px
    h3: "1.75rem", // 28px
    h4: "1.5rem", // 24px
    h5: "1.25rem", // 20px
    h6: "1rem", // 16px
    text: "1rem", // 16px, ideal for body text
    input: "0.875rem", // 14px, typical for form input text
    caption: "0.75rem", // 12px, for smaller text
    code: "0.875rem", // 14px, suitable for code snippets
  },
};

export const strokes: Strokes = {
  s0: "0.1rem", // 1.6px, very fine details and subtle divisions
  s1: "0.2rem", // 3.2px, fine lines for subtle differentiation
  s2: "0.4rem", // 6.4px, medium weight strokes for more visible separation
  s3: "0.8rem", // 12.8px, thick strokes for bold statements or accent features
};

export const shadow: string = "0 2px 4px rgba(0, 0, 0, 0.1)";
export const shadowDeep: string = "0 10px 20px rgba(0, 0, 0, 0.1)";
export const neumorphismShadow: string =
  "inset 5px 5px 15px rgba(0, 0, 0, 0.25), inset -5px -5px 15px rgba(200, 200, 200, 0.5)";

export const breakpoint:number = 600;
export const pageMargin: number = 5.55555;

export const pageMargins = css`
  padding: 0 ${spacing.padding.p3};
  @media (min-width: ${breakpoint}px) {
    margin: 0 ${pageMargin}%;
  }
`;

export const GlobalStyle = css`
  body {
    font-family: ${typography.type.primary};
    font-size: ${typography.size.text}; /* Example font size */
    color: ${color.foreground};
    background: ${background.app};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
