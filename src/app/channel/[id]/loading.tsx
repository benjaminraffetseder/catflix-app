import { Container, Skeleton, VStack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={6} alignItems="stretch">
        <Skeleton height="300px" borderRadius="lg" />
        <Skeleton height="48px" />
        <Skeleton height="24px" />
      </VStack>
    </Container>
  );
}
