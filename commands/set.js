module.exports = {
  name: "set",
  description: "Store a key-value for the user",
  execute(api, message, args, db, saveDatabase) {
    const [key, ...value] = args;
    if (!key || value.length === 0) {
      return api.sendMessage("\u2757 Usage: !set <key> <value>", message.threadID);
    }

    const userID = message.senderID;
    if (!db[userID]) db[userID] = {};
    db[userID][key] = value.join(" ");
    saveDatabase();

    api.sendMessage(`\u2705 Saved ${key}: ${value.join(" ")}`, message.threadID);
  }
};
