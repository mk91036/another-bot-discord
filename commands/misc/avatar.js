const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js')

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name:"avatar",
            aliases: ["pictuser"],
            group: 'misc',
            memberName: 'avatar',
            description: 'Kirim avatar user',
            args: [
                {
                    type:"user",
                    prompt:"Apa ingin menampilkan avatar ?",
                    key:"user",
                    default: msg => msg.author
                }
            ]
        })
    }
    run(msg, { user }) {
        if (!msg.member.hasPermission('MANAGE_GUILD')) return msg.channel.send('B-baka, kamu tidak bisa gunakan command ini!');
        let embed = new RichEmbed()
        .setTitle(`${user.tag}s profile picture!`)
        .setURL(user.displayAvatarURL)
        .setImage(user.displayAvatarURL)
        .setColor("RANDOM")
        msg.embed(embed)
    
    }
}