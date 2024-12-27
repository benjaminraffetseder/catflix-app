import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function LoadingVideos() {
  return (
    <Container maxW="7xl" py={{ base: 8, md: 12 }}>
      <VStack gap={8} align="stretch">
        <Box>
          <Heading size="2xl" mb={2}>
            Videos
          </Heading>
          <Text color="fg.muted">Browse through amazing cat videos</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Box key={index} borderRadius="lg" overflow="hidden">
              <Skeleton height="200px" />
              <VStack p={4} gap={2} align="flex-start">
                <Skeleton height="20px" width="100%" />
                <Skeleton height="16px" width="60%" />
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
