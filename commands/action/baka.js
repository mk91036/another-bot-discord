const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const neko = require("nekos.life");
const superagent = require("superagent");
const send = require("quick.hook");

module.exports = class BakaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'baka',
            aliases: [],
            group: 'action',
            memberName: 'baka',
            description: 'Mentions a User who is a Baka',
            examples: ['~baka'],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [
				      {
					        key: 'member',
					        prompt: 'Who is a Baka?',
					        type: 'member',
                  default: ''
				      },
              {
                  key: 'stuff',
                  prompt: 'What would u like to say?',
                  type: 'string',
                  default: '',
                  validate: stuff => {
                      if (stuff.length < 201) return true;
                      return 'Message Content is above 200 characters';
                  }
              }
            ]
        });
    }
async run(msg, args, neko) {
        superagent.get('https://nekos.life/api/v2/img/baka')
        .then(body => {
            body = body.body
        const baka = new RichEmbed()
            if(msg.author.id == args.member.id){
                baka.setAuthor(`${msg.author.username} Senpai, thinks they are a baka!`)
            }else if(!args.member){
                baka.setAuthor(`Senpai tachi no baka!`)
            } else {
                baka.setAuthor(`${msg.author.username} Senpai thinks ${args.member.user.username} is a baka!`)
            }
                    
            baka.setDescription(args.stuff)
            baka.setImage(body.url)
            baka.setColor('#FBCFCF')
            baka.setFooter(`Powered by Nekos.Life`)
        msg.channel.send(baka)
        })
        .catch(err => {
            msg.channel.send("Gif-API sedang down, coba beberapa saat lagi \n")
        })
    }	
};