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
        message.channel.send({
            embed:{
                title: 'List of commands [44]',
                color: "ORANGE", 
                fields:[
                    {
                        name: '**😴 Moderation [10]**',
                        value: 'ban,kick,mute,bot_nick,rule_add,slowmode,clear,announce,lock'
                    },     
                    {
                        name: '**🤩 Fun [3]**',
                        value: '8ball,say,karen'
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
                        value: 'help,invite,update,membercount,verify,info,avatar,guild,getid,getuserid,report,suggestion,credits'
                    }
                ],
                
                footer: {
                    text: "Love from Mint Support"
                }
            }
            })
            
        }
    
    }