import { SkeletonText } from "@/components/ui/skeleton";
import { Box, Container, Skeleton } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Container maxW="container.xl" py={8}>
      <Skeleton height="500px" mb={6} />
      <Box mb={6}>
        <Skeleton height="40px" mb={2} />
        <SkeletonText mt={4} noOfLines={4} gap={4} />
      </Box>
    </Container>
  );
}
