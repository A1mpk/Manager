const Discord = require('discord.js')
module.exports = {
    name: 'help',
    description: "HELP COMMAND ",
    execute(message, args){
        message.channel.send({
            embed:{
                title: 'List of commands [32]',
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
                        name: '**🔊 Music [1]**',
                        value: 'play(link only)'
                    },
                    {
                        name: '**💸 Currency [0]**',
                        value: 'Coming soon'
                    },
                    {
                        name: '**🛠️ Utilities [12]**',
                        value: 'help,invite,update,membercount,verify,info,avatar,guild,getid,getuserid,report,nick'
                    },
                    {
                        name: 'Premium [4]',
                        value: 'suggestion,auto-role,auto-moderator,youtube notification'
                    }
                ],
                
                footer: {
                    text: "Love from Mint Support"
                }
            }
            })
            
        }
    
    }