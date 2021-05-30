const Discord = require('discord.js')
const Levels = require('discord-xp');
const Canvas = require('canvas');
Levels.setURL("mongodb+srv://admin:LmVUsNQeLiYCsJfr@manager.hd8gy.mongodb.net/<DataBase505>?retryWrites=true&w=majority")
module.exports = { 
    name: "rank",
    description: "Rank",
    disabled: false,
   async execute(message, args){
        if(this.disabled === true) return message.channel.send(`This command has been disabled for further investigation.`)
        if(message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")){
    
            const LevelsSchema = require("../model/levels")
            const cache = {} 
            let data = cache[message.guild.id]
          
            if (!data) {
              
          
           
                try {
                  const result = await LevelsSchema.findOne({guildID: message.guild.id})
                 if(!result)return message.channel.send(`Levelling for this guild has been disabled by default.`)
                  cache[message.guild.id] = data = [result.levels]
                  
                }catch(er){
                  console.log(er)
                }
            }
            if(data[0] === "disable")return message.channel.send(`Levelling system is currently disabled in this guild.`)
            const mesag = message.content.slice(5)
          
            const target = message.author 
            const user = await Levels.fetch(target.id,message.guild.id)
            if(!user) return message.channel.send(`You dont have any xp yet, be more active in this guild to gain more xp!`)
            const neededXP2 = Levels.xpFor(parseInt(user.level) + 1);
          
          
            const canvas = Canvas.createCanvas(1000, 333)
            const ctx = canvas.getContext('2d')
          
            const background = await Canvas.loadImage(
             '801095.jpg'
            )
          
          
          ctx.drawImage(background,0,0, canvas.width, canvas.height)
          
          ctx.beginPath();
          ctx.lineWidth = 4;
          ctx.strokeStyle = 'WHITE';
          ctx.globalAlpha = 0.2;
          ctx.fillStyle = "#000000";
          ctx.fillRect(180, 216, 770, 65);
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.strokeRect(180,216,770,65);
          ctx.stroke();
          
          ctx.fillStyle = "#ffffff";
          ctx.globalAlpha = 0.6;
          ctx.fillRect(180, 216, 65 )
          ctx.fill();
          ctx.globalAlpha = 1;
          
          ctx.font = "bold 36px Arial";
          ctx.textAlign = "center";
          ctx.fillStyle = " WHITE";
          ctx.fillText(`${user.xp} / ${neededXP2} XP`, 650,260);
          
          ctx.textAlign = "left";
          ctx.fillText(`${target.tag}`, 300, 120);
          
          ctx.font = "bold 50px Arial";
          ctx.fillText("LEVEL", 300,180);
          ctx.fillText(user.level, 470 , 180);
          
          ctx.arc(170, 160 , 120 , 0, Math.PI * 2, true);
          ctx.lineWidth = 6;
          
          
          ctx.strokeStyle = "WHITE" ;
          ctx.stroke();
          ctx.closePath();
          ctx.clip();
          const avatar = await Canvas.loadImage(target.displayAvatarURL({format: 'png'}, ));
          ctx.drawImage(avatar, 40,40,250,250)
          
          
          
          
          
            const attachment = new Discord.MessageAttachment(canvas.toBuffer() , "rank.png")
            message.channel.send(attachment)
        
          }else message.member.send('I need `SEND_MESSAGE` permissions on the channel or in my role.')
       
    }
}