module.exports.run = async (client, message) => {
    let globalVars = require('../../events/ready');
    try {
        const Discord = require("discord.js");

        if (message.author.id !== client.config.ownerID) {
            return message.reply(globalVars.lackPerms)
        };

        const args = message.content.split(' ');
        const pokemonSplit = message.content.split(', ');
        let author = args[1];

        if (!pokemonSplit[6]) return message.channel.send(`> Sorry, ${message.author} but you didn't provide 6 Pokémon on this team.
> Please make sure you provide your team in the following format:
> \`${globalVars.prefix}rentaladd author, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6\``);
        // Ingame Rental Screenshot format:
        // Pokemon 1 || Pokemon 2
        // Pokemon 3 || Pokemon 4
        // Pokemon 5 || Pokemon 6
        let pokemon1 = capitalizeString(pokemonSplit[1]);
        let pokemon2 = capitalizeString(pokemonSplit[2]);
        let pokemon3 = capitalizeString(pokemonSplit[3]);
        let pokemon4 = capitalizeString(pokemonSplit[4]);
        let pokemon5 = capitalizeString(pokemonSplit[5]);
        let pokemon6 = capitalizeString(pokemonSplit[6]);

        return message.channel.send(`> Author: ${author} 1: ${pokemon1} 2: ${pokemon2} 3: ${pokemon3} 4: ${pokemon4} 5: ${pokemon5} 6: ${pokemon6}`);

        function capitalizeString(str) {
            var splitStr = str;
            if (str.includes(" ")) {
                splitStr = str.split(' ');
            } else if (str.includes("-")) {
                splitStr = str.split('-');
            };
            if (Array.isArray(splitStr)) {
                for (var i = 0; i < splitStr.length; i++) {
                    // You do not need to check if i is larger than splitStr length, as your for does that for you
                    // Assign it back to the array
                    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
                };
                // Return the joined string
                returnStr = splitStr.join(' ');
            } else {
                returnStr = splitStr.charAt(0).toUpperCase() + splitStr.slice(1);
            };

            if (returnStr == "Type Null" || returnStr == "Type-Null") returnStr = "Type: Null";
            return returnStr;
        };

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