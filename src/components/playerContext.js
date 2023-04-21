import React from "react";

const PlayerContext = React.createContext({
  songs: [],
  currentlyPlayingSong: {},
  setCurrentlyPlayingSong: () => {},
  moveNext: () => {},
  movePrevious: () => {},
});

const PlayerProvider = PlayerContext.Provider;
const PlayerConsumer = PlayerContext.Consumer;

export { PlayerProvider, PlayerConsumer };
export default PlayerContext;
