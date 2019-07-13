const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { kissP } = require('../../assets/json/actions.json');

module.exports = class KissCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kiss',
            aliases: ['smooch'],
            group: 'action',
            memberName: 'kiss',
            guildOnly: true,
            description: 'Kisses the user you mentioned!',
            examples: ['~kiss <user>'],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [
              {
                key: 'member',
                label: 'user',
                prompt: 'Who to kiss?',
                type: 'member',
                          default: ''
              }
            ]
        });
    }

    run(message, args) {
      const embed = new RichEmbed()
         if(message.author.id == args.member.id || !args.member){
         	embed.setDescription(message.author + ' is kissing themselves ?! ')
         }else{
         	embed.setDescription(message.author + ' kissed ' + args.member.user)
         }
            embed.setColor('#FBCFCF')
            embed.setImage(kissP[Math.round(Math.random() * (kissP.length - 1))]);
        return message.channel.send({embed});
    }
}