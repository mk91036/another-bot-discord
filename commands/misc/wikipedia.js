const Discord = require("discord.js");
const commando = require('discord.js-commando');
const moment = require('moment');
const superagent = require('superagent');

module.exports = class wikipediaCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'wikipedia',
            group: 'misc',
            aliases: ['wen', 'wiki', 'ws'],
            memberName: 'wikipedia',
            description: 'Get info from a wikipedia page',
            examples: ['wikipedia {thing}', 'wikipedia Discord'],
            guildOnly: false,

            args: [{
                key: 'input',
                prompt: 'What page do you want to get info from?',
                type: 'string'
            }]
        });
    }

    async run(msg, args) {
        superagent.get(
                `https://en.wikipedia.org/w/api.php?action=query&list=search&srwhat=text&srprop=sectionsnippet&format=json&srsearch=${args.input}`
            )
            .then((res) => res.body.query.search)
            .then((results) => {
                if (!results[0]) return Promise.reject('NO RESULTS');
                return results[0];
            })
            .then((result) => superagent.get(
                `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${encodeURIComponent(result.title)}`
            ))
            .then((res) => res.body.query.pages[Object.keys(res.body.query.pages)])
            .then((page) => {
                const url = `https://wikipedia.org/wiki/${encodeURIComponent(page.title)}`;
                const wikiData = {
                    url: url,
                    pageTitle: page.title,
                    pageExtract: `${page.extract.substring(0, 500)}... [Read more](${url.replace(/\(/, '%28').replace(/\)/, '%29')})`
                }
                return wikiData
            })
            .then((wikiData) => {
                const wikiEmbed = new Discord.RichEmbed();
                wikiEmbed
                    .setAuthor(`Wikipedia - ${wikiData.pageTitle}`, "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Image-Wikipedia-logo_mizusumashi.png/600px-Image-Wikipedia-logo_mizusumashi.png"/*"https://favna.s-ul.eu/dYdFA880"*/)
                    .setColor("#A9A9A9")
                    .setFooter(`Wikipedia result pulled on ${moment().format('MMMM Do YYYY HH:mm:ss')}`)
                    .setURL(wikiData.url)
                    .setDescription(wikiData.pageExtract);
                msg.embed(wikiEmbed, wikiData.url);
            })
            .catch((err) => {
                console.error(err);
                msg.reply('**No results found!**');
            });
    }
};