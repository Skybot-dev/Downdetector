const Discord = require('discord.js');
const downdetector = new Discord.Client({ws: {intents: Discord.Intents.ALL}});
const skybot = new Discord.Client({shards: 'auto'});
require('dotenv').config()

downdetector.on('ready', () => {
    console.log(`Logged in as ${downdetector.user.tag}!`);
    downdetector.guilds.fetch('636937988248436736');
});
skybot.on('ready', () => {
    console.log(`Logged in as ${skybot.user.tag}!`);
});

async function isOffline() {
    let guild = downdetector.guilds.cache.get('636937988248436736');
    let channel = guild.channels.cache.get('823219739572437052');
    await channel.send('Skybot is offline <@&667609814079111226>');
    await skybot.user.setPresence({activity: {name: 'CURRENTLY UNAVAILABLE!'}, status: 'dnd'});
    console.log("Bot offline")
}


downdetector.on('presenceUpdate', async (oldPresence, newPresence) => {
    if (newPresence.userID === '630106665387032576' &&
        newPresence.status === 'offline') {
        isOffline();
    }
})


let lastSentTime = 0;
let isOK = true;

setInterval(function () {
    if (!isOK) {
        isOffline();
    }
    downdetector.users.cache.get("630106665387032576").send("!isOnline");
    lastSentTime = Math.floor(new Date() / 1000);
    isOK = false;
}, 60000);

downdetector.on("message", (msg) => {
    if (msg.author.id === "630106665387032576" &&
        Math.floor(new Date() / 1000) < lastSentTime + 10) {
        isOK = true;
    }
});

downdetector.login(process.env.downdetector_token);
skybot.login(process.env.skybot_token);