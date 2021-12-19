import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

export default function CrearNota() {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
  });

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date } = note;
        const newNote = {
          title,
          content,
          date,
        };
        await axios.post("api/notes", newNote, {
          headers: { Authorization: token },
        });

        return navigate.push("/");
      }
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <h6>CREAR NOTA</h6>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Form on onSubmit={createNote} autoComplete="off">
              <div>
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                  type="text"
                  value={note.title}
                  id="title"
                  name="title"
                  required
                  onChange={onChangeInput}
                />
              </div>
              <div>
                <Form.Label htmlFor="content">Content</Form.Label>
                <Form.Control
                  as="textarea"
                  value={note.content}
                  id="content"
                  name="content"
                  required
                  rows="5"
                  onChange={onChangeInput}
                />
              </div>
              <div>
                <Form.Label htmlFor="date">Date: {note.date}</Form.Label>
                <Form.Control
                  className="date"
                  type="date"
                  id="date"
                  name="date"
                  required
                  onChange={onChangeInput}
                />
              </div>
              <div className="d-grid gap-2">
                <Button size="sm" type="submit">
                  Guardar
                </Button>
              </div>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
