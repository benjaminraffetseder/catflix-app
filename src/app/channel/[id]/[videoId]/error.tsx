"use client";
import { Button, Container, Heading, Text, VStack } from "@chakra-ui/react";

export default function Error() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={4} align="center">
        <Heading>Something went wrong</Heading>
        <Text>We couldn't load the video. Please try again later.</Text>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </VStack>
    </Container>
  );
}
