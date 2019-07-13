const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'text',
            aliases: ['t'],
            group: 'owner',
            memberName: 'text',
            description: 'text the text you provide.',
            examples: ['text The text are cool.'],
            guildOnly: true,
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to text?',
                    type: 'string'
                }
            ]
        });    
    }
    hasPermission(msg) {
      if (!this.client.isOwner(msg.author)) return 'Only the bot owner(s) may use this command.';
      return true;
    }

    run(msg, args) {
        const { text } = args;
        msg.delete();
        return msg.channel.send(text);
    }
};