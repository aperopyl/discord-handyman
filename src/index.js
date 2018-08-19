const client = require("./DiscordClient");
const doCommand = require("./commands/commands");
const { splitMessage, isCommand } = require("./utils");

const { TOKEN } = process.env;

client.on("guildCreate", guild => {
});

client.on("message", message => {
    if (message.author.bot || !message) {
        return;
    }

    const split = splitMessage(message.content);
    const itIs = isCommand(split);

    if (itIs) {
        split.shift();

        message.channel.send("It's a command!")
            .then(_ => {
                console.log("Trying to match a command...");
                doCommand(split, client);
            });
    }
});

client.login(TOKEN);
