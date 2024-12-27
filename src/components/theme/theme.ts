import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineSemanticTokens,
  defineTokens,
} from "@chakra-ui/react";
import { buttonRecipe } from "../recipes/button.recipe";
import { linkRecipe } from "../recipes/link.recipe";
const catppuccin = {
  latte: {
    rosewater: { value: "#dc8a78" },
    flamingo: { value: "#dd7878" },
    pink: { value: "#ea76cb" },
    mauve: { value: "#8839ef" },
    red: { value: "#d20f39" },
    maroon: { value: "#e64553" },
    peach: { value: "#fe640b" },
    yellow: { value: "#df8e1d" },
    green: { value: "#40a02b" },
    teal: { value: "#179299" },
    sky: { value: "#04a5e5" },
    sapphire: { value: "#209fb5" },
    blue: { value: "#1e66f5" },
    lavender: { value: "#7287fd" },
    text: { value: "#4c4f69" },
    subtext1: { value: "#5c5f77" },
    subtext0: { value: "#6c6f85" },
    overlay2: { value: "#7c7f93" },
    overlay1: { value: "#8c8fa1" },
    overlay0: { value: "#9ca0b0" },
    surface2: { value: "#acb0be" },
    surface1: { value: "#bcc0cc" },
    surface0: { value: "#ccd0da" },
    base: { value: "#eff1f5" },
    mantle: { value: "#e6e9ef" },
    crust: { value: "#dce0e8" },
  },
  frappe: {
    rosewater: { value: "#f2d5cf" },
    flamingo: { value: "#eebebe" },
    pink: { value: "#f4b8e4" },
    mauve: { value: "#ca9ee6" },
    red: { value: "#e78284" },
    maroon: { value: "#ea999c" },
    peach: { value: "#ef9f76" },
    yellow: { value: "#e5c890" },
    green: { value: "#a6d189" },
    teal: { value: "#81c8be" },
    sky: { value: "#99d1db" },
    sapphire: { value: "#85c1dc" },
    blue: { value: "#8caaee" },
    lavender: { value: "#babbf1" },
    text: { value: "#c6d0f5" },
    subtext1: { value: "#b5bfe2" },
    subtext0: { value: "#a5adce" },
    overlay2: { value: "#949cbb" },
    overlay1: { value: "#838ba7" },
    overlay0: { value: "#737994" },
    surface2: { value: "#626880" },
    surface1: { value: "#51576d" },
    surface0: { value: "#414559" },
    base: { value: "#303446" },
    mantle: { value: "#292c3c" },
    crust: { value: "#232634" },
  },
  macchiato: {
    rosewater: { value: "#f4dbd6" },
    flamingo: { value: "#f0c6c6" },
    pink: { value: "#f5bde6" },
    mauve: { value: "#c6a0f6" },
    red: { value: "#ed8796" },
    maroon: { value: "#ee99a0" },
    peach: { value: "#f5a97f" },
    yellow: { value: "#eed49f" },
    green: { value: "#a6da95" },
    teal: { value: "#8bd5ca" },
    sky: { value: "#91d7e3" },
    sapphire: { value: "#7dc4e4" },
    blue: { value: "#8aadf4" },
    lavender: { value: "#b7bdf8" },
    text: { value: "#cad3f5" },
    subtext1: { value: "#b8c0e0" },
    subtext0: { value: "#a5adcb" },
    overlay2: { value: "#939ab7" },
    overlay1: { value: "#8087a2" },
    overlay0: { value: "#6e738d" },
    surface2: { value: "#5b6078" },
    surface1: { value: "#494d64" },
    surface0: { value: "#363a4f" },
    base: { value: "#24273a" },
    mantle: { value: "#1e2030" },
    crust: { value: "#181926" },
  },
  mocha: {
    rosewater: { value: "#f5e0dc" },
    flamingo: { value: "#f2cdcd" },
    pink: { value: "#f5c2e7" },
    mauve: { value: "#cba6f7" },
    red: { value: "#f38ba8" },
    maroon: { value: "#eba0ac" },
    peach: { value: "#fab387" },
    yellow: { value: "#f9e2af" },
    green: { value: "#a6e3a1" },
    teal: { value: "#94e2d5" },
    sky: { value: "#89dceb" },
    sapphire: { value: "#74c7ec" },
    blue: { value: "#89b4fa" },
    lavender: { value: "#b4befe" },
    text: { value: "#cdd6f4" },
    subtext1: { value: "#bac2de" },
    subtext0: { value: "#a6adc8" },
    overlay2: { value: "#9399b2" },
    overlay1: { value: "#7f849c" },
    overlay0: { value: "#6c7086" },
    surface2: { value: "#585b70" },
    surface1: { value: "#45475a" },
    surface0: { value: "#313244" },
    base: { value: "#1e1e2e" },
    mantle: { value: "#181825" },
    crust: { value: "#11111b" },
  },
};

// Define base tokens
const tokens = defineTokens({
  colors: {
    catppuccin,
  },
  fonts: {
    heading: { value: "var(--font-funnel-sans)" },
    body: { value: "var(--font-funnel-sans)" },
  },
  shadows: {
    subtle: { value: "0 2px 8px 0 rgba(0, 0, 0, 0.1)" },
    card: { value: "0 4px 6px 0 rgba(0, 0, 0, 0.1)" },
  },
  radii: {
    button: { value: "4px" },
    card: { value: "8px" },
    image: { value: "12px" },
  },
  durations: {
    fast: { value: "200ms" },
    normal: { value: "300ms" },
  },
  easings: {
    smooth: { value: "cubic-bezier(0.4, 0, 0.2, 1)" },
  },
  // Add spacing tokens
  spacing: {
    1: { value: "0.25rem" },
    2: { value: "0.5rem" },
    3: { value: "0.75rem" },
    4: { value: "1rem" },
    5: { value: "1.25rem" },
    6: { value: "1.5rem" },
    8: { value: "2rem" },
  },
  // Add size tokens
  sizes: {
    container: {
      sm: { value: "640px" },
      md: { value: "768px" },
      lg: { value: "1024px" },
      xl: { value: "1280px" },
    },
  },
  // Add border width tokens
  borderWidths: {
    thin: { value: "1px" },
    medium: { value: "2px" },
    thick: { value: "4px" },
  },
  animations: {
    timingFunction: {
      // Ins
      inQuad: { value: "cubic-bezier(.55, .085, .68, .53)" },
      inCubic: { value: "cubic-bezier(.550, .055, .675, .19)" },
      inQuart: { value: "cubic-bezier(.895, .03, .685, .22)" },
      inQuint: { value: "cubic-bezier(.755, .05, .855, .06)" },
      inExpo: { value: "cubic-bezier(.95, .05, .795, .035)" },
      inCirc: { value: "cubic-bezier(.6, .04, .98, .335)" },
      // Outs
      outQuad: { value: "cubic-bezier(.25, .46, .45, .94)" },
      outCubic: { value: "cubic-bezier(.215, .61, .355, 1)" },
      outQuart: { value: "cubic-bezier(.165, .84, .44, 1)" },
      outQuint: { value: "cubic-bezier(.23, 1, .32, 1)" },
      outExpo: { value: "cubic-bezier(.19, 1, .22, 1)" },
      outCirc: { value: "cubic-bezier(.075, .82, .165, 1)" },
      // In - outs
      inOutQuad: { value: "cubic-bezier(.455, .03, .515, .955)" },
      inOutCubic: { value: "cubic-bezier(.645, .045, .355, 1)" },
      inOutQuart: { value: "cubic-bezier(.77, 0, .175, 1)" },
      inOutQuint: { value: "cubic-bezier(.86, 0, .07, 1)" },
      inOutExpo: { value: "cubic-bezier(1, 0, 0, 1)" },
      inOutCirc: { value: "cubic-bezier(.785, .135, .15, .86)" },
    },
  },
  conditions: {
    latte: "[data-theme=latte]",
    frappe: "[data-theme=frappe]",
    macchiato: "[data-theme=macchiato]",
    mocha: "[data-theme=mocha]",
  },
});

const semanticTokens = defineSemanticTokens({
  colors: {
    // Background colors
    "bg.canvas": {
      value: {
        _latte: "{colors.catppuccin.latte.base}",
        _frappe: "{colors.catppuccin.frappe.base}",
        _macchiato: "{colors.catppuccin.macchiato.base}",
        _mocha: "{colors.catppuccin.mocha.base}",
      },
      description: "Main background color",
    },
    "bg.surface": {
      value: {
        _latte: "{colors.catppuccin.latte.mantle}",
        _frappe: "{colors.catppuccin.frappe.mantle}",
        _macchiato: "{colors.catppuccin.macchiato.mantle}",
        _mocha: "{colors.catppuccin.mocha.mantle}",
      },
      description: "Surface background color",
    },
    "bg.surface1": {
      value: {
        _latte: "{colors.catppuccin.latte.surface1}",
        _frappe: "{colors.catppuccin.frappe.surface1}",
        _macchiato: "{colors.catppuccin.macchiato.surface1}",
        _mocha: "{colors.catppuccin.mocha.surface1}",
      },
      description: "Surface 1 background color",
    },
    "bg.surface2": {
      value: {
        _latte: "{colors.catppuccin.latte.surface2}",
        _frappe: "{colors.catppuccin.frappe.surface2}",
        _macchiato: "{colors.catppuccin.macchiato.surface2}",
        _mocha: "{colors.catppuccin.mocha.surface2}",
      },
      description: "Surface 2 background color",
    },
    "bg.subtle": {
      value: {
        _latte: "{colors.catppuccin.latte.crust}",
        _frappe: "{colors.catppuccin.frappe.crust}",
        _macchiato: "{colors.catppuccin.macchiato.crust}",
        _mocha: "{colors.catppuccin.mocha.crust}",
      },
      description: "Subtle background color",
    },
    "bg.overlay": {
      value: {
        _latte: "{colors.catppuccin.latte.overlay0}",
        _frappe: "{colors.catppuccin.frappe.overlay0}",
        _macchiato: "{colors.catppuccin.macchiato.overlay0}",
        _mocha: "{colors.catppuccin.mocha.overlay0}",
      },
      description: "Overlay background color",
    },
    "bg.overlay2": {
      value: {
        _latte: "{colors.catppuccin.latte.overlay1}",
        _frappe: "{colors.catppuccin.frappe.overlay1}",
        _macchiato: "{colors.catppuccin.macchiato.overlay1}",
        _mocha: "{colors.catppuccin.mocha.overlay1}",
      },
      description: "Overlay background color",
    },
    "bg.crust": {
      value: {
        _latte: "{colors.catppuccin.latte.crust}",
        _frappe: "{colors.catppuccin.frappe.crust}",
        _macchiato: "{colors.catppuccin.macchiato.crust}",
        _mocha: "{colors.catppuccin.mocha.crust}",
      },
      description: "Crust background color",
    },

    // Foreground colors
    "fg.default": {
      value: {
        _latte: "{colors.catppuccin.latte.text}",
        _frappe: "{colors.catppuccin.frappe.text}",
        _macchiato: "{colors.catppuccin.macchiato.text}",
        _mocha: "{colors.catppuccin.mocha.text}",
      },
      description: "Default text color",
    },
    "fg.emphasized": {
      value: {
        _latte: "{colors.catppuccin.latte.subtext1}",
        _frappe: "{colors.catppuccin.frappe.subtext1}",
        _macchiato: "{colors.catppuccin.macchiato.subtext1}",
        _mocha: "{colors.catppuccin.mocha.subtext1}",
      },
      description: "Emphasized text color",
    },
    "fg.muted": {
      value: {
        _latte: "{colors.catppuccin.latte.subtext0}",
        _frappe: "{colors.catppuccin.frappe.subtext0}",
        _macchiato: "{colors.catppuccin.macchiato.subtext0}",
        _mocha: "{colors.catppuccin.mocha.subtext0}",
      },
      description: "Muted text color",
    },

    // Border colors
    "border.default": {
      value: {
        _latte: "{colors.catppuccin.latte.overlay0}",
        _frappe: "{colors.catppuccin.frappe.overlay0}",
        _macchiato: "{colors.catppuccin.macchiato.overlay0}",
        _mocha: "{colors.catppuccin.mocha.overlay0}",
      },
      description: "Default border color",
    },
    "border.emphasized": {
      value: {
        _latte: "{colors.catppuccin.latte.overlay1}",
        _frappe: "{colors.catppuccin.frappe.overlay1}",
        _macchiato: "{colors.catppuccin.macchiato.overlay1}",
        _mocha: "{colors.catppuccin.mocha.overlay1}",
      },
      description: "Emphasized border color",
    },
    "border.strong": {
      value: {
        _latte: "{colors.catppuccin.latte.overlay2}",
        _frappe: "{colors.catppuccin.frappe.overlay2}",
        _macchiato: "{colors.catppuccin.macchiato.overlay2}",
        _mocha: "{colors.catppuccin.mocha.overlay2}",
      },
      description: "Strong border color",
    },
    "border.surface": {
      value: {
        _latte: "{colors.catppuccin.latte.surface0}",
        _frappe: "{colors.catppuccin.frappe.surface0}",
        _macchiato: "{colors.catppuccin.macchiato.surface0}",
        _mocha: "{colors.catppuccin.mocha.surface0}",
      },
      description: "Surface border color",
    },

    // Surface colors
    "surface.default": {
      value: {
        _latte: "{colors.catppuccin.latte.surface0}",
        _frappe: "{colors.catppuccin.frappe.surface0}",
        _macchiato: "{colors.catppuccin.macchiato.surface0}",
        _mocha: "{colors.catppuccin.mocha.surface0}",
      },
      description: "Default surface color",
    },
    "surface.emphasized": {
      value: {
        _latte: "{colors.catppuccin.latte.surface1}",
        _frappe: "{colors.catppuccin.frappe.surface1}",
        _macchiato: "{colors.catppuccin.macchiato.surface1}",
        _mocha: "{colors.catppuccin.mocha.surface1}",
      },
      description: "Emphasized surface color",
    },
    "surface.strong": {
      value: {
        _latte: "{colors.catppuccin.latte.surface2}",
        _frappe: "{colors.catppuccin.frappe.surface2}",
        _macchiato: "{colors.catppuccin.macchiato.surface2}",
        _mocha: "{colors.catppuccin.mocha.surface2}",
      },
      description: "Strong surface color",
    },

    // Primary colors
    "primary.default": {
      value: {
        _latte: "{colors.catppuccin.latte.red}",
        _frappe: "{colors.catppuccin.frappe.red}",
        _macchiato: "{colors.catppuccin.macchiato.red}",
        _mocha: "{colors.catppuccin.mocha.red}",
      },
      description: "Primary color",
    },
    "primary.emphasized": {
      value: {
        _latte: "{colors.catppuccin.latte.pink}",
        _frappe: "{colors.catppuccin.frappe.pink}",
        _macchiato: "{colors.catppuccin.macchiato.pink}",
        _mocha: "{colors.catppuccin.mocha.pink}",
      },
      description: "Emphasized primary color",
    },

    // Status colors
    "status.success": {
      value: {
        _latte: "{colors.catppuccin.latte.green}",
        _frappe: "{colors.catppuccin.frappe.green}",
        _macchiato: "{colors.catppuccin.macchiato.green}",
        _mocha: "{colors.catppuccin.mocha.green}",
      },
      description: "Success status color",
    },
    "status.warning": {
      value: {
        _latte: "{colors.catppuccin.latte.yellow}",
        _frappe: "{colors.catppuccin.frappe.yellow}",
        _macchiato: "{colors.catppuccin.macchiato.yellow}",
        _mocha: "{colors.catppuccin.mocha.yellow}",
      },
      description: "Warning status color",
    },
    "status.error": {
      value: {
        _latte: "{colors.catppuccin.latte.red}",
        _frappe: "{colors.catppuccin.frappe.red}",
        _macchiato: "{colors.catppuccin.macchiato.red}",
        _mocha: "{colors.catppuccin.mocha.red}",
      },
      description: "Error status color",
    },

    // Brand colors
    "brand.primary": {
      value: {
        _latte: "{colors.catppuccin.latte.red}",
        _frappe: "{colors.catppuccin.frappe.red}",
        _macchiato: "{colors.catppuccin.macchiato.red}",
        _mocha: "{colors.catppuccin.mocha.red}",
      },
      description: "Primary brand color",
    },
    "brand.secondary": {
      value: {
        _latte: "{colors.catppuccin.latte.rosewater}",
        _frappe: "{colors.catppuccin.frappe.rosewater}",
        _macchiato: "{colors.catppuccin.macchiato.rosewater}",
        _mocha: "{colors.catppuccin.mocha.rosewater}",
      },
      description: "Secondary brand color",
    },

    // Accent colors
    "accent.pink": {
      value: {
        _latte: "{colors.catppuccin.latte.pink}",
        _frappe: "{colors.catppuccin.frappe.pink}",
        _macchiato: "{colors.catppuccin.macchiato.pink}",
        _mocha: "{colors.catppuccin.mocha.pink}",
      },
    },
    "accent.mauve": {
      value: {
        _latte: "{colors.catppuccin.latte.mauve}",
        _frappe: "{colors.catppuccin.frappe.mauve}",
        _macchiato: "{colors.catppuccin.macchiato.mauve}",
        _mocha: "{colors.catppuccin.mocha.mauve}",
      },
    },
    "accent.peach": {
      value: {
        _latte: "{colors.catppuccin.latte.peach}",
        _frappe: "{colors.catppuccin.frappe.peach}",
        _macchiato: "{colors.catppuccin.macchiato.peach}",
        _mocha: "{colors.catppuccin.mocha.peach}",
      },
    },
    "accent.maroon": {
      value: {
        _latte: "{colors.catppuccin.latte.maroon}",
        _frappe: "{colors.catppuccin.frappe.maroon}",
        _macchiato: "{colors.catppuccin.macchiato.maroon}",
        _mocha: "{colors.catppuccin.mocha.maroon}",
      },
    },
    "accent.rosewater": {
      value: {
        _latte: "{colors.catppuccin.latte.rosewater}",
        _frappe: "{colors.catppuccin.frappe.rosewater}",
        _macchiato: "{colors.catppuccin.macchiato.rosewater}",
        _mocha: "{colors.catppuccin.mocha.rosewater}",
      },
    },
  },
});

const config = defineConfig({
  cssVarsPrefix: "catflix",
  globalCss: {
    "html, body": {
      backgroundColor: "bg.crust",
      color: "fg.default",
    },
    "::selection": {
      backgroundColor: "bg.overlay2/30",
      color: "primary.default",
    },
  },
  conditions: {
    latte: '[data-theme="latte"]',
    frappe: '[data-theme="frappe"]',
    macchiato: '[data-theme="macchiato"]',
    mocha: '[data-theme="mocha"]',
  },
  theme: {
    recipes: {
      button: buttonRecipe,
      link: linkRecipe,
    },
    tokens,
    semanticTokens,
  },
});

export default createSystem(defaultConfig, config);
