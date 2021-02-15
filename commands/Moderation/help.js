const Discord = require('discord.js')
module.exports = {
    name: 'help',
    description: "HELP COMMAND ",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        if(!message.guild.me.hasPermission('SEND_MESSAGES'))return;
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return;
        if(!message.guild.me.hasPermission("VIEW_CHANNEL"))return;
        const Words = message.content.slice(5)
        if(!Words){
            message.channel.send({
                embed:{
                    title: 'List of commands ',
                    color: "ORANGE", 
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
                        }
                    ],
                    
                
                }
                })
        }else if(Words.toLowerCase().includes("Moderation".toLowerCase())){
          const ModerationHelp = new Discord.MessageEmbed()
          .setAuthor(`MODERATION - CATEGORY`)
          .addField(`ban`, '`>ban <user> <reason>` - This will just ban the mentionned if provided with a reason. ')
          .addField(`kick`, '`>kick <user> <reason>` - This is a kick command, it kicks the mentionned user if provided with a reason!')
          .addField(`mute`, '`>mute <user> <reason>` - This is a mute command, it mutes the mentionned user if provided with a reason!')
          .addField(`unmute`, '`>unmute <user> <reason>` - This is an unmute command, it mutes the mentionned user if provided with a reason!')
          .addField(`bot_nick`, '`>bot_nick <nickname>` - This is a bot_nick command, it changes the bot\'s nickname.')
          .setFooter(`>help M_list_2 to see the other moderation commands.`)
         .setColor("ORANGE")
         .setTimestamp()
          message.channel.send(ModerationHelp)
        }else if(Words.toLowerCase().includes("M_list_2".toLowerCase())){
            const ModerationHelp2 = new Discord.MessageEmbed()
            .setColor(`ORANGE`)
            .setAuthor(`MODERATION 2 - CATEGORY`)
            .setFooter(`>help Moderation for first list of commands.`)
            .addField(`slowmode`,'`slowmode <seconds>` - This is a slowmode command, it increases the slowmode of the channel to the chosen one.')
          .addField(`clear`, '`>clear <amount>` - This is a clear command, it deletes the amount of messages wanted.')
          .addField(`announce`, '`>announce <message>` - This is just an announce command, it announces a announcement as an embed format.')
          .addField(`lock`, '`>lock` - This is a lock command, it make\'s it that no one can talk in it. For a fully working Raid bot you can invite [Prover](https://discord.com/api/oauth2/authorize?client_id=801956345736593408&permissions=8&scope=bot).')
          message.channel.send(ModerationHelp2)
        }else if(Words.toLowerCase().includes("fun".toLowerCase())){
            const Fun = new Discord.MessageEmbed()
            .setColor(`ORANGE`)
            .setAuthor(`FUN - CATEGORY`)
          .addField(`karen`, '`>karen` - This is a karen command, it returns with questions & messages which you will you have to reply to. Once finished you will know who won.')
          .addField(`8ball`, '`>8ball <prediction>` - This is just the 8ball command, it will return a yes, no or maybe to your question.')
          .addField(`say`, '`>say <message>` - This is a say command, it repeats your message.')
          message.channel.send(Fun)
        }else if(Words.toLowerCase().includes("Music".toLowerCase())){
            const Music = new Discord.MessageEmbed()
            .setColor(`ORANGE`)
            .setAuthor(`MUSIC- CATEGORY`)
          .addField(`play`, '`>play <query>` - This is a play command, it plays track in a voice channel. The query can either be a link or a YouTube keyword.')
          .addField(`skip`, '`>skip` - This is just the skip command, it will skip the current track if being played.')
          .addField(`stop`, '`>stop` - This is a stop command, it will stop the current track.')
          .addField(`pause`, '`>pause` - This is a pause command, it pauses the track.')
          .addField(`resume`, '`>resume` - This is a resume command, it will resume the track.')
          
          
          message.channel.send(Music)
        }else if(Words.toLowerCase().includes("Mu_list_2".toLowerCase())){
            const Music2 = new Discord.MessageEmbed()
            .setColor(`ORANGE`)
            .setAuthor(`MUSIC 2 - CATEGORY`)
            .addField('np', '`>np` - This is a now-playing command, it shows the currently playing track.') 
          .addField(`queue`, '`>queue` - This is just a queue command, it will show the current queue of the tracks in this server.')
          .addField(`volume`, '`>volume` - This is a volume command, it will change the volume of the bot.')
          .addField(`loop`, '`>loop` - This is a loop command, it loops the track over and over.')
          .addField('leave', '`>leave` - This command is a leave command, it leaves the current voice channel & deletes the queue.')
          .addField(`join`, '`>join` - This is just a join command, it deletes the queue, joins the voice channel.')
          message.channel.send(Music2)
        }else if(Words.toLowerCase().includes("listeners".toLowerCase())){
            const Listeners = new Discord.MessageEmbed()
            .setAuthor(`LISTENERS - CATEGORY`)
            .setColor("ORANGE")
            .addField('MessageDelete', 'This is from the logging category, it log\'s every deleted messages into the logging channel.')
            .addField(`InviteCreate/Delete`, 'This is a logging function, it logs it in the logging channel whenever an invite is created/deleted.')
            .addField('RoleDelete','This is a logging function, it log\'s it in the logging channel whenever a role is deleted.')
            .addField('EmojiCreate/Delete', 'This is a logging function, it log\'s it in the logging channel whenever a Emoji is created/deleted.')
            .addField('GuildMemberAdd/Remove','This is a logging function, it log\'s it in the logging channel whenever a member joins/leave.')
            message.channel.send(Listeners)
        }else if(Words.toLowerCase().includes("Utilities".toLowerCase())){
            const Utilities = new Discord.MessageEmbed()
            .setAuthor(`UTILITIES - CATEGORY`)
            .setColor("ORANGE")
            .addField('invite', '`>invite` - This is just an invite command, it sends you an invite link so you can invite Mint.')
            .addField(`update`, '`>update` - This is just an update command, it shows you the newest updates of Mint.')
            .addField('membercount','`>membercount` - This is just a membercount command, it shows the amount of members in the server.')
            .addField('verify', '`>verify` - This is just a verify command, it verifies you as a verified member of the server.')
            .addField('info','`>info` - This is just an info command, it shows you information about Mint.')
            message.channel.send(Utilities)
        }else if(Words.toLowerCase().includes("u_list_2".toLowerCase())){
            const u_list_2 = new Discord.MessageEmbed()
            .setAuthor(`UTILITIES 2 - CATEGORY`)
            .setColor("ORANGE")
            .addField('avatar', '`>avatar <mentionuser>` - This is just an avatar command, it shows you the avatar of the mentionned user.')
            .addField(`guild`, '`>guild` - This is just a guild command, it shows you information about the server.')
            .addField('getID','`>getID <channel>` - This is just a getID command, it shows you the ID of the channel name you wrote.')
            .addField('getuserID', '`>getuserID <user>` - This is just a getuserID command, it shows you the ID of the user you mentionned.')
            .addField('report','`>report <issue>` - This is just a report command, it sends a report to the owner of the guild.')
            .addField('suggestion', '`>suggestion <suggestions>` - This is just a suggestion command, after you enter your suggestions it sends it in a suggestions channel where the Owner/Administrator can view it.')
            .addField('credit', '`>credit <user> <reason>` - This is just a credit command, it credits the user you mentionned with the reason.')
            .addField('spotify', '`>spotify <user> - This command is just a spotify command, it shows basic information about the track a mentionned user is listening to.`')
            message.channel.send(u_list_2)
        }
       
            
            
        }
    
    }