// client/src/components/BackgroundMusic.tsx
import React, { useState } from "react";
import ReactPlayer from "react-player";

const BackgroundMusic: React.FC = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <button
      onClick={() => setPlaying((p) => !p)}
      className="p-2 bg-white bg-opacity-75 rounded shadow text-sm"
    >
      {playing ? "🔇 Pause City Pop" : "🔊 Play City Pop"}
      <ReactPlayer
        url="https://www.youtube.com/watch?v=R8lUVd1OpIk"
        playing={playing}
        loop
        volume={0.5}
        width={0}
        height={0}
        config={{
          youtube: {
            playerVars: {
              controls: 0,
              autoplay: 0,
              loop: 1,
              playlist: "R8lUVd1OpIk",
            },
          },
        }}
      />
    </button>
  );
};

export default BackgroundMusic;