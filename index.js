const Discord = require('discord.js');
const downdetector = new Discord.Client({ ws: { intents: Discord.Intents.ALL }});
const skybot = new Discord.Client({ shards: 'auto'});
require('dotenv').config()

downdetector.on('ready', () => {
  console.log(`Logged in as ${downdetector.user.tag}!`);
  downdetector.guilds.fetch('636937988248436736')
});
skybot.on('ready', () => {
    console.log(`Logged in as ${skybot.user.tag}!`);
  });

downdetector.on('presenceUpdate', async (oldPresence, newPresence) => {
    if (newPresence.userID === '201686355493912576' && newPresence.status === 'offline') {
        guild = downdetector.guilds.cache.get('636937988248436736')
        channel = guild.channels.cache.get('823219739572437052')
        await channel.send('Skybot is offline <@&667609814079111226>')
        await skybot.user.setPresence({ activity: { name: 'CURRENTLY UNAVAILABLE!'}, status: 'dnd'})
    }
})

downdetector.login(process.env.downdetector_token);
skybot.login(process.env.skybot_token)