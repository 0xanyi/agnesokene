import { Hero } from "@/components/hero";
import { Biography } from "@/components/biography";
import { LiveStreamPlayer } from "@/components/live-stream-player";

export default function Home() {
  return (
    <>
      <Hero />
      <LiveStreamPlayer />
      <Biography />
    </>
  );
}
