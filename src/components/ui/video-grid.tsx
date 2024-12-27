import { Video } from "@/schemas/channel";
import { Badge, Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";

interface VideoGridProps {
  videos: Video[];
}

export function VideoGrid({ videos }: VideoGridProps) {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={6}
      mb={8}
    >
      {videos.map((video) => (
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
              bg="transparent"
            >
              <Box position="relative">
                <Image asChild alt={video.title}>
                  <NextImage
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    width={480}
                    height={270}
                  />
                </Image>
                {video.length > 0 && (
                  <Badge
                    position="absolute"
                    bottom={2}
                    right={2}
                    bg="bg.crust"
                    color="fg.default"
                    fontSize="xs"
                    fontWeight="bold"
                    px={2}
                    py={1}
                    rounded="md"
                  >
                    {Math.floor(video.length / 3600)}h{" "}
                    {Math.floor((video.length % 3600) / 60)}m
                  </Badge>
                )}
              </Box>
              <Box
                py={2}
                bg="transparent"
                w="full"
                transform="translateY(0)"
                transition="opacity 0.2s, transform 0.2s"
                animationTimingFunction="outQuad"
                _groupHover={{
                  opacity: 1,
                  transform: "translateY(-2px)",
                }}
              >
                <Text fontSize="xs" color="fg.muted">
                  {video.title}
                </Text>
              </Box>
            </Box>
          </NextLink>
        </GridItem>
      ))}
    </Grid>
  );
}
