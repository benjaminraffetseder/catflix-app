import { VideoDetails } from "@/schemas/channel";
import {
  AspectRatio,
  Box,
  Container,
  Heading,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
interface VideoDetailProps {
  video: VideoDetails;
}

export function VideoDetail({ video }: VideoDetailProps) {
  return (
    <Container maxW="container.xl" py={8} pos="relative">
      <AspectRatio
        ratio={16 / 9}
        mb={6}
        rounded="2xl"
        overflow="hidden"
        zIndex={20}
      >
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </AspectRatio>

      <Box
        as="section"
        mb={6}
        border="1px solid"
        borderColor="border.surface"
        w="fit-content"
        p={4}
        rounded="2xl"
        zIndex={20}
        pos="relative"
      >
        <Heading as="h1" size="lg">
          {video.title}
        </Heading>
        <HStack alignItems="baseline" gap={2} pb={2}>
          <Link
            asChild
            color="fg.muted"
            fontSize="sm"
            px="0"
            py="0"
            height="auto"
            variant="text"
            _hover={{
              textDecoration: "underline",
              color: "fg.default",
              transform: "scale(1)",
              bg: "transparent",
            }}
          >
            <NextLink href={`/channel/${video.channel.id}`}>
              {video.channel.name}
            </NextLink>
          </Link>
          <Text color="fg.muted" fontSize="xs">
            {new Date(video.uploadDate).toLocaleDateString()} •{" "}
            {Math.floor(video.length / 3600)}h{" "}
            {Math.floor((video.length % 3600) / 60)}m
          </Text>
        </HStack>
        <Text
          whiteSpace="pre-wrap"
          fontSize="xs"
          color="fg.muted"
          maxW="600px"
          w="full"
        >
          {video.description}
        </Text>
      </Box>
    </Container>
  );
}
