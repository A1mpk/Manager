
const Discord = require('discord.js');
const {Client, Attachment, Collection, MessageEmbed} = require('discord.js');
const bot = new Discord.Client();


const PREFIX = '/'
const ms = require("ms")


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
  
   const SJoined2 = new Discord.MessageEmbed()
    .setTitle('Member Joined')
    .addField('Member Name', member)
    .addField('Joined', member.joinedAt)
    .addField('Account ID', member.id)
    .setFooter('Please welcome this member.')
    .setColor(15158332)
    let LeftChannel2 = member.guild.channels.cache.find(channel => channel.id === "649016111324594186");
     member.send(SJoined)
     
    LeftChannel2.send(SJoined2)
  });
  bot.on('guildMemberRemove', member =>{
     let LeftChannel = member.guild.channels.cache.find(channel => channel.id === "649016111324594186");
     const LeftEmbed = new Discord.MessageEmbed()
     .setColor(15158332)
     .setAuthor('Member Left')
     .addField('Member Name', member)
     .addField('Account ID',member.id)
     .addField('Last message', member.lastMessage) 
     .addField('Channel ID', member.lastMessageChannelID)
     LeftChannel.send(LeftEmbed)
  })
  




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
        .addField('Moderation Commands','Details + Commands for Moderation.{Type /Mod to view.}')
        .addField('Fun Commands','Fun commands to use when your bored.{Type /funs to view.}')
        .addField('Music Commands', 'Use /Music to receive a list of commands related to music!')
        .setColor(15158332)
         message.channel.send(helpEmbed2) 
     };
     if(message.content.startsWith(PREFIX + 'Moderation')) {
        const HelpEmbed = new Discord.MessageEmbed()
        .setAuthor('Moderation Commands')
        .setColor(15158332)
        .addField('ban', "The command will ban the mentionned user.")
        .addField('kick', "Used to kick a member out of the guild.")
        .addField('mute','Used for muting certain members who broke the rules.')
        .addField('tempmute','Mutes the person for 3hours.')
        .addField('giverole','This command will give the mentionned role to the persom.(Ex : dgiverole @user Member')
        .addField('warn','This command will warn the mentionned user.')
        .addField('roleinfo','This command will give some informations about the mentionned role.')
        if(message.member.hasPermission('ADMINISTRATOR')) return message.author.send(HelpEmbed)
        
        return message.channel.send('no')
        
     };
     if(message.content.startsWith(PREFIX + 'funs')){
        const Fun = new Discord.MessageEmbed()
        .setAuthor('Fun Commands')
        .addField('8ball','8ball is a simple command to use.{Ex./8ball are you okay?}')
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
      .addField("Banned", `${Buser}`)
      .addField("User banned by", `<@${message.author.id}>`)
      .addField("Reason", bReason);

      let BanChannel = message.guild.channels.cache.find(channel => channel.name === "incidents");
      if(!BanChannel) return message.channel.send('Please create a channel named "incidents".');

       message.guild.member(Buser).ban(bReason);

       BanChannel.send(BanEmbed)

       return;
     };
    
     if(message.content.startsWith(PREFIX + 'kick')){
      const Kick = new Discord.MessageEmbed()
      .setTitle('ERROR')
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
      .setTitle('ERROR')
      .setDescription('I cant kick that person.')
      .addField('Reason : ', "Person has a higher role than me or has the same permissions as me")
      if(Kuser.hasPermission("ADMINISTRATOR")) return message.channel.send(KickMod);

      const KickedEmbed = new Discord.MessageEmbed()
      .setColor(15158332)
      .addField("Kicked", `${Kuser}`)
      .addField("User kicked by", `<@${message.author.id}>`)
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
    if(message.content.startsWith(PREFIX + '8ball')){
      var res = [
         "Yeah",
         "Singing",
         "Is",
         "Really",
         "Really ",
         "Goddamn",
         "goood",
         "Ok",
         "Damn thats rude.",
         "Repeat it again."
      ]
      if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);
	let com = command.toLowerCase();
	var sender = message.author;
       // Runs if user doesn't ask a question
    if(!args[0]){
       message.channel.send('Please ask a question.')
       return;
    }
    // Creates an ambed and picks a random answer from the answer array
  
       message.channel.send((res[Math.floor(Math.random() * res.length)]))
       return console.log(`> 8ball command used by ${message.author.username}`);
    // Displays a message in the console if the command was used
    


    };
    if(message.content.startsWith(PREFIX + 'warn')){ 

    };
    if(message.content.startsWith(PREFIX + 'uptime')){
      let days = Math.floor(bot.uptime / 86400000);
      let hours = Math.floor(bot.uptime / 3600000) % 24;
      let minutes = Math.floor(bot.uptime / 60000) % 60;
      let seconds = Math.floor(bot.uptime / 1000) % 60;
      const Uptime = new Discord.MessageEmbed()
      .setColor(15158332)
      .setTitle('Uptime')
      .setDescription(`The bot has been running for\n${days}d ${hours}h ${minutes}m ${seconds}s.`)
   
      

      message.channel.send(Uptime);
    };
 
    
    if(message.content.startsWith(PREFIX + 'info')){
      const Info = new Discord.MessageEmbed()
      .setColor(15158332)
      .addField('Manager','Manager is a bot made for the group SP.It offers moderation commands to music commands and much more.')
      .addFields(
      { name: 'Library', value: 'discord.js', inline: true },
      {name: 'Bot-Date', value: 'Sunday, June 28, 2020', inline: true}
      )
      .addFields({name: 'Guilds', value: 'SP', inline:true},
      {name: 'Server Support', value: 'https://discord.gg/kacqxwc', inline:true},
      {name: 'Version', value: '2.0', inline:true},
      {name: 'Invite', value: 'Not available.', inline:true})
      .setImage('https://i.gyazo.com/d075ff081a37b973879b8de121b36746.png')
      
      message.channel.send(Info)
   };
  

 });
bot.login(process.env.token);