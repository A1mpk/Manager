const Discord = require('discord.js')
module.exports = {
    name: 'help',
    description: "HELP COMMAND ",
    execute(message, args){
        if(message.content === "/help"){
            message.channel.send({
                embed:{
                    title: 'List of commands [35]',
                    color: 15105570, 
                    fields:[
                        {
                            name: '**😴 Moderation [8]**',
                            value: 'ban,kick,warn,tempban,tempmute,mute,lock,announce'
                        },     
                        {
                            name: '**🤩 Fun [3]**',
                            value: 'say,8ball,roast,'
                        },
                        {
                            name: '**🔊 Music [8]**',
                            value: 'play,skip,pause,stop,resume,queue,clearqueue,search,'
                        },
                        {
                            name: '**💸 Currency [8]**',
                            value: 'daily,shop,inventory,work,cash,balance,currency,buy,'
                        },
                        {
                            name: '**🛠️ Utilities [4]**',
                            value: 'help,invite,guild,rank,support,info'
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
    
    }