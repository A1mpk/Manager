const { Client, Collection, Structures, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js')
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

const token = 'NzI1Nzg3NTMyMDA4MDk1NzQ0.XvT0UA.Npqlsx868vmDsMkDQCj9JWP0_Zo';

const x = '/';
client.on('guildCreate', guild => {
    let defaultChannel = "";
guild.channels.cache.forEach((channel) => {
  if(channel.type == "text" && defaultChannel == "") {
    if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
      defaultChannel = channel;
    }
  }
})
  defaultChannel.send(`Hello im ${client.user.username}, a bot that brings you variety of commands, here is a list of them : `, {
    embed:{
        title: '`✅ Prefix`',
        color: 16580705, 
        description: "Prefix : `/`",
        fields:[
            {
                name: '`😴 Moderation [8]`',
                value: 'ban,kick,warn,tempban,tempmute,mute,lock,announce'
            },     
            {
                name: '`🤩 Fun [3]`',
                value: 'say,8ball,roast,'
            },
            {
                name: '`🔊 Music [8]`',
                value: 'play,skip,pause,stop,resume,queue,clearqueue,search,'
            },
            {
                name: '`💸 Currency [8]`',
                value: 'daily,shop,inventory,work,cash,balance,currency,buy,'
            },
            {
                name: '`🛠️ Utilities [4]`',
                value: 'help,invite,guild,rank'
            }
        ],
        
        footer: {
            text: `https://top.gg/servers/756254215923564694`
        }
    }
  });
})
client.on('message', message =>{
  
   if(message.content === "/help"){
      message.channel.send({
        embed:{
            title: '`List of commands [32]`',
            color: 16580705, 
            fields:[
                {
                    name: '`😴 Moderation [8]`',
                    value: 'ban,kick,warn,tempban,tempmute,mute,lock,announce'
                },     
                {
                    name: '`🤩 Fun [3]`',
                    value: 'say,8ball,roast,'
                },
                {
                    name: '`🔊 Music [8]`',
                    value: 'play,skip,pause,stop,resume,queue,clearqueue,search,'
                },
                {
                    name: '`💸 Currency [8]`',
                    value: 'daily,shop,inventory,work,cash,balance,currency,buy,'
                },
                {
                    name: '`🛠️ Utilities [4]`',
                    value: 'help,invite,guild,rank'
                }
            ],
            
            footer: {
                text: `https://top.gg/servers/756254215923564694`
            }
        }
        })
   }

    
    if(message.content === '/guild'){
        const GuildInfo = new Discord.MessageEmbed()
        .setTitle(message.guild.name)
        .addField('Owner', `<@${message.guild.ownerID}>`)
        .addField('Members', message.guild.memberCount)
        .addField('Created', message.guild.createdAt)
        .addField('Channels', message.guild.channels.cache.size)
        .addField('Roles', message.guild.roles.cache.size)
        .setThumbnail(message.guild.iconURL)
        .setFooter(`Command raised by <@${message.member.user.tag}>`)
        .setColor(1752220)
        message.channel.send(GuildInfo)
    }
    if(message.content === '/rank'){
       
        const RankInfo = new Discord.MessageEmbed()
        .setAuthor(message.member.user.tag)
        .addField('User Created', message.member.user.createdAt)
        .addField('User Joined', message.member.joinedAt)
        .setColor(16580705)
        message.channel.send(RankInfo)
    }
    
    if(!message.content.startsWith(x) || message.author.bot) return;
 
    const args = message.content.slice(x.length).split(/ +/);
    const command = args.shift().toLowerCase();
   
    
 
    if(command === 'kick'){
        client.commands.get('kick').execute(message, args)
    };
    if(command === 'ban'){
        client.commands.get('ban').execute(message, args)
    };
  if(command === 'exemple'){
    client.commands.get('exemple').execute(message, args)
};

if(command === 'report'){
    client.commands.get('report').execute(message, args)
};
if(command === 'lock'){
    client.commands.get('lock').execute(message, args)
};
if(command === 'announce'){
    client.commands.get('announce').execute(message, args)
};
if(command === 'avatar'){
    client.commands.get('avatar').execute(message, args)
};

if(command === 'say'){
    client.commands.get('say').execute(message, args)
};
if(command === 'invite'){
    client.commands.get('invite').execute(message, args)
};




});



client.mongoose.init();
client.login(token);