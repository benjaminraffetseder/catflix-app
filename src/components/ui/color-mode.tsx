"use client";

import type { IconButtonProps } from "@chakra-ui/react";
import { Box, ClientOnly, IconButton } from "@chakra-ui/react";
import { PaletteIcon } from "lucide-react";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider, useTheme } from "next-themes";
import * as React from "react";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./menu";

const THEMES = [
  { name: "Catnip Cream", theme: "latte" },
  { name: "Midnight Meow", theme: "frappe" },
  { name: "Cozy Cave", theme: "macchiato" },
  { name: "Panther's Purr", theme: "mocha" },
] as const;

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="macchiato"
      themes={THEMES.map((theme) => theme.name)}
      disableTransitionOnChange
      {...props}
    />
  );
}

export function useColorMode() {
  const { theme, setTheme } = useTheme();
  return {
    colorMode: theme,
    setColorMode: setTheme,
  };
}
interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> {}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { setColorMode } = useColorMode();

  return (
    <ClientOnly fallback={<Box h="8" w="8" />}>
      <MenuRoot>
        <MenuTrigger asChild>
          <IconButton
            variant="ghost"
            aria-label="Select theme"
            size="sm"
            ref={ref}
            {...props}
            css={{
              _icon: {
                width: "5",
                height: "5",
              },
            }}
            _expanded={{
              bg: "whiteAlpha.200",
            }}
          >
            <PaletteIcon size={24} />
          </IconButton>
        </MenuTrigger>
        <MenuContent bg="bg.surface" borderRadius="md" shadow="md">
          {THEMES.map((theme) => (
            <MenuItem
              key={theme.theme}
              value={theme.theme}
              onClick={() => setColorMode(theme.theme)}
              color="fg.muted"
              transitionTimingFunction="outQuad"
              transitionDuration="400ms"
              _hover={{
                bg: "bg.surface1",
                color: "primary.default",
              }}
              cursor="pointer"
            >
              {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}
            </MenuItem>
          ))}
        </MenuContent>
      </MenuRoot>
    </ClientOnly>
  );
});
