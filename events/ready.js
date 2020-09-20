module.exports = client => {
    console.log('Manager is now online and running!');

   

    let statuses = [
        `${client.guilds.cache.size} guilds`,
        "/help",
        `over ${client.users.cache.size} users`,
        "FriendlyUser is typing..."
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "WATCHING"});

    }, 25000)
    }


