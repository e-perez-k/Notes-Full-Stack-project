import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditarNota(match) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    id: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");
      if (match.params.id) {
        const res = await axios.get(`/api/notes/${match.params.id}`, {
          headers: { Authorization: token },
        });
        console.log(match.params.id);
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
  }, [match.params.id]);

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
        await axios.post(`api/notes/${id}`, newNote, {
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
      <h2>Crear nota</h2>;
      <form on onSubmit={editNote} autoComplete="off">
        <div>
          <label htmlFor="title">Title</label>
          <input
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
          <input
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
          <label htmlFor="date">Date: {note.date}</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            onChange={onChangeInput}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </>
  );
}
