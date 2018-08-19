const Command = require("./Command");

const weatherPlugin = require("../plugins/weather");

const COMMANDS = [
    new Command("weather", weatherPlugin)
];

const doCommand = (command, discord) => {
    if (!command || !command.length) {
        return;
    }

    // Try and match a command with a handler.
    try {
        const cmd = COMMANDS.find(test => test.shouldAccept(command));

        if (cmd && cmd.execute) {
            cmd.execute(command, discord);
        }
    } catch (e) {
        throw e;
    }
};

module.exports = doCommand;
