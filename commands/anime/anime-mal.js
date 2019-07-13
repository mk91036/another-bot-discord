const Discord = require("discord.js");
const commando = require('discord.js-commando');
const moment = require('moment');
const malware = require('malapi').Anime;

module.exports = class animeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'anime-mal',
            group: 'anime',
            memberName: 'anime-mal',
            description: 'Find anime on MyAnimeList',
            examples: ['anime {animeName}', 'anime Yu-Gi-Oh'],
            guildOnly: false,

            args: [{
                key: 'query',
                prompt: 'What anime do you want to find?',
                type: 'string'
            }]
        });
    }

    async run(msg, args) {

        let animeEmbed = new Discord.RichEmbed();

        malware.fromName(args.query).then(anime => {
                let japName = anime.alternativeTitles.japanese;
                let engName = anime.alternativeTitles.english;
                let score = anime.statistics.score.value;
                let type = anime.type;
                let airedDate = anime.aired;
                let genres = anime.genres;
                let studios = anime.studios;
                let premiered = anime.premiered
                var episodeCount = anime.episodes;
                let status = anime.status;
                let synopsis = anime.synopsis;
                let image = anime.image;
                let animeUrl = `https://myanimelist.net/anime/${anime.id}`;

                animeEmbed
                    .setAuthor(args.query, "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png")
                    .setColor('#1E90FF')
                    .setImage(image)
                    .setURL(animeUrl);

                if (japName != null) {
                    animeEmbed.addField("Japanese name", japName, true);
                } else {
                    animeEmbed.addField("Japanese name", "None", true);
                };

                if (engName != null) {
                    animeEmbed.addField("English name", engName, true);
                } else {
                    animeEmbed
                        .addField("English name", "None", true)
                        .addBlankField(true);
                };


                if (synopsis.length >= 1024) {
                    animeEmbed.addField("Synposis", `The synopsis for this anime exceeds the maximum length, check the full synopsis on myanimelist.\nSynopsis Snippet:\n${synopsis.slice(0,500)}`, false);
                } else {
                    animeEmbed.addField("Synposis", synopsis, false);
                };

                score !== "" ? animeEmbed.addField("Score", score, true) : animeEmbed.addField("Score", 'Score unknown', true)
                animeEmbed
                    .addField("Type", type, true)
                    .addField("Episodes", episodeCount, true)
                    .addField("Genres", genres, true)
                    .addField("Studios", studios, true)
                    .addField("Status", status, true)
                    .addField("Aired", airedDate, true)
                    .addField("URL", animeUrl);

                return msg.embed(animeEmbed);
            })
            .catch((err) => {
                console.error(err);
                return msg.say(`**No results found!**`)
            });

    };
};