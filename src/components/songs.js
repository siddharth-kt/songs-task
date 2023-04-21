import React from "react";
import { PlayerConsumer } from "./playerContext";
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
  return (
    <div id="songs-container">
      <PlayerConsumer>
        {(value) =>
          value.songs.map((song, index) => {
            return (
              <SongItem
                key={index}
                song={song}
                isCurrentlyPlayingSong={
                  value.currentlyPlayingSong &&
                  value.currentlyPlayingSong.title === song.title
                }
                setCurrentlyPlayingSong={value.setCurrentlyPlayingSong}
              />
            );
          })
        }
      </PlayerConsumer>
    </div>
  );
}
