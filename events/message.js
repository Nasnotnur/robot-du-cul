const Discord = require("discord.js"),
  cooldowns = new Discord.Collection();

module.exports = async (client, message) => {
  if (message.author.bot || message.author === client.user) return;
  if (message.channel.type === "dm") return;

  let prefix = client.config.prefix; // Ton prefix pour config.json
  if (!message.content.startsWith(prefix)) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();
  let sender = message.author;
  message.flags = []
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1)); // Ex: /play -soundcloud UP pice
  }

  let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!commandFile) return; // Si les commandes n'existent pas, ignore-les. N'envoye aucun avertissement à ce sujet.
  if (!cooldowns.has(commandFile.help.name)) cooldowns.set(commandFile.help.name, new Discord.Collection());

  const member = message.member,
    now = Date.now(),
    timestamps = cooldowns.get(commandFile.help.name),
    cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;

  if (!timestamps.has(member.id)) {
    if (!client.config.owners.includes(message.author.id)) {
      timestamps.set(member.id, now);
    }
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(`Calme toi :3 Attend **${timeLeft.toFixed(1)}** seconde avant de pouvoir refaire cette commande bggg`);
    }

    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount); // Cela supprimera le temps de recharge de l'utilisateur pour lui-même.
  }

  try {
    if (!commandFile) return;
    commandFile.run(client, message, args);
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log(`${sender.tag} (${sender.id}) vient de faire :p : ${cmd}`);
  }
}