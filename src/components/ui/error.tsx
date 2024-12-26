import { Button } from "@/components/ui/button";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ErrorRootProps {
  children: ReactNode;
}

function ErrorRoot({ children }: ErrorRootProps) {
  return (
    <Container maxW="container.xl" py={16}>
      <VStack gap={8} alignItems="center" textAlign="center">
        {children}
      </VStack>
    </Container>
  );
}

interface ErrorTitleProps {
  children: ReactNode;
}

function ErrorTitle({ children }: ErrorTitleProps) {
  return <Heading size="xl">{children}</Heading>;
}

interface ErrorDescriptionProps {
  children: ReactNode;
}

function ErrorDescription({ children }: ErrorDescriptionProps) {
  return <Text>{children}</Text>;
}

interface ErrorActionsProps {
  children: ReactNode;
}

function ErrorActions({ children }: ErrorActionsProps) {
  return <Box>{children}</Box>;
}

interface ErrorRetryButtonProps {
  onClick: () => void;
  children?: ReactNode;
}

function ErrorRetryButton({
  onClick,
  children = "Try again",
}: ErrorRetryButtonProps) {
  return <Button onClick={onClick}>{children}</Button>;
}

export const Error = {
  Root: ErrorRoot,
  Title: ErrorTitle,
  Description: ErrorDescription,
  Actions: ErrorActions,
  RetryButton: ErrorRetryButton,
};
