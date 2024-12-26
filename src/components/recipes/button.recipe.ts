import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    outline: "none",
    borderRadius: "button",
    fontWeight: "medium",
    transitionProperty: "all",
    transitionDuration: "normal",
    animationTimingFunction: "outQuad",
    cursor: "pointer",
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      boxShadow: "none",
    },
    _focusVisible: {
      boxShadow: "outline",
    },
    _hover: {
      transform: "scale(1.05)",
      transition: "transform 0.2s ease",
    },
  },
  variants: {
    variant: {
      solid: {
        bg: "primary.default",
        color: "fg.inverted",
        _hover: {
          bg: "primary.default/80",
        },
      },
      secondary: {
        bg: "surface.default",
        color: "fg.default",
        _hover: {
          bg: "surface.emphasized",
        },
      },
      outline: {
        bg: "transparent",
        borderWidth: "thin",
        borderColor: "border.default",
        color: "fg.default",
        _hover: {
          bg: "surface.default/20",
          borderColor: "border.emphasized",
        },
      },
      ghost: {
        bg: "transparent",
        color: "fg.default",
        _hover: {
          bg: "surface.default",
        },
      },
      text: {
        bg: "transparent",
        color: "fg.default",
        textDecoration: "none",
        _hover: {
          textDecoration: "underline",
          color: "fg.emphasized",
        },
      },
    },
    size: {
      xs: {
        h: "7",
        minW: "7",
        fontSize: "xs",
        px: "3",
      },
      sm: {
        h: "9",
        minW: "9",
        fontSize: "sm",
        px: "4",
      },
      md: {
        h: "11",
        minW: "11",
        fontSize: "md",
        px: "6",
      },
      lg: {
        h: "14",
        minW: "14",
        fontSize: "lg",
        px: "8",
      },
    },
  },
  defaultVariants: {
    variant: "ghost",
    size: "md",
  },
});
