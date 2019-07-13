const { Command } = require('discord.js-commando');

module.exports = class AddRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'addrole',
            group: 'moderation',
            aliases: ['newrole', 'ar', 'addr', 'assign'],
            memberName: 'addrole',
            description: 'Adds a role to a member!',
            examples: ['~addrole [name] [role]'],
            guildOnly: true,
            args: [{
                    key: 'member',
                    prompt: 'Pilih nama member yang ingin di tambah role!',
                    type: 'member'
                },
                {
                    key: 'role',
                    prompt: 'Pilih role yang ingin di tambah pada member!',
                    type: 'role'
                }
            ]
        });
    }

    hasPermission(message) {
        return message.member.hasPermission('MANAGE_ROLES');
    }

    async run(message, args) {
        const { member, role } = args;
        if (member.roles.has(role.id)) return message.channel.send(`❎ | **${member.displayName}** already has the role **${role.name}**!`)

        try {
            await member.addRole(role)
            return message.channel.send(`✅ | **${member.displayName}** has been given the role **${role.name}**!`)
        } catch (err) {
            return message.channel.send(`❎ | **${member.displayName}** already has the role **${role.name}**!`)
        }
    };
};