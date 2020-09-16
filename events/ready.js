module.exports = client => {
    console.log('Manager is now online and running!');
    
        client.user.setPresence({
            status: 'dnd',
           
        });
}