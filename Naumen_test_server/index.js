const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const PORT = 5000;

const events = require("events");
const emitter = new events.EventEmitter();

const groups = require("./jsons/groups.json");
const messages_id_1 = require("./jsons/messages_id_1.json");
const messages_id_2 = require("./jsons/messages_id_2.json");
const unread = require("./jsons/unread.json");

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server listening on port", PORT);
    });
  } catch (e) {}
};
start();

app.use(cors());

app.use(express.json({extended: true}))
app.use('/api', require('./routes/upload.route'))

app.use('/files', express.static(path.join(__dirname, 'files')))

app.get("/groups", (req, res) => {
  res.set({ "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(groups));
});

app.get("/unread", (req, res) => {
  res.set({ "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(unread));
});

app.get("/messages/id1", (req, res) => {
  res.set({ "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(messages_id_1));
});

app.get("/messages/id2", (req, res) => {
  res.set({ "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(messages_id_2));
});

app.get("/get-messages", (req, res) => {
  emitter.once("newMessage", (message) => {
    res.json(message);
    res.end();
  });
});

app.post("/new-messages", (req, res) => {
  const message = req.body;
  emitter.emit("newMessage", message);
  res.status(200);
  res.end();
});


