const Hello = require("./Hello");

const COMMANDS = [
    new Hello()
];

const doCommand = command => {
    if (!command || !command.length) {
        return;
    }

    // Try and match a command with a handler.
    try {
        for (let i = 0; i < COMMANDS.length; i++) {
            const cmd = COMMANDS[i];

            if (cmd.shouldAccept(command)) {
                cmd.execute(command);
            }
        }
    } catch (e) {
    }
};

module.exports = doCommand;
