import React, { useContext } from "react";
import PlayerContext from "./playerContext";
import "./styles.css";

function SongItem({ song, isCurrentlyPlayingSong, setCurrentlyPlayingSong }) {
  const onClick = () => {
    setCurrentlyPlayingSong(song);
  };

  return (
    <button onClick={onClick}>
      <div
        id={isCurrentlyPlayingSong ? "currently-playing-song" : ""}
        className={"song-container"}
      >
        <p>{song.title}</p>
        <p>{song.author}</p>
      </div>
    </button>
  );
}

export default function Songs() {
  const { currentlyPlayingSong, setCurrentlyPlayingSong, songs } =
    useContext(PlayerContext);

  return (
    <div id="songs-container">
      {songs.map((song, index) => {
        return (
          <SongItem
            key={index}
            song={song}
            isCurrentlyPlayingSong={
              currentlyPlayingSong && currentlyPlayingSong.title === song.title
            }
            setCurrentlyPlayingSong={setCurrentlyPlayingSong}
          />
        );
      })}
    </div>
  );
}
