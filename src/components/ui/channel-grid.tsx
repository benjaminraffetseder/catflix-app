import type { Channel } from "@/schemas/channel";
import {
  Badge,
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { PlayIcon } from "lucide-react";
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
  channels: Channel[];
  columns: 4 | 5 | 6;
}

interface ItemProps {
  channel: Channel;
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

const List = ({ channels, columns }: ListProps) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: columns }} gap={8}>
      {channels.map((channel, index) => (
        <ChannelGrid.Item key={index} channel={channel} />
      ))}
    </SimpleGrid>
  );
};

const Item = ({ channel }: ItemProps) => {
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
  );
};

export const ChannelGrid = {
  Root,
  List,
  Item,
};
