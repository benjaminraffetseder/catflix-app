"use client";

import { Button } from "@/components/ui/button";
import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import { RefreshCw } from "lucide-react";

export default function VideosError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Container maxW="7xl" py={{ base: 8, md: 12 }}>
      <VStack gap={6} align="center" justify="center" minH="50vh">
        <Heading size="xl" textAlign="center">
          Oops! Something went wrong
        </Heading>
        <Text color="fg.muted" textAlign="center">
          {error.message || "Failed to load videos. Please try again."}
        </Text>
        <Button onClick={reset}>
          <RefreshCw size={16} className="mr-2" />
          Try Again
        </Button>
      </VStack>
    </Container>
  );
}
