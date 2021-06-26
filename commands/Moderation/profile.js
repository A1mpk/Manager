const Discord = require("discord.js");
const Levels = require("discord-xp");
const ProfileData = require("../model/Profile");

module.exports = {
  name: "profile",
  description: "Profile",
  disabled: false,
  async execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );
    if (message.content.toLowerCase().includes("text-color".toLowerCase())) {
      const ColorChooser = message.content.slice(20);
      const ProfileData = require("../model/Profile");
      if (!ColorChooser)
        return message.channel.send(
          `You need to choose a color for your profile. It can be in hex code or the name of it.`
        );
      try {
        try {
          await ProfileData.findOneAndUpdate(
            {
              RealUser: message.member.id,
            },
            {
              guildID: message.guild.id,
              guildName: message.guild.name,
              textColor: ColorChooser,
            },
            {
              upsert: true,
            }
          );
        } catch (er) {
          return message.channel.send(er);
        }
      } catch (er) {
        message.channel.send(er);
      }
      const cache = {};
      let data = cache[message.member.id];

      if (!data) {
        try {
          const result = await ProfileData.findOne({
            RealUser: message.member.id,
          });
          if (!result) return;
          cache[message.member.id] = data = [
            result.username,
            result.background,
          ];
        } catch (er) {
          console.log(er);
        }
      }
      const Canvas = require("canvas");
      const canvas = Canvas.createCanvas(1000, 333);
      const ctx = canvas.getContext("2d");
      const background = await Canvas.loadImage(data[1] || "801095.jpg");
      if (!background)
        return message.channel.send(
          `Please make sure you have selected a background for your card.`
        );

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = ColorChooser;
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = ColorChooser;
      ctx.fillRect(180, 216, 770, 65);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeRect(180, 216, 770, 65);
      ctx.stroke();

      ctx.fillStyle = ColorChooser;
      ctx.globalAlpha = 0.6;
      ctx.fillRect(180, 216, 65);
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.font = "bold 36px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = ColorChooser;
      ctx.fillText(` X / X XP`, 650, 260);

      ctx.textAlign = "left";
      ctx.fillText(
        `${data[0] || "YOURNAME"}#${message.member.user.discriminator}`,
        300,
        120
      );

      ctx.font = "bold 50px Arial";
      ctx.fillText("LEVEL", 300, 180);
      ctx.fillText("X", 470, 180);

      ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
      ctx.lineWidth = 6;

      ctx.strokeStyle = ColorChooser;
      ctx.stroke();
      ctx.closePath();
      ctx.clip();
      const avatar = await Canvas.loadImage(
        message.member.user.displayAvatarURL({ format: "png" })
      );
      ctx.drawImage(avatar, 40, 40, 250, 250);

      const attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "rank.png"
      );
      message.channel.send(
        "Like this? If you done like it, please re-run the command.",
        attachment
      );
    } else if (
      message.content.toLowerCase().includes("username".toLowerCase())
    ) {
      const Username = message.content.slice(18);

      const ProfileData = require("../model/Profile");

      if (!Username)
        return message.channel.send(
          `You can set a custom username for your rank card. ;D`
        );
      try {
        try {
          await ProfileData.findOneAndUpdate(
            {
              RealUser: message.member.id,
            },
            {
              guildID: message.guild.id,
              guildName: message.guild.name,
              username: Username,
            },
            {
              upsert: true,
            }
          );
        } catch (er) {
          return message.channel.send(er);
        }
      } catch (er) {
        message.channel.send(er);
      }

      const cache = {};
      let data = cache[message.member.id];

      if (!data) {
        try {
          const result = await ProfileData.findOne({
            RealUser: message.member.id,
          });
          if (!result) return;
          cache[message.member.id] = data = [
            result.textColor,
            result.background,
          ];
        } catch (er) {
          console.log(er);
        }
      }

      const Canvas = require("canvas");
      const canvas = Canvas.createCanvas(1000, 333);
      const ctx = canvas.getContext("2d");
      const background = await Canvas.loadImage(data[1] || "801095.jpg");
      if (!background)
        return message.channel.send(
          `Please make sure you have selected a background for your card.`
        );

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = data[0] || "WHITE";
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = data[0];
      ctx.fillRect(180, 216, 770, 65);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeRect(180, 216, 770, 65);
      ctx.stroke();

      ctx.fillStyle = data[0] || "WHITE";
      ctx.globalAlpha = 0.6;
      ctx.fillRect(180, 216, 65);
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.font = "bold 36px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = data[0] || "WHITE";
      ctx.fillText(` X / X XP`, 650, 260);

      ctx.textAlign = "left";
      ctx.fillText(
        `${Username}#${message.member.user.discriminator}`,
        300,
        120
      );

      ctx.font = "bold 50px Arial";
      ctx.fillText("LEVEL", 300, 180);
      ctx.fillText("X", 470, 180);

      ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
      ctx.lineWidth = 6;

      ctx.strokeStyle = data[0] || "WHITE";
      ctx.stroke();
      ctx.closePath();
      ctx.clip();
      const avatar = await Canvas.loadImage(
        message.member.user.displayAvatarURL({ format: "png" })
      );
      ctx.drawImage(avatar, 40, 40, 250, 250);

      const attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "rank.png"
      );
      message.channel.send(
        "Like this? If you done like it, please re-run the command.",
        attachment
      );
    } else if (
      message.content.toLowerCase().includes("background".toLowerCase())
    ) {
      const Background = message.content.slice(20);

      const ProfileData = require("../model/Profile");

      if (!Background)
        return message.channel.send(
          `Add a background for your rank card. The background may not work if it's not supported by the bot. In that case, please use another one.`
        );
      try {
        try {
          await ProfileData.findOneAndUpdate(
            {
              RealUser: message.member.id,
            },
            {
              guildID: message.guild.id,
              guildName: message.guild.name,
              background: Background,
            },
            {
              upsert: true,
            }
          );
        } catch (er) {
          return message.channel.send(er);
        }
      } catch (er) {
        message.channel.send(er);
      }

      const cache = {};
      let data = cache[message.member.id];

      if (!data) {
        try {
          const result = await ProfileData.findOne({
            RealUser: message.member.id,
          });
          if (!result) return;
          cache[message.member.id] = data = [result.textColor, result.username];
        } catch (er) {
          console.log(er);
        }
      }

      const Canvas = require("canvas");
      const canvas = Canvas.createCanvas(1000, 333);
      const ctx = canvas.getContext("2d");
      try {
        const background = await Canvas.loadImage(Background);

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      } catch {
        console.log(
          `The background wasn't supported. By ${message.member.user.tag}. Link: ${Background}`
        );
      }

      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = data[0] || "WHITE";
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = data[0] || "WHITE";
      ctx.fillRect(180, 216, 770, 65);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeRect(180, 216, 770, 65);
      ctx.stroke();

      ctx.fillStyle = data[0] || "WHITE";
      ctx.globalAlpha = 0.6;
      ctx.fillRect(180, 216, 65);
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.font = "bold 36px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = data[0];
      ctx.fillText(` X / X XP`, 650, 260);

      ctx.textAlign = "left";
      ctx.fillText(
        `${data[1] || "WHITE"}#${message.member.user.discriminator}`,
        300,
        120
      );

      ctx.font = "bold 50px Arial";
      ctx.fillText("LEVEL", 300, 180);
      ctx.fillText("X", 470, 180);

      ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
      ctx.lineWidth = 6;

      ctx.stroke();
      ctx.closePath();
      ctx.clip();
      const avatar = await Canvas.loadImage(
        message.member.user.displayAvatarURL({ format: "png" })
      );
      ctx.drawImage(avatar, 40, 40, 250, 250);

      const attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "rank.png"
      );
      message.channel.send(
        "Like this? If you done like it, please re-run the command. (If your background didn't show up, it means its not supported for Mit.",
        attachment
      );
    } else if (message.content.toLowerCase().includes("reset".toLowerCase())) {
      const ProfileData = require("../model/Profile");

      try {
        try {
          await ProfileData.findOneAndDelete({
            RealUser: message.member.id,
          });

          message.channel.send(`Reset every setting for your rank card.`);
        } catch (er) {
          return message.channel.send(er);
        }
      } catch (er) {
        message.channel.send(er);
      }
    }else if (message.content.toLowerCase().includes("default".toLowerCase())) {
      const ProfileData = require("../model/Profile");

      try {
        try {
          await ProfileData.findOneAndUpdate(
            {
              RealUser: message.member.id,
            },
            {
              guildID: message.guild.id,
              guildName: message.guild.name,
              username: message.member.user.username,
              textColor: "WHITE",
              background: '801095.jpg'
            },
            {
              upsert: true,
            }
          );
          message.channel.send(`Your profile card has been set to default.`)
        } catch (er) {
          return message.channel.send(er);
        }
      } catch (er) {
        message.channel.send(er);
      }

    }else if (message.content.toLowerCase().includes("help".toLowerCase())) {
     const ProfileHelp = new Discord.MessageEmbed()
     .setTitle('Profiles')
     .addField('default', '`>profile default` - Profile card will use the default template.')
     .addField('text-color', '`>profile text-color <color> or <color code> - Automatically change the color of the text.`')
     .addField('username', '`>profile username <name>` - You can put a custom username for your card.')
     .addField('background', '`>profile background <url>` - You can change the background of your card by putting a link of it. Sometimes, the background would be the same if the URL was not supported for the bot.')
    .addField('reset', '`>profile reset` - You can reset your custom settings for the card.')
    .setColor("WHITE")
    .setTimestamp()
    message.channel.send(ProfileHelp)
    }else message.channel.send(`>profile help ;)`)
  },
};
