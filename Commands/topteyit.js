const { MessageEmbed } = require("discord.js")
const ayar = require('../settings');
const db = require('quick.db');
const { Register } = require("../helpers/functions");
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.roles.cache.has(ayar.roles.registerStaff) && !message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin.`)).sil(7)

    let data = await db.get("teyit");
    if (!data) return message.channel.send(embed.setDescription(`Sunucuya ait kayıt verisi bulunamadı.`)).sil(7)
    let topData = Object.keys(data)

    let topteyit = topData.filter(s => message.guild.members.cache.has(s)).sort((a, b) => Number((data[b].erkek || 0) + (data[b].kız || 0)) - Number((data[a].erkek || 0) + (data[a].kız || 0))).map((value, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(value)} Toplam **${((data[value].erkek || 0) + (data[value].kız || 0))}** (**${((data[value].erkek || 0))}** Erkek **${((data[value].kız || 0))}** Kadın)`).splice(0, 20);

    message.channel.send(embed.setDescription(topteyit))
    message.react(ayar.emojis.yes)
}

exports.config = {
    name: "topteyit",
    guildOnly: true,
    aliases: [],
    cooldown: 1000
};
