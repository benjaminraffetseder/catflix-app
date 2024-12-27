import {
  Link as ChakraLink,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

type HeroProps = {
  children: React.ReactNode;
};

export const Hero = ({ children }: HeroProps) => {
  return (
    <Container
      as="header"
      position="relative"
      pt={64}
      bgImage="url('https://images.unsplash.com/photo-1615796153287-98eacf0abb13')"
      bgSize="cover"
      bgPos="center"
      roundedBottom={{ base: "4xl", md: "48px" }}
      shadow="xl"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%)",
        roundedBottom: { base: "4xl", md: "42px" },
      }}
    >
      <Container maxW="container.xl" h="full">
        <Stack
          gap={6}
          w={{ base: "100%", md: "60%" }}
          position="relative"
          color="white"
          h="full"
          justifyContent="end"
          alignItems="start"
          py={{ base: 12, md: 16 }}
        >
          {children}
        </Stack>
      </Container>
    </Container>
  );
};

Hero.Title = function HeroTitle({ children }: { children: React.ReactNode }) {
  return (
    <Heading
      as="h1"
      fontSize={{ base: "2xl", md: "4xl" }}
      fontWeight="bold"
      color="primary.default"
    >
      {children}
    </Heading>
  );
};

Hero.Description = function HeroDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Text fontSize={{ base: "lg", md: "xl" }}>{children}</Text>;
};

Hero.Subheading = function HeroSubheading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Text maxW="prose" fontSize={{ base: "sm", md: "md" }}>
      {children}
    </Text>
  );
};

Hero.Actions = function HeroActions() {
  return (
    <Stack direction={{ md: "row" }} gap={4}>
      <ChakraLink asChild size="md" variant="solid">
        <NextLink href="/random">Play Now</NextLink>
      </ChakraLink>
      <ChakraLink asChild size="md" variant="outline" color="fg.inverted/80">
        <NextLink href="/about">More Info</NextLink>
      </ChakraLink>
    </Stack>
  );
};

Hero.Content = function HeroContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack gap={2} maxW={{ base: "100%", md: "prose" }}>
      {children}
    </Stack>
  );
};
