import React from "react";
import Wheel from "./components/Wheel";
import "./App.css";

function App() {
  const segments = [
    "Prize 1",
    "Prize 2",
    "Prize 3",
    "Prize 4",
    "Prize 5",
    "Try Again",
  ];

  const segColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEEAD",
    "#D4A5A5",
  ];

  const onFinished = (segment) => {
    alert(`You landed on: ${segment}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spin the Wheel!</h1>
        <Wheel
          segments={segments}
          segColors={segColors}
          onFinished={onFinished}
          primaryColor="#333"
          contrastColor="#fff"
          buttonText="Quay"
          isOnlyOnce={true}
          size={Math.min(window.innerWidth, window.innerHeight) * 0.4}
          upDuration={100}
          downDuration={1000}
          fontFamily="Arial"
          fontSize="1.2em"
          outlineWidth={8}
        />
      </header>
    </div>
  );
}

export default App;
