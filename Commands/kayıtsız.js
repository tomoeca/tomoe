const { MessageEmbed } = require("discord.js")
const ayar = require('../settings');
const db = require('quick.db');
const { Register } = require("../helpers/functions");
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.roles.cache.has(ayar.roles.registerStaff) && !message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin.`)).sil(7)
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))

    if (!member) return message.channel.send(embed.setDescription(`${message.member}, Geçerli bir üye belirtmelisin.`)).sil(7)

    if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(embed.setDescription(`${message.member}, Bu kullanıcı sizden üst/aynı pozisyonda.`)).sil(7) && message.sil(7)
    if (member.user.bot) return message.channel.send(embed.setDescription(`${message.member}, Kayıtsıza attığın kullanıcı bir bot olamaz.`)).sil(7)
    if (member.id === message.author.id) return message.channel.send(embed.setDescription(`${member}, Kendi kayıtsıza atamazsın.`)).sil(7)

    await Register.kayıtsız(member, message.member, message.channel)
    message.react(ayar.emojis.yes)
}
exports.config = {
    name: "kayıtsız",
    guildOnly: true,
    aliases: [],
    cooldown: 1000
};
