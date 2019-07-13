const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class statsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
        aliases: ["info", "specs","invite", "information", "about"],
            group: 'misc',
            memberName: 'stats',
        description: 'Shows stats about the Bot'
        });
    }
    async run(msg) {
        const os = require('os');
        const arch = os.arch()
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
    
        let totalSeconds = process.uptime();
        let realTotalSecs = Math.floor(totalSeconds % 60);
        let days = Math.floor((totalSeconds % 31536000) / 86400);
        let hours = Math.floor((totalSeconds / 3600) % 24);
        let mins = Math.floor((totalSeconds / 60) % 60);

        const embed = new RichEmbed()
            .setThumbnail(this.client.user.avatarURL)
            .setDescription(`Status BOT${this.client.user.username}`)
            .setColor('RANDOM')
            .addField(`Memory terpakai:`,`${Math.round(used * 100) / 100}MB` ,true)
            .addField(`Uptime:`,`${days}:${hours}:${mins}:${realTotalSecs}` ,true)
            .addField('Node dan Library',` Node: ${process.version} discord.js` ,true)
            .addField(`Platform`,`${os.platform}`, true)
            .addField('Servers, Users',`Berjalan pada ${this.client.guilds.size} servers, dengan total ${this.client.users.size} users.`)
            //.addField("My Discord Invite Link", "[Discord Invite Link](https://discordapp.com/api/oauth2/authorize?client_id=385115460397694977&permissions=8&scope=bot)")
            .addField("Server「Another」", "[Server Invite](https://discord.gg/eJeFXcD)")
            .setFooter("Developer By Team「Another」")
                code: 'AsciiDoc'
        return msg.embed(embed);
    }

};