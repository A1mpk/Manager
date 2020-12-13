const Discord = require('discord.js')
module.exports = {
    name: 'help',
    description: "HELP COMMAND ",
    execute(message, args){
        message.channel.send({
            embed:{
                title: 'List of commands [37]',
                color: 3066993, 
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
                    text: "Love from Mint Support💓"
                }
            }
            })
            
        }
    
    }