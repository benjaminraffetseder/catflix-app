"use client";

import { Error } from "@/components/ui/error";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Error.Root>
      <Error.Title>Something went wrong!</Error.Title>
      <Error.Description>
        We&apos;re having trouble loading the content. Please try again later.
      </Error.Description>
      <Error.Actions>
        <Error.RetryButton onClick={reset} />
      </Error.Actions>
    </Error.Root>
  );
}
