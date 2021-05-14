const { MessageEmbed } = require("discord.js")
const ayar = require('../settings');
const db = require('quick.db');
const { Register } = require("../helpers/functions");
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.roles.cache.has(ayar.roles.registerStaff) && !message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin.`)).sil(7)
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))
    if (!member) return message.channel.send(embed.setDescription(`${message.member}, Geçerli bir üye belirtmelisin.`)).sil(7)
    let isimData = db.get(`isimler.${member.id}`)
    if (!isimData) return message.channel.send(embed.setDescription(`${member}, Adlı kullanıcının geçmiş isimleri bulunamadı.`)).sil(7)
    let isimler = isimData.map((value, index) => `\`${index +1}.\` \`${value.name}\` (${message.guild.roles.cache.has(value.sex) ? message.guild.roles.cache.get(value.sex) : value.sex})`).join('\n')
    message.channel.send(embed.setDescription(`
    ${member}, Adlı kullanıcının toplam **${isimData.length}** kayıtı bulundu.
    
    ${isimler}`)).sil(10)
    message.react(ayar.emojis.yes)
}
exports.config = {
    name: "isimler",
    guildOnly: true,
    aliases: [],
    cooldown: 1000
};
