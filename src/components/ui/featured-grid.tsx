import type { Video } from "@/schemas/channel";
import {
  Badge,
  Box,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextImage from "next/image";
import Link from "next/link";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";

interface RootProps {
  children: React.ReactNode;
  value: string;
  title: string;
}

interface ListProps {
  videos: Video[];
  columns: 4 | 5 | 6;
}

interface ItemProps {
  video: Video;
}

const Root = ({ children, value, title }: RootProps) => {
  return (
    <AccordionRoot collapsible defaultValue={[value]}>
      <AccordionItem value={value} borderBottom="none">
        <AccordionItemTrigger cursor="pointer" indicatorPlacement="end">
          <Heading
            as="h3"
            size="md"
            fontWeight="bold"
            fontSize="2xl"
            color="fg.muted"
          >
            {title}
          </Heading>
        </AccordionItemTrigger>
        <AccordionItemContent w="full">
          <VStack gap={8}>{children}</VStack>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
};

const List = ({ videos, columns }: ListProps) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: columns }} gap={8}>
      {videos.map((video, index) => (
        <FeaturedGrid.Item key={index} video={video} />
      ))}
    </SimpleGrid>
  );
};

const Item = ({ video }: ItemProps) => {
  return (
    <Box position="relative" className="group" overflow="hidden">
      <Link href={`/channel/${video.channelId}/${video.id}`}>
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
      </Link>
    </Box>
  );
};

export const FeaturedGrid = {
  Root,
  List,
  Item,
};
