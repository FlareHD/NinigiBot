const { update } = require("lodash");

module.exports = async (client, message, newMessage) => {
    // Import globals
    let globalVars = require('./ready');
    try {
        const Discord = require("discord.js");

        const { LogChannels } = require('../database/dbObjects');
        let logChannel = await LogChannels.findOne({ where: { server_id: message.guild.id } });
        if (!logChannel) return;
        let log = message.guild.channels.cache.find(channel => channel.id == logChannel.channel_id);
        if (!log) return;

        if (!message) return;
        if (!message.author) return;
        if (message.content === newMessage.content) return;

        if (!log) return;

        let messageImage = null;
        if (message.attachments.size > 0) messageImage = message.attachments.first().url;

        let avatar = message.author.displayAvatarURL({ format: "png", dynamic: true });

        const updateEmbed = new Discord.MessageEmbed()
            .setColor(globalVars.embedColor)
            .setAuthor(`Message edited ⚒️`, avatar)
            .setDescription(`Message sent by ${message.author} (${message.author.id}) edited in ${message.channel}.`);
        if (message.content) updateEmbed.addField(`Before:`, message.content, false);
        updateEmbed
            .addField(`After:`, newMessage.content, false)
            .addField(`Jump to message:`, `[Link](${message.url})`, false)
            .setImage(messageImage)
            .setFooter(message.author.tag)
            .setTimestamp(message.createdTimestamp);

        globalVars.totalLogs += 1;
        return log.send(updateEmbed);

    } catch (e) {
        // log error
        const logger = require('../util/logger');

        logger(e, client, message);
    };
};