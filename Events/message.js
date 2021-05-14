const ayar = require('../settings.js');
const { MessageEmbed } = require('discord.js');
const durkardesim = new Map()
module.exports = message => {
    let client = message.client;
    if (message.author.bot) return;
    if (!message.content.startsWith(ayar.bot.botPrefix)) return;
    let command = message.content.split(' ')[0].slice(ayar.bot.botPrefix.length);
    let params = message.content.split(' ').slice(1);
    let colors = ["#040c41", "#22083d", "#3b0404", "#400150", "#000001", "#2200ff"]
    colors[Math.floor(Math.random() * colors.length)]
    let random = colors[Math.floor(Math.random() * colors.length)]
    let embed = new MessageEmbed().setColor(random).setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    };
    if (cmd) {
        if (!message.guild) {
            if (cmd.config.guildOnly === true) {
                return;
            };

        };


        if (!ayar.bot.botOwner.includes(message.author.id)) {
            if (durkardesim.has(message.author.id) && durkardesim.get(message.author.id).komut == cmd.config.name && durkardesim.get(message.author.id).zaman > Date.now()) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, \`${cmd.config.name}\` komutu kullanabilmek için **${Math.floor((durkardesim.get(message.author.id).zaman - Date.now()) / 1000)}** saniye beklemelisin.`).setColor('RANDOM')).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }));
            durkardesim.set(message.author.id, { komut: cmd.config.name, zaman: Date.now() + cmd.config.cooldown });
        }
        cmd.run(client, message, params, embed);
    };
};