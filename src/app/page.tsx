import { ChannelGrid } from "@/components/ui/channel-grid";
import { Hero } from "@/components/ui/hero";
import { channelResponseSchema, type ChannelResponse } from "@/schemas/channel";
import { env } from "@/utils/env";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

// Separate async function to fetch content
async function getChannels(): Promise<ChannelResponse> {
  const res = await fetch(`${env.BACKEND_URL}/channels`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch featured content");
  }

  const data = await res.json();
  return channelResponseSchema.parse(data);
}

export default async function Home() {
  const channels = await getChannels();

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
        <Heading as="h2" size="xl" mb={8}>
          Channels
        </Heading>
        <ChannelGrid.Root>
          <ChannelGrid.List channels={channels.data} />
        </ChannelGrid.Root>
      </Container>
    </Box>
  );
}
