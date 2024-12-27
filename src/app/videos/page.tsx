import { VideoGrid } from "@/components/ui/video-grid";
import { VideoPagination } from "@/components/ui/video-pagination";
import { videoResponseSchema, type VideoResponse } from "@/schemas/channel";
import { env } from "@/utils/env";
import { Box, Container, Heading, Stack, Text, VStack } from "@chakra-ui/react";

export const dynamic = "force-dynamic";
export const revalidate = 60;

async function getVideos(page: number = 1): Promise<VideoResponse> {
  try {
    const res = await fetch(
      `${env.BACKEND_URL}/videos?pageSize=12&page=${page}&sortOrder=DESC&sortBy=uploadDate`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch videos: ${res.statusText}`);
    }

    const data = await res.json();
    return videoResponseSchema.parse(data);
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw new Error("Failed to fetch videos. Please try again later.");
  }
}

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam ?? "1", 10);
  const videoResponse = await getVideos(page);

  return (
    <Box as="section" py={{ base: 8, md: 12 }}>
      <VStack gap={8} align="stretch">
        <VStack gap="4">
          <Box
            gap={{ base: 4, md: 0 }}
            w="full"
            pos="sticky"
            top={{ base: 0, md: "75px" }}
            bg="bg.crust"
            zIndex={{ base: "150", md: "auto" }}
            py={4}
            px={{ base: 4, md: 0 }}
          >
            <Container maxW="7xl">
              <Stack
                justifyContent="space-between"
                direction={{ base: "column", md: "row" }}
                alignItems={{
                  base: "stretch",
                  md: "end",
                }}
                gap={4}
              >
                <Box>
                  <Heading size="2xl" mb={2}>
                    Videos
                  </Heading>
                  <Text color="fg.muted">
                    Browse through {videoResponse.total} amazing videos for your
                    cat
                  </Text>
                </Box>
                <VideoPagination
                  page={page}
                  total={videoResponse.total}
                  pageSize={videoResponse.pageSize}
                />
              </Stack>
            </Container>
          </Box>
          <Container maxW="7xl">
            <VideoGrid videos={videoResponse.data} />
          </Container>
        </VStack>
      </VStack>
    </Box>
  );
}
