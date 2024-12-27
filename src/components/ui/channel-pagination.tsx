"use client";

import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { HStack } from "@chakra-ui/react";

interface ChannelPaginationProps {
  page: number;
  total: number;
  pageSize: number;
  channelId: string;
}

export function ChannelPagination({
  page,
  total,
  pageSize,
  channelId,
}: ChannelPaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <HStack justify="center" gap={4}>
      <PaginationRoot
        page={page}
        count={total}
        pageSize={pageSize}
        getHref={(page) => `/channel/${channelId}?page=${page}`}
        size="xs"
      >
        <HStack gap={2}>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </HStack>
  );
}
