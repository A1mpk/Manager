const { ClientUser } = require("discord.js");
const play = require("../commands/Moderation/play");

module.exports = client => {
    console.log('Manager is now online and running!');

   

    let statuses = [
        '>help || 🎃🎃',
        `over ${client.users.cache.size} users`,
        `${client.guilds.cache.size} guilds`,
        '20435021'
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "WATCHING"});

    }, 10000)
    }


