const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'embed',
            aliases: [],
            group: 'owner',
            memberName: 'embed',
            description: 'Embeds the text you provide.',
            examples: ['embed Embeds are cool.'],
            guildOnly: true,
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to embed?',
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
        const embed = new RichEmbed()
            .setDescription(text)
            //.setAuthor(msg.author.username, msg.author.displayAvatarURL)
            .setColor('RANDOM')
            .setTimestamp()
        return msg.embed(embed);
    }
};