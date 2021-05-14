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
    if (member.id === message.author.id) return message.channel.send(embed.setDescription(`${member}, Kendini kayıt edemezsin.`)).sil(7)
    if (db.get(`taglıalım.${message.guild.id}`)) {
        if (!member.user.username.includes(ayar.guild.tag) && !member.roles.cache.has(ayar.roles.boosterRole) && !member.roles.cache.has(ayar.roles.vipRole)) {
            return message.channel.send(embed.setDescription(`${member} Adlı kullanıcının isminde tag bulunmadığı için kayıt işlemi gerçekleştirilemedi.`)).sil(8)
        }
    }

    await member.setNickname(name).catch(err => {})
    message.react(ayar.emojis.yes)
    message.channel.send(embed.setDescription(`${member}, Adlı üyenin ismi \`${name}\` olarak değiştirildi. `)).then(async(msg) => {
        await msg.react(ayar.emojis.man)
        await msg.react(ayar.emojis.woman)
        let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

        collector.on('collect', async(reaction, user) => {
            await msg.reactions.removeAll()
            if (reaction.emoji.id === ayar.emojis.man) {
                Register.man(member, message.author, name, message.channel, msg)
            }
            if (reaction.emoji.id === ayar.emojis.woman) {
                Register.woman(member, message.author, name, message.channel, msg)
            }
        })
    })
}
exports.config = {
    name: "kayıt",
    guildOnly: true,
    aliases: ["e", "k"],
    cooldown: 1000
};
