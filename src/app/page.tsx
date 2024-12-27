import { ContentGrid } from "@/components/ui/content-grid";
import { Hero } from "@/components/ui/hero";
import {
  channelResponseSchema,
  videoResponseSchema,
  type ChannelResponse,
  type VideoResponse,
} from "@/schemas/channel";
import { env } from "@/utils/env";
import { Box, Container, HStack, Separator, Text } from "@chakra-ui/react";
import { CatIcon } from "lucide-react";

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
    const res = await fetch(`${env.BACKEND_URL}/videos?pageSize=15`, {
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
        <ContentGrid.Root value="featured" title="Featured Videos">
          <ContentGrid.List
            items={featuredVideos.data}
            columns={5}
            variant="video"
          />
        </ContentGrid.Root>
        <HStack my={8} justify="center" align="center" color="border.surface">
          <Separator borderColor="border.surface" />
          <CatIcon size={48} />
          <Separator borderColor="border.surface" />
        </HStack>
        <ContentGrid.Root value="channels" title="Channels">
          <ContentGrid.List
            items={channels.data.slice(0, 4)}
            columns={4}
            variant="channel"
          />
          <ContentGrid.List
            items={channels.data.slice(4)}
            columns={5}
            variant="channel"
          />
        </ContentGrid.Root>
      </Container>
    </Box>
  );
}
