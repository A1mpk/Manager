const { Client, Collection } = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const client = new Client();
const prefix = '/';

client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require('./utils/mongoose');

client.categories = fs.readdirSync('./commands/');



['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}




client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ban'){
        client.commands.get('ban').execute(message, args);
    };
    if(command === 'kick'){
        client.commands.get('kick').execute(message, args)
    };
    if(command === 'uptime'){
      client.commands.get('uptime').execute(message, args, client)
  };

});



client.mongoose.init();
client.login(token);