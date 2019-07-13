const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');

class UserInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'user',
            aliases: ['me', 'myinfo', 'userinfo'],
            group: 'misc',
            memberName: 'user',
            description: `Informasi Discord Akun`,
            guildOnly: true
        });
    }
    run(message) {
        let user;
        if (!message.mentions.members.first()) {
            user = message.author;
        } else {
            user = message.mentions.members.first();
        }
        let member = message.guild.member(user);
        let nickname = (member.nickname !== null) ? member.nickname : 'None';
        let status = member.presence.status;
        let roles = member.roles.map(roles => `<@&${roles.id}>`).slice(1).join(', ');
        let game = member.presence.game ? member.presence.game.name : 'None';
        //let createDate = moment.utc(member.createdAt).format('dddd, MMMM Do YYYY, HH:mm');
        let joinDate = moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm');
        let userEmbed = new Discord.RichEmbed()
            .setDescription(`${member} (${nickname})`)
            .setColor("RANDOM")
            .setThumbnail(member.displayAvatarURL)
            .addField('Status', status, true)
            .addField('Aktivitas', game, true)
            .addField("Bergabung", joinDate, true)
            //addField('Account Created At', createDate, true)
            .addField('Roles:', roles, true);

        if (!message.guild.me.hasPermission('SEND_MESSAGES')) {
            return message.author.send("Senpai! tidak mempunyai hak akses SEND MESSAGES");
        } else {
            message.say(userEmbed);
        }
    }
}

module.exports = UserInfoCommand;