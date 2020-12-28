const Discord = require('discord.js')
module.exports = {
    name: 'help',
    description: "HELP COMMAND ",
    disabled: false,
    execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        message.channel.send({
            embed:{
                title: 'List of commands [38]',
                color: 3066993, 
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
                        name: '**👂 LISTENERS [8]**',
                        value: 'InviteCreate/Delete, RoleDelete, EmojiCreate/Delete, messageDelete, GuildMemberAdd/Remove'
                    },
                    {
                        name: '**🛠️ Utilities [14]**',
                        value: 'help,invite,update,membercount,verify,info,avatar,guild,getid,getuserid,report,suggestion,credits'
                    }
                ],
                
                footer: {
                    text: "Love from Mint Support💓"
                }
            }
            })
            
        }
    
    }