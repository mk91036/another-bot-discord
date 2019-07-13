const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { hugP } = require('../../assets/json/actions.json');

module.exports = class HugCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'hug',
            aliases: ['cuddle'],
            group: 'action',
            memberName: 'hug',
            guildOnly: true,
            description: 'Hugs the user you mentioned!',
            examples: ['~hug <user>'],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [
              {
                key: 'member',
                label: 'user',
                prompt: 'Who to hug?',
                type: 'member',
                          default: ''
              }
            ]
        });
    }

    run(message, args) {
        let embed = new RichEmbed()
          if(message.author.id == args.member.id || !args.member){
         	embed.setDescription(message.author + ' is hugging themselves ?! ')
         }else{
         	embed.setDescription(message.author + ' hugged ' + args.member.user)
         }
            embed.setColor('#FBCFCF')
            embed.setImage(hugP[Math.round(Math.random() * (hugP.length - 1))]);
        message.channel.send({ embed });
    }
}