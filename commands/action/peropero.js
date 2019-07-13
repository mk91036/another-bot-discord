const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { peroP } = require('../../assets/json/actions.json');

module.exports = class LickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pero',
            aliases: ['peropero', 'pp'],
            group: 'action',
            memberName: 'pero',
            guildOnly: true,
            description: 'Licks the user you mentioned!',
            examples: ['~pero <user>'],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [
                {
                    key: 'member',
                    label: 'user',
                    prompt: 'Who to pero/lick?',
                    type: 'member',
                    default: ''
                }
            ]
        });
    }

    run(message, args) {
      const embed = new RichEmbed()
         if(message.author.id == args.member.id || !args.member){
         	embed.setDescription(message.author + ' pero pero.. themselves.. do you taste that good? ')
         }else{
         	embed.setDescription(message.author + ' pero pero ' + args.member.user)
         }
            embed.setColor('#FBCFCF')
            embed.setImage(peroP[Math.round(Math.random() * (peroP.length - 1))]);
        return message.channel.send({ embed: embed });
    }
}