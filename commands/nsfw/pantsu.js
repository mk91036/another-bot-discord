const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

module.exports = class PantsuCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pantsu',
            group: 'nsfw',
            memberName: 'pantsu',
            guildOnly: true,
            description: 'Finds pantsu for you!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~pantsu'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(message) {
        var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.channel.send(errMessage);
        }

        randomPuppy('pantsu')
            .then(url => {
                const embed = new RichEmbed()
                    .setFooter(`pantsu`)
                    .setDescription(`[Image URL](${url})`)
                    .setImage(url)
                    .setColor('#A187E0');
                return message.channel.send({ embed });
            })
    }
}