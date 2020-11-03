module.exports.run = async (client, message) => {
    let globalVars = require('../../events/ready');
    try {
        const Discord = require("discord.js");

        const args = message.content.split(' ');
        let pokemonSearch = args[1];

        return;

    } catch (e) {
        // log error
        const logger = require('../../util/logger');

        logger(e, client, message);
    };
};

module.exports.config = {
    name: "rentaladd",
    aliases: ["addrental"]
};