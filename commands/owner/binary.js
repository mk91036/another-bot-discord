const { Command } = require("discord.js-commando");

module.exports = class BinaryCommand extends Command {
    constructor(client) {
        super(client, {
            name: "binary",
            aliases: ["binary-code"],
            group: "owner",
            memberName: "binary",
            description: "Converts text to binary code.",
            args: [
                {
                    key: "text",
                    prompt: "What text would you like to convert to binary code?\n",
                    type: "string",
                    validate: text => {
                        if (this.binary(text).length < 2000) return true;
                        return "Your text is too long.\n";
                    }
                }
            ]
        });
    }
    
    hasPermission(msg) {
      if (!this.client.isOwner(msg.author)) return 'Only the bot owner(s) may use this command.';
      return true;
    }
    run(msg, { text }) {
        msg.delete();
        return msg.say(this.binary(text));
    }

    binary(text) {
        return text.split("").map(str => {
            const converted = str.charCodeAt(0).toString(2);
            return `${"00000000".slice(converted.length)}${converted}`;
        }).join("");
    }
};