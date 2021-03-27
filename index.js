/// THE VARIABLES IMPORTANT!
const { Client, Collection, Structures, DiscordAPIError, Util, MessageEmbed} = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require('./utils/mongoose');
client.categories = fs.readdirSync('./commands/');
const { config } = require('dotenv');
const ytdl = require('ytdl-core');
const Youtube = require('simple-youtube-api')
const youtube = new Youtube("AIzaSyDRzH6PP1AR3FR5CYB6riNei4BSEdJqLf8")
const Levels = require('discord-xp');
Levels.setURL("mongodb+srv://admin:LmVUsNQeLiYCsJfr@manager.hd8gy.mongodb.net/<DataBase505>?retryWrites=true&w=majority")
const Canvas = require('canvas');
const queue = new Map();
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
const RPC = require('discord-rpc');
const rpc = new RPC.Client({ transport: 'ipc' })
rpc.on('ready', () => {
  rpc.request('SET_ACTIVITY', {
  
  pid: process.pid,
  activity : {
  details : "VSC(Mint)",
  assets : {
  large_image : "e39",
  large_text : "BBC",
  small_image : "e39",
  small_text: "BEST NEWS"
  },
  
  buttons : [{label : "Invite" , url : "https://discord.com/api/oauth2/authorize?client_id=725787532008095744&permissions=8&scope=bot"}, {label: "Website", url : "https://sites.google.com/view/newsforgamers/home"}]
  }
  



})

})
rpc.login({
  clientId: "816732886870523935",
  clientSecret: "t5tp_u5YfKJC4BQVTXwj82wRc3kORXxh"
})
/// PREFIX
const x = '>';
/// ALL THE LISTENERS :

client.on('guildCreate', guild => {

    let defaultChannel = "";
guild.channels.cache.forEach((channel) => {
  if(channel.type == "text" && defaultChannel == "") {
    if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
      defaultChannel = channel;
    }
  }
})
try{
  defaultChannel.send({
    embed:{
        title: 'List of commands ',
        color: 3447003, 
        fields:[
            {
                name: '**😴 Moderation**',
                value: ' `>help Moderation || help m_list_2` - This section helps keep your server and community safe, secure and in control with these commands at your disposal.'
            },     
            {
                name: '**🤩 Fun **',
                value: '`>help fun` - This section can keep your server fun & enjoyable with these commands.'
            },
            {
                name: '🎵 Music ',
                value: '`>help music || help mu_list_2` - This section is made for playing musics, if bored & want to find out new tracks, members of this server can always play a track to keep the server comfortable.'
            },
            {
                name: '**👂 LISTENERS **',
                value: '`>help listeners` - This section is made for logging, to keep track of what is happening on your server & helps in moderation commands.'
            },
            {
                name: '**🛠️ Utilities [14]**',
                value: '`>help Utilities || u_list_2` - This section is about Utilities, commands that gives you information. such as membercount,verification,getID,getUserID.'
            },
            {
                name: '**⚙️ Configuration**',
                value: '`>help configs` - Config category, you can change the settings here to make your guild suit you! '
            }
         
        ],
        
    }
    })
}catch{
  return console.log(`I didnt have permission.`)
}

})

client.on('ready', () => {
  
 
    client.user.setActivity(`>help || >info`, {type: "WATCHING"})
})

client.on('error', error => {
   console.log(`An error occured : ${error.message}`)
   process.exit(1);

})

client.on('guildMemberRemove',async member => {
  const LoggingSchema = require("./commands/model/LoggingSchema")
        const cache = {} 
        let data = cache[member.guild.id]
      
        if (!data) {
          
      
       
            try {
              const result = await LoggingSchema.findOne({guildID: member.guild.id})
             if(!result)return;
              cache[member.guild.id] = data = [ result.channel]
              
            }catch(er){
              console.log(er)
            }
        }

        const Channel = member.guild.channels.cache.find( channel => data[0] === channel.id)
        if(!Channel)return;
 
  if(!member.guild.me.hasPermission('SEND_MESSAGES'))return;
  if(!member.guild.me.hasPermission('MANAGE_CHANNELS'))return;
  if(!member.guild.me.hasPermission("VIEW_CHANNEL"))return;

  const canvas = Canvas.createCanvas(506, 218)
  const ctx = canvas.getContext('2d')
  
  const background = await Canvas.loadImage(
   'BLACK-KARD-NOT-RACIST.png'
  )
  
  let x = 0
  let y = 0
  ctx.drawImage(background, x , y)
  
  
  const pfp = await Canvas.loadImage(
   member.user.displayAvatarURL({
      format: 'png'
    })
  )
  x = canvas.width / 2 - pfp.width / 2
  y =10
  ctx.strokeStyle = 'WHITE';
  ctx.drawImage(pfp,x, y)
  
  ctx.fillStyle = '#ffffff'
  ctx.font =`25px sans-serif`
  let text = `${member.user.tag} just left the group.`
  x = canvas.width / 2 - ctx.measureText(text).width / 2
  ctx.fillText(text, x, 45 + pfp.height)
  
  ctx.font = '20px sans-serif'
  text = `${member.guild.memberCount} members!`
  x = canvas.width / 2 - ctx.measureText(text).width / 2
  ctx.fillText(text,x,80 + pfp.height)
  const attachment = new Discord.MessageAttachment(canvas.toBuffer())

try{
  Channel.send(`Bye ${member}, we will miss you!`,attachment)
  
}catch(er){
  console.warn(`An error occured : ${er}`);
}
})
client.on('messageDelete',async message => {
  const LoggingSchema = require("./commands/model/LoggingSchema")
        const cache = {} 
        let data = cache[message.guild.id]
      
        if (!data) {
          
      
       
            try {
              const result = await LoggingSchema.findOne({guildID: message.guild.id})
             if(!result)return;
              cache[message.guild.id] = data = [ result.channel]
              
            }catch(er){
              console.log(er)
            }
        }

        const Channel = message.guild.channels.cache.find( channel => data[0] === channel.id)
        if(!Channel)return;
  if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
  if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
  if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
    if(message.author.bot) return;
try{
    const MessageEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
    .setDescription(`**Message sent by ${message.member} deleted in ${message.channel}. "${message.content}"**`, )

    
    .setTimestamp()
    .setFooter(`Author : ${message.author.id} | Message ID : ${message.channel.id}`)
    
    .setColor("RED")
   
      
    Channel.send(MessageEmbed)
    }catch(er){
      return;
    }


   
    

           
})
client.on('inviteCreate', async invite => {
  if(!invite.guild.me.hasPermission('SEND_MESSAGES'))return;
  if(!invite.guild.me.hasPermission('MANAGE_CHANNELS'))return;
  if(!invite.guild.me.hasPermission("VIEW_CHANNEL"))return;
  const LoggingSchema = require("./commands/model/LoggingSchema")
  const cache = {} 
  let data = cache[invite.guild.id]

  if (!data) {
    

 
      try {
        const result = await LoggingSchema.findOne({guildID: invite.guild.id})
       if(!result)return;
        cache[invite.guild.id] = data = [ result.channel]
        
      }catch(er){
        console.log(er)
      }
  }

  const Channel = invite.guild.channels.cache.find( channel => data[0] === channel.id)
  if(!Channel)return;
    const MessageEmbed2 = new Discord.MessageEmbed()
    .setAuthor(`${invite.inviter.tag}`,invite.inviter.displayAvatarURL())
    .setTimestamp()
    .setDescription(`**An invite has been created by ${invite.inviter} for ${invite.channel}.**`)
    .setFooter(`Inviter:  ${invite.inviter.id} | Link: ${invite.url}`)
    .setColor("BLUE")
 
    Channel.send(MessageEmbed2)
} )
client.on('inviteDelete',async invite => {
  if(!invite.guild.me.hasPermission('SEND_MESSAGES'))return;
  if(!invite.guild.me.hasPermission('MANAGE_CHANNELS'))return;
  if(!invite.guild.me.hasPermission("VIEW_CHANNEL"))return;
  const LoggingSchema = require("./commands/model/LoggingSchema")
  const cache = {} 
  let data = cache[invite.guild.id]

  if (!data) {
    

 
      try {
        const result = await LoggingSchema.findOne({guildID: invite.guild.id})
       if(!result)return;
        cache[invite.guild.id] = data = [ result.channel]
        
      }catch(er){
        console.log(er)
      }
  }

  const Channel = invite.guild.channels.cache.find( channel => data[0] === channel.id)
  if(!Channel)return;
  const MessageEmbed2 = new Discord.MessageEmbed()
  .setAuthor(`${invite.inviter.tag}`,invite.inviter.displayAvatarURL())
  .setTimestamp()
  .setDescription(`**Invite made  by ${invite.inviter} has been deleted.**`)
  .setFooter(`Inviter:  ${invite.inviter.id}  `)
  .setColor("BLUE")
   
    Channel.send(MessageEmbed2)
})
client.on('emojiCreate', async emoji => {
  if(!emoji.guild.me.hasPermission('SEND_MESSAGES'))return;
  if(!emoji.guild.me.hasPermission('MANAGE_CHANNELS'))return;
  if(!emoji.guild.me.hasPermission("VIEW_CHANNEL"))return;
  const LoggingSchema = require("./commands/model/LoggingSchema")
  const cache = {} 
  let data = cache[emoji.guild.id]

  if (!data) {
    

 
      try {
        const result = await LoggingSchema.findOne({guildID: emoji.guild.id})
       if(!result)return;
        cache[emoji.guild.id] = data = [ result.channel]
        
      }catch(er){
        console.log(er)
      }
  }

  const Channel = emoji.guild.channels.cache.find( channel => data[0] === channel.id)
  if(!Channel)return;
    const MessageEmbed2 = new Discord.MessageEmbed()
    .setAuthor(emoji.name)
    .setTimestamp()
    .setDescription(`*Emoji "${emoji.name}" has been created! ${emoji}*`)
    
    .setColor("PURPLE")
    
    Channel.send(MessageEmbed2)
})
client.on('emojiDelete',async emoji => {
  if(!emoji.guild.me.hasPermission('SEND_MESSAGES'))return;
  if(!emoji.guild.me.hasPermission('MANAGE_CHANNELS'))return;
  if(!emoji.guild.me.hasPermission("VIEW_CHANNEL"))return;
  const LoggingSchema = require("./commands/model/LoggingSchema")
  const cache = {} 
  let data = cache[emoji.guild.id]

  if (!data) {
    

 
      try {
        const result = await LoggingSchema.findOne({guildID: emoji.guild.id})
       if(!result)return;
        cache[emoji.guild.id] = data = [ result.channel]
        
      }catch(er){
        console.log(er)
      }
  }

  const Channel = emoji.guild.channels.cache.find( channel => data[0] === channel.id)
  if(!Channel)return;
    const MessageEmbed2 = new Discord.MessageEmbed()
    .setAuthor(`${emoji.name}`)
    .setTimestamp()
    .setThumbnail(emoji.guild.iconURL())
    .setDescription(`*Emoji "${emoji.name}" has been deleted!*`)
    .setThumbnail(emoji.guild.iconURL({dynamic: false}))
    .setColor("PURPLE")
    Channel.send(MessageEmbed2)
})
client.on('roleDelete',async Role=> {
  if(!Role.guild.me.hasPermission('SEND_MESSAGES'))return;
  if(!Role.guild.me.hasPermission('MANAGE_CHANNELS'))return;
  if(!Role.guild.me.hasPermission("VIEW_CHANNEL"))return;
  const LoggingSchema = require("./commands/model/LoggingSchema")
  const cache = {} 
  let data = cache[Role.guild.id]

  if (!data) {
    

 
      try {
        const result = await LoggingSchema.findOne({guildID: Role.guild.id})
       if(!result)return;
        cache[Role.guild.id] = data = [ result.channel]
        
      }catch(er){
        console.log(er)
      }
  }

  const Channel = Role.guild.channels.cache.find( channel => data[0] === channel.id)
  if(!Channel)return;
  
    const ROleInfo = new Discord.MessageEmbed()
    .setAuthor(Role.name)
   .setDescription(`Role ${Role.name} has been deleted.`)
    .setTimestamp()
    .setThumbnail(Role.guild.iconURL())
    .setColor("PURPLE")
    Channel.send(ROleInfo)
})
// Rich presence 




client.on('guildMemberAdd', async member => {
  const LoggingSchema = require("./commands/model/LoggingSchema")
  const cache = {} 
  let data = cache[member.guild.id]

  if (!data) {
    

 
      try {
        const result = await LoggingSchema.findOne({guildID: member.guild.id})
       if(!result)return;
        cache[member.guild.id] = data = [ result.channel]
        
      }catch(er){
        console.log(er)
      }
  }

  const Channel = member.guild.channels.cache.find( channel => data[0] === channel.id)
  if(!Channel)return;
  if(!member.guild.me.hasPermission('SEND_MESSAGES'))return;
  if(!member.guild.me.hasPermission('MANAGE_CHANNELS'))return;
  if(!member.guild.me.hasPermission("VIEW_CHANNEL"))return;
  

  const canvas = Canvas.createCanvas(506, 218)
  const ctx = canvas.getContext('2d')
  
  const background = await Canvas.loadImage(
   'BLACK-KARD-NOT-RACIST.png'
  )
  
  let x = 0
  let y = 0
  ctx.drawImage(background, x , y)
  
  
  const pfp = await Canvas.loadImage(
   member.user.displayAvatarURL({
      format: 'png'
    })
  )
  x = canvas.width / 2 - pfp.width / 2
  y =10
  ctx.strokeStyle = 'WHITE';
  ctx.drawImage(pfp,x, y)
  
  ctx.fillStyle = '#ffffff'
  ctx.font =`25px sans-serif`
  let text = `Welcome ${member.user.tag}`
  x = canvas.width / 2 - ctx.measureText(text).width / 2
  ctx.fillText(text, x, 45 + pfp.height)
  ctx.fillStyle = '#ffffff'
  ctx.font = '20px sans-serif'
  text = `${member.guild.memberCount}th member!`
  x = canvas.width / 2 - ctx.measureText(text).width / 2
  ctx.fillText(text,x,80 + pfp.height)
  const attachment = new Discord.MessageAttachment(canvas.toBuffer())
try{
  const AutoRoleSchema2 = require("./commands/model/AutoRole")
  const cache2 = {} 
  let data2 = cache2[member.guild.id]

  if (!data2) {
    

 
      try {
        const result2 = await AutoRoleSchema2.findOne({ _id: member.guild.id})
       if(!result2)return;
        cache2[member.guild.id] = data2 = [result2.autorole]
      }catch(er){
        console.log(er)
      }
  } 
  const actualrole = member.guild.roles.cache.find(role => data2[0] === role.id)
    if(!actualrole)return;
    member.roles.add(actualrole)
 
  Channel.send(`Hey ${member}, welcome to **${member.guild.name}**`,attachment)
  
}catch(er){
  console.warn(`Error : ${er}`);
}
})
/// ALL THE COMMANDS HANDLER!

client.on('message', async message => {
    if(message.author.bot)return;
    if(message.channel.type === 'dm') return;
    const serverQueue = queue.get(message.guild.id);

   
      const randomXp = Math.floor(Math.random() * 15) + 1;
      const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
      if(hasLeveledUp){
        const LevelsSchema = require("./commands/model/levels")
        const cache = {} 
        let data = cache[message.guild.id]
      
        if (!data) {
          
      
       
            try {
              const result = await LevelsSchema.findOne({guildID: message.guild.id})
             if(!result)return;
              cache[message.guild.id] = data = [result.levels]
              
            }catch(er){
              console.log(er)
            }
        }
        
        if(data[0] === "disable")return;
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`Congratulations <@${message.member.user.id}>, you just reached level ${user.level}.`)
      };
     
     
   
    
 
 
  

if(message.content.startsWith(x + 'spotify')){
  try{
    if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
    let user;
  


if (message.mentions.users.first()) {
  user = message.mentions.users.first();
} else {
  user = message.author;
}

let convert = require('parse-ms')

let status = user.presence.activities[0];

if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") return message.channel.send("This user isn't listening the Spotify.");

if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
  let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
      url = `https://open.spotify.com/track/${status.syncID}`,
      name = status.details,
      artist = status.state,
      album = status.assets.largeText,
      timeStart = status.timestamps.start,
      timeEnd = status.timestamps.end,
      timeConvert = convert(timeEnd - timeStart);
  
  let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
  let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
  
  let time = `${minutes}:${seconds}`;
  const embed = new Discord.MessageEmbed()
  .setAuthor("Spotify", "https://th.bing.com/th/id/R51a2b615791a987a46af18beed1ac882?rik=ihrJdQVay12aqA&riu=http%3a%2f%2fmedia.idownloadblog.com%2fwp-content%2fuploads%2f2016%2f02%2fSpotify-App-Icon-Large.png&ehk=69W%2bQrgPsZ2wP0g5JEZQs47EbsdD%2fNOV6VgsVsRHgIQ%3d&risl=&pid=ImgRaw")
  .setColor(3447003)
  .setThumbnail(image)
  .addField("Name:", name)
  .addField("Album:", album)
  .addField("Artist:", artist)
  .addField("Duration:", time)
  .addField("Listen on Spotify", `[\`${artist} - ${name}\`](${url})`, false)

message.channel.send(embed)
}
}catch(er){
    
     message.member.send('I need `SEND_MESSAGE` permissions to perform that command.')
 }
  

}
  
 
if(message.content.startsWith(x + 'rank')){
  try{
    if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
    const LevelsSchema = require("./commands/model/levels")
    const cache = {} 
    let data = cache[message.guild.id]
  
    if (!data) {
      
  
   
        try {
          const result = await LevelsSchema.findOne({guildID: message.guild.id})
         if(!result)return message.channel.send(`Levelling for this guild has been disabled by default.`)
          cache[message.guild.id] = data = [result.levels]
          
        }catch(er){
          console.log(er)
        }
    }
    if(data[0] === "disable")return message.channel.send(`Levelling system is currently disabled in this guild.`)
    const mesag = message.content.slice(5)
  
    const target = message.author 
    const user = await Levels.fetch(target.id,message.guild.id)
    if(!user) return message.channel.send(`You dont have any xp yet, be more active in this guild to gain more xp!`)
    const neededXP2 = Levels.xpFor(parseInt(user.level) + 1);
  
  
    const canvas = Canvas.createCanvas(1000, 333)
    const ctx = canvas.getContext('2d')
  
    const background = await Canvas.loadImage(
     '801095.jpg'
    )
  
  
  ctx.drawImage(background,0,0, canvas.width, canvas.height)
  
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'WHITE';
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = "#000000";
  ctx.fillRect(180, 216, 770, 65);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeRect(180,216,770,65);
  ctx.stroke();
  
  ctx.fillStyle = "#ffffff";
  ctx.globalAlpha = 0.6;
  ctx.fillRect(180, 216, 65 )
  ctx.fill();
  ctx.globalAlpha = 1;
  
  ctx.font = "bold 36px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = " WHITE";
  ctx.fillText(`${user.xp} / ${neededXP2} XP`, 650,260);
  
  ctx.textAlign = "left";
  ctx.fillText(`${target.tag}`, 300, 120);
  
  ctx.font = "bold 50px Arial";
  ctx.fillText("LEVEL", 300,180);
  ctx.fillText(user.level, 470 , 180);
  
  ctx.arc(170, 160 , 120 , 0, Math.PI * 2, true);
  ctx.lineWidth = 6;
  
  
  ctx.strokeStyle = "WHITE" ;
  ctx.stroke();
  ctx.closePath();
  ctx.clip();
  const avatar = await Canvas.loadImage(target.displayAvatarURL({format: 'png'}, ));
  ctx.drawImage(avatar, 40,40,250,250)
  
  
  
  
  
    const attachment = new Discord.MessageAttachment(canvas.toBuffer() , "rank.png")
    message.channel.send(attachment)
}catch(er){
    
     message.member.send('I need `SEND_MESSAGE` permissions to perform that command.')
 }
 
};
   

    if(message.content.toLowerCase().includes( x + "leaderboard" .toLowerCase())){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        const LevelsSchema = require("./commands/model/levels")
        const cache = {} 
        let data = cache[message.guild.id]
      
        if (!data) {
          
      
       
            try {
              const result = await LevelsSchema.findOne({guildID: message.guild.id})
             if(!result)return message.channel.send(`Levelling for this guild has been disabled by default.`)
              cache[message.guild.id] = data = [result.levels]
              
            }catch(er){
              console.log(er)
            }
        }
        if(data[0] === "disable")return message.channel.send(`Levelling system is currently disabled in this guild.`)
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id,5 );
       
        if( rawLeaderboard.length < 1)return message.channel.send(`Yet no one is ranked.`)
        
        const leaderboard = Levels.computeLeaderboard(client, rawLeaderboard)
  
        const lb = (await leaderboard).map( e => `**User :** ${e.username}#${e.discriminator}\n **Rank** : ${e.position} \n**Level**: ${e.level}\n**XP** : ${e.xp.toLocaleString()}`);
        const LeaderBord = new MessageEmbed()
        .setTitle(`Leaderboard in ${message.guild.name}`)
        .setDescription(lb.join("\n\n\n"))
        .setTimestamp()
        .setColor(3447003)
        message.channel.send(LeaderBord)
       
        return;

}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions to perform that command.')
     }
     
    };
   
    if (message.content.toLowerCase().includes( x + "play".toLowerCase())) {
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        execute(message, serverQueue);
        return;

}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions to perform that command.')
     }
       
      } else if (message.content.toLowerCase().includes(x +"skip".toLowerCase())) {
        try{
          if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
          skip(message, serverQueue);
          return;
  
  }catch(er){
          
           message.member.send('I need `SEND_MESSAGE` permissions to perform that command.')
       }
      } else if (message.content.toLowerCase().includes(x +"stop".toLowerCase())) {
        try{
          if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
         stop(message, serverQueue);
          return;
  
  }catch(er){
          
           message.member.send('I need `SEND_MESSAGE` permissions to perform that command.')
       }
      }else if(message.content.toLowerCase().includes(x +"volume".toLowerCase())){
        try{
          if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
          volume(message, serverQueue);
          return;
  
  }catch(er){
          
           message.member.send('I need `SEND_MESSAGE` permissions to perform that command.')
       }
      }else if(message.content.toLowerCase().includes(x +"np".toLowerCase())){
        try{
          if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
          np(message, serverQueue);
          return;
  
  }catch(er){
          
           message.member.send('I need `SEND_MESSAGE` permissions to perform that command.')
       }
      }else if(message.content.toLowerCase().includes(x +"queue".toLowerCase())){
        try{
          if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
         Queue(message, serverQueue);
          return;
  
  }catch(er){
          
           message.member.send('I need `SEND_MESSAGE` permissions to perform that command.')
       }
      }else if(message.content.toLowerCase().includes(x +"pause".toLowerCase())){
        try{
          if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
          pause(message, serverQueue);
          return;
  
  }catch(er){
          
           message.member.send('I need `SEND_MESSAGE` permissions to perform that command.')
       }
      }else if (message.content.toLowerCase().includes(x +"resume".toLowerCase())){
        try{
          if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
          resume(message, serverQueue);
          return;
  
  }catch(er){
          
           message.member.send('I need `SEND_MESSAGE` permissions to perform that command.')
       }
      }else if(message.content.toLowerCase().includes(x +"loop".toLowerCase())){
        try{
          if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
          loop(message, serverQueue);
          return;
  
  }catch(er){
          
           message.member.send('I need `SEND_MESSAGE` permissions to perform that command.')
       }
      }else if(message.content.toLowerCase().includes(x + "shuffle")){
        try{
          if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
         shuffle(message, serverQueue);
          return;
  
  }catch(er){
          
           message.member.send('I need `SEND_MESSAGE` permissions to perform that command.')
       }
      }else if(message.content.toLowerCase().includes(x + "leave")){
        try{
          if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
          leave(message, serverQueue);
          return;
  
  }catch(er){
          
           message.member.send('I need `SEND_MESSAGE` permissions to perform that command.')
       }
      }else if(message.content.toLowerCase().includes(x + 'join'.toLowerCase())){
        try{
          if(!message.guild.me.hasPermission("CONNECT"))return;
          join(message, serverQueue);
          return;
  
  }catch(er){
          
           message.member.send('I need `CONNECT` permissions to perform that command.')
       }
      }
      async function execute(message, serverQueue) {
        const args = message.content.slice(5)
        const searchString = message.content.slice(5)
        if(!args){
          const Kick = new Discord.MessageEmbed()
         .setTitle('PLAY - MUSIC')
         .setDescription('`>play <query>` - This is a play command, it plays music in a voice channel. The query can either be a link or a YouTube keyword.')
       
         .setColor(3447003)
         .setTimestamp()
         return message.channel.send(Kick)
        }
        const  url = args ? args.replace(/<(.+)>/g, '$1') : ''
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
          return message.channel.send(
            "You need to be in a voice channel to play music!"
          );
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
          return message.channel.send(
            "I need the permissions to join and speak in your voice channel!"
          );
        }
        try{ 
          var video = await youtube.getVideoByID(url)
        }catch {
          try {
            var videos = await youtube.searchVideos(searchString, 1)
            var video = await youtube.getVideoByID(videos[0].id)
          }catch {
            return message.channel.send(`I couldn't find any search results`)
          }
        }
      
    
        const song = {
              id: video.id,
              title: Util.escapeMarkdown(video.title),
              url: `https://www.youtube.com/watch?v=${video.id}`,
              author: video.channel.title,
              channelURL: video.channel.url,
              minutes: video.duration.minutes,
              seconds: video.duration.seconds,
              hours: video.duration.hours,
            
         };
        if (!serverQueue) {
          const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 2,
            playing: true,
            loop: false,
            queueloop: false,
            shuffle: false,

          };
      
          queue.set(message.guild.id, queueContruct);
      
          queueContruct.songs.push(song);
      
          try {
               
            var connection = await voiceChannel.join()
            
            connection.voice.setSelfDeaf(true);
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
          } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
          }
        } else {
         try{
           if(!message.guild.me.voice.channel){
             message.channel.send(`I am not in a voice channel, run the command >join to make me join`)
             console.log(serverQueue.playing)
           }else 
           if(message.guild.me.voice.channel){
            const QueueAdded = new MessageEmbed()
            .setAuthor(`Added to queue`, `https://www.freeiconspng.com/uploads/youtube-logo-png-hd-14.png`)
            .setDescription(`[${song.title}](${serverQueue.songs[0].url}) by [${song.author}](${serverQueue.songs[0].url})`)
            .setColor(3447003)
            .setTimestamp()
          
          serverQueue.songs.push(song);
          return message.channel.send(QueueAdded);
           }
         
         }catch(er){
           message.channel.send(`An error occured : ${er}, **contact us if it happens again!**`)
         }
           
          
            
        }
      }
      // QUEUE
      function Queue(message, serverQueue){
        if(!serverQueue)return message.channel.send(`The queue is empty!`)
        const QueueEmbed = new MessageEmbed()
        .setDescription(`
        ${serverQueue.songs.map(song => `  **[${song.title}](${serverQueue.songs[0].url}) by [${song.author}](${serverQueue.songs[0].url})**`).join(`\n`)}`)
        .setColor(3447003)
        .setTimestamp()
        .setAuthor(`Queue`)
      
       message.channel.send(QueueEmbed)
       return undefined
        }
      // SKIP
      function skip(message, serverQueue) {
        if (!message.member.voice.channel)
          return message.channel.send(
            "You have to be in a voice channel to stop the music!"
          );
          if(!message.guild.me.voice)return message.channel.send(`There is nothing playing right now.`)
        if (!serverQueue)
          return  message.channel.send("There is nothing in the queue to skip! Add some music!");
            serverQueue.connection.dispatcher.end();
           
        
          
        
      }
      // LOOP 
      function loop(message, serverQueue){
        const LoopType = message.content.slice(5)
        if(!message.member.voice.channel) return message.channel.send(`You need to be in a voice channel to loop the song.`)
        if(!serverQueue) return message.channel.send('The song queue is empty! Add some music.')
        
       if(!LoopType){
       
        serverQueue.loop = !serverQueue.loop
        return message.channel.send(`${serverQueue.loop ? `**✅Enabled**` : `**✅Disabled**`} looping.`)
       }else
       // LOOP THE WHOLE QUEUE
       if(LoopType){
        if(LoopType.toLowerCase().includes("queue".toLowerCase())){
          
          serverQueue.queueloop = !serverQueue.queueloop
          return message.channel.send(`${serverQueue.queueloop ? `**✅Enabled**` : `**✅Disabled**`} looping **queue**.`)
          // INVALID COMMAND
        }else
         message.channel.send(`"${LoopType}" is an invalid loop type.`)
       }
        
      }
      // STOP
      function stop(message, serverQueue) {
        if (!message.member.voice.channel)
          return message.channel.send(
            "You have to be in a voice channel to stop the music!"
          );
          
        if (!serverQueue)
          return message.channel.send("There is no song that I could stop!");
          
        serverQueue.songs = [];
        message.channel.send(`I have stopped the music for you.`)
        serverQueue.connection.dispatcher.end();
      }
      // SHUFFLE
      function shuffle(message, serverQueue){
        if(!message.member.voice.channel)return message.channel.send(`You are not in a voice channel, please join one.`)
        if(!serverQueue)return message.channel.send(`There is no songs in the queue to shuffle.`)

        serverQueue.shuffle = !serverQueue.shuffle
        
        return message.channel.send(`${serverQueue.shuffle ? `**✅Enabled**` : `**✅Disabled**`} shuffle mode.`)
        
        
      }
      function leave(message, serverQueue){
        if(!message.member.voice.channel)return message.channel.send(`Connect to a voice channel for me to leave.`)
        if(!message.guild.me.voice.channel)return message.channel.send(`I am not connected in a voice channel.`)
    else
          queue.delete(message.guild.id,)
          message.member.voice.channel.leave()
        
          message.channel.send(`I have left the voice channel.`)
        

            }
       function join(message, serverQueue){
         if(!message.member.voice.channel)return message.channel.send(`You are not in a voice channel.`)
        if(message.guild.me.voice.channel)return message.channel.send(`I am already connected to a voice channel.`)
        
         else
          message.member.voice.channel.join()
          message.channel.send(`Joining ${message.member.voice.channel.name}`)
          queue.delete(message.guild.id)
         
        
        
         
         
       }
    
      // VOLUME
      function volume(message, serverQueue) {
        const volumeArgs = message.content.slice(7)
        const Playing = new MessageEmbed()
        .setAuthor(`Volume`)
        .setDescription(`🎵✅Successfully changed the volume to **${volumeArgs}**!`)
        .setColor(3447003)
        .setTimestamp()
        
       
        if(!message.member.voice.channel)return message.channel.send(`You need to be in a voice channel`);
          if(!serverQueue) return message.channel.send(`There is no music playing!`)
          
          if(!volumeArgs)return message.channel.send(`The current volume is **${serverQueue.volume}**!`)
          if(isNaN(volumeArgs)) return message.channel.send(`That is not a number!`);
          if(volumeArgs > 5)return message.channel.send(`The maximum volume is 5!`)
          serverQueue.volume = volumeArgs
          serverQueue.connection.dispatcher.setVolumeLogarithmic(volumeArgs /5)
          message.channel.send(Playing)
          return undefined
      }
      
      // NOW PLAYING
      function np(message, serverQueue){
        const disabled = false
        if(disabled)return message.channel.send("Embed version containing duration is no longer supported due to an error.")
        if(!serverQueue) return message.channel.send(`There is nothing playing!`);
        if(!serverQueue.songs[1])return message.channel.send(`Currently playing **${serverQueue.songs[0].title}** by **${serverQueue.songs[0].author}**`)
        const NowPlayingHours = new MessageEmbed()
        .setAuthor(`Currently Playing`)
        .setDescription(`**Currently playing** **[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**`)
        .setColor(3447003)
        .addFields(
          { name: `Duration`, value: `Disabled`, inline: true }, 
          { name: `Coming Next`, value: `[${serverQueue.songs[1].title}](${serverQueue.songs[1].url})`, inline: true }, 
          { name: `Looping`, value: serverQueue.loop, inline: true },
          { name: `Queue Looping`, value: serverQueue.queueloop, inline: true },
        )
        .setTimestamp()
         message.channel.send(NowPlayingHours)
      
        
      }
      
      // RESUME
      function resume(message,serverQueue){
        if(!message.member.voice.channel)return message.channel.send('You need to be in a voice channel to resume the music.')
        if(!serverQueue)return message.channel.send(`There is no music to resume.`)
        if(serverQueue.playing) return message.channel.send(`The music is already playing.`)
        serverQueue.playing = true
        serverQueue.connection.dispatcher.resume()
        message.channel.send(`I have resumed the music for you!`)
        return undefined
      }
     
     
      // PAUSE
      function pause(message, serverQueue){
        if(!message.member.voice.channel) return message.channel.send(`You need to be in a voice channel to pause the music!`)
        if(!serverQueue) return message.channel.send(`There is no songs playing.`)
        if(!serverQueue.playing)return message.channel.send(`The music is already paused.`)
        serverQueue.playing = false
        serverQueue.connection.dispatcher.pause()
        message.channel.send(`I have paused the music.`)
        return undefined
      }
      // PLAY
      function play(guild, song) {
        
        const serverQueue = queue.get(guild.id);
        if (!song) {
          serverQueue.voiceChannel.leave();
          queue.delete(guild.id);
          return;
        }
      
        const Playing = new MessageEmbed()
        .setAuthor(`Now Playing`, `https://www.freeiconspng.com/uploads/youtube-logo-png-hd-14.png`)
        .setDescription(`[${song.title}](${serverQueue.songs[0].url}) by [${song.author}](${serverQueue.songs[0].url})!`)
        .setColor(3447003)
        .setFooter(message.author.tag, message.author.displayAvatarURL())
    
        const dispatcher = serverQueue.connection
          .play(ytdl(song.url))
          .on("finish", () => {
            if (serverQueue.queueloop === true){
              serverQueue.songs.push(serverQueue.songs.shift());
            }else 
            if(!serverQueue.loop){
              serverQueue.songs.shift()
            }else
            if(serverQueue.loop){
              if(serverQueue.queueloop){
                serverQueue.queueloop = !serverQueue.queueloop
                message.channel.send("I have disabled queue looping due to loop being enabled.")
              }
            }else
            if(serverQueue.queueloop){
              if(serverQueue.loop){
                serverQueue.loop = !serverQueue.loop
                message.channel.send("I have disabled track looping due to queue loop being enabled.")
              }
            }
            
            

        
          
            play(guild, serverQueue.songs[0]);
          })
          .on("error", error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(Playing);
        
      }
   
  if(message.content.startsWith("meme")){
    const randomPuppy = require("random-puppy")
    let reddit = [
      "meme",
      "animemes",
      "MemesOfAnime",
      "animememes",
      "AnimeFunny",
      "dankmemes",
      "dankmeme",
      "wholesomememes",
      "MemeEconomy",
      "techsupportanimals",
      "meirl",
      "me_irl",
      "2meirl4meirl",
      "AdviceAnimals"
  ]

  let subreddit = reddit[Math.floor(Math.random() * reddit.length)];



  randomPuppy(subreddit).then(async url => {
          await message.channel.send({
              files: [{
                  attachment: url,
                  name: 'meme.png'
              }]
          }).then(() => message.channel.stopTyping());
  }).catch(console.log("Error"));

};
  
    if(message.content.toLowerCase().includes(x +"uptime".toLowerCase())){

      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
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
        .setColor(3447003)
        message.channel.send(UptimeEMbed)
        
    }catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
      
}
  
if(message.content.toLowerCase().includes(x +"info".toLowerCase())){
  try{
    if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
    const Info = new Discord.MessageEmbed()
    .setColor(3447003)
    .setTitle('Mint')
    .setDescription(`Mint is an upcoming bot actively being developped. This bot will bring you moderation to music, logging to fun.`)
   .setFooter(`Thank you for using Mint`)
    .addFields(
        { name: 'Version', value: '2.0.2', inline: true },
        { name: `Guilds`, value: message.client.guilds.cache.size, inline: true },
        { name: 'Users', value: message.client.users.cache.size, inline: true },
        {
            name: "Links",
            value: "[Invite](https://discord.com/api/oauth2/authorize?client_id=725787532008095744&permissions=8&scope=bot) |** ** | [Support Server](https://discord.gg/fBbnrRe8gg) |** ** | [Vote for me](https://top.gg/bot/725787532008095744/vote) |** ** | [Website](https://sites.google.com/view/mint2020-com/home) ",inline:true
          }
    )
    .setThumbnail(message.client.user.displayAvatarURL())

    message.channel.send(Info)
    
}catch(er){
    
     message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
 }
   
}

    const args = message.content.slice(x.length).split(/ +/);
   if(!message.content.startsWith(x) || message.author.bot) return;
    const command =args.shift().toLowerCase();
    if(command === 'kick'){
      try{
        if(!message.guild.me.hasPermission("KICK_MEMBERS"))return;
        client.commands.get('kick').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `KICK_MEMBERS` permissions on my role to perform that command.')
     }
       
    };
    if(command === 'lock'){
    client.commands.get('lock').execute(message, args)
    };
    if(command === 'announce'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('announce').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
   
    };
    if(command === 'avatar'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('avatar').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
    };
    if(command === 'say'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('say').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
    };
    if(command === 'invite'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('invite').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
    }
    if(command === 'guild'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('guild').execute(message, args)
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
   
    };
  
    if(command === 'help'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('help').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command. Also make sure I have at least most perms so I can do most of the commands.')
     }
    };
    if(command === 'ban'){
      try{
        if(!message.guild.me.hasPermission("BAN_MEMBERS"))return;
        client.commands.get('ban').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `BAN_MEMBERS` permissions on my role to perform that command.')
     }
        };
    if(command === 'report'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('report').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
    };

    if(command === 'eval'){
    client.commands.get('eval').execute(message, args)
    };
    if(command === 'credit'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('credit').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
    };
    if(command === 'membercount'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('membercount').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
    };
    if(command === 'rule_add'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('rule_add').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
    };
    if(command === 'nick'){
      try{
        if(!message.guild.me.hasPermission("MANAGE_NICKNAMES"))return;
        client.commands.get('nick').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `MANAGE_NICKNAMES` permissions on my role to perform that command.')
     }
    };
    if(command === 'gaymeter'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('gaymeter').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
      };
      if(command === 'simpmeter'){
        try{
          if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
          client.commands.get('simpmeter').execute(message,args)
          
  }catch(er){
          
           message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
       }
        };
        if(command === 'dogwater'){
          try{
            if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
            client.commands.get('dogwater').execute(message,args)
            
    }catch(er){
            
             message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
         }
          };
    if(command === 'bot_nick'){
    client.commands.get('bot_nick').execute(message, args)
    };
    if(command === 'getid'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('getid').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
    };
    
   
    if(command === 'getuserid'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('getuserid').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
    };
    if(command === 'clear'){
      try{
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES"))return;
        client.commands.get('clear').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `MANAGE_MESSAGES` permissions on my role to perform that command.')
     }
    };
    if(command === 'verify'){
      try{
        if(!message.guild.me.hasPermission("MANAGE_MEMBERS"))return;
        client.commands.get('verify').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `MANAGE_MEMBERS` permissions on my role to perform that command.')
     }
    };
    if(command === '8ball'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('8ball').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
    };
    if(command === 'slowmode'){
      try{
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS"))return;
        client.commands.get('slowmode').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `MANAGE_CHANNELS` permissions on my role to perform that command.')
     }
    };
    if(command === 'suggestion'){
      try{
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS"))return;
        client.commands.get('suggestion').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `MANAGE_CHANNELS` permissions on my role to perform that command.')
     }
    };
    if(command === 'autorole_remove'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('autorole_remove').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
  };
  if(command === 'loggings'){
    try{
      if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
      client.commands.get('loggings').execute(message,args)
      
}catch(er){
      
       message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
   }
};
    if(command === 'mute'){
      try{
        if(!message.guild.me.hasPermission("MANAGE_MEMBERS"))return;
        client.commands.get('mute').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `MANAGE_MEMBERS` permissions on my role to perform that command.')
     }
    };
    if(command === 'unmute'){
      try{
        if(!message.guild.me.hasPermission("MANAGE_MEMBERS"))return;
        client.commands.get('unmute').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `MANAGE_MEMBERS` permissions on my role to perform that command.')
     }
    };
    if(command === 'update'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('update').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
    };
    if(command === 'giverole'){
      try{
        if(!message.guild.me.hasPermission("MANAGE_ROLES"))return;
        client.commands.get('giverole').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `MANAGE_ROLES` permissions on my role to perform that command.')
     }
    };
    if(command === 'karen'){
      try{
        if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
        client.commands.get('karen').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
     }
    };
    if(command === 'autorole_add'){
      try{
        if(!message.guild.me.hasPermission("MANAGE_MEMBERS"))return;
        client.commands.get('autorole_add').execute(message,args)
        
}catch(er){
        
         message.member.send('I need `MANAGE_MEMBERS` permissions on my role to perform that command.')
     }
  };
  if(command === 'levels'){
    try{
      if(!message.guild.me.hasPermission("SEND_MESSAGE"))return;
      client.commands.get('levels').execute(message,args)
      
}catch(er){
      
       message.member.send('I need `SEND_MESSAGE` permissions on my role to perform that command.')
   }
};

});


client.mongoose.init();
client.login(process.env.token);