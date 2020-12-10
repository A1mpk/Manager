const Discord = require('discord.js')
module.exports = {
    name: 'help',
    description: "HELP COMMAND ",
    execute(message, args){
        message.channel.send({
            embed:{
                title: 'List of commands [33]',
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
                        name: '**🛠️ Utilities [13]**',
                        value: 'help,invite,update,membercount,verify,info,avatar,guild,getid,getuserid,report,nick,update'
                    },
                    {
                        name: 'Premium [4]',
                        value: 'Premium command that works for everyone : suggestion'
                    }
                ],
                
                footer: {
                    text: "Love from Mint Support"
                }
            }
            })
            
        }
    
    }