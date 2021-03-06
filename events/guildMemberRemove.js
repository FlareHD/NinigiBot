module.exports = async (client, member) => {
    // Import globals
    let globalVars = require('./ready');
    try {
        const Discord = require("discord.js");
        const { LogChannels } = require('../database/dbObjects');
        let logChannel = await LogChannels.findOne({ where: { server_id: member.guild.id } });
        if (!logChannel) return;
        let log = member.guild.channels.cache.find(channel => channel.id == logChannel.channel_id);
        if (!log) return;

        let user = client.users.cache.get(member.id);
        let avatar = user.displayAvatarURL({ format: "png", dynamic: true });
        avatarExecutor = avatar;

        let embedAuthor = `Member Left 💔`;
        let embedFooter = `We'll miss you, ${user.tag}!`;
        let reasonText = "Not specified.";
        let kicked = false;

        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_KICK',
        });
        const kickLog = fetchedLogs.entries.first();

        if (kickLog) {
            if (kickLog.createdAt > member.joinedAt) {
                let { executor, target, reason } = kickLog;
                if (target.id !== member.id) return;
                kicked = true;
                if (reason) reasonText = reason;
                avatarExecutor = executor.displayAvatarURL({ format: "png", dynamic: true });
                embedAuthor = `Member Kicked 💔`;
                embedFooter = `${target.tag} got kicked by ${executor.tag}`;
            };
        };

        const leaveEmbed = new Discord.MessageEmbed()
            .setColor(globalVars.embedColor)
            .setAuthor(embedAuthor, avatarExecutor)
            .setThumbnail(avatar)
            .addField(`User:`, `${user} (${user.id})`, false)
        if (kickLog && kicked == true) leaveEmbed.addField(`Reason:`, reasonText, false)
        leaveEmbed
            .setFooter(embedFooter)
            .setTimestamp();

        return log.send(leaveEmbed);

    } catch (e) {
        // log error
        const logger = require('../util/logger');

        logger(e, client);
    };
};
