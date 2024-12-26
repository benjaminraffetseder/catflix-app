import { Hero } from "@/components/ui/hero";
import { channelResponseSchema, type ChannelResponse } from "@/schemas/channel";
import { env } from "@/utils/env";
import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import { PlayIcon } from "lucide-react";

import NextImage from "next/image";
import Link from "next/link";

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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
          {channels.data.map((channel, index) => (
            <Link href={`/channel/${channel.id}`} key={index}>
              <Box
                key={index}
                position="relative"
                overflow="hidden"
                borderRadius="3xl"
              >
                <Image
                  w="full"
                  h="300px"
                  objectFit="cover"
                  transition="transform 0.3s ease"
                  _hover={{ transform: "scale(1.05)" }}
                  alt={channel.name}
                  asChild
                >
                  <NextImage
                    src={channel.thumbnailUrl}
                    alt={channel.name}
                    width={300}
                    height={300}
                  />
                </Image>
                <VStack
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  p={5}
                  bgGradient="to-b"
                  gradientFrom="bg.canvas/0"
                  gradientTo="bg.canvas"
                  gap={2}
                  alignItems="flex-start"
                >
                  <Badge size="sm">{channel.videoCount} videos</Badge>
                  <Badge size="md">{channel.name}</Badge>
                </VStack>
                <HStack
                  position="absolute"
                  top={0}
                  right={0}
                  left={0}
                  p={5}
                  bgGradient="to-t"
                  gradientFrom="bg.canvas/0"
                  gradientTo="bg.canvas"
                  justifyContent="flex-end"
                >
                  <IconButton aria-label="Play" variant="solid" size="sm">
                    <PlayIcon size={16} />
                  </IconButton>
                </HStack>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
