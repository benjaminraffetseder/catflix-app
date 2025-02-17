import { VideoDetail } from "@/components/ui/video-detail";
import { videoDetailsSchema } from "@/schemas/channel";
import { env } from "@/utils/env";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every minute

async function getVideo(id: string) {
  try {
    const res = await fetch(`${env.BACKEND_URL}/videos/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch video: ${res.statusText}`);
    }

    const data = await res.json();
    return videoDetailsSchema.parse(data);
  } catch (error) {
    console.error("Error fetching video:", error);
    throw new Error("Failed to fetch video. Please try again later.");
  }
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const videoId = (await params).videoId;
  const video = await getVideo(videoId);

  if (!video) {
    notFound();
  }

  return <VideoDetail video={video} />;
}
