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

const featuredContent = [
  {
    title: "Cute Kittens Playing",
    image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91",
    category: "Trending Now",
  },
  {
    title: "Cats Being Funny",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006",
    category: "Popular",
  },
  {
    title: "Sleepy Cat Collection",
    image: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7",
    category: "New Releases",
  },
  {
    title: "Majestic Cats",
    image: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec",
    category: "Must Watch",
  },
];

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
          <Hero.Title>Discover Adorable Cat Videos</Hero.Title>
          <Hero.Description>
            Select endless hours of content for your furry friends from{" "}
            <Text fontWeight="bold" as="span" mx={1}>
              {channels.total}
            </Text>
            channels and
            <Text fontWeight="bold" as="span" mx={1}>
              {videoCount}
            </Text>
            videos
          </Hero.Description>
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
