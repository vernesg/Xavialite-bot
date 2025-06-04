// server.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("XaviaLiteBot is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Server started on port ${PORT}`);
});

// commands/ping.js
module.exports = {
  name: "ping",
  description: "Simple ping check",
  execute(api, message) {
    api.sendMessage("🏓 Pong!", message.threadID, message.messageID);
  }
};