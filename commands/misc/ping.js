const Commando = require('discord.js-commando');

class PingCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            aliases: [],
            group: 'misc',
            memberName: 'ping',
            description: `Kirim Ping.`,
            guildOnly: true
        });
    }
    run(message) {
        if (!message.guild.me.hasPermission('SEND_MESSAGES')) {
            return message.author.send("Senpai! tidak punya hak akses SEND MESSAGES");
        } else {
            message.say(`Ping ${this.client.ping}ms!`);
        }
    }
}

module.exports = PingCommand;