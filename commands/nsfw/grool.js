const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

module.exports = class GroolCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'grool',
            group: 'nsfw',
            memberName: 'grool',
            guildOnly: true,
            description: 'Finds..grool?? For you...??',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~grool'],
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

        randomPuppy('grool')
            .then(url => {
                const embed = new RichEmbed()
                    .setFooter(`grool`)
                    .setDescription(`[Image URL](${url})`)   
                    .setImage(url)
                    .setColor('#A187E0');
                return message.channel.send({ embed });
            })
    }
}