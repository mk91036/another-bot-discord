const Commando = require('discord.js-commando');

class PurgeCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            aliases: ['clear', 'delete'],
            group: 'owner',
            memberName: 'purge',
            description: `Clear a given amount of messages.`,
            guildOnly: true,
            clientPermissions: ['MANAGE_MESSAGES']
        });
    }
    run(message) {
        const args = message.content.trim().split(/ +/g).slice(1);

        if (!message.guild.me.hasPermission('SEND_MESSAGES')) {
            return message.author.send("Senpai tidak punya izin! B-baka~");
        } else if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
            return message.say('Ano.. ? Senpai harus punya izin untuk bisa menggunakan perintah ini!').then(msg => {
                    msg.delete(5000)
                })
                .catch();
        } else if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.say("S-senpai, ano.. anda harus punya izin Team Leader 「Another」").then(msg => {
                    msg.delete(5000)
                })
                .catch();
        } else if (!args[0]) {
            message.say('Senpai tidak bisa hapus 0 pesan.');
        } else if (isNaN(args[0])) {
            message.say('Use number 1-99 Senpai, Baka~')
        } else if (args[0] >= 100) {
            message.say('Da-ka-ra 1-99 Nomer, Aho  (ノ ﾟДﾟ)ノ　＝＝＝＝　┻━━┻')
        } else {
            message.channel.bulkDelete(args[0])
            message.say(`Cleared ${args[0]} messages.`).then(msg => msg.delete(2000));
        }
    }
}

module.exports = PurgeCommand;