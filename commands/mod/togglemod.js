module.exports.run = async (client, message) => {
    // Import globals
    let globalVars = require('../../events/ready');
    try {
        if (!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== client.config.ownerID) return message.reply(globalVars.lackPerms);

        const { ModEnabledServers } = require('../../database/dbObjects');
        let serverID = await ModEnabledServers.findOne({ where: { server_id: message.guild.id } });

        if (serverID) {
            await serverID.destroy();
            return message.channel.send(`> **${message.guild.name}** will no longer be automatically moderated, ${message.author}.`);
        } else {
            await ModEnabledServers.upsert({ server_id: message.guild.id });
            return message.channel.send(`> **${message.guild.name}** will now be automatically moderated, ${message.author}.`);
        };

    } catch (e) {
        // log error
        const logger = require('../../util/logger');

        logger(e, client, message);
    };
};

module.exports.config = {
    name: "togglemod",
    aliases: ["tm"]
};