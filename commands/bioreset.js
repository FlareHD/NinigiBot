module.exports.run = async (client, message) => {
    try {
        // Import globals
        let globalVars = require('../events/ready');

        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply(globalVars.lackPerms);
        };

        const { bank } = require('../database/bank');
        const member = message.mentions.members.first();
        
        if (!member) return message.channel.send(`> Please use a proper mention if you want to reset someones bio, ${message.author}.`);
        bank.currency.biography(member.id, "None");

        return message.channel.send(`> Biography reset, ${message.author}.`);

    } catch (e) {
        // log error
        console.log(e);

        // return confirmation
        return message.channel.send(`> An error has occurred trying to run the command, please report this as an issue on the Github page or send a message to the bot owner. For links and other information use ${client.config.prefix}info.`);
    };
};