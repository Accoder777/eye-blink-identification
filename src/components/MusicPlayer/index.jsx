import React from "react";

const MusicPlayer = ({ isPlaying }) => {
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      console.log("play");
    } else {
      audioRef.current.pause();
      console.log("pause");
    }
  }, [isPlaying]);

  return (
    <div>
      <audio loop ref={audioRef} src="/music/siren.mp3" />
    </div>
  );
};

export default React.memo(MusicPlayer);
