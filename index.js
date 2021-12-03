const { type } = require("os");

const Discord = require("discord.js"),
  robotDuCul = require("./handler/Client.js"),
  client = new robotDuCul(),
  config = require('./config.json');

  client.on('ready', () => {
    client.user.setStatus('onligne')
    client.user.setActivity("Play....", {
    type: "STREAMING",
    url: "https://www.twitch.tv/nasnotnur"
    });
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {
  const role = newPresence.guild.roles.cache.get("905823836132499516");
  const member = newPresence.member
  const activities = member.user.presence.activities[0]});

require("discord-buttons")(client);
require("./handler/Module.js")(client);
require("./handler/Event.js")(client);
client.on("warn", console.warn); 
client.on("error", console.error); 
client.login(config.token).catch(console.error)