const Commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

class PollCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'poll',
            aliases: [],
            group: 'owner',
            memberName: 'poll',
            description: `start a poll for you.`,
            guildOnly: true,
            clientPermissions: ['MANAGE_MESSAGES']
        });
    }
    async run(message) {
        const args = message.content.trim().split(/ +/g).slice(1);
        
        let pollEmbed = new RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle('Yes or no?')
            .setColor('RANDOM')
            .setDescription(args.join(' '))
            .setFooter(`Poll started by ${message.author.tag}`)
            .setTimestamp();

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
            return message.say(`"${this.client.commandPrefix}poll <question>" please!`);
        } else {
            let msg = await message.say(pollEmbed);
            await msg.react('✅');
            await msg.react('⛔');
            message.delete({
                timeout: 1000
            });
        }

    }
}

module.exports = PollCommand;