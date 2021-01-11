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
const { Z_NEED_DICT, createGzip } = require('zlib');
const { error, memory } = require('console');
const { getPackedSettings } = require('http2');
const { name } = require('./commands/Moderation/guild');
const ytdl = require('ytdl-core');
const Youtube = require('simple-youtube-api')
const youtube = new Youtube("AIzaSyDRzH6PP1AR3FR5CYB6riNei4BSEdJqLf8")
const Levels = require('discord-xp');
const levels = require('discord-xp/models/levels');
const canvacord = require("canvacord");
const Canvacord = require('canvacord/src/Canvacord');
const { discriminators } = require('discord-xp/models/levels');
Levels.setURL("mongodb+srv://admin:LmVUsNQeLiYCsJfr@manager.hd8gy.mongodb.net/<DataBase505>?retryWrites=true&w=majority")
const Canvas = require('canvas');
const { waitForDebugger } = require('inspector');
const queue = new Map();

const { MAX_PACKET_SIZE } = require('opusscript');
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
        color: "ORANGE", 
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
                name: '🎵 Music [9]',
                value: 'play,skip,stop,pause,np,resume,volume,queue,loop'
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
 
    client.user.setActivity(`>help || >info for support server :)`, {type: "WATCHING"})
})
client.on('guildMemberRemove',async member => {
  if(!member.guild.me.hasPermission('SEND_MESSAGES'))return;
  if(member.guild.me.hasPermission('MANAGE_CHANNELS'))return;
  if(!member.guild.me.hasPermission("VIEW_CHANNEL"))return;
  const Channel = member.guild.channels.cache.find(ch => ch.name === "logs")
  if(!Channel)return member.guild.channels.create("logs")
  const Joins = member.guild.channels.cache.find(ch => ch.name === "👋joins")
  if(!Joins) return member.guild.channels.create("👋joins")
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
  Joins.send(`Bye ${member}, we will miss you!`,attachment)
}catch(er){
  console.warn(`An error occured : ${er}`);
}
})
client.on('messageDelete', message => {
    
    if(message.author.bot) return;
try{
    const MessageEmbed = new Discord.MessageEmbed()
    .setAuthor(`Message Deleted`)
    .addField(`Message :`, message)
    .addField('Sent by', message.member.user.tag)
    .addField('Deleted in', message.channel.name)
    .setThumbnail(message.member.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(`Deleted Message Log`)
    .setColor("ORANGE")
   
       const channel = message.guild.channels.cache.find(a => a.name === "logs")
       channel.send(MessageEmbed)
    }catch(er){
      return;
    }


   
    

           
})
client.on('inviteCreate', invite => {
   
  
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
    .setColor("ORANGE")
    const channel = invite.guild.channels.cache.find(a => a.name === "logs")
    if(!channel)return invite.guild.channels.create("logs")
    channel.send(MessageEmbed2)
} )
client.on('inviteDelete', invite => {
    
    const MessageEmbed2 = new Discord.MessageEmbed()
    .setAuthor(`Invite Deleted`)
    .addField(`Deleted by`, invite.inviter.tag)
    .addField(`Expire Date`, invite.expiresAt)
    .addField('Uses ', invite.maxUses)
    .addField('Channel for invite', invite.channel)
    .setThumbnail(invite.inviter.displayAvatarURL())
    .setTimestamp()
    .setFooter(`Invite Delete Logger`)
    .setColor("ORANGE")
    const channel = invite.guild.channels.cache.find(a => a.name === "logs")
    if(!channel)return invite.guild.channels.create("logs")
    channel.send(MessageEmbed2)
})
client.on('emojiCreate', emoji => {
 
    const MessageEmbed = new Discord.MessageEmbed()
    .setAuthor(`Emoji Created`)
    .addField(`Emoji Name`, emoji.name)
    .addField(`Emoji Created At`, emoji.createdAt)
    .addField('Emoji Animated', emoji.animated)
    .addField(`Emoji`, emoji)
    .setTimestamp()
    .setFooter(`Emoji Created`)
    .setColor("ORANGE")
    const channel = emoji.guild.channels.cache.find(a => a.name === "logs")
    if(!channel)return emoji.guild.channels.create("logs")
    channel.send(MessageEmbed)
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
    .setColor("ORANGE")
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
    .setColor("ORANGE")
    role.send(ROleInfo)
})
client.on('guildMemberAdd', async member => {
  if(!member.guild.me.hasPermission('SEND_MESSAGES'))return;
  if(member.guild.me.hasPermission('MANAGE_CHANNELS'))return;
  if(!member.guild.me.hasPermission("VIEW_CHANNEL"))return;
  const Channel = member.guild.channels.cache.find(ch => ch.name === "logs")
  if(!Channel)return member.guild.channels.create("logs")
  const Joins = member.guild.channels.cache.find(ch => ch.name === "👋joins")
  if(!Joins) return member.guild.channels.create("👋joins")

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
  Channel.send(`Hey ${member}, welcome to **${member.guild.name}**`,attachment)
  Joins.send(`Hey ${member}, welcome to **${member.guild.name}**`,attachment)
}catch(er){
  console.warn('An error occured in the guildMemberAdd system!');
}
})
/// ALL THE COMMANDS HANDLER!
client.on('message', async message => {
    if(message.author.bot)return;
    if(message.channel.type === 'dm') return;
    if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
    if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
    const serverQueue = queue.get(message.guild.id);
    
    const randomXp = Math.floor(Math.random() * 15) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if(hasLeveledUp){
    
      const user = await Levels.fetch(message.author.id, message.guild.id);
      message.channel.send(`Congratulations <@${message.member.user.id}>, you just reached level ${user.level}.`)
    }
  

    if(message.content.toLowerCase().includes( x + "rank".toLowerCase())){
        
      const target = message.author;
      const user = await Levels.fetch(message.author.id, message.guild.id)
      if(!user) return message.channel.send(`You dont have any xp yet, be more active in this guild to gain more xp!`)
      const neededXP = Levels.xpFor(parseInt(user.level) + 1);
      const Rank = new canvacord.Rank()
      .setLevel(user.level)
      .setBackground('COLOR','BLACK' )
      .setAvatar(message.author.displayAvatarURL({dynamic: false, format: 'png'}))
      .setCurrentXP(user.xp)
      .setRequiredXP(neededXP)
      .setStatus(target.presence.status)
      .setProgressBar("WHITE", "COLOR")
      .setProgressBarTrack("GREY")
      .setUsername(target.username)
      .setDiscriminator(target.discriminator)
      Rank.build().then(
        data => {
          const attachments = new Discord.MessageAttachment(data, '')
          message.channel.send(attachments)
        }
      )
    }

    if(message.content.toLowerCase().includes( x + "leaderboard" .toLowerCase())){
      const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id,5 );
     
      if( rawLeaderboard.length < 1)return message.channel.send(`Yet no one is ranked.`)
      
      const leaderboard = Levels.computeLeaderboard(client, rawLeaderboard)

      const lb = (await leaderboard).map( e => `**User :** ${e.username}#${e.discriminator}\n **Rank** : ${e.position} \n**Level**: ${e.level}\n**XP** : ${e.xp.toLocaleString()}`);
      const LeaderBord = new MessageEmbed()
      .setTitle(`Leaderboard in ${message.guild.name}`)
      .setDescription(lb.join("\n\n\n"))
      .setTimestamp()
      .setColor("ORANGE")
      message.channel.send(LeaderBord)
    }

    if (message.content.toLowerCase().includes( x + "play".toLowerCase())) {
      
        execute(message, serverQueue);
        return;
      } else if (message.content.toLowerCase().includes(x +"skip".toLowerCase())) {
        skip(message, serverQueue);
        return;
      } else if (message.content.toLowerCase().includes(x +"stop".toLowerCase())) {
        stop(message, serverQueue);
        return;
      }else if(message.content.toLowerCase().includes(x +"volume".toLowerCase())){
        volume(message, serverQueue)
      }else if(message.content.toLowerCase().includes(x +"np".toLowerCase())){
        np(message,serverQueue)
      }else if(message.content.toLowerCase().includes(x +"queue".toLowerCase())){
        Queue(message, serverQueue)
      }else if(message.content.toLowerCase().includes(x +"pause".toLowerCase())){
        pause(message, serverQueue)
      }else if (message.content.toLowerCase().includes(x +"resume".toLowerCase())){
        resume(message, serverQueue)
      }else if(message.content.toLowerCase().includes(x +"loop".toLowerCase())){
         loop(message, serverQueue)
      }else if(message.content.toLowerCase().includes(x +"clearqueue".toLowerCase())){
        clearqueue(message, serverQueue)
     }
      async function execute(message, serverQueue) {
        const args = message.content.slice(5)
        const searchString = message.content.slice(5)
        if(!args) return message.channel.send(`Please enter a song name or a youtube link for me to play!`)
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
            volume: 5,
            playing: true,
            loop: false
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
          const QueueAdded = new MessageEmbed()
          .setAuthor(`🎵Added to queue🎵`)
          .setDescription(`**Queued [${song.title}](${serverQueue.songs[0].url}) by [${song.author}](${serverQueue.songs[0].url})**`)
          .setColor("ORANGE")
          .setTimestamp()
        serverQueue.songs.push(song);
        return message.channel.send(QueueAdded);
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
        ${serverQueue.songs.map(song => `- **[${song.title}](${serverQueue.songs[0].url}) by [${song.author}](${serverQueue.songs[0].url})**`).join(`\n`)}`)
        .setColor("ORANGE")
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
        if(!message.member.voice.channel) return message.channel.send(`You need to be in a voice channel to loop the song.`)
        if(!serverQueue) return message.channel.send('The song queue is empty! Add some music.')
    
        serverQueue.loop = !serverQueue.loop
        return message.channel.send(`${serverQueue.loop ? `**✅Enabled**` : `**✅Disabled**`} looping.`)
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
      // VOLUME
      function volume(message, serverQueue) {
        const volumeArgs = message.content.slice(7)
        const Playing = new MessageEmbed()
        .setAuthor(`Volume`)
        .setDescription(`🎵✅Successfully changed the volume to **${volumeArgs}**!`)
        .setColor("ORANGE")
        .setTimestamp()
        
       
        if(!message.member.voice.channel)return message.channel.send(`You need to be in a voice channel`);
          if(!serverQueue) return message.channel.send(`There is no music playing!`)
          if(!volumeArgs)return message.channel.send(`The current volume is **${serverQueue.volume}**!`)
          if(isNaN(volumeArgs)) return message.channel.send(`That is not a number!`);
          if(volumeArgs > 10)return message.channel.send(`The maximum volume is 10!`)
          serverQueue.volume = volumeArgs
          serverQueue.connection.dispatcher.setVolumeLogarithmic(volumeArgs /5)
          message.channel.send(Playing)
          return undefined
      }
      
      // NOW PLAYING
      function np(message, serverQueue){
        if(!serverQueue) return message.channel.send(`There is nothing playing!`);
        if(!serverQueue.songs[1])return message.channel.send(`Now playing **${serverQueue.songs[0].title}** by **${serverQueue.songs[0].author}**`)
       if(!serverQueue.songs[0].hours){
        const NowPlayingHours = new MessageEmbed()
        .setAuthor(`🎵Currently Playing🎵`)
        .setDescription(`**Currently playing** **[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**`)
        .setColor("ORANGE")
        .addFields(
          { name: `Channel`, value: `[${serverQueue.songs[0].author}](${serverQueue.songs[0].channelURL})`, inline: true }, 
          { name: `Duration`, value: `${serverQueue.songs[0].minutes}:${serverQueue.songs[0].seconds}`, inline: true }, 
          { name: `Coming Next`, value: `[${serverQueue.songs[1].title}](${serverQueue.songs[1].url})`, inline: true }, 
        )
        .setTimestamp()
         message.channel.send(NowPlayingHours)
      }else if(!serverQueue.songs[0].minutes){
        const NowPlayMinutes = new MessageEmbed()
        .setAuthor(`🎵Currently Playing🎵`)
        .setDescription(`**Currently playing** **[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**`)
        .setColor("ORANGE")
        .addFields(
          { name: `Channel`, value: `[${serverQueue.songs[0].author}](${serverQueue.songs[0].channelURL})`, inline: true }, 
          { name: `Duration`, value: `00:${serverQueue.songs[0].seconds}`, inline: true }, 
          { name: `Coming Next`, value: `[${serverQueue.songs[1].title}](${serverQueue.songs[1].url})`, inline: true },
        )
        .setTimestamp()
         message.channel.send(NowPlayMinutes)
      }
        
      }
      // CLEARQUEUE
      function clearqueue(message, serverQueue){
        if(!message.member.voice.channel)return message.channel.send(`You need to be in a voice channel to clear the queue`)
        if(!serverQueue)return message.channel.send(`There is nothing in the queue.`)
        try{
          if(message.guild.me.voice){
            serverQueue.songs.shift()
            message.channel.send(`I have cleared the queue.`)
            message.guild.me.voice.channel.leave()
            serverQueue.connection.dispatcher.end()
          }
        }catch(er){
         return;
        }
        

        

        
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
        message.guild.me.voice.serverDeaf
        const serverQueue = queue.get(guild.id);
        if (!song) {
          serverQueue.voiceChannel.leave();
          queue.delete(guild.id);
          return;
        }
       
        
        const Playing = new MessageEmbed()
        .setAuthor(`🎵Now Playing🎵`)
        .setDescription(`**Playing [${song.title}](${serverQueue.songs[0].url}) by [${song.author}](${serverQueue.songs[0].url})!**`)
        .setColor("ORANGE")
        .setTimestamp()
       
        const dispatcher = serverQueue.connection
          .play(ytdl(song.url))
          .on("finish", () => {
            if(!serverQueue.loop)serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
          })
          .on("error", error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(Playing);
        
      }
   
  
    if(message.content.toLowerCase().includes(x +"credits".toLowerCase())){
        const BotInfo = new Discord.MessageEmbed()
        .setTitle(`Credits`)
        .addField(`Co-Owner`, `Souxle#8217`)
        .addField('Profile Picture', `Friendly#9411 (Bot Owner)`)
        .setThumbnail(message.guild.me.user.displayAvatarURL())
        .setFooter(`Command raised by ${message.member.user.tag}`)
        .setColor("ORANGE")
        message.channel.send(BotInfo)
    }
    if(message.content.toLowerCase().includes(x +"uptime".toLowerCase())){
    

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
        .setColor("ORANGE")
        message.channel.send(UptimeEMbed)
}
if(message.content === `<@!${client.user.id}>`){
   const MyPRefixIs = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setAuthor('Prefix')
        .setDescription('`>`')
        .setTimestamp()
        message.channel.send(MyPRefixIs)
        
        
}
if(message.content.toLowerCase().includes(x +"info".toLowerCase())){
    const Info = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle('Mint')
    .setDescription(`Mint is an upcoming bot actively being developped. This bot will bring you moderation to music, logging to fun.`)
   .setFooter(`Thank you for using Mint`)
    .addFields(
        { name: 'Version', value: '0.0.5', inline: true },
        { name: `Guilds`, value: message.client.guilds.cache.size, inline: true },
        { name: 'Users', value: message.client.users.cache.size, inline: true },
        {
            name: "Links",
            value: "[Invite](https://discord.com/api/oauth2/authorize?client_id=725787532008095744&permissions=8&scope=bot) |** ** | [Support Server](https://discord.gg/fBbnrRe8gg) |** ** | [Vote for me](https://top.gg/bot/725787532008095744/vote) |** ** | [Alaska](https://discord.com/api/oauth2/authorize?client_id=691748432104390726&permissions=8&scope=bot) ",inline:true
          }
    )
    .setThumbnail(message.client.user.displayAvatarURL())

    message.channel.send(Info)
}

    const args = message.content.slice(x.length).split(/ +/);
   if(!message.content.startsWith(x) || message.author.bot) return;
    const command =args.shift().toLowerCase();
    if(command === 'kick'){
        client.commands.get('kick').execute(message,args)
    };
    if(command === 'lock'){
    client.commands.get('lock').execute(message, args)
    };
    if(command === 'announce'){
    client.commands.get('announce').execute(message,args)
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