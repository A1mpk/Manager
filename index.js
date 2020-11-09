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
const { error, memory } = require('console');
const { getPackedSettings } = require('http2');
const { name } = require('./commands/Moderation/guild');
const ytdl = require('ytdl-core')


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
        title: `Manager`,
        color: 3066993, 
        description: "Thanks for inviting me to your server! Here is a list of all my commands.",
        fields:[
            {
                name: '**😴 Moderation [10]**',
                value: 'ban,kick,lock,announce,config_log,bot_nick,nick,getuserid,getid'
            },     
            {
                name: '**🤩 Fun [2]**',
                value: 'pain,happy'
            },
            {
                name: '**🔊 Music [1]**',
                value: 'play with special playlist'
            },
            {
                name: '**💸 Currency [0]**',
                value: '** IN PROGRESS **'
            },
            {
                name: '**🛠️ Utilities [7]**',
                value: 'help,invite,guild,rank,support,info,membercount'
            },
            {
                name: '**Owner [1]**',
                value: 'eval'
            }
        ],
        
        footer: {
            text: `My current prefix for this guild is **>**.`
        }
    }
  });
})



client.once('guildMemberAdd', member => {
  const chja =  member.guild.channels.cache.find(ch => ch.name === "log-test")
  if(!chja) return member.guild.channels.create('log-test')
  const Member = new Discord.MessageEmbed()
  .setDescription(`Member ${member} joined the guild.`)
  .setThumbnail(member.user.displayAvatarURL())
  .setColor(3066993)
  .setTitle(`Member Joined`)
  chja.send(Member)
})
client.on('message', message =>{
if(message.content === `<@!${client.user.id}>`){
   const MyPRefixIs = new Discord.MessageEmbed()
        .setColor(3066993)
        .setAuthor('Prefix')
        .setDescription('`>`')
        .setTimestamp()
        message.channel.send(MyPRefixIs)
}
let blacklisted = ['nigga','nigger','cunt','faggot','retard','retarded','retarted','hoe','whore','bitch','fuck','ass','gay'] //words


let foundInText = false;
for (var i in blacklisted) { 
  if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
}
if(message.author.id === "368148684468387840"){
    console.log(`Founder`)
    console.clear()
}else
if(message.author.id === "503186950295912458"){
    console.log(`Co-Founder`)
    console.clear()
}else
if(message.author.id === "508728576183369760"){
  console.log(`Co-Founder`)
  console.clear()
}else
if(message.author.id === "375404524019384322"){
console.log(`Co-Founder`)
console.clear()
}else
if(message.author.id === "420380500918665239"){
console.log(`Co-Founder`)
console.clear()
}else

  if (foundInText) {
    message.delete();
    console.clear()
}
    const args = message.content.slice(x.length).split(/ +/);
   if(!message.content.startsWith(x) || message.author.bot) return;
    const command = args.shift().toLowerCase();
    if(command === 'kick'){
        client.commands.get('kick').execute(message, args)
    };
    if(command === 'ban'){
        client.commands.get('ban').execute(message, args)
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
    if(command === 'nick'){
    client.commands.get('nick').execute(message, args)
    };
    if(command === 'bot_nick'){
    client.commands.get('bot_nick').execute(message, args)
    };
    if(command === 'getid'){
    client.commands.get('getid').execute(message, args)
    };
    if(command === 'getuserid'){
        client.commands.get('getuserid').execute(message, args)
    };
    if(command === 'clear'){
        client.commands.get('clear').execute(message, args)
    };
    if(command === 'verify'){
        client.commands.get('verify').execute(message, args)
    };
  
  








});
console.clear()
client.mongoose.init();
client.login(process.env.token);


