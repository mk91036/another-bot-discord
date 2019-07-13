/*const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js')

module.exports = class CmdCommand extends Command {
    constructor(client) {
        super(client, {
            name:"cmd",
            aliases: ["h"],
            group: 'misc',
            memberName: 'h',
            description: 'Help commands',
        })
    }
    run(message) {
      let pages = ['**Action Commands**\n~cry, ~disgust, ~hug, ~kiss, ~lewd, ~slap\n\n**Anime Commands**\n~anime → Untuk Search Anime\n~manga → Untuk Search Manga\n\n**PSO2 Commands**\n~builds → Lihat Builds Skill Tree\n~item → Search Item PSO2\n~pso2 → General Information\n~status → Cek Status PSO2',
                   '**NSFW Commands**\n~ahegao, ~cosplay, ~hentai, ~hentaigif, ~hentaiirl, ~konachan or ~kc\n~neko, ~oppai, ~paizuri, ~pantsu, ~yandere\n\n**Other Commands**\n~h or ~cmd → Help Commands']; 
  let page = 1; 
 
  const embed = new RichEmbed() 
    .setColor("RANDOM")
    .setFooter(`Page ${page} of ${pages.length}`) 
    .setDescription(pages[page-1])
 
  message.channel.send(embed).then(msg => { 
   
    msg.react('⏪').then( r => {
      msg.react('⏩')
     
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id; 
     
      const backwards = msg.createReactionCollector(backwardsFilter, { time: 30000 });
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 30000 }); 
     
      
      backwards.on('collect', r => { 
        if (page === 1) return; 
        page--; 
        embed.setDescription(pages[page-1]); 
        embed.setFooter(`Page ${page} of ${pages.length}`); 
        msg.edit(embed) 
      })
      
      forwards.on('collect', r => { 
        if (page === pages.length) return; 
        page++; 
        embed.setDescription(pages[page-1]); 
        embed.setFooter(`Page ${page} of ${pages.length}`); 
        msg.edit(embed) 
      })
   
    })
 
  })
    }
}*/
const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class CommandsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'commands',
            aliases: ['command', 'cmds', 'cmd', 'h', 'help'],
            group: 'misc',
            memberName: 'commands',
            description: 'Sends a list of all commands!',
            details: 'Use the reactions to scroll through the panels!',
            examples: ['~commands'],
            throttling: {
                usages: 1,
                duration: 10
            }
        });
    };

    async run(message) {
        const mainCommands = new RichEmbed()
            .setAuthor("Main Commands")
            .setColor('727293')
            //.setFooter(`(${this.client.registry.commands.size}) | Page 1 of 3`)
            .setFooter("Powered By Team「Another」| Page 1 of 3")
            .addField("__Anime:__", "`anime` `manga` `moe` `booru` `anime-mal`")
            .addField("__Action:__", "`cry` `hug` `kiss` `lewd` `slap` `shokku` `pero` `wasted` `baka`")
            //.addField("__PSO2:__", "`pso2` `item` `status` `builds`", true)
            .addField("__PSO2:__", "`pso2` `status` `builds` `candy`")
            //.addField("__Add Role:__", "`nsfw-add` `nsfw-del` `pso2-add` `pso2-del`", true);
            .addField("__Other:__", "`help` `ping` `user` `stats` `wikipedia`");

        const secretCommands = new RichEmbed()
            .setAuthor("Moderator Commands")
            .setColor('727293')
            .setFooter("Powered By Team「Another」| Page 2 of 3")
            //.setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
            .addField('__Moderator:__', '`addrole` `delrole` `ban` `unban` `bulkkick` `bulkban` `kick` `lockdown` `prefix` `disable` `enable` `voicekick` `prune`', true);

        const nsfwCommands = new RichEmbed()
            .setAuthor("NSFW Commands")
            .setColor('727293')
            .setFooter("Powered By Team「Another」| Page 3 of 3")
            //.addField("__2D NSFW:__", "`ecchi` `hentai` `hentaigif`\n\`hentaiirl` `neko` `pantsu`\n\`oppai` `yaoi` `yuri` `zr   `", true)
            .addField("__2D NSFW:__", "`hentai` `hentaigif`\n\`hentaiirl` `neko` `pantsu`\n\`oppai`", true)
            .addField("__2D Fetish:__", "`ahegao` `bondage`\n\`futa` `monstergirl` `paizuri`\n\`sukebei` `tentacle`", true)
            .addField("__3D NSFW:__", "`4knsfw` `artsyporn` `ass` `boobs`\n\`nsfw` `nsfwgif` `pussy`", true)
            .addField("__3D Fetish:__", "`asian` `amateur` `bdsm`\n\`cosplay` `grool` `lingerie`", true)
            .addField("__NSFW Image Boards:__", "`danbooru` `gelbooru` `hypno` `konachan` `tbib` `yandere` `xbooru`");

        return new Promise(async(resolve, reject) => {

            const interactiveMessage = await message.channel.send({ embed: mainCommands });
            const collector = await interactiveMessage.createReactionCollector((reaction, user) => user.id === message.author.id);

            //Add the reactions
            let reactions = ['◀', '▶', '🔞', '❌'];
            for (let i = 0; i < reactions.length; i++) await interactiveMessage.react(reactions[i]);

            //Launch timeout countdown
            let timeout = setTimeout(function() {
                return collector.stop('timeout');
            }, 120000);

            //----------------------------------On collector collect------------------------------
            collector.on('collect', async(r) => {
                clearTimeout(timeout); //Reset timeout

                if (r.emoji.name === "◀") { //main commands page

                    await interactiveMessage.edit({ embed: mainCommands });

                } else if (r.emoji.name === "▶") { //more commands page

                    await interactiveMessage.edit({ embed: secretCommands });

                } else if (r.emoji.name === '🔞') { //nsfw commands wow

                    await interactiveMessage.edit({ embed: nsfwCommands });

                } else if (r.emoji.name === "❌") {

                    setTimeout(async function() {
                        await interactiveMessage.edit('Pesan akan di hapus dalam waktu 5 detik!')

                        setTimeout(async function() {
                            await interactiveMessage.edit('Pesan akan di hapus dalam waktu 4 detik!')

                            setTimeout(async function() {
                                await interactiveMessage.edit('Pesan akan di hapus dalam waktu 3 detik!')

                                setTimeout(async function() {
                                    await interactiveMessage.edit('Pesan akan di hapus dalam waktu 2 detik!')

                                    setTimeout(async function() {
                                        await interactiveMessage.edit('Pesan akan di hapus dalam waktu 1 detik!')

                                        setTimeout(async function() {
                                            await interactiveMessage.delete()
                                        }, 1000);

                                    }, 1000);

                                }, 1000);

                            }, 1000);

                        }, 1000);

                    }, 1000);

                    return null;
                }

                await r.remove(message.author.id); //Delete user reaction
                timeout = setTimeout(function() {
                    collector.stop('timeout');
                }, 120000);
            });
            //--------------------------On collector end-----------------------------------------------
            collector.on('end', async(collected, reason) => {
                interactiveMessage.clearReactions()
                return resolve(interactiveMessage.edit('Pesan ini tidak aktif lagi tolong gunakan command ~help lagi senpai', { embed: mainCommands }));
            });
        });

    }
}