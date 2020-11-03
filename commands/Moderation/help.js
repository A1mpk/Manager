const Discord = require('discord.js')
module.exports = {
    name: 'help',
    description: "HELP COMMAND ",
    execute(message, args){
            message.channel.send({
                embed:{
                    title: 'List of commands [20]',
                    color: 3066993, 
                    fields:[
                        {
                            name: '**😴 Moderation [10]**',
                            value: 'ban,kick,lock,credit,rule_add,config_log,bot_nick,nick,getuserid,getid'
                        },     
                        {
                            name: '**🤩 Fun [2]**',
                            value: 'pain,happy'
                        },
                        {
                            name: '**🔊 Music [1]**',
                            value: 'play with playlist'
                        },
                        {
                            name: '**💸 Currency [0]**',
                            value: 'nothing yet nob'
                        },
                        {
                            name: '**🛠️ Utilities [7]**',
                            value: 'help,invite,guild,rank,support,info,membercount'
                        },
                        {
                            name: '**Owner**',
                            value: 'eval'
                        }
                    ],
                    
                    footer: {
                        text: `https://top.gg/servers/756254215923564694`
                    }
                }
                })
            
        }
    
    }