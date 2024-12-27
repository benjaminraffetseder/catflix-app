import { ChannelPagination } from "@/components/ui/channel-pagination";
import { VideoGrid } from "@/components/ui/video-grid";
import {
  Channel,
  channelSchema,
  VideoResponse,
  videoResponseSchema,
} from "@/schemas/channel";
import { env } from "@/utils/env";
import {
  Box,
  Container,
  Heading,
  HStack,
  Image,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { YoutubeIcon } from "lucide-react";
import NextImage from "next/image";
import { default as Link } from "next/link";

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

async function getVideos(id: string, page: number = 1): Promise<VideoResponse> {
  try {
    const res = await fetch(
      `${env.BACKEND_URL}/videos?channelId=${id}&pageSize=12&page=${page}&sortOrder=DESC&sortBy=uploadDate`,
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
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const id = (await params).id;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam ?? "1", 10);
  const channel = await getChannel(id);
  const videoResponse = await getVideos(id, page);

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

      <Container maxW="container.xl" pos="relative" py={12}>
        <Stack gap={8}>
          <VStack gap="4">
            <HStack
              justify="space-between"
              alignItems="center"
              w="full"
              pos="sticky"
              top="75px"
              bg="bg.crust"
              zIndex="1"
              py={4}
            >
              <Heading size="lg" color="fg.default">
                Latest Videos
              </Heading>
              <ChannelPagination
                page={page}
                total={videoResponse.total}
                pageSize={videoResponse.pageSize}
                channelId={id}
              />
            </HStack>
            <VideoGrid videos={videoResponse.data} />
          </VStack>
        </Stack>
      </Container>
    </Box>
  );
}
