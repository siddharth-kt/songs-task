import React from "react";
import { PlayerConsumer } from "./playerContext";
import "./styles.css";

function ControlComponent({ song, moveNext, movePrevious }) {
  return (
    <div id="controller-container">
      <div>
        <p style={{ color: "white", fontWeight: "bold" }}>
          Title - {song.title}
        </p>
        <p style={{ color: "white", fontWeight: "bold" }}>
          Author - {song.author}
        </p>
      </div>
      <div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            paddingBottom: "10px",
          }}
        >
          <button onClick={movePrevious}>Previous</button>
          <button onClick={moveNext}>Next</button>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <button>Not Replaying</button>
          <button>Replaying All</button>
          <button>Replaying One</button>
        </div>
      </div>
    </div>
  );
}

export default function ControlBar() {
  return (
    <PlayerConsumer>
      {(value) =>
        value.currentlyPlayingSong ? (
          <ControlComponent
            song={value.currentlyPlayingSong}
            moveNext={value.moveNext}
            movePrevious={value.movePrevious}
          />
        ) : null
      }
    </PlayerConsumer>
  );
}
