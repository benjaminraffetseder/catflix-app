import { ChannelGrid } from "@/components/ui/channel-grid";
import { channelResponseSchema, type ChannelResponse } from "@/schemas/channel";
import { env } from "@/utils/env";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every minute

async function getChannels(): Promise<ChannelResponse> {
  try {
    const res = await fetch(`${env.BACKEND_URL}/channels`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch channels: ${res.statusText}`);
    }

    const data = await res.json();
    return channelResponseSchema.parse(data);
  } catch (error) {
    console.error("Error fetching channels:", error);
    throw new Error("Failed to fetch channels. Please try again later.");
  }
}

export default async function ChannelsPage() {
  const channelsResponse = await getChannels();

  return (
    <Container maxW="7xl" py={{ base: 8, md: 12 }}>
      <VStack gap={8} align="stretch">
        <Box>
          <Heading size="2xl" mb={2}>
            Channels
          </Heading>
          <Text color="fg.muted">
            Discover {channelsResponse.total} amazing cat content creators
          </Text>
        </Box>

        <Suspense fallback={<div>Loading channels...</div>}>
          <ChannelGrid.Root value="all-channels" title="All Channels">
            <ChannelGrid.List channels={channelsResponse.data} columns={4} />
          </ChannelGrid.Root>
        </Suspense>
      </VStack>
    </Container>
  );
}
