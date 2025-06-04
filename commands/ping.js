module.exports = {
  name: "ping",
  description: "Simple ping check",
  execute(api, message) {
    api.sendMessage("\ud83c\udfd3 Pong!", message.threadID, message.messageID);
  }
};