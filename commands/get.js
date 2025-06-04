module.exports = {
  name: "get",
  description: "Retrieve a saved key-value",
  execute(api, message, args, db) {
    const [key] = args;
    if (!key) {
      return api.sendMessage("\u2757 Usage: !get <key>", message.threadID);
    }

    const userID = message.senderID;
    const value = db[userID]?.[key];

    if (value) {
      api.sendMessage(`\ud83d\udce6 ${key}: ${value}`, message.threadID);
    } else {
      api.sendMessage("\u274C No data found for that key.", message.threadID);
    }
  }
};