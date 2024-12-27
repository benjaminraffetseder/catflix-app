import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function LoadingChannels() {
  return (
    <Container maxW="7xl" py={{ base: 8, md: 12 }}>
      <VStack gap={8} align="stretch">
        <Box>
          <Heading size="2xl" mb={2}>
            Channels
          </Heading>
          <Text color="fg.muted">Discover amazing cat content creators</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Box key={index} borderRadius="3xl" overflow="hidden">
              <Skeleton height="300px" />
              <VStack p={5} gap={2} align="flex-start">
                <Skeleton height="20px" width="100px" />
                <Skeleton height="24px" width="200px" />
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
