import React from "react";

const BarSongTitle = ({ children }) => {
  return <p>{children}</p>;
};

const BottomBar = ({ children }) => {
  return (
    <div
      style={{
        bottom: "10px",
        left: "10px",
        right: "10px",
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(150,150,150)",
        flexDirection: "column",
        paddingLeft: "10px",
        paddingTop: "2px",
        paddingBottom: "6px",
        borderWidth: "2px",
        borderRadius: "5px",
        borderColor: "white",
      }}
    >
      {children}
    </div>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button
      style={{
        padding: "5px",
        borderWidth: "1px",
        borderRadius: "5px",
        fontSize: "1em",
        marginRight: "20px",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const PlayList = ({ children }) => {
  return (
    <div
      style={{
        padding: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
};

const Song = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        borderWidth: "2px",
        padding: "5px",
        paddingLeft: "15px",
        paddingRight: "15px",
        borderColor: "white",
        backgroundColor: "rgb(60,60,60)",
        color: "white",
        fontWeight: "700",
        fontSize: "1.2em",
        margin: "10px",
        borderRadius: "10px",
      }}
    >
      <div onClick={onClick}>{children}</div>
    </div>
  );
};

const SongTitle = ({ children, active }) => {
  return (
    <p
      style={{
        color: active ? "#4CBB17" : "white",
      }}
    >
      {children}
    </p>
  );
};

export { BarSongTitle, BottomBar, Button, PlayList, Song, SongTitle };
