const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { lewdP } = require('../../assets/json/actions.json');

module.exports = class LewdCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lewd',
            aliases: ['thatslewd'],
            group: 'action',
            memberName: 'lewd',
            guildOnly: true,
            description: 'That\'s lewd!',
            examples: ['~lewd'],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [
                {
                    key: 'member',
                    label: 'user',
                    prompt: 'Who is being lewd?',
                    type: 'member',
                    default: ''
                }
            ]
        });
    }

    run(message, args) {
      const embed = new RichEmbed()
         if(message.author.id == args.member.id || !args.member){
         	embed.setDescription(message.author + ' thinks this is Lewd! ')
         }else{
         	embed.setDescription(message.author + ' thinks ' + args.member.user + ' is too lewd. ')
         }
            embed.setColor('#FBCFCF')
            embed.setImage(lewdP[Math.round(Math.random() * (lewdP.length - 1))]);
        return message.channel.send({ embed: embed });
    }
}