const { Client } = require('discord.js-commando')
require('dotenv').config()
const path = require('path')
const express = require("express");
const app = express();
const http = require("http");
//var translate = require('node-google-translate-skidz'); //package translate

const client = new Client({
    commandPrefix: process.env.PREFIX,
    owner: process.env.OWNER,
    invite: process.env.INVITE,
})

client.registry
.registerDefaultTypes()
.registerGroups([
    //['access', 'Access'],
    ['action', 'Action'],
    ['anime', 'Anime Commands'],
    ['misc', 'Miscellaneous'],
    ['music', 'Music'],
    ['moderation', 'Moderation'],
    ['nsfw', 'Not Safe For Work'],
    ['owner', 'Owner Server'],
    ['pso2', 'Phantasy Star Online 2 Commands']
])
.registerDefaultGroups()
.registerDefaultCommands({
  help: false,
	ping: false,
	prefix: false,
	commandState: false,
  unknownCommand: false
})
.registerCommandsIn(path.join(__dirname, 'commands'))

const activities_list = [
    "Anime With Mizuhashi",
    "~help | for help",
    "~help | for help",
    "~help | for help",
    "Don't See Someone Crying",
    "「Another」 With u Mizuhashi ❤",
    "Game With Mizuhashi",
    "Waiting Someone 💢",
    "Someone Crying",
    "Mizuhashi The Lonely 💔",
    "Me Saved Mizuhashi",
    "I Hate Everybody 😢"
    ]; // creates an arraylist containing phrases you want your bot to switch through.

client.once('ready', () => {

//Count
// Get our server
const guild = client.guilds.get('504020939827314689');

// Get our stats channels
const totalUsers = client.channels.get('558016864836648960');
const totalBots = client.channels.get('558019349558984725');
//const onlineUsers = client.channels.get('558017163575951380');
const modUsers = client.channels.get('558017225366306837');

// Check every 30 seconds for changes
setInterval(function() {
  console.log('Getting stats update..')

  //Get actual counts
  var userCount = guild.memberCount;
  //var onlineCount = guild.members.filter(m => m.presence.status === 'online').size
  var modCount = guild.roles.get('550026756074110986').members.size;
  var botCount = guild.roles.get('550043697715347457').members.size;
  
  // Log counts for debugging
  console.log("Total Users: " + userCount);
  console.log("Total Bot: " + botCount);
  //console.log("Online Users: " + onlineCount);
  console.log("Manager「Another」: " + modCount);

  // Set channel names
  totalUsers.setName("Total Users : " + userCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);
  
  totalBots.setName("Total Bot : " + botCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);

  /*onlineUsers.setName("Online Users: " + onlineCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);*/

 modUsers.setName("Manager「Another」: " + modCount)
  .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
  .catch(console.error);
  }, 300000)
//count end
  
  console.log(`${client.user.username} Sudah Login!`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index], {
          type: "STREAMING",
          url: "https://www.twitch.tv/mizuhashi012"}); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});

client.on('error', console.error)

// app.get ("/", (request, response) => {
  // console.log(Date.now() + " Ping Received, BOT ALWAYS ON :)");
  // response.sendStatus(200);
// });

// This keeps the bot running 24/7
// app.listen(process.env.PORT);
// setInterval(() => {
  // http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
// }, 100000); //default time 280000

//Member Join
client.on("guildMemberAdd", MemberAdd => {
  MemberAdd.guild.channels.find("name", "welcome-and-leave").send(`Selamat datang di discord team **「Another」** ${MemberAdd.user}\nUntuk penjelasan mengenai channel bisa baca di <#550588601185075202> atau <#559387360471678990>\nSilahkan perkenalkan diri dahulu di <#555964055467065355> dengan format : **In Game Name, Umur, Gender!**\n**────────────| ENGLISH LANGUAGE |────────────**\nWelcome to **「Another」** discord team ${MemberAdd.user}\nYou can check the Explaining about the server in here <#550588601185075202> or <#559387360471678990>\nAnd please introduce yourself in <#555964055467065355> with these format : **In Game Name, Age, Gender!**`)
  MemberAdd.addRole(MemberAdd.guild.roles.find(role => role.name === "Villager"));
  console.log("enter"); 
});

//Member Leave
client.on("guildMemberRemove", MemberRemove => {
  MemberRemove.guild.channels.find("name", "welcome-and-leave").send(`Sayōnara, kiotsukete itterashai mase **${MemberRemove.displayName}-sama**`)
  console.log("exit"); 
});

client.login(process.env.TOKEN);
