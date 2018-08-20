const Command = require("../../commands/Command");
const { matchCommandAndExecute } = require("../../utils");

const help = require("./help");
const now = require("./now");

const COMMANDS = [
    new Command("help", help),
    new Command("now", now)
];

/**
 * Triggered by `+polls weather`.
 *
 * @param {string[]} command
 * @param {*} message
 */
const weather = (command, message) => {
    console.log("Weatherman working...");

    if (command && command.length <= 1) {
        help(message);

        return;
    }

    command.shift();

    const worked = matchCommandAndExecute(COMMANDS, command, message);

    if (!worked) {
        console.log("No command found.");
    }
};

module.exports = weather;
