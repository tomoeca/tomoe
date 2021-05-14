const { MessageEmbed } = require("discord.js")
const ayar = require('../settings');
const db = require('quick.db');
const { Register } = require("../helpers/functions");
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.roles.cache.has(ayar.roles.registerStaff) && !message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin.`)).sil(7)
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))

    args = args.filter(a => a !== "" && a !== " ").splice(1)
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;


    if (!member || !isim) return message.channel.send(embed.setDescription(`${message.member}, Geçerli bir üye ve isim belirtmelisin.`)).sil(7)
    let fixTag = `${member.user.username.includes(ayar.guild.tag) ? ayar.guild.tag : ayar.guild.unTag}`
    var name;
    if (yaş) name = `${fixTag} ${isim} | ${yaş}`
    if (!yaş) name = `${fixTag} ${isim}`
    if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(embed.setDescription(`${message.member}, Bu kullanıcı sizden üst/aynı pozisyonda.`)).sil(7) && message.sil(7)
    if (member.user.bot) return message.channel.send(embed.setDescription(`${message.member}, Kayıt ettiğin kullanıcı bir bot olamaz.`)).sil(7)
    if (member.id === message.author.id) return message.channel.send(embed.setDescription(`${member}, Kendi ismini değiştiremezsin.`)).sil(7)
    await Register.name(member, name, message.channel)
    message.react(ayar.emojis.yes)
}
exports.config = {
    name: "isim",
    guildOnly: true,
    aliases: ["i"],
    cooldown: 1000
};
