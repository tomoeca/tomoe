const { MessageEmbed } = require("discord.js")
const ayar = require('../settings');
const db = require('quick.db');
const { Register } = require("../helpers/functions");
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin.`)).sil(7)
    let data = await db.get(`taglıalım.${message.guild.id}`)
    let command = args[0]
    if (command === "aç") {
        if (data) return message.channel.send(embed.setDescription(`${message.guild.emojis.cache.get(ayar.emojis.no)} taglı alım modu zaten aktif!`)).sil(7)
        await Register.taglıalımac(message.channel)
    } else if (command === 'kapat') {
        if (!data) return message.channel.send(embed.setDescription(`${message.guild.emojis.cache.get(ayar.emojis.no)} taglı alım modu zaten kapalı!`)).sil(7)
        await Register.taglıalımkapat(message.channel)
    } else {
        message.channel.send(embed.setDescription(`Hatalı kullanım örnek: \`\`\`.taglıalım aç/kapat\`\`\` `).setFooter(`taglı alım modu şuanda ${data ? 'Açık': 'Kapalı'}`))
    }

}
exports.config = {
    name: "taglıalım",
    guildOnly: true,
    aliases: [],
    cooldown: 1000
};
