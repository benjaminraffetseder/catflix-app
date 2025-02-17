"use client";

import { Error } from "@/components/ui/error";

export default function ChannelError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Error.Root>
      <Error.Title>Channel not available</Error.Title>
      <Error.Description>
        We&apos;re having trouble loading this channel. Please try again later.
      </Error.Description>
      <Error.Actions>
        <Error.RetryButton onClick={reset} />
      </Error.Actions>
    </Error.Root>
  );
}
