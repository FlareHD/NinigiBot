exports.run = async (client, message) => {
    // Import globals
    let globalVars = require('../../events/ready');
    try {
        if (message.author.id !== client.config.ownerID) return message.reply(globalVars.lackPerms);

        // Split off command
        let textMessage = message.content.slice(4);
        let split = textMessage.split(` `, 1);
        const userID = split[0];
        let remoteMessage = textMessage.slice(userID.length + 1);

        if (remoteMessage.length < 1) {
            return message.channel.send(`> You need to provide a message to send, ${message.author}.`);
        };

        targetUser = client.users.cache.get(userID);
        if (!targetUser) {
            return message.channel.send(`> I could not find that ID, it's likely I don't share a server with them or they don't exist, ${message.author}.`);
        };

        await targetUser.send(remoteMessage);
        return message.channel.send(`> Message succesfully sent to ${targetUser.tag}, ${message.author}.`);

    } catch (e) {
        // log error
        const logger = require('../../util/logger');

        logger(e, client, message);
    };
};

module.exports.config = {
    name: "dm",
    aliases: []
};
