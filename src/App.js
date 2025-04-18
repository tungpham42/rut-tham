import React from "react";
import Wheel from "./components/Wheel";
import "./App.css";
import { segments } from "./data/segments"; // Adjusted import to named import

function App() {
  // Map segments to separate arrays for names and colors
  const segmentNames = segments.map((segment) => segment.name);
  const segmentColors = segments.map((segment) => segment.color);

  const onFinished = (segment) => {
    alert(`Bạn quay được: ${segment}`);
  };

  // Function to handle page refresh
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rút thăm trúng thưởng!</h1>
        <button
          onClick={handleRefresh}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "1em",
            backgroundColor: "#888",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Quay lại
        </button>
        <Wheel
          segments={segmentNames} // Pass array of names
          segColors={segmentColors} // Pass array of colors
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
