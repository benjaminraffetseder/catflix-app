"use client";

import { Error } from "@/components/ui/error";

export default function VideoError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Error.Root>
      <Error.Title>Video not available</Error.Title>
      <Error.Description>
        We&apos;re having trouble loading this video. Please try again later.
      </Error.Description>
      <Error.Actions>
        <Error.RetryButton onClick={reset} />
      </Error.Actions>
    </Error.Root>
  );
}
