const { Command } = require('discord.js-commando');


module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'moderation',
            memberName: 'ban',
            guildOnly: true,
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS'],
            description: 'Bans the given user and DMs them the reason!',
            examples: ['~ban [user] [reason]'],
            throttling: {
                usages: 1,
                duration: 15
            },
            args: [{
                    key: 'member',
                    prompt: 'Pilih nama member yang ingin di tambah role!',
                    type: 'member'
                },
                {
                    key: 'reason',
                    prompt: 'Alasan kenapa banned user tersebut ? alasan ban akan DM ke user tersebut!',
                    type: 'string',
                    default: 'none',
                    validate: reason => {
                        if (reason.length < 140) return true;
                        return 'Reason must be under 140 characters!';
                    }
                }
            ]
        });
    }

    async run(message, args) {
        const { member, reason } = args;

        if (member.id === this.client.user.id) return message.channel.send('Please don\'t ban me...!');
        if (member.id === message.author.id) return message.channel.send('I wouldn\'t dare ban you...!');
        if (member.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) return message.channel.send(`❎ | You can't ban **${member.user.username}**! Their position is higher than you!`);
        if (!member.bannable) return message.channel.send(`❎ | I can't ban **${member.user.username}**! Their role is higher than mine!`);

        await message.channel.send(`Are you sure you want to ban **${member.user.tag}**? \`\`(y/n)\`\``);
        const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
            max: 1,
            time: 30000
        });
        
        if (!msgs.size || !['y', 'yes'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!');
        if (['n', 'no'].includes(msgs.first().content.toLowerCase())) return message.channel.send('Cancelled command!')

        try {
            await member.send(`You were banned from ${message.guild.name} by ${message.author.tag}!\n\**Reason:** ${reason}`);
        } catch (err) {
            await message.channel.send(`❎ | **${message.author.username}**, failed to Send DM to **${member}**! \`${err}\``);
        }

        await member.ban({
            days: 7,
            reason: `${message.author.tag}: ${reason}`
        });

        return await message.channel.send(`✅ | **${message.author.username}**, successfully banned ${member.user.tag}! 👋`);

    }
}