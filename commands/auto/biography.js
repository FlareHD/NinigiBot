module.exports.run = async (client, message) => {
    try {
        const { bank } = require('../../database/bank');
        const input = message.content.slice(1).trim();
        const [, , biography] = input.match(/(\w+)\s*([\s\S]*)/);

        if (!biography) return message.channel.send(`> Please specify a valid biography, ${message.author}.`);

        bank.currency.biography(message.author.id, biography);

        return message.channel.send(`> Successfully updated your biography, ${message.author}.`);

    } catch (e) {
        // log error
        const logger = require('../../util/logger');

        logger(e, client, message);
    };
};

module.exports.config = {
    name: "biography",
    aliases: ["bio"]
};