const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js')

module.exports = class BuildsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'builds',
            aliases: ['st', 'build'],
            group: 'pso2',
            memberName: 'builds',
            guildOnly: true,
            description: 'Builds Skill Tree PSO2',
            examples: ['~builds'],
            throttling: {
                usages: 1,
                duration: 5
            }
        });
    }

    run(message) {
        const mainCommands = new RichEmbed()
            .setAuthor("STRIKING")
            .setColor('RANDOM')
            .setFooter('Powered By Team「Another」| Page 1 of 5')
            .addField("HUNTER", "[Hu/Fi Main Class Tank](http://goo.gl/S4S2YK)\n[Hu/Fi Sword Gear](http://goo.gl/9J38Eq)\n[Hunter Sub Class Tank](http://goo.gl/uAP9n9)\n[Hunter Sub Class Pure Damage](http://goo.gl/8Sq0us)", true)
            .addField("FIGHTER", "[Fi/Hu Basic Build](http://goo.gl/SGKnDM)\n[Fi/Hu Twin Dagger](http://goo.gl/RDvpdt)\n[Fi/Bo](http://goo.gl/CLpCqt)\n[Fi/Hu Wired Lance](http://goo.gl/IJWNcw)\n[Fi/Br Katana](http://goo.gl/EftQrQ)", true)    
            .addField("BRAVER", "[Br/Ra Bow](http://j.mp/1Pz1ZIb)\n[Br/Hu Bow](http://goo.gl/vaiabr)\n[Br/Hu Katana Avg + Weak Stance](http://goo.gl/uHQsPe)\n[Br/Hu Katana Average Stance](http://goo.gl/bCehQk)", true)
            .addField("BOUNCER", "[Bo/Hu Full Critical](http://goo.gl/crILCK)\n[Bo/Hu Full S-ATK + Iron Will](http://goo.gl/am1Wdo)\n[Bo/Hu Full S-ATK](http://goo.gl/cukiOO)\n[Bo/Hu Dual Stance](http://goo.gl/EmKP8L)\n[Bo/Hu JB Tech](http://goo.gl/oHYi2q)", true)
            
        const secretCommands = new RichEmbed()
            .setAuthor("RANGE")
            .setColor('RANDOM')
            .setFooter('Powered By Team「Another」| Page 2 of 5')
            .addField("RANGER", "[Ra/Br Bow](http://goo.gl/jAIVOV)\n[Ra/Hu](http://goo.gl/Qd0oFS)", true)
            .addField("GUNNER", "[Gu/Ra](http://goo.gl/YAVbZs)\n[Gu/Hu](http://goo.gl/nIaXZr)")
            
        const nsfwCommands = new RichEmbed()
            .setAuthor("TECHNIQUE")
            .setColor('RANDOM')
            .setFooter('Powered By Team「Another」| Page 3 of 5')
            .addField("FORCE", "[Fo/Te Fire-Light 2xPP](http://goo.gl/flnIMT)\n[Fo/Te Fire-Light-Dark (Rod)](http://goo.gl/PsN80d)\n[Fo/Te Ice-Light-Dark (Rod)](http://goo.gl/6iCwKX)\n[Force Light Only (Rod)](http://goo.gl/IPgbr5)\n[Force Ice-Light (Rod)](http://goo.gl/Wm4hwm)\n[Force Ice-Wind (Rod)](http://goo.gl/zkTi6e)", true)
            .addField("TECHER", "[Te/Ra (Support)](http://goo.gl/c4a0sy)\n[Te/Hu or Br](http://goo.gl/7NFZZ8)", true)
            .addField("SUMMONER", "[Su/Fi Dual Stance + S-ATK Full](http://goo.gl/oViWPT)\n[Su/Br Dual Stance + Br Sub Class](http://goo.gl/SlkTBm)\n[Su/Br Dual Stance + BR Main Class](http://goo.gl/2SSSsE)", true)
        
        const uniqCommands = new RichEmbed()
            .setAuthor("Unique Class")
            .setColor('RANDOM')
            .setFooter('Powered By Team「Another」| Page 4 of 5')
            //.setTimestamp() //Untuk menampilkan waktu
            .addField("HERO", "[Hero Sword - TMG](http://bit.ly/2V3Vvcs)", true)
            .addField("PHANTOM", "[Phantom All Weapon](http://bit.ly/2VoUR9B)\n[Phantom Katana - Rifle](http://bit.ly/2VwHeoE)", true)
        
        const otherCommands = new RichEmbed()
            .setAuthor("Other Build Skill Tree")
            .setColor('RANDOM')
            .setFooter('Powered By Team「Another」| Page 5 of 5')
            //.setTimestamp() //Untuk menampilkan waktu
            .addField("BUILD PHANTASM", "[Hu/Ra/Fi/Gu/Br/Bo | Created By Phantasm](https://arks-layer.com/skillsim/skillcalc.php?17dAbMIobMIobMIobMIobMIobMIobMIobMIobMIobMIo0jdodBdoIbi2dBeKINGAqnIdJksSIsIodBdBIb00000006dBdAI2bndAeBfrKsXJ2fdAqBdFdBIo000000jdoboIbIdinGBcFfqKsXeKdKdAdBIo000000jdoIbid2OGXqFGAsXbsdnqFdBdBIb000000dB006dBdBIb0000008dBIn00jdndBdB00000082OqBxbGKdFjrKrKIsfdBqAdBdB0000002ObokbfqoISrFbsfrKrKIoqndBdBIb000000jdB00dndBdB000006dBIo9b8dAIo00000f)")
            .addField("BUILD MIZUHASHI", "[All Class Build | Created By Mizuhashi](http://bit.ly/2VrkJ4t)")
        
        return new Promise(async(resolve, reject) => {

            const interactiveMessage = await message.channel.send({ embed: mainCommands });
            const collector = await interactiveMessage.createReactionCollector((reaction, user) => user.id === message.author.id);

            //Add the reactions
            let reactions = ['⚔', '🔫', '🔥', '🛡', '👤', '❌'];
            for (let i = 0; i < reactions.length; i++) await interactiveMessage.react(reactions[i]);

            //Launch timeout countdown
            let timeout = setTimeout(function() {
                return collector.stop('timeout');
            }, 120000);

            //----------------------------------On collector collect------------------------------
            collector.on('collect', async(r) => {
                clearTimeout(timeout); //Reset timeout

                if (r.emoji.name === "⚔") { //main commands page

                    await interactiveMessage.edit({ embed: mainCommands });

                } else if (r.emoji.name === "🔫") { //more commands page

                    await interactiveMessage.edit({ embed: secretCommands });

                } else if (r.emoji.name === '🔥') { //nsfw commands wow

                    await interactiveMessage.edit({ embed: nsfwCommands });
                  
                } else if (r.emoji.name === '🛡') { //nsfw commands wow

                    await interactiveMessage.edit({ embed: uniqCommands });

                } else if (r.emoji.name === '👤') { //nsfw commands wow

                    await interactiveMessage.edit({ embed: otherCommands });
                  
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
                }, 100000);
            });
            //--------------------------On collector end-----------------------------------------------
            collector.on('end', async(collected, reason) => {
                interactiveMessage.clearReactions()
                return resolve(interactiveMessage.edit('This message is no longer active please use the command ~builds again senpai'/*, { embed: mainCommands }*/));
            });
        });
    }
}