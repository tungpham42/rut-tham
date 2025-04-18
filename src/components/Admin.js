import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  Container,
  Card,
  Form,
  Button,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import "./Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faArrowLeft,
  faPlus,
  faEdit,
  faTrash,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Admin = () => {
  const [segments, setSegments] = useState([]);
  const [newSegment, setNewSegment] = useState({ name: "", color: "#000000" });
  const [editingSegment, setEditingSegment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const segmentsCollection = collection(db, "segments");
        const segmentsSnapshot = await getDocs(segmentsCollection);
        const segmentsList = segmentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSegments(segmentsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching segments: ", error);
        setLoading(false);
      }
    };
    fetchSegments();
  }, []);

  const handleAddSegment = async (e) => {
    e.preventDefault();
    if (!newSegment.name || !newSegment.color) return;
    try {
      const segmentsCollection = collection(db, "segments");
      const docRef = await addDoc(segmentsCollection, newSegment);
      setSegments([...segments, { id: docRef.id, ...newSegment }]);
      setNewSegment({ name: "", color: "#000000" });
    } catch (error) {
      console.error("Error adding segment: ", error);
    }
  };

  const handleEditSegment = (segment) => {
    setEditingSegment(segment);
  };

  const handleUpdateSegment = async (e) => {
    e.preventDefault();
    if (!editingSegment.name || !editingSegment.color) return;
    try {
      const segmentDoc = doc(db, "segments", editingSegment.id);
      await updateDoc(segmentDoc, {
        name: editingSegment.name,
        color: editingSegment.color,
      });
      setSegments(
        segments.map((seg) =>
          seg.id === editingSegment.id ? editingSegment : seg
        )
      );
      setEditingSegment(null);
    } catch (error) {
      console.error("Error updating segment: ", error);
    }
  };

  const handleDeleteSegment = async (id) => {
    try {
      const segmentDoc = doc(db, "segments", id);
      await deleteDoc(segmentDoc);
      setSegments(segments.filter((seg) => seg.id !== id));
    } catch (error) {
      console.error("Error deleting segment: ", error);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <h3>Loading...</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <Card.Title>
            <FontAwesomeIcon icon={faCog} className="me-2" /> Admin - Manage
            Segments
          </Card.Title>
          <Button variant="link" as={Link} to="/" className="mb-3">
            <FontAwesomeIcon icon={faArrowLeft} className="me-1" /> Back to
            Wheel
          </Button>

          {/* Add Segment Form */}
          <Card className="mb-4">
            <Card.Header>
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New Segment
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddSegment}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Segment Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Segment Name"
                        value={newSegment.name}
                        onChange={(e) =>
                          setNewSegment({ ...newSegment, name: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Color</Form.Label>
                      <Form.Control
                        type="color"
                        value={newSegment.color}
                        onChange={(e) =>
                          setNewSegment({
                            ...newSegment,
                            color: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="d-flex align-items-end">
                    <Button variant="primary" type="submit" className="w-100">
                      <FontAwesomeIcon icon={faPlus} className="me-1" /> Add
                      Segment
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          {/* Edit Segment Form */}
          {editingSegment && (
            <Card className="mb-4">
              <Card.Header>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit Segment
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleUpdateSegment}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Segment Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={editingSegment.name}
                          onChange={(e) =>
                            setEditingSegment({
                              ...editingSegment,
                              name: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Color</Form.Label>
                        <Form.Control
                          type="color"
                          value={editingSegment.color}
                          onChange={(e) =>
                            setEditingSegment({
                              ...editingSegment,
                              color: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3} className="d-flex align-items-end gap-2">
                      <Button variant="success" type="submit" className="w-100">
                        <FontAwesomeIcon icon={faSave} className="me-1" />{" "}
                        Update
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setEditingSegment(null)}
                        className="w-100"
                      >
                        <FontAwesomeIcon icon={faTimes} className="me-1" />{" "}
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          )}

          {/* Segments List */}
          <Card>
            <Card.Header>
              <FontAwesomeIcon icon={faPlus} className="me-2" /> Segments List
            </Card.Header>
            <ListGroup variant="flush">
              {segments.map((segment) => (
                <ListGroup.Item
                  key={segment.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span style={{ color: segment.color, fontWeight: "bold" }}>
                    {segment.name}
                  </span>
                  <div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditSegment(segment)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteSegment(segment.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Admin;
