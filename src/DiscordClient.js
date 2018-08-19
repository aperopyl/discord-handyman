const Discord = require("discord.js");

const { TOKEN } = require("./env");

const client = new Discord.Client();

client.login(TOKEN);

module.exports = client;
