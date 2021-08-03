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
        const Permission = new Discord.MessageEmbed()
        .setTitle('I need permissions!')
        .setDescription('I\'m missing ``**MANAGE_CHANNELS**`` permissions!')
        .setColor('#339295')
        if(message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")){
    
            const LevelsSchema = require("../model/levels")
            const cache = {} 
            let data = cache[message.guild.id]
          
            if (!data) {
              
          
           
                try {
                  const result = await LevelsSchema.findOne({guildID: message.guild.id})
                 if(!result){
                   const OhNO = new Discord.MessageEmbed()
                   .setTitle('Oh no!')
                   .setDescription('Seems like levelling is disabled by default in this server!')
                   .setFooter('Category - Utilities')
                   .setColor("#339295")
                   message.channel.send('**Help**: You can enable levelling to your server by using the `**>levels**` command.',OhNO)
                   return undefined
                 }else
                  cache[message.guild.id] = data = [result.levels]
                  
                }catch(er){
                  console.log(er)
                }
            }
            if(data[0] === "disable"){
              const OhNO = new Discord.MessageEmbed()
              .setTitle('Oh no!')
              .setDescription('The owner of this server disabled levelling! Sorry.')
              .setFooter('Category - Utilities')
              .setColor("#339295")
              message.channel.send('**Help**: You can enable levelling to your server by using the `**>levels**` command.',OhNO)
              return undefined
            }
            // PROFILE DATA
            const ProfileData = require('../model/Profile')
            const cache2 = {};
            let data2 = cache2[message.member.id];
          
            if (!data2) {
              try {
                const result2 = await ProfileData.findOne({
                  RealUser: message.member.id,
                });
                if (!result2){
                  const NeedToCreate = new Discord.MessageEmbed()
                  .setTitle('Create yourself a profile!')
                  .setColor("#339295")
                  .setDescription('Hey! You need to create an profile.')
                  message.channel.send('**Extra Tip**: A profile can be created by using `**>profile**`!', NeedToCreate)
                  return undefined
                }else
                cache2[message.member.id] = data2 = [result2.username, result2.background, result2.textColor];
              } catch (er) {
                console.log(er);
              }
            }
            const mesag = message.content.slice(5)
          
            const target = message.author 
            const user = await Levels.fetch(target.id,message.guild.id)
            if(!user){
              const XPNEEDEDT = new Discord.MessageEmbed()
              .setTitle('Need something..')
              .setDescriptipn(`You need to gain XPs before running this command. You can gain XP by being active in this server.`)
            }
            const neededXP2 = Levels.xpFor(parseInt(user.level) + 1);
          
          
            const canvas = Canvas.createCanvas(1000, 333)
            const ctx = canvas.getContext('2d')
          
            const background = await Canvas.loadImage(
               data2[1] ||'801095.jpg'
            )
          
          
          ctx.drawImage(background,0,0, canvas.width, canvas.height)
          
          ctx.beginPath();
          ctx.lineWidth = 4;
          ctx.strokeStyle = data2[2] || 'WHITE';
          ctx.globalAlpha = 0.2;
          ctx.fillStyle = data2[2] ||"WHITE";
          ctx.fillRect(180, 216, 770, 65);
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.strokeRect(180,216,770,65);
          ctx.stroke();
          
          ctx.fillStyle = data2[2] ||"WHITE";
          ctx.globalAlpha = 0.6;
          ctx.fillRect(180, 216, 65 )
          ctx.fill();
          ctx.globalAlpha = 1;
          
          ctx.font = "bold 36px Arial";
          ctx.textAlign = "center";
          ctx.fillStyle =data2[2] ||"WHITE";
          ctx.fillText(`${user.xp} / ${neededXP2} XP`, 650,260);
          
          ctx.textAlign = "left";
          ctx.fillText(`${data2[0] || message.member.user.username}#${message.member.user.discriminator}`, 300, 120);
          
          ctx.font = "bold 50px Arial";
          ctx.fillText("LEVEL", 300,180);
          ctx.fillText(user.level, 470 , 180);
          
          ctx.arc(170, 160 , 120 , 0, Math.PI * 2, true);
          ctx.lineWidth = 6;
          
          
          ctx.strokeStyle = data2[2] || "WHITE" ;
          ctx.stroke();
          ctx.closePath();
          ctx.clip();
          const avatar = await Canvas.loadImage(target.displayAvatarURL({format: 'png'}, ));
          ctx.drawImage(avatar, 40,40,250,250)
          
          
          
          
          
            const attachment = new Discord.MessageAttachment(canvas.toBuffer() , "rank.png")
            message.channel.send(attachment)
        
          }else   message.channel.send(Permission)
          
          
        
       
    }
}