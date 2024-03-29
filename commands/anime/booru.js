const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const booru = require('booru');


module.exports = class BooruCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'booru',
            aliases: ['safebooru', 'sb', 'safe', 'animepic', 'sfwbooru'],
            group: 'anime',
            memberName: 'safebooru',
            guildOnly: true,
            description: 'Searches for images on Safebooru!',
            details: 'Keep in mind Safebooru\'s definition of safe!',
            examples: ['~safebooru [search]'],
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(message) {
        if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('That kind of stuff is not allowed! Not even in NSFW channels!');

        var query = message.content.split(/\s+/g).slice(1).join(" ");

        booru.search('safebooru', [query], { limit: 1, random: true })
            .then(booru.commonfy)
            .then(images => {
                for (let image of images) {
                    const embed = new RichEmbed()
                        .setAuthor(`Safebooru ${query}`, 'https://b.catgirlsare.sexy/NrAI.png')
                        .setImage(image.common.file_url)
                        .setDescription(`[Image URL](${image.common.file_url})`)
                        .setColor('#C597B8');
                    return message.channel.send({ embed });
                }

            }).catch(err => {
                if (err.name === 'booruError') {
                    return message.channel.send(`No results found for **${query}**!`);
                } else {
                    return message.channel.send(`No results found for **${query}**!`);
                }
            })
    }
}