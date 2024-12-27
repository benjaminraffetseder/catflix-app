import { Box, Container, Text } from "@chakra-ui/react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box as="footer" py={4} mt="auto">
      <Container
        maxW="container.xl"
        color="fg.muted"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        <Text fontSize="xs">
          © {currentYear} Catflix • Built with ♥️ and a 🐱 on the lab
        </Text>
      </Container>
    </Box>
  );
};
