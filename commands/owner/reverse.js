const { Command } = require("discord.js-commando");
const { stripIndents } = require("common-tags");

module.exports = class ReverseCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reverse",
            aliases: ["eserever"],
            group: "owner",
            memberName: "reverse",
            description: "txet ruoy sesreveR.",
            args: [{
                key: "text",
                prompt: "What would you like to reverse?\n",
                type: "string",
            }]
        });
    }
    
    hasPermission(msg) {
      if (!this.client.isOwner(msg.author)) return 'Only the bot owner(s) may use this command.';
      return true;
    }
    run(msg, { text }) {
        msg.delete();
        return msg.say(stripIndents`${text.split("").reverse().join("")}`);
    }
};