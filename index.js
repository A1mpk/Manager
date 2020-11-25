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
    guild.channels.create('log')
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


client.on('guildMemberRemove', member => {
    const Channel = member.guild.channels.cache.find(ch => ch.name === "log-test")
    const Joins = member.guild.channels.cache.find(ch => ch.name === "👋joins")
    if(!Joins) return member.guild.channels.create("👋joins")
    const EmbedLeft = new Discord.MessageEmbed()
    .setFooter(`We are now${member.guild.memberCount} members.`)
    .setTimestamp()
    .setColor(3066993)
    .setThumbnail(member.user.displayAvatarURL())
    .setAuthor(`Member Left`)
    .setDescription(`Sad momento! ${member} just left the group!`)
    if(Channel){
        Channel.send(EmbedLeft)
    }else
   if(!Channel){
    member.guild.channels.create("log-test")
   } 
   if(Joins){
       Joins.send(EmbedLeft)
   }
   
})
client.on('guildMemberAdd', member => {
 
  const Joins = member.guild.channels.cache.find(ch => ch.name === "👋joins")
  if(!Joins) return member.guild.channels.create("👋joins") 
  const AutoRoleForSp = member.guild.roles.cache.find(role => role.name === "Member")
  if(!AutoRoleForSp) return   member.guild.roles.create({
    data: {
      name: 'Member',
      color: 'BLACK',
      permissions: ['SEND_MESSAGES', 'ADD_REACTIONS', 'SPEAK', 'SEND_TTS_MESSAGES', 'STREAM', 'CONNECT', 'USE_EXTERNAL_EMOJIS', 'READ_MESSAGE_HISTORY'],
      
    },
    reason: 'Testing '
}
).then(member.guild.owner.send(`Member role was not found, therefore I have created another one, you can always change the permissions for the roles to however you like.`)) || member.send("I couldn't give you the member role. Please ask a moderator to give you it.")
.catch(console.error);
  
  const chja =  member.guild.channels.cache.find(ch => ch.name === "log-test")
  if(!chja) return member.guild.channels.create('log-test')
  const AutoRollin = new Discord.MessageEmbed()
  .setDescription(`I have added the role<@${AutoRoleForSp}> for ${member.user.tag}.`)
  .setThumbnail(member.user.displayAvatarURL())
  .setTitle(`AutoRole ${member.guild.name}`)
  .setTimestamp()
  .setColor(3066993)
  const NotAutoRollin = new Discord.MessageEmbed()
  .setDescription(`I couldn't add <@${AutoRoleForSp}> for ${member.user.tag}`)
  .setThumbnail(member.user.displayAvatarURL())
  .setTitle(`AutoRole ${member.guild.name}`)
  .setTimestamp()
  .setColor(3066993)
  const Member = new Discord.MessageEmbed()
  .setDescription(`Hey ${member}, welcome to ${member.guild}.`)
  .setThumbnail(member.user.displayAvatarURL())
  .setColor(3066993)
  .setTitle(`Member Joined`)
  .setFooter(`We are now ${member.guild.memberCount} members.`)
  .setTimestamp()
  
  
  chja.send(Member)
  if(AutoRoleForSp) return member.roles.add(AutoRoleForSp) || chja.send(AutoRollin)
  Joins.send(Member)
})


client.on('message', message =>{
 
    if(message.content === ">exemple"){
        const AutoRollin = new Discord.MessageEmbed()
        .setDescription(`I have added the role<@role}> for ${message.member.user.tag}.`)
        .setThumbnail(message.member.user.displayAvatarURL())
        .setTitle(`AutoRole ${message.member.guild.name}`)
        .setTimestamp()
        .setColor(3066993)
        const NotAutoRollin = new Discord.MessageEmbed()
        .setDescription(`I couldn't add <@role> for ${message.member.user.tag}`)
        .setThumbnail(message.member.user.displayAvatarURL())
        .setTitle(`AutoRole ${message.member.guild.name}`)
        .setTimestamp()
        .setColor(3066993)
        const Member = new Discord.MessageEmbed()
        .setDescription(`Hey ${message.member}, welcome to ${message.member.guild}.`)
        .setThumbnail(message.member.user.displayAvatarURL())
        .setColor(3066993)
        .setTitle(`Member Joined`)
        .setFooter(`We are now ${message.member.guild.memberCount} members.`)
        .setTimestamp()
        message.channel.send(AutoRollin)
        message.channel.send(NotAutoRollin)
        message.channel.send(Member)
    }
    if(message.content.startsWith('roleall')){
        const role =  message.guild.roles.cache.find(role => role.name === "Member")
        const everyone2 = message.guild.members.cache.each(
            roles => roles.roles.add(role)
        )
        everyone2
        message.channel.send(`Given role "MEMBER" to ${message.guild.memberCount}`)
    }
    if(message.content.startsWith(x + "uptime")){
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        const UptimeEMbed = new Discord.MessageEmbed()
        .setAuthor(client.user.username)
        .addFields(
            { name: 'Hours', value: hours ,inline: true},
            { name: 'Minutes', value: minutes,inline: true},
            { name: 'Seconds', value: seconds ,inline: true}
        )
        .setTimestamp()
        .setFooter(`Uptime`)
        .setColor(3066993)
        message.channel.send(UptimeEMbed)
    }
if(message.content === `<@!${client.user.id}>`){
   const MyPRefixIs = new Discord.MessageEmbed()
        .setColor(3066993)
        .setAuthor('Prefix')
        .setDescription('`>`')
        .addField(`Presence`, '**ACTIVE**: :green_circle: ')
        .setTimestamp()
        message.channel.send(MyPRefixIs)
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
    if(command === '8ball'){
        client.commands.get('8ball').execute(message, args)
    };
    if(command === 'slowmode'){
        client.commands.get('slowmode').execute(message, args)
    };
   
   
  







});

client.mongoose.init();
client.login(process.env.token);



