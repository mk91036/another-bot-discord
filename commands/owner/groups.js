const { stripIndents } = require("common-tags");
const { Command } = require("discord.js-commando");

module.exports = class ListGroupsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "groups",
            aliases: ["list-groups", "show-groups"],
            group: "owner",
            memberName: "groups",
            description: "Lists all command groups.",
            details: "Only administrators may use this command.",
            guarded: true
        });
    }

    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return msg.member.hasPermission("MANAGE_SERVER") || this.client.isOwner(msg.author);
    }

    run(msg) {
        return msg.say(stripIndents`
          \`Groups\`
          ${this.client.registry.groups.map(grp =>
            `**${grp.name}:** ${grp.isEnabledIn(msg.guild) ? "Enabled" : "Disabled"}`
          ).join("\n")}.
		    `);
    }
};