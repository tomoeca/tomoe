const { MessageEmbed } = require("discord.js")
const ayar = require('../settings');
const db = require('quick.db');
const { Register } = require("../helpers/functions");
module.exports.run = async(client, message, args, embed) => {
    if (!message.member.roles.cache.has(ayar.roles.registerStaff) && !message.member.hasPermission(8)) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin.`)).sil(7)
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author);

    let erkek = await db.get(`teyit.${member.id}.erkek`) || 0
    let kız = await db.get(`teyit.${member.id}.kız`) || 0
    let toplam = await db.get(`teyit.${member.id}.toplam`) || 0
    message.react(ayar.emojis.yes)
    message.channel.send(embed.setDescription(`
    ${member} üyesinin kayıt verileri;

    \`•\` **Toplam kayıt:** \`${toplam}\`
    \`•\` **Erkek kayıt:** \`${erkek}\`
    \`•\` **Kadın kayıt:** \`${kız}\`
    `)).sil(8)

}
exports.config = {
    name: "teyitbilgi",
    guildOnly: true,
    aliases: [],
    cooldown: 1000
};
