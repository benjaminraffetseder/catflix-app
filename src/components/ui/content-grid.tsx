import type { Channel, Video } from "@/schemas/channel";
import {
  Badge,
  Box,
  Heading,
  HStack,
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

type ContentType = Video | Channel;

interface RootProps {
  children: React.ReactNode;
  value: string;
  title: string;
}

interface ListProps<T extends ContentType> {
  items: T[];
  columns: 4 | 5 | 6;
  variant: "video" | "channel";
}

interface ItemProps<T extends ContentType> {
  item: T;
  variant: "video" | "channel";
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
        <AccordionItemContent w="full" pt={10}>
          <VStack gap={8}>{children}</VStack>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
};

function List<T extends ContentType>({
  items,
  columns,
  variant,
}: ListProps<T>) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: columns }} gap={8}>
      {items.map((item, index) => (
        <ContentGrid.Item key={index} item={item} variant={variant} />
      ))}
    </SimpleGrid>
  );
}

function Item<T extends ContentType>({ item, variant }: ItemProps<T>) {
  if (variant === "video") {
    const video = item as Video;
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
  }

  const channel = item as Channel;
  return (
    <Link href={`/channel/${channel.id}`}>
      <Box position="relative" overflow="hidden" borderRadius="3xl">
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
        />
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
          <Badge size="xs">{channel.videoCount} Videos</Badge>
        </HStack>
      </Box>
      <Box px={5} py={2} textAlign="center">
        <Text fontSize="xs" color="fg.muted">
          {channel.name}
        </Text>
      </Box>
    </Link>
  );
}

export const ContentGrid = {
  Root,
  List,
  Item,
};
