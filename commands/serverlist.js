exports.run = (client, message, args) => {
    var baseMessage = `**Servers:**`;

    client.guilds.forEach((guild) => {
        baseMessage = `${baseMessage}
-${guild.name}`
    });

    return message.channel.send(baseMessage);
};

module.exports.help = {
    name: "Serverlist",
    description: "Lists all servers the bot is in.",
    usage: `serverlist`
};