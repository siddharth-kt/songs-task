import React, { useState, useMemo } from "react";
import { PlayerProvider } from "./components/playerContext";
import ControlBar from "./components/controlBar";
import Songs from "./components/songs";
import "./components/styles.css";

const AllSongs = [
  {
    title: "My heart will go on",
    author: "Celien Dion",
  },
  {
    title: "Court of the Crimson King",
    author: "King Crimson",
  },
  {
    title: "Owner of a loleny Heart",
    author: "Yes",
  },
];

export default function Index() {
  const [songs, setSongs] = useState(AllSongs);
  const [currentlyPlayingSong, setCurrentlyPlayingSong] = useState(null);

  const moveNext = () => {
    var resultIndex = songs.findIndex((obj) => {
      return obj.title === currentlyPlayingSong.title;
    });

    if (resultIndex !== undefined) {
      if (songs.length - 1 === resultIndex) {
        // Restart on end.
        setCurrentlyPlayingSong(songs[0]);
      } else {
        setCurrentlyPlayingSong(songs[resultIndex + 1]);
      }
    }
  };

  const movePrevious = () => {
    var resultIndex = songs.findIndex((obj) => {
      return obj.title === currentlyPlayingSong.title;
    });

    if (resultIndex !== undefined) {
      if (resultIndex === 0) {
        // Restart on end.
        setCurrentlyPlayingSong(songs[songs.length - 1]);
      } else {
        setCurrentlyPlayingSong(songs[resultIndex - 1]);
      }
    }
  };

  const value = useMemo(() => {
    return {
      songs: songs,
      currentlyPlayingSong: currentlyPlayingSong,
      setCurrentlyPlayingSong: setCurrentlyPlayingSong,
      moveNext: moveNext,
      movePrevious: movePrevious,
    };
  }, [songs, currentlyPlayingSong, setCurrentlyPlayingSong]);

  return (
    <PlayerProvider value={value}>
      <main data-testid="mainPart">
        <div id="main-container">
          <Songs />
          <ControlBar />
        </div>
      </main>
    </PlayerProvider>
  );
}
