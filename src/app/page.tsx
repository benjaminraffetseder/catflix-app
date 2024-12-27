import { ChannelGrid } from "@/components/ui/channel-grid";
import { Hero } from "@/components/ui/hero";
import { VideoGrid } from "@/components/ui/video-grid";
import {
  channelResponseSchema,
  videoResponseSchema,
  type ChannelResponse,
  type VideoResponse,
} from "@/schemas/channel";
import { env } from "@/utils/env";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every minute

// Separate async function to fetch content
async function getChannels(): Promise<ChannelResponse> {
  try {
    const res = await fetch(`${env.BACKEND_URL}/channels`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch featured content: ${res.statusText}`);
    }

    const data = await res.json();
    return channelResponseSchema.parse(data);
  } catch (error) {
    console.error("Error fetching channels:", error);
    throw new Error(
      "Failed to fetch featured content. Please try again later."
    );
  }
}

// Separate async function to fetch featured videos
async function getFeaturedVideos(): Promise<VideoResponse> {
  try {
    const res = await fetch(`${env.BACKEND_URL}/videos`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch featured videos: ${res.statusText}`);
    }

    const data = await res.json();
    return videoResponseSchema.parse(data);
  } catch (error) {
    console.error("Error fetching featured videos:", error);
    throw new Error("Failed to fetch featured videos. Please try again later.");
  }
}

export default async function Home() {
  const [channels, featuredVideos] = await Promise.all([
    getChannels(),
    getFeaturedVideos(),
  ]);

  const videoCount = channels.data.reduce(
    (acc, channel) => acc + channel.videoCount,
    0
  );

  return (
    <Box>
      <Hero>
        <Hero.Content>
          <Hero.Title>CATFLIX</Hero.Title>
          <Hero.Description>
            The streaming platform for your cat.
          </Hero.Description>
          <Hero.Subheading>
            Select endless hours of content for your furry friends from{" "}
            <Text fontWeight="bold" as="span">
              {channels.total}
            </Text>{" "}
            channels and{" "}
            <Text fontWeight="bold" as="span">
              {videoCount}
            </Text>{" "}
            videos
          </Hero.Subheading>
        </Hero.Content>
        <Hero.Actions />
      </Hero>
      <Container maxW="container.xl" py={16}>
        <Box mb={16}>
          <Heading as="h2" size="lg" mb={8} color="fg.muted">
            Featured Videos
          </Heading>
          <VideoGrid videos={featuredVideos.data} />
        </Box>
        <ChannelGrid.Root value="channels" title="Channels">
          <ChannelGrid.List channels={channels.data.slice(0, 4)} columns={4} />
          <ChannelGrid.List channels={channels.data.slice(4)} columns={5} />
        </ChannelGrid.Root>
      </Container>
    </Box>
  );
}
