import { useState } from "react";

interface LiteEmbedProps {
  thumbnail?: string;
  title?: string;
  videoId?: string;
}

export function LiteEmbed({
  thumbnail = "/images/video-thumb.png",
  title = "How Unicalibre Helps You Bid More",
  videoId = "dQw4w9WgXcQ"
}: LiteEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-xl">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0"
        ></iframe>
      </div>
    );
  }

  return (
    <div
      className="group relative w-full aspect-video bg-slate-100 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={() => setIsPlaying(true)}
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        width="1200"
        height="675"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary ml-1" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
        <span className="mt-4 text-white font-medium text-lg drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
          {title}
        </span>
      </div>
    </div>
  );
}
