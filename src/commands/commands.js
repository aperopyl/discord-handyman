const { PLUGINS } = require("../plugins");

const doCommand = (command, discord) => {
    if (!command || !command.length) {
        return false;
    }

    // Try and match a command with a handler.
    try {
        const cmd = PLUGINS.find(test => test.shouldAccept(command));

        if (cmd && cmd.execute) {
            cmd.execute(command, discord);

            return true;
        }

        discord.channel.send(`Hey, I don't know what **${command[0]}** is!`);

        return false;
    } catch (e) {
        throw e;
    }
};

module.exports = doCommand;
