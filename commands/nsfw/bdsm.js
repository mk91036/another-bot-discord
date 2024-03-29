const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../assets/json/errors');

module.exports = class BDSMCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bdsm',
            group: 'nsfw',
            memberName: 'bdsm',
            guildOnly: true,
            description: 'Finds....BDSM????? For you...!',
            details: 'This command can only be used in NSFW channels!',
            examples: ['~bdsm'],
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

        var subreddits = [
            'bdsm',
            'bondage'
        ]

        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(sub)
            .then(url => {
                const embed = new RichEmbed()
                    .setFooter(`BDSM`)
                    .setDescription(`[Image URL](${url})`)   
                    .setImage(url)
                    .setColor('#A187E0');
                return message.channel.send({ embed });
            })
    }
}