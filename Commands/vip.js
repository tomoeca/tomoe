const { MessageEmbed } = require("discord.js")
const ayar = require('../settings');
const db = require('quick.db');
const { Register, Other } = require("../helpers/functions");
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin.`)).sil(7)
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))
    if (!member) return message.react(ayar.emojis.no)
    if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(embed.setDescription(`${message.member}, Bu kullanıcı sizden üst/aynı pozisyonda.`)).sil(7) && message.sil(7)
    if (member.user.bot) return message.channel.send(embed.setDescription(`${message.member}, Vip verdiğin kullanıcı bir bot olamaz.`)).sil(7)
    if (member.id === message.author.id) return message.channel.send(embed.setDescription(`${member}, Kendine vip veremezsin.`)).sil(7)

    Other.vip(member, message.member, message.channel, message)

}
exports.config = {
    name: "vip",
    guildOnly: true,
    aliases: [],
    cooldown: 1000
};
