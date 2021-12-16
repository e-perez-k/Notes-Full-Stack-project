import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

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
      <h2>Crear nota</h2>
      <Form on onSubmit={createNote} autoComplete="off">
        <div>
          <label htmlFor="title">Title</label>
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
          <label htmlFor="content">Content</label>
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
          <label htmlFor="date">Date: {note.date}</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            onChange={onChangeInput}
          />
        </div>
        <Button size="sm" type="submit">
          Guardar
        </Button>
      </Form>
    </>
  );
}
