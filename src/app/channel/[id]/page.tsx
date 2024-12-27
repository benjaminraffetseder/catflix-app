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
  Text,
  VStack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "lucide-react";
import NextImage from "next/image";
import { default as Link } from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 60;

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
    <Box as="section" py={{ base: 8, md: 12 }}>
      <VStack gap={8} align="stretch">
        <VStack gap="4">
          <Box
            gap={{ base: 4, md: 0 }}
            w="full"
            pos="sticky"
            top={{ base: 0, md: "75px" }}
            bg="bg.crust"
            zIndex={{ base: "150", md: "50" }}
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
                <HStack gap={4} align="start">
                  <Image
                    asChild
                    hidden={!channel.thumbnailUrl}
                    display={{ base: "none", md: "block" }}
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
                  <VStack align="flex-start" gap={1}>
                    <Link
                      href={`https://www.youtube.com/channel/${channel.youtubeChannelId}`}
                      target="_blank"
                    >
                      <HStack gap={1} alignItems={"baseline"}>
                        <Heading size={{ base: "xl", md: "2xl" }}>
                          {channel.name}
                        </Heading>
                        <Box transform="translateY(-8px)">
                          <ExternalLinkIcon size={12} />
                        </Box>
                      </HStack>
                    </Link>
                    <Text color="fg.muted" fontSize={{ base: "sm", md: "md" }}>
                      {channel.videoCount} videos
                    </Text>
                  </VStack>
                </HStack>
                <ChannelPagination
                  page={page}
                  total={videoResponse.total}
                  pageSize={videoResponse.pageSize}
                  channelId={id}
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
