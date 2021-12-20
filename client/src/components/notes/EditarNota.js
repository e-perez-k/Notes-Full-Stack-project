import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { format } from "timeago.js";

export default function EditarNota({}) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    id: "",
  });

  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");
      if (params.id) {
        const res = await axios.get(`/api/notes/${params.id}`, {
          headers: { Authorization: token },
        });
        console.log(params.id);
        console.log(res);
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: res.data.date,
          id: res.data._id,
        });
      }
    };
    getNote();
  }, [params.id]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date, id } = note;
        const newNote = {
          title,
          content,
          date,
        };
        await axios.put(`/api/notes/${id}`, newNote, {
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
            <h6>EDIT NOTE</h6>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Form on onSubmit={editNote} autoComplete="off">
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
                  type="text"
                  value={note.content}
                  id="content"
                  name="content"
                  required
                  rows="10"
                  onChange={onChangeInput}
                />
              </div>
              <div>
                <Form.Label htmlFor="date">
                  Date: {format(note.date)}
                </Form.Label>
                <Form.Control
                  type="date"
                  id="date"
                  name="date"
                  required
                  onChange={onChangeInput}
                />
              </div>
              <div className="d-grid gap-2">
                <Button size="sm" type="submit">
                  Save
                </Button>
              </div>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <footer>
        MERN academic programming project from scratch in three months
      </footer>
    </>
  );
}
