const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

module.exports = class FutaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'futa',
            aliases: ['futarani'],
            group: 'nsfw',
            memberName: 'futa',
            guildOnly: true,
            description: 'Finds... futas...? For...you?',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~futa'],
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

        randomPuppy('futanari')
        .then(url => {
            const embed = new RichEmbed()
                .setFooter(`futanari`)
                .setDescription(`[Image URL](${url})`)   
                .setImage(url)
                .setColor('#A187E0');
            return message.channel.send({ embed });
        })

        return null;
    }
}