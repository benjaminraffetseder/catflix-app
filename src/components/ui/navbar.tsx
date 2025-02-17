import {
  Box,
  Link as ChakraLink,
  Container,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ClockIcon, FilmIcon, HomeIcon, InfoIcon, TvIcon } from "lucide-react";
import NextLink from "next/link";
import { ColorModeButton } from "./color-mode";

const MOBILE_NAV_ITEMS = [
  { name: "Home", Icon: HomeIcon, href: "/" },
  { name: "Channels", Icon: TvIcon, href: "/channels" },
  { name: "Videos", Icon: FilmIcon, href: "/videos" },
  { name: "Random", Icon: ClockIcon, href: "/random" },
  { name: "About", Icon: InfoIcon, href: "/about" },
];

const DESKTOP_NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Videos", href: "/videos" },
  { name: "Channels", href: "/channels" },
  { name: "Random", href: "/random" },
  { name: "About", href: "/about" },
];

export const Navbar = () => {
  return (
    <>
      {/* Top Navigation - Logo and Profile */}
      <Box
        as="nav"
        position="sticky"
        w="full"
        bg="bg.surface/80"
        backdropFilter="blur(5px)"
        zIndex={100}
        py={4}
        top={0}
      >
        <Container maxW="container.xl">
          <HStack justify="space-between" align="center">
            <ChakraLink
              asChild
              variant="ghost"
              fontSize="2xl"
              fontWeight="black"
              color="brand.primary"
              letterSpacing="tight"
              textTransform="uppercase"
              bg="bg.crust"
              _hover={{
                color: "accent.red",
                bg: "whiteAlpha.200",
              }}
              transition="all 0.2s ease-in-out"
              overflow="hidden"
            >
              <NextLink href="/">Catflix</NextLink>
            </ChakraLink>

            {/* Desktop Navigation */}
            <HStack gap={6} display={{ base: "none", md: "flex" }}>
              {DESKTOP_NAV_ITEMS.map((item) => (
                <ChakraLink
                  asChild
                  key={item.name}
                  variant="ghost"
                  color="brand.primary.default"
                  fontSize="sm"
                  fontWeight="medium"
                  _hover={{
                    color: "primary.default",
                    bg: "bg.overlay2/30",
                  }}
                  transitionTimingFunction="outQuad"
                  transitionDuration="400ms"
                  px={3}
                  py={2}
                >
                  <NextLink href={item.href}>{item.name}</NextLink>
                </ChakraLink>
              ))}
            </HStack>

            {/* Right side - Theme Switcher and Profile Button */}
            <HStack gap={4}>
              <ColorModeButton
                color="text.secondary"
                _hover={{
                  color: "text.primary",
                  bg: "whiteAlpha.200",
                }}
              />
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Bottom Mobile Navigation */}
      <Box
        as="nav"
        position="fixed"
        bottom={0}
        w="full"
        bg="bg.surface/80"
        backdropFilter="blur(5px)"
        zIndex={100}
        display={{ base: "block", md: "none" }}
        py={4}
        borderTop="1px"
        borderColor="whiteAlpha.200"
      >
        <Container maxW="container.xl">
          <HStack justify="space-around" align="center">
            {MOBILE_NAV_ITEMS.map((item) => (
              <ChakraLink
                asChild
                key={item.name}
                variant="ghost"
                _hover={{
                  bg: "transparent",
                }}
              >
                <NextLink href={item.href}>
                  <VStack gap={1} px={4} py={2}>
                    <item.Icon size={20} />
                    <Text fontSize="xs" fontWeight="medium">
                      {item.name}
                    </Text>
                  </VStack>
                </NextLink>
              </ChakraLink>
            ))}
          </HStack>
        </Container>
      </Box>
    </>
  );
};
