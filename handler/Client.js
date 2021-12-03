const {
  Client,
  Collection
} = require("discord.js"),
superagent = require('superagent');

module.exports = class TutorialBot extends Client {
  constructor(options) {
    super(options)

    this.commands = new Collection(); // ça stocke tes commandes.
    this.cooldowns = new Collection(); // idem mais avec des temps de recharge
    this.aliases = new Collection(); // ça stocke tes commandes mais alternatives cette fois. Ex: /server -> /serverinfo, /guild, /guildinfo
    this.config = require('../config.json');
    this.superagent = superagent
    this.package = require("../package.json");
    this.recent = new Set();
  }
}