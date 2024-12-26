"use client";

import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" p={8}>
        <Heading color="red.500" mb={4}>
          Something went wrong!
        </Heading>
        <Text mb={4}>{error.message}</Text>
        <Button onClick={reset} colorScheme="blue">
          Try again
        </Button>
      </Box>
    </Container>
  );
}
