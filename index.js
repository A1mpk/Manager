/// THE VARIABLES IMPORTANT!
const { POINT_CONVERSION_HYBRID, EMFILE, S_IFBLK } = require('constants');
const { Client, Collection, Structures, DiscordAPIError, Util, MessageEmbed} = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const { send, cpuUsage } = require('process');
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
// MUSIC VARIABLES :

// COMMAND HANDLER
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
// PREMIUM START???

/// PREFIX
const x = '>';
/// ALL THE LISTENERS :

client.on('guildCreate', guild => {
    guild.channels.create('logs')
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
                value: 'ban,kick,mute,bot_nick,rule_add,slowmode,unmute,clear,announce,lock,giverole'
            },     
            {
                name: '**🤩 Fun [5]**',
                value: 'pain,happy,8ball,say,karen'
            },
            {
                name: '**👂 LISTENERS [8]**',
                value: 'InviteCreate/Delete, RoleDelete, EmojiCreate/Delete, messageDelete, GuildMemberAdd/Remove'
            },
            {
                name: '**🛠️ Utilities [14]**',
                value: 'help,invite,update,membercount,verify,info,avatar,guild,getid,getuserid,report,nick,update,suggestion'
            }
        ],
        
        footer: {
            text: `Friendly`
        }
    }
  });
})
client.on('ready', () => {
    console.log(`I am in ${client.guilds.cache.size}.`)
    client.guilds.cache.forEach(ch => {
        console.log(ch.name)
    })
    client.user.setActivity(`>help`, {type: "WATCHING"})
})
client.on('guildMemberRemove', member => {
    const Channel = member.guild.channels.cache.find(ch => ch.name === "logs")
    const Joins = member.guild.channels.cache.find(ch => ch.name === "👋joins")
    if(!Joins) return member.guild.channels.create("👋joins")
    const EmbedLeft = new Discord.MessageEmbed()
    .setFooter(`We are now ${member.guild.memberCount} members.`)
    .setTimestamp()
    .setColor(3066993)
    .setThumbnail(member.user.displayAvatarURL())
    .setAuthor(`Member Left`)
    .setDescription(`Sad momento! ${member} just left the group!`)
    if(Channel){
        Channel.send(EmbedLeft)
    }else
   if(!Channel){
    member.guild.channels.create('logs', {
        nsfw: false,
        topic: 'Logging channel made for Mint.',
        permissionOverwrites: member.guild.roles.everyone, SEND_MESSAGE: false, VIEW_CHANNEL:false
    })
   } 
   if(Joins){
       Joins.send(EmbedLeft)
   }
   
})
client.on('messageDelete', message => {
    
    if(message.author.bot) return;
try{
    const GuildChannel = message.guild.channels.cache.find(c=> c.name === "logs")
    if(!GuildChannel) return message.guild.channels.create("logs")
    const MessageEmbed = new Discord.MessageEmbed()
    .setAuthor(`Message Deleted`)
    .addField(`Message :`, message)
    .addField('Sent by', message.member.user.tag)
    .addField('Deleted in', message.channel.name)
    .setThumbnail(message.member.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(`Deleted Message Log`)
    .setColor(3066993)
    GuildChannel.send(MessageEmbed)
    }catch(err){
    return;
    }


   
    

           
})
client.on('inviteCreate', invite => {
    const guildChannel = invite.guild.channels.cache.find(c=> c.name === "logs")
    if(!guildChannel) return invite.guild.channels.create("logs")
  
    const MessageEmbed2 = new Discord.MessageEmbed()
    .setAuthor(`Invite Created`)
    .addField(`Created by`, invite.inviter.tag)
    .addField(`Expire Date`, invite.expiresAt)
    .addField('Uses ', invite.maxUses)
    .addField('Channel for invite', invite.channel)
    .addField(`Invite URL`, invite.url)
    .setThumbnail(invite.inviter.displayAvatarURL())
    .setTimestamp()
    .setFooter(`Invite Logger`)
    .setColor(3066993)
    guildChannel.send(MessageEmbed2)
} )
client.on('inviteDelete', invite => {
    const guildChannel = invite.guild.channels.cache.find(c=> c.name === "logs")
    if(!guildChannel) return invite.guild.channels.create("logs")
    const MessageEmbed2 = new Discord.MessageEmbed()
    .setAuthor(`Invite Deleted`)
    .addField(`Deleted by`, invite.inviter.tag)
    .addField(`Expire Date`, invite.expiresAt)
    .addField('Uses ', invite.maxUses)
    .addField('Channel for invite', invite.channel)
    .setThumbnail(invite.inviter.displayAvatarURL())
    .setTimestamp()
    .setFooter(`Invite Delete Logger`)
    .setColor(3066993)
    guildChannel.send(MessageEmbed2)
})
client.on('emojiCreate', emoji => {
    const guildChannel23 = emoji.guild.channels.cache.find(c=> c.name === "logs")
    if(!guildChannel23) return emoji.guild.channels.create("logs")
    const MessageEmbed = new Discord.MessageEmbed()
    .setAuthor(`Emoji Created`)
    .addField(`Emoji Name`, emoji.name)
    .addField(`Emoji Created At`, emoji.createdAt)
    .addField('Emoji Animated', emoji.animated)
    .addField(`Emoji`, emoji)
    .setTimestamp()
    .setFooter(`Emoji Created`)
    .setColor(3066993)
    guildChannel23.send(MessageEmbed)
})
client.on('emojiDelete', emoji => {
    const guildChannel23 = emoji.guild.channels.cache.find(c=> c.name === "logs")
    if(!guildChannel23) return emoji.guild.channels.create("logs")
    const MessageEmbed = new Discord.MessageEmbed()
    .setAuthor(`Emoji Delete`)
    .addField(`Emoji Name`, emoji.name)
    .addField(`Emoji Created At`, emoji.createdAt)
    .addField('Emoji Animated', emoji.animated)
    .setTimestamp()
    .setFooter(`Emoji Deleted`)
    .setColor(3066993)
    guildChannel23.send(MessageEmbed)
})
client.on('roleDelete', Role=> {
    const role = Role.guild.channels.cache.find(c=> c.name === "logs")
    if(!role) return Role.guild.channels.create("logs")
    const ROleInfo = new Discord.MessageEmbed()
    .setAuthor('Role Deleted')
    .addField(`Role Name`, Role.name)
    .addField(`Role Creation Date`, Role.createdAt)
    .addField(`Role Color`, Role.color)
    .addField(`Role Hoist`, Role.hoist)
    .addField(`Role Mentionable`, Role.mentionable)
    .setTimestamp()
    .setThumbnail(Role.guild.iconURL())
    .setColor(3066993)
    role.send(ROleInfo)
})
client.on('guildMemberAdd', member => {
 
  const Joins = member.guild.channels.cache.find(ch => ch.name === "👋joins")
  if(!Joins) return member.guild.channels.create("👋joins") 
  const AutoRoleForSp = member.guild.roles.cache.find(role => role.name === "Member")
  if(!AutoRoleForSp) return   member.guild.roles.create({
    data: {
      name: 'Member',
      color: 'NONE',
      permissions: ['SEND_MESSAGES', 'ADD_REACTIONS', 'SPEAK', 'SEND_TTS_MESSAGES', 'STREAM', 'CONNECT', 'USE_EXTERNAL_EMOJIS', 'READ_MESSAGE_HISTORY'],
      
    },
    reason: 'Testing '
}
).then(member.guild.owner.send(`Member role was not found, therefore I have created another one, you can always change the permissions for the roles to however you like.`)) || member.send("I couldn't give you the member role. Please ask a moderator to give you it.")
.catch(console.error);
  
  const chja =  member.guild.channels.cache.find(ch => ch.name === "logs")
  if(!chja) return member.guild.channels.create('logs')
  
  const Member = new Discord.MessageEmbed()
  .setDescription(`Hey ${member}, welcome to ${member.guild}.`)
  .setThumbnail(member.user.displayAvatarURL())
  .setColor(3066993)
  .setTitle(`Member Joined`)
  .setFooter(`${member.guild.memberCount} members.`)
  .setTimestamp()
  
  
  chja.send(Member)
  Joins.send(Member)
  if(AutoRoleForSp) return member.roles.add(AutoRoleForSp) 
  
})
/// ALL THE COMMANDS HANDLER!
client.on('message', async message => {
    if(message.author.bot)return;
    if(message.channel.type === 'dm') return;

   
   if(message.content === "https://cdn.discordapp.com/attachments/642149292806635536/790622588564799518/video0_82.mp4"){
       message.delete()
       message.channel.send(`Stop SENDIND THAT!!!#!@31#!#@%!@$`)
   };
    if(message.content.startsWith(x +`credits`)){
        const BotInfo = new Discord.MessageEmbed()
        .setTitle(`Credits`)
        .addField(`Co-Owner`, `Souxle#8217`)
        .addField('Profile Picture', `Friendly#9411 (Bot Owner)`)
        .setThumbnail(message.guild.me.user.displayAvatarURL())
        .setFooter(`Command raised by ${message.member.user.tag}`)
        .setColor(3066993)
        message.channel.send(BotInfo)
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
        .setTimestamp()
        message.channel.send(MyPRefixIs)
        
        
}
if(message.content.startsWith( x + 'info')){
    const Info = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle('Mint')
    .setDescription(`Mint is an upcoming bot actively being developped. This bot will bring you moderation to music, logging to fun.`)
   .setFooter(`Thank you for using Mint💓`)
    .addFields(
        { name: 'Version', value: '0.0.5', inline: true },
        { name: `Guilds`, value: message.client.guilds.cache.size, inline: true },
        { name: 'Users', value: message.client.users.cache.size, inline: true },
        {
            name: "Invite me!",
            value: "[Invite](https://discord.com/api/oauth2/authorize?client_id=725787532008095744&permissions=8&scope=bot)",inline:true
          },
          {
            name: "Support Server",
            value: "[Join Support Server](https://discord.gg/4A6vZTmStS).",inline:true
          },
          {
            name: "Vote for me!",
            value: "[Vote](https://top.gg/bot/725787532008095744/vote)",inline:true
          },
    )
    .setThumbnail(message.client.user.displayAvatarURL())

    message.channel.send(Info)
}
let blacklisted = ['nigga','nigger','cunt','faggot','retard','retarded','retarted','whore','slut'] //words


let foundInText = false;
for (var i in blacklisted) { 
  if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
}

  if (foundInText) {
    message.delete()
}
    const args = message.content.slice(x.length).split(/ +/);
   if(!message.content.startsWith(x) || message.author.bot) return;
    const command = args.shift().toLowerCase();
    if(command === 'kick'){
        client.commands.get('kick').execute(message, args)
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
    if(command === 'ban'){
        client.commands.get('ban').execute(message, args)
        };
    if(command === 'report'){
    client.commands.get('report').execute(message, args)
    };

    if(command === 'eval'){
    client.commands.get('eval').execute(message, args)
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
    if(command === 'suggestion'){
        client.commands.get('suggestion').execute(message, args)
    };
    if(command === 'mute'){
        client.commands.get('mute').execute(message, args)
    };
    if(command === 'unmute'){
            client.commands.get('unmute').execute(message, args)
    };
    if(command === 'update'){
        client.commands.get('update').execute(message, args)
    };
    if(command === 'giverole'){
        client.commands.get('giverole').execute(message, args)
    };
    if(command === 'karen'){
        client.commands.get('karen').execute(message, args)
    };
});


client.mongoose.init();
client.login(process.env.token);



