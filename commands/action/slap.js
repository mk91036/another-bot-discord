const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { slapP } = require('../../assets/json/actions.json');

module.exports = class SlapCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'slap',
            aliases: ['punch', 'hit', 'punish'],
            group: 'action',
            memberName: 'slap',
            guildOnly: true,
            description: 'Slaps the user you mentioned!',
            examples: ['~slap <user>'],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [
              {
                key: 'member',
                label: 'user',
                prompt: 'Who to slap?',
                type: 'member',
                          default: ''
              }
            ]
        });
    }

    run(message, args) {
      let embed = new RichEmbed()
         if(message.author.id == args.member.id || !args.member){
         	embed.setDescription(message.author + ' is slapping themselves ?! ')
         }else{
         	embed.setDescription(message.author + ' slapped ' + args.member.user)
         }
            embed.setColor('#FBCFCF')
            embed.setImage(slapP[Math.round(Math.random() * (slapP.length - 1))]);
        message.channel.send({ embed });
    }
}