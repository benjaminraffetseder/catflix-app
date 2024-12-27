import { VideoDetail } from "@/components/ui/video-detail";
import { videoDetailsSchema } from "@/schemas/channel";
import { env } from "@/utils/env";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Don't cache this page

async function getRandomVideo() {
  try {
    const res = await fetch(`${env.BACKEND_URL}/videos/random`, {
      cache: "no-store",
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
    console.error("Error fetching random video:", error);
    throw new Error("Failed to fetch video. Please try again later.");
  }
}

export default async function RandomVideoPage() {
  const video = await getRandomVideo();

  if (!video) {
    notFound();
  }

  return <VideoDetail video={video} />;
}
