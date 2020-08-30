const Discord = require('discord.js');
const {Client, Attachment, Collection, MessageEmbed} = require('discord.js');
const bot = new Discord.Client();
const PREFIX = '/'


console.log("Hello.")





bot.on('ready', () =>{
    console.log('No errors found in code.');
    
    bot.user.setActivity('Uptime', {
        type: 'PLAYING'
        
    }).catch(console.error);
    
});
 bot.on('message', message => {
   const args = message.content.substring(PREFIX.length).split(" ");
   const  messageArray1 = message.content.split(" ");
    if(message.content.startsWith(PREFIX + 'config_joinmessage')){
       
       
       console.log('No errors on joinmessage.')
       if(message.member.hasPermission("MANAGE_CHANNELS")){
         let LeftChannel = message.guild.channels.cache.find(channel => args[1] === channel.id )
         if(!LeftChannel) return message.channel.send(`Cant find channel id.`) 
         bot.on('guildBanAdd', member =>{
            const BannedMem = new Discord.MessageEmbed()
            .setColor(15158332)
            .setAuthor("Member Banned")
            .addField('User', name)
            .addField('Date', BannedMem.timestamp)
            .addField('Last message', member.lastMessage)
            LeftChannel.send(BannedMem)
         })
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
              member.send(SJoined)
              
             LeftChannel.send(SJoined2)
           });
         bot.on('guildMemberRemove', member =>{
            const LeftEmbed = new Discord.MessageEmbed()
            .setColor(15158332)
            .setAuthor('Member Left')
            .addField('Member Name', member)
            .addField('Account ID',member.id)
            .addField('Last message', member.lastMessage) 
            .addField('Channel ID', member.lastMessageChannelID)
            LeftChannel.send(LeftEmbed)
         })
         return message.channel.send(`Join message is now fixed for ${LeftChannel}`)
         
       }
       return message.channel.send('You dont have permission to do that.')
    }
     if(message.content.startsWith("** **")){
        if(message.member.hasPermission('MANAGE_CHANNELS')){
         let messageArray = message.content.split(" ");
         let args3 = messageArray.slice(1);
           const custom_message = new Discord.MessageEmbed()
           .setColor(15158332)
           .setAuthor('Announcement')
           .setDescription(message)
         message.channel.send(custom_message)
        }
        else message.channel.send('You do not have permissions to use this command.')
     };
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
     if(message.content.startsWith(PREFIX + 'Mod')) {
        const HelpEmbed = new Discord.MessageEmbed()
        .setAuthor('Moderation Commands')
        .setColor(15158332)
        .addField('ban', "Used to ban a member.")
        .addField('kick', "The command will kick a user.")
        .addField('mute','This will mute a member in this guild.')
        .addField('tempmute','Mutes the person for 3hours.')
        .addField('giverole','This command will give the mentionned role to the persom.(Ex : dgiverole @user Member')
        .addField('warn','Warns the user who broke a rule.')
        .addField('roleinfo','This command will give some informations about the mentionned role.')
        .addField(`.`,'This is for custom message!')
        if(message.member.hasPermission('ADMINISTRATOR')) return message.author.send(HelpEmbed)
        
        return message.channel.send('no')
        
     };
     if(message.content.startsWith(PREFIX + 'funs')){
        const Fun = new Discord.MessageEmbed()
        .setAuthor('Fun Commands')
        .addField('DM','/Help dm for information.')
        .addField('8ball','/h 8ball for information.')
        .setColor(15158332)
        message.channel.send(Fun)
     };
     if(message.content.startsWith(PREFIX + 'Help dm')){
        const helpdm = new Discord.MessageEmbed()
        .setColor(15158332)
        .addField('Usage','/dm @User {YOUR_MESSAGE}')
        message.channel.send(helpdm)
     };
     if(message.content.startsWith(PREFIX + 'h 8ball')){
        const help8ball = new Discord.MessageEmbed()
        .setColor(15158332)
        .addField('Usage','/8ball {YOUR_MESSAGE}')
        message.channel.send(help8ball)
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

      let BanChannel = message.guild.channels.cache.find(channel => channel.id === "649018122476584991");
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

      let KickChannel = message.guild.channels.cache.find(channel => channel.id === "649018122476584991");
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
         "Yes.",
         "No.",
         "Uh, repeat nob.",
         "Good, wbu"
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
    if(message.content.startsWith(PREFIX + 'uptime')){
      let hours = Math.floor(bot.uptime / 3600000) % 24;
      let minutes = Math.floor(bot.uptime / 60000) % 60;
      let seconds = Math.floor(bot.uptime / 1000) % 60;
      const Uptime = new Discord.MessageEmbed()
      .setColor(15158332)
      .setTitle('Uptime')
      .setDescription(`The bot has been running for\n${hours}h ${minutes}m ${seconds}s.`)
   
      

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
      
      
      message.channel.send(Info)
   };
 



 


  
 });






bot.login(process.env.token);