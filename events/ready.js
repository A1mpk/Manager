const { ClientUser } = require("discord.js");
const guild = require("../commands/Moderation/guild");
const play = require("../commands/Moderation/play");

module.exports = client => {
    console.log('Manager is now online and running!');

   

    let statuses = [
        '>help'
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "WATCHING"});

    }, 10000)
    }


