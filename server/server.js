require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter");

const app = express();
app.use(express.json());
app.use(cors());

// RUTAS
app.use("/users", userRouter);
app.use("/api/notes", noteRouter);

// LISTEN SERVER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Servidor conectado en puerto", PORT);
});

// MONGO ATLAS
mongoose.connect(process.env.MONGODB_URL, function (err, client) {
  err
    ? (console.log("❌ MongoDB no conectado"), console.log(`error: ${err}`))
    : console.log("✅ MongoDB conectado");
});
