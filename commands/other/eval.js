const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (!client.config.owners.includes(message.author.id)) return;

  try {
    let code = args.join(" ");
    let evaled = await eval(code);
    if (typeof evaled !== "string") {
      evaled = require("util").inspect(evaled);
    }
    message.channel.send(`\\✅ | Okio pas de problème Kevin l'eval est passé :`).then(() => {
      message.channel.send(evaled, {
        code: "js",
        split: "\n"
      });
    })
  } catch (err) {
    message.channel.send(`\\❌ | En r'vanche là y'a un soucis... :\`\`\`js\n${err.stack}\n\`\`\``);
  }
};

exports.help = {
  name: "eval",
  description: "Eval an command",
  usage: "eval <eval>",
  example: "eval message.channel.send('a')"
};

exports.conf = {
  aliases: [],
  cooldown: 5 // Integer = second.
};