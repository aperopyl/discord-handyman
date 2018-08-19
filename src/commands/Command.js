/**
 * An interface for commands that are initiated by messages.
 * Provides an interface for `accept`ing a command.
 */
class Command {
    constructor() {
        // Trimmed string that initiates this command.
        // Example:
        // +app help with math
        // `help` would be the initiator.
        this.initiator = null;
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

    execute() {
        console.log("Executing command...");
    }
}

module.exports = Command;
