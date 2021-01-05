exports.run = (client, message) => {
    // Import globals
    let globalVars = require('../../events/ready');
    try {
        let args = message.content.split(` `);
        let commandName = "8ball";
        if (message.content.toLowerCase().startsWith(`${globalVars.prefix}magicconch`)) commandName = "Magic Conch";

        if (!args[1]) return message.channel.send(`> You need to provide something for the ${commandName} to consider, ${message.author}.`);

        const answers = ["Maybe someday", "Nothing", "Neither", "I don't think so", "No", "Yes", "Try asking again", "Definitely", "Probably not"];
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

        return message.channel.send(`> The ${commandName} says: "${randomAnswer}.", ${message.author}.`);

    } catch (e) {
        // log error
        const logger = require('../../util/logger');

        logger(e, client, message);
    };
};

module.exports.config = {
    name: "8ball",
    aliases: ["magicconch"]
};
