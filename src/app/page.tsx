import { Hero } from "@/components/hero";
import { Biography } from "@/components/biography";
import { LiveStreamPlayer } from "@/components/live-stream-player";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="order-2 sm:order-1">
        <Hero />
      </div>
      <div className="order-1 sm:order-2">
        <LiveStreamPlayer />
      </div>
      <div className="order-3">
        <Biography />
      </div>
    </div>
  );
}
