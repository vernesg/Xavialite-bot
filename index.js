// index.js
require("./server");
const login = require("ws3-fca");
const fs = require("fs");
const path = require("path");
const config = require("./config");

const appState = JSON.parse(process.env.APPSTATE || fs.readFileSync("appstate.json", "utf-8"));
const db = require("./database.json");
const commands = new Map();

const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

function saveDatabase() {
  fs.writeFileSync("database.json", JSON.stringify(db, null, 2));
}

login({ appState }, (err, api) => {
  if (err) return console.error("❌ Login failed:", err);

  api.setOptions({ listenEvents: true });
  console.log("✅ Bot is online!");

  api.listenMqtt((err, message) => {
    if (err) return console.error("❌ Listen error:", err);
    if (!message.body || !message.body.startsWith(config.prefix)) return;

    const args = message.body.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = commands.get(commandName);
    if (command) {
      command.execute(api, message, args, db, saveDatabase);
    }
  });
});