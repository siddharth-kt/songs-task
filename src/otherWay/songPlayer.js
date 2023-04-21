import React from "react";
import {
  BarSongTitle,
  BottomBar,
  Button,
  PlayList,
  Song,
  SongTitle,
} from "./styles";
import { songList } from "./constants";

const buttonLabels = ["Not replaying", "Replaying all", "Replaying one"];

/* Player Context */
const PlayerContext = React.createContext({
  currentlyPlayingSong: null,
  setCurrentlyPlayingSong: (song) => {},
  moveNext: () => {},
  movePrevious: () => {},
});
const PlayerProvider = PlayerContext.Provider;

/* Songs Component */
function Songs() {
  const { currentlyPlayingSong, setCurrentlyPlayingSong } =
    React.useContext(PlayerContext);

  return (
    <div style={PlayList}>
      {songList.map((song, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setCurrentlyPlayingSong(song);
            }}
            style={
              currentlyPlayingSong && currentlyPlayingSong.title === song.title
                ? { ...Song, backgroundColor: "rgb(100,149,237)" }
                : Song
            }
          >
            <p style={SongTitle}>{song.title}</p>
            <p>{song.author}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ControlBar Component */
function ControlBar() {
  const { currentlyPlayingSong, moveNext, movePrevious } =
    React.useContext(PlayerContext);

  return currentlyPlayingSong ? (
    <div style={BottomBar}>
      <div>
        <p style={BarSongTitle}>Title - {currentlyPlayingSong.title}</p>
        <p>Author - {currentlyPlayingSong.author}</p>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingBottom: "10px",
          }}
        >
          <button style={Button} onClick={movePrevious}>
            Previous
          </button>
          <button style={Button} onClick={moveNext}>
            Next
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingBottom: "10px",
          }}
        >
          {buttonLabels.map((item, index) => {
            return (
              <button key={index} style={Button}>
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

/* Main Component */
export default function SongPlayer() {
  const [currentlyPlayingSong, setCurrentlyPlayingSong] = React.useState(null);

  const moveNext = () => {
    var resultIndex = songList.findIndex((obj) => {
      return obj.title === currentlyPlayingSong.title;
    });

    if (resultIndex !== undefined) {
      if (songList.length - 1 === resultIndex) {
        setCurrentlyPlayingSong(songList[0]); // Restart on end.
      } else {
        setCurrentlyPlayingSong(songList[resultIndex + 1]);
      }
    }
  };

  const movePrevious = () => {
    var resultIndex = songList.findIndex((obj) => {
      return obj.title === currentlyPlayingSong.title;
    });

    if (resultIndex !== undefined) {
      if (resultIndex === 0) {
        setCurrentlyPlayingSong(songList[songList.length - 1]); // Restart on end.
      } else {
        setCurrentlyPlayingSong(songList[resultIndex - 1]);
      }
    }
  };

  const value = React.useMemo(() => {
    return {
      currentlyPlayingSong: currentlyPlayingSong,
      setCurrentlyPlayingSong: setCurrentlyPlayingSong,
      moveNext: moveNext,
      movePrevious: movePrevious,
    };
  }, [currentlyPlayingSong, setCurrentlyPlayingSong]);

  return (
    <div style={PlayList}>
      <PlayerProvider value={value}>
        <main data-testid="mainPart">
          <Songs />
          <ControlBar />
        </main>
      </PlayerProvider>
    </div>
  );
}
