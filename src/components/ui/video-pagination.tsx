"use client";

import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { HStack } from "@chakra-ui/react";

interface VideoPaginationProps {
  page: number;
  total: number;
  pageSize: number;
}

export function VideoPagination({
  page,
  total,
  pageSize,
}: VideoPaginationProps) {
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
        getHref={(page) => `/videos?page=${page}`}
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
