const Command = require("./commands/Command");

const weather = require("./plugins/weather");
const watchdog = require("./plugins/watchdog");
const polls = require("./plugins/polls");

// Attaching plugins here will install them to the bot.
const PLUGINS = [
    new Command("weather", weather),
    new Command("watchdog", watchdog),
    new Command("polls", polls)
];

const WATCHERS = [];

module.exports = {
    PLUGINS,
    WATCHERS
};
