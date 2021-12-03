const {
  exec
} = require('child_process');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (!client.config.owners.includes(message.author.id)) return message.channel.send(":x: C'est good t'as a permission de faire ça ! <Developpeur de Uty>");

  exec(`${args.join(' ')}`, (error, stdout) => {
    let response = (error || stdout);
    if (!error) message.channel.send(`\\✅ | L'execution s'est faite ! (Wasa' tu dois être joisse :p) :`);
    else message.channel.send(`\\❌ | Une erreur est survenue lors de l'exécution (Mince pas de décapitation cette fois Wasa') :`);
    message.channel.send(`${response}`, {
      code: "js",
      split: "\n"
    }).catch(e => console.log(e));
  });
};

exports.help = {
  name: "exec",
  description: "Exec an command",
  usage: "exec <exex>",
  example: "exec ls"
};

exports.conf = {
  aliases: [],
  cooldown: 5 // Integer = second.
};