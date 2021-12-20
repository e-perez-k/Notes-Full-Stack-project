import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import { Card, Button, Row } from "react-bootstrap";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("api/notes", {
      headers: { Authorization: token },
    });

    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (error) {
      window.location.href = "/"; //returns the href (URL) of the current page
    }
  };

  return (
    <>
      <Row className="justify-content-center">
        {notes.map((note) => (
          <Card
            className="m-3"
            style={{ width: "20rem" }}
            bg="light"
            border="dark"
            key={note._id}
          >
            <Card.Body>
              <Card.Title>{note.title}</Card.Title>
              <Card.Text>{note.content}</Card.Text>
              <div className="name_date">
                <p className="text-muted">{note.name}</p>
                <p className="text-muted">{format(note.date)}</p>
              </div>
              <div className="cardFooter">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/edit/${note._id}`}
                >
                  {" "}
                  Editar
                </Link>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteNote(note._id)}
                >
                  Borrar
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Row>
      <footer>MERN academic project after 3 months programming</footer>
    </>
  );
}
