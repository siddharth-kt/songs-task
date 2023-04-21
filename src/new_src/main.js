import React, { useContext } from "react";
import {
  BarSongTitle,
  BottomBar,
  Button,
  PlayList,
  Song,
  SongTitle,
} from "./styles.js";
import { songList } from "./constants.js";
import PlayerDataContext from "./playerContext.js";

const buttonLabels = ["Not replaying", "Replaying all", "Replaying one"];

const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = React.useState(null);
  const [currentMode, setCurrentMode] = React.useState(buttonLabels[0]);

  const updateCurrentSong = (selectedSong) => {
    setCurrentSong(selectedSong);
  };

  const updateCurrentMode = () => {
    if (currentMode === buttonLabels[0]) {
      setCurrentMode(buttonLabels[1]);
    } else if (currentMode === buttonLabels[1]) {
      setCurrentMode(buttonLabels[2]);
    } else if (currentMode === buttonLabels[2]) {
      setCurrentMode(buttonLabels[0]);
    }
  };

  const selectNext = () => {
    if (currentSong === null) {
      return;
    }

    if (currentMode !== buttonLabels[2]) {
      const currentSongIndex = songList.findIndex((obj) => {
        return obj.id === currentSong.id;
      });

      if (currentSongIndex === songList.length - 1) {
        // This is last song.
        if (currentMode === buttonLabels[1]) {
          setCurrentSong(songList[0]);
        }
      } else {
        setCurrentSong(songList[currentSongIndex + 1]);
      }
    }
  };

  const selectPrevious = () => {
    if (currentSong === null) {
      return;
    }

    if (currentMode !== buttonLabels[2]) {
      const currentSongIndex = songList.findIndex((obj) => {
        return obj.id === currentSong.id;
      });

      if (currentSongIndex === 0) {
        // This is 1st song.
        if (currentMode === buttonLabels[1]) {
          setCurrentSong(songList[songList.length - 1]);
        }
      } else {
        setCurrentSong(songList[currentSongIndex - 1]);
      }
    }
  };

  const value = React.useMemo(() => {
    return {
      currentSong: currentSong,
      currentMode: currentMode,
      updateCurrentSong: updateCurrentSong,
      updateCurrentMode: updateCurrentMode,
      selectNext: selectNext,
      selectPrevious: selectPrevious,
    };
  }, [currentSong, currentMode]);

  return (
    <PlayerDataContext.Provider value={value}>
      {children}
    </PlayerDataContext.Provider>
  );
};

const usePlayerContext = () => {
  const playerData = useContext(PlayerDataContext);

  if (!playerData) {
    throw new Error("usePlayerContext must be used within a PlayerProvider.");
  }

  return playerData;
};

const ControlBar = () => {
  const {
    currentSong,
    currentMode,
    updateCurrentMode,
    selectNext,
    selectPrevious,
  } = usePlayerContext();

  let title = "";
  if (currentSong) {
    title = `${currentSong.author} - ${currentSong.title}`;
  }

  return (
    <BottomBar>
      <BarSongTitle data-testid="barTitle">{title}</BarSongTitle>
      <div>
        <Button data-testid="previousButton" onClick={selectNext}>
          Previous
        </Button>
        <Button data-testid="nextButton" onClick={selectPrevious}>
          Next
        </Button>
        <Button data-testid="currentModeButton" onClick={updateCurrentMode}>
          {currentMode}
        </Button>
      </div>
    </BottomBar>
  );
};

const Songs = () => {
  const { currentSong, updateCurrentSong } = usePlayerContext();

  return (
    <PlayList>
      {songList.map(({ title, author, id, active }) => (
        <Song
          key={id}
          onClick={() => {
            updateCurrentSong({ id, title, author, active });
          }}
        >
          <SongTitle
            data-testid={id}
            active={currentSong && currentSong.id == id}
          >
            {title}
          </SongTitle>
          <p>{author}</p>
        </Song>
      ))}
    </PlayList>
  );
};

export default function Index() {
  return (
    <PlayerProvider>
      <main data-testid="mainPart">
        <Songs />
        <ControlBar />
      </main>
    </PlayerProvider>
  );
}

export { PlayerProvider, Songs, ControlBar };
