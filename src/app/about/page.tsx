import { Container, Heading, Image, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "lucide-react";
import NextImage from "next/image";
import NextLink from "next/link";

import {
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function AboutPage() {
  return (
    <Container maxW="prose" py={{ base: 8, md: 12 }}>
      <Heading size="2xl" mb={2}>
        About
      </Heading>
      <Text mb={4}>
        Hi! I&apos;m Benjamin, a full-stack developer from Austria and a proud
        cat dad to
        <HoverCardRoot size="sm">
          <HoverCardTrigger asChild>
            <Text
              as="span"
              fontWeight="bold"
              border="1px solid"
              borderColor="fg.muted"
              borderRadius="md"
              px={1}
              py={0.5}
              ml={1}
              cursor="zoom-in"
            >
              Mochi
            </Text>
          </HoverCardTrigger>
          <HoverCardContent bg="bg.surface">
            <Image asChild alt="Mochi">
              <NextImage
                src="/images/mochi.jpg"
                alt="Mochi"
                width={300}
                height={300}
              />
            </Image>
          </HoverCardContent>
        </HoverCardRoot>
      </Text>

      <Text mb={4}>
        Seeing how much Mochi enjoys watching wildlife videos, I got inspired to
        create Catflix - a free streaming platform, just for cats!
      </Text>

      <Text mb={4}>
        It&apos;s a curated collection of videos and YouTube channels that you
        can easily click through. You can browse all the videos in a channel, or
        just with a hit of a button get a random one. Every video is at least 15
        minutes long and packed with all sorts of animals - birds, squirrels,
        mice, you name it! Basically, it&apos;s like Netflix, but designed to
        keep your feline friend entertained when you need to &quot;turn on their
        TV&quot;.
      </Text>

      <Text mb={4}>
        Catflix is still super new - I&apos;m calling it an MVP (minimum viable
        product), which is a fancy way of saying it&apos;s a work in progress.
        I&apos;ve got plans for playlists, a search bar, and all that other
        fancy stuff, but for now, it&apos;s just a simple spot for your cat to
        get their watch on.
      </Text>

      <Text mb={8}>I hope your cats love Catflix as much as Mochi does!</Text>

      <Text fontSize="sm" color="fg.muted" mb={4}>
        - Benjamin
      </Text>

      <Text fontSize="xs" color="fg.muted/80">
        P.S. Send or tag me on{" "}
        <NextLink
          href="https://bsky.app/profile/ben-raff.bsky.social"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text
            as="span"
            color="fg.muted"
            display="inline-flex"
            alignItems="center"
            gap={1}
          >
            bluesky
            <ExternalLinkIcon size={12} />
          </Text>
        </NextLink>{" "}
        if you have any suggestions, feedback, or just want to show me your cat!
      </Text>
    </Container>
  );
}
