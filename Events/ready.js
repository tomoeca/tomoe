const Discord = require("discord.js");
const ayar = require('../settings.js');
module.exports = async client => {
    client.user.setPresence({ activity: { type: "PLAYING", name: ayar.bot.botStatus }, status: 'dnd' })
};