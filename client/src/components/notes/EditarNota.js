import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
      <h2>Editar nota</h2>;
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
