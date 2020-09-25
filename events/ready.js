module.exports = client => {
    console.log('Manager is now online and running!');

   

    let statuses = [
        `${client.guilds.cache.size} guilds`,
        "/help",
        `over 152604 users`,
        `over 89 guilds`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "WATCHING"});

    }, 25000)
    }


