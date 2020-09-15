const { Client, Collection } = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const avatar = require('./commands/normal/avatar');
const client = new Client();
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


const prefix = '/'


client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
   
    
 
    if(command === 'kick'){
        client.commands.get('kick').execute(message, args)
    };
  if(command === 'exemple'){
    client.commands.get('exemple').execute(message, args)
};
if(command === 'help'){
    client.commands.get('help').execute(message, args)
};
if(command === 'report'){
    client.commands.get('report').execute(message, args)
};
if(command === 'lock'){
    client.commands.get('lock').execute(message, args)
};
if(command === 'unlock'){
    client.commands.get('unlock').execute(message, args)
};
if(command === 'announce'){
    client.commands.get('announce').execute(message, args)
};
if(command === 'avatar'){
    client.commands.get('avatar').execute(message, args)
};



});



client.mongoose.init();
client.login(token);