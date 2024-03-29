const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const snekfetch = require('snekfetch');

module.exports = class NekoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'neko',
            aliases: ['catgirl', 'nekomimi', 'nekos'],
            group: 'nsfw',
            memberName: 'neko',
            guildOnly: true,
            description: 'Nekos!',
            details: 'This command is NSFW in NSFW channels and not NSFW in normal channels!',
            examples: ['~neko'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    async run(message) {
        if (!message.channel.nsfw) {
            const res = await snekfetch.get(`http://nekos.life/api/neko`);
            const preview = res.body.neko;

            const embed = new RichEmbed()
                .setImage(preview)
                .setColor('#A187E0')
                .setFooter('http://nekos.life');
            return message.channel.send({ embed });

        } else {
            const res = await snekfetch.get(`http://nekos.life/api/lewd/neko`);
            const preview = res.body.neko;

            const embed = new RichEmbed()
                .setImage(preview)
                .setColor('#A187E0')
                .setFooter('http://nekos.life');
            return message.channel.send({ embed });
        }
    }
}