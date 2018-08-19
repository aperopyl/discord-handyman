const { PREFIX } = require("./env");

const splitMessage = message => message.trim().split(/ +/g);

const isCommand = split => {
    if (split && split.length) {
        return split[0] === PREFIX;
    }

    return false;
};

module.exports = {
    splitMessage,
    isCommand
};
