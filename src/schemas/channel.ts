import { z } from "zod";

// Schema for a single channel
export const channelSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  thumbnailUrl: z.string().url(),
  isActive: z.boolean(),
  lastFetchedAt: z.string().datetime(),
  videoCount: z.number().int().nonnegative(),
});

// Schema for the paginated response
export const channelResponseSchema = z.object({
  data: z.array(channelSchema),
  total: z.number().int().positive(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
});

export type Channel = z.infer<typeof channelSchema>;
export type ChannelResponse = z.infer<typeof channelResponseSchema>;
