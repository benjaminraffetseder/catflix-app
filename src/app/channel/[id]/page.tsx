import {
  Channel,
  channelSchema,
  Video,
  VideoResponse,
  videoResponseSchema,
} from "@/schemas/channel";
import { env } from "@/utils/env";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { YoutubeIcon } from "lucide-react";
import NextImage from "next/image";
import { default as Link, default as NextLink } from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every minute

async function getChannel(id: string): Promise<Channel> {
  try {
    const res = await fetch(`${env.BACKEND_URL}/channels/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch channel: ${res.statusText}`);
    }

    const data = await res.json();
    return channelSchema.parse(data);
  } catch (error) {
    console.error("Error fetching channel:", error);
    throw new Error("Failed to fetch channel. Please try again later.");
  }
}

async function getVideos(id: string): Promise<VideoResponse> {
  try {
    const res = await fetch(
      `${env.BACKEND_URL}/videos?channelId=${id}&limit=50&sortOrder=DESC&sortBy=uploadDate`,
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

export default async function ChannelDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const channel = await getChannel(id);
  const videos = await getVideos(id);

  return (
    <Box>
      <Box
        as="header"
        bg="bg.surface"
        borderBottom="1px solid"
        borderColor="surface.strong/40"
      >
        <Container maxW="container.xl" py={4}>
          <HStack gap={4}>
            <Image
              asChild
              rounded="lg"
              overflow="hidden"
              w="64px"
              h="64px"
              alt={channel.name}
            >
              <NextImage
                src={channel.thumbnailUrl}
                alt={channel.name}
                width={64}
                height={64}
              />
            </Image>
            <VStack flex={1} align="flex-start" gap={1}>
              <Heading size="xl" color="primary.default" fontWeight="black">
                {channel.name}
              </Heading>
              <Link
                href={`https://www.youtube.com/channel/${channel.youtubeChannelId}`}
                target="_blank"
              >
                <YoutubeIcon />
              </Link>
            </VStack>
          </HStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={12}>
        <Stack gap={8}>
          <Box>
            <Heading size="lg" mb={6} color="fg.default">
              Latest Videos
            </Heading>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={6}
            >
              {videos.data.map((video: Video) => (
                <GridItem
                  key={video.id}
                  pos="relative"
                  className="group"
                  overflow="hidden"
                >
                  <NextLink href={`/channel/${video.channelId}/${video.id}`}>
                    <Box
                      borderRadius="lg"
                      overflow="hidden"
                      transition="transform 0.2s"
                      _hover={{
                        shadow: "xl",
                        bg: "bg.surface",
                      }}
                      bg="bg.surface"
                    >
                      <Box position="relative">
                        <Image asChild alt={video.title}>
                          <NextImage
                            src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                            alt={video.title}
                            width={400}
                            height={225}
                          />
                        </Image>
                      </Box>
                      <Box
                        pos="absolute"
                        bottom={0}
                        px={4}
                        py={2}
                        bg="bg.canvas"
                        w="full"
                        borderTop="1px solid"
                        borderColor="surface.strong/40"
                        borderTopRadius="xl"
                        borderBottomRadius="md"
                        opacity={0}
                        transform="translateY(100%)"
                        transition="opacity 0.2s, transform 0.2s"
                        animationTimingFunction="outQuad"
                        _groupHover={{
                          opacity: 1,
                          transform: "translateY(0)",
                        }}
                      >
                        <Text fontWeight="bold" fontSize="sm" mb={2}>
                          {video.title}
                        </Text>
                      </Box>
                    </Box>
                  </NextLink>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
