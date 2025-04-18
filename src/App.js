import React, { useEffect, useState } from "react";
import Wheel from "./components/Wheel";
import { Container, Button, Row, Col } from "react-bootstrap";
import "./App.css";
import { fetchSegments } from "./data/segments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift, faRedo } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSegments = async () => {
      const fetchedSegments = await fetchSegments();
      setSegments(fetchedSegments);
      setLoading(false);
    };
    loadSegments();
  }, []);

  const segmentNames = segments.map((segment) => segment.name);
  const segmentColors = segments.map((segment) => segment.color);

  const onFinished = (segment) => {
    alert(`Bạn quay được: ${segment}`);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <h3>Loading...</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5 text-center">
      <Row>
        <Col>
          <h1 className="mb-4">
            <FontAwesomeIcon icon={faGift} className="me-2" /> Rút thăm trúng
            thưởng!
          </h1>
          <Button
            variant="secondary"
            onClick={handleRefresh}
            className="mb-4"
            style={{ fontSize: "1em" }}
          >
            <FontAwesomeIcon icon={faRedo} className="me-1" /> Quay lại
          </Button>
          <Wheel
            segments={segmentNames}
            segColors={segmentColors}
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
        </Col>
      </Row>
    </Container>
  );
}

export default App;
