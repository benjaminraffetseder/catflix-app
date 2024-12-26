import { videoDetailsSchema } from "@/schemas/channel";
import { env } from "@/utils/env";
import { AspectRatio, Box, Container, Heading, Text } from "@chakra-ui/react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every minute

async function getVideo(id: string) {
  try {
    const res = await fetch(`${env.BACKEND_URL}/videos/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch video: ${res.statusText}`);
    }

    const data = await res.json();
    return videoDetailsSchema.parse(data);
  } catch (error) {
    console.error("Error fetching video:", error);
    throw new Error("Failed to fetch video. Please try again later.");
  }
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const videoId = (await params).videoId;
  const video = await getVideo(videoId);

  if (!video) {
    notFound();
  }

  return (
    <Container maxW="container.xl" py={8}>
      <AspectRatio ratio={16 / 9} mb={6} rounded="2xl" overflow="hidden">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </AspectRatio>

      <Box mb={6}>
        <Heading as="h1" size="lg" mb={2}>
          {video.title}
        </Heading>
        <Text color="gray.500" fontSize="sm" mb={2}>
          {new Date(video.uploadDate).toLocaleDateString()} •{" "}
          {Math.floor(video.length / 3600)}h{" "}
          {Math.floor((video.length % 3600) / 60)}m
        </Text>
        <Text color="blue.500" fontSize="sm" mb={4}>
          {video.category.title}
        </Text>
        <Text whiteSpace="pre-wrap">{video.description}</Text>
      </Box>
    </Container>
  );
}
