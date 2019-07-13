const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { shokkuP } = require('../../assets/json/actions.json');

module.exports = class LickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shokku',
            aliases: ['kaget', 'shock'],
            group: 'action',
            memberName: 'shokku',
            guildOnly: true,
            description: 'shock the user you mentioned!',
            examples: ['~shokku <user>'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(message) {
        const embed = new RichEmbed()
            .setDescription(message.author + ' is shock ')
            .setColor('#FBCFCF')
            .setImage(shokkuP[Math.round(Math.random() * (shokkuP.length - 1))]);
        return message.channel.send({ embed: embed });
    }
}