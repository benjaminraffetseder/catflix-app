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
  youtubeChannelId: z.string(),
});

// Schema for a single video in the channel list
export const videoSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  youtubeId: z.string(),
  channelId: z.string().uuid(),
  createdAt: z.string().datetime(),
});

// Schema for video details page
export const videoDetailsSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  uploadDate: z.string(),
  length: z.number().int().nonnegative(),
  youtubeId: z.string(),
  category: z.object({
    id: z.string().uuid(),
    title: z.string(),
  }),
});

// Schema for the paginated channel response
export const channelResponseSchema = z.object({
  data: z.array(channelSchema),
  total: z.number().int().positive(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
});

// Schema for the paginated video response
export const videoResponseSchema = z.object({
  data: z.array(videoSchema),
  total: z.number().int().positive(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
});

export type Channel = z.infer<typeof channelSchema>;
export type ChannelResponse = z.infer<typeof channelResponseSchema>;
export type Video = z.infer<typeof videoSchema>;
export type VideoResponse = z.infer<typeof videoResponseSchema>;
export type VideoDetails = z.infer<typeof videoDetailsSchema>;
