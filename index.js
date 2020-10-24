const { POINT_CONVERSION_HYBRID, EMFILE } = require('constants');
const { Client, Collection, Structures, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const { send } = require('process');
const guild = require('./commands/Moderation/guild');
const avatar = require('./commands/normal/avatar');
const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require('./utils/mongoose');
client.categories = fs.readdirSync('./commands/');
const { config } = require('dotenv');
const { isRegExp } = require('util');
const { Z_NEED_DICT } = require('zlib');
const { error } = require('console');
config({
    path: `${__dirname}/.env`
});

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

client.on('guildMemberAdd', member => {
  
    const rolefound = member.guild.roles.cache.find(r => r.id === "753424012868321300")
    member.roles.add(rolefound)
  
   
    
})

const x = '>';

client.on('guildCreate', guild => {
    let defaultChannel = "";
guild.channels.cache.forEach((channel) => {
  if(channel.type == "text" && defaultChannel == "") {
    if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
      defaultChannel = channel;
    }
  }
})
  defaultChannel.send({
    embed:{
        title: `Server Prefix : ${x}`,
        color: 15105570, 
        description: "Thanks for inviting me to your server! Here is a list of all my commands.",
        fields:[
            {
                name: '**😴 Moderation [8]**',
                value: 'ban,kick,warn,tempban,tempmute,mute,lock,announce'
            },     
            {
                name: '**🤩 Fun [3]**',
                value: 'say,8ball,roast,'
            },
            {
                name: '**🔊 Music [8]**',
                value: 'play,skip,pause,stop,resume,queue,clearqueue,search,'
            },
            {
                name: '**💸 Currency [8]**',
                value: 'daily,shop,inventory,work,cash,balance,currency,buy,'
            },
            {
                name: '**🛠️ Utilities [4]**',
                value: 'help,invite,guild,rank'
            },
            {
                name: '**Owner [1]**',
                value: 'eval'
            }
        ],
        
        footer: {
            text: `https://top.gg/servers/756254215923564694`
        }
    }
  });
})


client.on('message', message =>{
  
    const args = message.content.slice(x.length).split(/ +/);
    const lol = message.content.slice(5)
    if(message.content.startsWith('20435021')){
        message.channel.send(`You actually found the secret command. Run '>xdeed' for a surprise. `)
    }
    if(message.content.startsWith('>xdeed')){
        message.mentions.users.first().send('Get :regional_indicator_x: :regional_indicator_d:  ')
    }
    if(message.content.startsWith( x + 'nick')){
        const LOL = new Discord.MessageEmbed()
        .setColor(15105570)
        .setAuthor('NICK - MODERATION')
        .setDescription(`Nicknames a user.`)
        .addField('USAGE : `nick <nickname>`', "** **")
        .setTimestamp()
       
       if(message.member.hasPermission('CHANGE_NICKNAME')){
           if(message.member === message.guild.owner){
               message.channel.send(`I cannot change the Owner's nickname.`)
           }
           if(!lol){
            message.channel.send(LOL)
        }
         message.member.setNickname(lol)
       }else message.channel.send('You need `CHANGE_NICKNAME` to use this command.')
    }
    if(message.content.startsWith( x + 'config_welcome')){
        if(message.member.hasPermission('MANAGE_CHANNELS')){
            const messagetosend = message.content.slice(15)
           
            if(!messagetosend) return message.channel.send('Enter a welcome message.')
           client.on('guildMemberAdd', member => {
            const EmbedToSend = new Discord.MessageEmbed()
            .setTitle(`Welcome to ${member.guild.name}`)
            .setDescription(messagetosend)
            .setColor(15105570)
            .setTimestamp()
               member.send(EmbedToSend)
           })
        }
    
    }
    if(message.content.startsWith( x + 'config_log')){
     
        let LeftChannel = message.guild.channels.cache.find(channel => args[1] === channel.id )
        if(message.member.hasPermission("MANAGE_CHANNELS")){
            if(!LeftChannel) return message.channel.send(`Cant find channel id.`)
            client.on('guildBanAdd', member =>{
               const BannedMem = new Discord.MessageEmbed()
               .setColor(15105570)
               .setAuthor("Member Banned")
               .addField('User', member.name)
               .addField('Date', message.createdAt)
               .addField('Last message', member.lastMessage)
               LeftChannel.send(BannedMem)
            })
          client.on('guildMemberAdd', member =>{
               const SJoined2 = new Discord.MessageEmbed()
                .setTitle('Member Joined')
                .addField('Member Name', member)
                .addField('Joined', member.joinedAt)
                .addField('Account ID', member.id)
                .setFooter('Please welcome this member.')
                .setColor(15105570)
                member.send()
                 
                LeftChannel.send(SJoined2)
              });
           client.on('guildMemberRemove', member =>{
               const LeftEmbed = new Discord.MessageEmbed()
               .setColor(15105570)
               .setAuthor('Member Left')
               .addField('Member Name', member.displayName)
               .addField('Account ID', member.id)
               .addField('Last message', member.lastMessage) 
               LeftChannel.send(LeftEmbed)
            })
            return message.channel.send(`Join message is now fixed for ${LeftChannel}`)
          }
          return message.channel.send('You dont have permission to do that.')
    }
   

    if(!message.content.startsWith(x) || message.author.bot) return;
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
if(command === 'guild'){
    client.commands.get('guild').execute(message, args)
};
if(command === 'rank'){
    client.commands.get('rank').execute(message, args)
};
if(command === 'help'){
    client.commands.get('help').execute(message, args)
};
if(command === 'support'){
    client.commands.get('support').execute(message, args)
};
if(command === 'play'){
    client.commands.get('play').execute(message, args)
};
if(command === 'giverole'){
    client.commands.get('giverole').execute(message, args)
};
if(command === 'report'){
    client.commands.get('report').execute(message, args)
};

if(command === 'eval'){
    client.commands.get('eval').execute(message, args)
};

if(command === 'info'){
    client.commands.get('info').execute(message, args)
};
if(command === 'setAutorole'){
    client.commands.get('setAutorole').execute(message, args)
};
if(command === 'credit'){
    client.commands.get('credit').execute(message, args)
};
if(command === 'membercount'){
    client.commands.get('membercount').execute(message, args)
};
if(command === 'rule_add'){
    client.commands.get('rule_add').execute(message, args)
};
if(command === 'pain'){
    client.commands.get('pain').execute(message, args)
};
if(command === 'happy'){
    client.commands.get('happy').execute(message, args)
};








});

client.mongoose.init();
client.login(process.env.token);
