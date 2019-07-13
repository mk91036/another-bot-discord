const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js')
const { cryP } = require('../../assets/json/actions.json');

module.exports = class CryCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cry',
            aliases: ['sob', 'waa'],
            group: 'action',
            memberName: 'cry',
            guildOnly: true,
            description: 'UWAA~',
            examples: ['~cry'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run(message) {
        let embed = new RichEmbed()
            .setDescription(message.author + ' is crying ')
            .setColor('#FBCFCF')
            .setImage(cryP[Math.round(Math.random() * (cryP.length - 1))]);
        message.channel.send({ embed });
    }
}