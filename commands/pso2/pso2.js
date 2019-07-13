const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js')

module.exports = class Pso2Command extends Command {
    constructor(client) {
        super(client, {
            name: 'pso2',
            aliases: ['p2'],
            group: 'pso2',
            memberName: 'pso2',
            guildOnly: true,
            description: 'General Information about PSO2',
            examples: ['~pso2'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(message) {
        const embed = new RichEmbed()
            .setColor('RANDOM')
            .setAuthor('Informasi Tentang Phantasy Star Online 2')
            .setFooter('Developer By Team「Another」')
            .addField('NEWS', '[Bumped](http://bumped.org/psublog)', true)
            .addField('REDDIT', '[Reddit](http://reddit.com/r/pso2)', true)
            .addField('GUIDES', '[Guides](http://fulldive.nu/)')
            .addField('PSO-WORLD', '[PSO-World](http://pso-world.com)', true)
            .addField('PSO2-WIKI', '[Wiki](http://pso2.swiki.jp)', true)
        return message.channel.send({embed});
    }
}