const { PREFIX, __DEV__ } = require("./env");

const splitMessage = message => message.trim().split(/ +/g);

const isCommand = split => {
    if (split && split.length) {
        return split[0] === PREFIX;
    }

    return false;
};

const critical = (
    condition,
    message
) => {
    if (!condition) {
        const error = new Error(message);
        error.name = "Critical Error";

        throw error;
    }
};

module.exports = {
    splitMessage,
    isCommand,
    critical
};
