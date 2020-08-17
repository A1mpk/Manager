
const Discord = require('discord.js');
const {Client, Attachment, Collection, MessageEmbed} = require('discord.js');
const bot = new Discord.Client();

const  token = 'NzQzOTMxOTM5MDM5MzQ2ODEx.Xzb2mw.YUcpU_dyqDzcnkMyxlkwRh8qxxs';
const PREFIX = '/'
const ms = require('ms')



bot.on('guildMemberAdd', member =>{
 const SJoined = new Discord.MessageEmbed()
 .setTitle('Greetings & Information')
 .setDescription('Welcome to SP! This is a server where we make games on the popular platform ROBLOX. Please be respectful to eachother and be responsible with your behaviour. Thank you for joining!')
 .setColor(15158332)
 .addField('Information','Sp Studios is a roblox developer group that obviously make games.They also sometimes makes clothing!')
 .addField('Date','The group was orignally made in 2018.')
 .addField('Type of games','Adventure & FPS games')
 .addField('Member Count','Currently 12 members.')
 .addField('Developpers','There are 5 developpers in the group.You can find them with the role "Developpers".')

   member.send(SJoined)
  
});




bot.on('ready', () =>{
    console.log('Manager is now set to run.');
    bot.user.setActivity('/help', {
        type: 'LISTENING'
        
    }).catch(console.error);
    
});
 bot.on('message', message => {
   const args = message.content.substring(PREFIX.length).split(" ");
     if(message.content.startsWith(PREFIX +'help')){
        const helpEmbed2 = new Discord.MessageEmbed()
        .setAuthor('Help')
        .addField('Moderation Commands','Use /Moderation to receive a list of moderation commands!')
        .addField('Fun Commands','Use /Fun to receibe a list of fun commands!')
        .addField('Music Commands', 'Use /Music to receive a list of commands related to music!')
        .addField('All commands','Use /All to receive a list of all the commands in the bot.' )
        .setColor(15158332)
         message.channel.send(helpEmbed2) 
     };
     if(message.content.startsWith(PREFIX + 'Moderation')) {
        const HelpEmbed = new Discord.MessageEmbed()
        .setAuthor('Moderation Commands')
        .setColor(15158332)
        .addField('ban', "This command is used to  ban the mentionned user.")
        .addField('kick', "This command is used for kicking the mentionned user.")
        .addField('mute','This command can mute a person **forever** however you can always unmute them from our command called "unmute @user"')
        .addField('tempmute','This command will mute a person for a certain amount of time.')
        .addField('giverole','This command will give the mentionned role to the persom.(Ex : dgiverole @user Member')
        .addField('warn','This command will warn the mentionned user, however if they get 3 warns they will be **kicked** from the group.')
        .addField('roleinfo','This command will give some informations about the mentionned role.')
        if(message.member.hasPermission('ADMINISTRATOR')) return message.author.send(HelpEmbed)
        
        return message.channel.send('no')
        
     };
     if(message.content.startsWith(PREFIX + 'funs')){
        const Fun = new Discord.MessageEmbed()
        .setAuthor('Fun Commands')
        .addField('Memes','memes will send you a funny meme for you to laugh and enjoy!')
        .addField('8ball','not done yet')
        .addField('Quotes','Quotes will give you lovely good quotes for you!')
        .setColor(15158332)
        message.channel.send(Fun)
     };
     if(message.content.startsWith(PREFIX + 'ban')){
      const Ban = new Discord.MessageEmbed()
      .setAuthor('ERROR')
      .setDescription('Please check if you mentionned a user.')
      .setColor(15158332)
      
     
      const Buser = message.guild.member(message.mentions.users.first())
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('no');
      if(!Buser) return message.channel.send(Ban); 
      let bReason = args.join(" ").slice(26);
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You need to be an Admin to use this command.');
      const BanMod = new Discord.MessageEmbed()
      .setColor(15158332)
      .setAuthor('BAN ERROR')
      .setDescription('I cannot ban that user.')
      .addField('Reason : ', "Person has a higher role than me or has the same permissions as me")
      if(Buser.hasPermission("ADMINISTRATOR")) return message.channel.send(BanMod);

      const BanEmbed = new Discord.MessageEmbed()
      .setColor(15158332)
      .addField("Banned", `${Buser} ID : ${Buser.id}`)
      .addField("User banned by", `<@${message.author.id}>`)
      .addField("Banned in", message.channel)
      .addField("Banned At", message.createdAt)
      .addField("Reason", bReason);

      let BanChannel = message.guild.channels.cache.find(channel => channel.name === "incidents");
      if(!BanChannel) return message.channel.send('Please create a channel named "incidents".');

       message.guild.member(Buser).ban(bReason);

       BanChannel.send(BanEmbed)

       return;
     };
    
     if(message.content.startsWith(PREFIX + 'kick')){
      const Kick = new Discord.MessageEmbed()
      .setTitle('❌Error❌')
      .addField('*I cant find that user.*','Here is an exemple on how to kick a user.')
      .addField('You can do /kick @Dream {Reason if needed}.','If that doesnt work')
      .addField('You can use our command /whois @Dream','Which will check if the user is in the guild.')
      .setColor(15158332)
     
      const Kuser = message.guild.member(message.mentions.users.first())
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('no');
      if(!Kuser) return message.channel.send(Kick); 
      let kReason = args.join(" ").slice(26);
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You need to be an Admin to use this command.');
      const KickMod = new Discord.MessageEmbed()
      .setColor(15158332)
      .setTitle('❌Error❌')
      .setDescription('I cant kick that person.')
      .addField('Reason : ', "Person has a higher role than me or has the same permissions as me")
      if(Kuser.hasPermission("ADMINISTRATOR")) return message.channel.send(KickMod);

      const KickedEmbed = new Discord.MessageEmbed()
      .setColor(15158332)
      .addField("Kicked", `${Kuser} ID : ${Kuser.id}`)
      .addField("User kicked by", `<@${message.author.id}>`)
      .addField("Kicked in", message.channel)
      .addField("Kicked At", message.createdAt)
      .addField("Reason", kReason);

      let KickChannel = message.guild.channels.cache.find(channel => channel.name === "incidents");
      if(!KickChannel) return message.channel.send('Create a incidents channel.')

       message.guild.member(Kuser).kick(kReason);
      Kuser.send('You were kicked from the server.')
       KickChannel.send(KickedEmbed)
       
        return;
       
     };
     if(message.content.startsWith(PREFIX + 'mute')){
        const MuteNot = new Discord.MessageEmbed()
        .setColor(15158332)
        .setTitle('Denied Permissions')
        .setDescription('You need permissions to use this command.')
      if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send(MuteNot)  

      if(!message.guild.me.hasPermission(['MANAGE_ROLES','ADMINISTRATOR'])) return message.channel.send('I dont have permissions to add roles!')

      // define the reason and mute em
        let mutee = message.mentions.members.first();
        if(!mutee) return message.channel.send('Mention someone to mute.')


     };
     if(message.content.startsWith(PREFIX + 'roleinfo')){

    };
    if(message.content.startsWith(PREFIX + 'Modlogs')){

    };
    if(message.content.startsWith(PREFIX + 'warn')){ 

    };
    if(message.content.startsWith(PREFIX + 'giveRole')){



    }

  

 });
bot.login(token);