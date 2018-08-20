const { __DEV__ } = require("../env");

/**
 * An interface for commands that are initiated by messages.
 * Provides an interface for `accept`ing a command.
 */
class Command {
    constructor(initiator, plugin) {
        // Trimmed string that initiates this command.
        // Example:
        // +app help with math
        // `help` would be the initiator.
        this.initiator = initiator;
        this.plugin = plugin;
    }

    shouldAccept(command) {
        // Accepts the command if initiator matches the first
        // string in the command array.
        // Return `true` if the command should be accepted.
        // If not the command lookup will simply look for the next
        // command.
        if (this.initiator && command.length) {
            return command[0] === this.initiator;
        }

        return false;
    }

    execute(command, message) {
        if (typeof this.plugin === "function") {
            try {
                this.plugin(command, message);
            } catch (e) {
                const error = new Error(`Failed to execute command: ${e}`);
                error.name = "Command Error";

                if (__DEV__) {
                    throw error;
                }

                console.error(error);
            }
        }
    }
}

module.exports = Command;
