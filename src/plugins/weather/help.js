const weatherHelp = message => {
    if (message && message.channel) {
        message.channel.send("Try `+hm weather now new york`");
    }
};

module.exports = weatherHelp;
