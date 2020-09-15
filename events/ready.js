module.exports = client => {
    console.log('Manager is now online and running!');
    
        client.user.setPresence({
            status: 'dnd',
            activity: {
                name: 'VISIT THE ALL',
                type: 'STREAMING',
                url: 'https://www.twitch.tv/theallwastaken',
                
            }
        });
}