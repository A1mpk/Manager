/// THE VARIABLES IMPORTANT!
const {
  Client,
  Collection,
  Structures,
  DiscordAPIError,
  Util,
  MessageEmbed,
} = require("discord.js");

const Discord = require("discord.js");
const fs = require("fs");
const client = new Client();
const DButton = require('discord-buttons')

client.commands = new Collection();
client.aliases = new Collection();
client.mongoose = require("./utils/mongoose");
client.categories = fs.readdirSync("./commands/");
const { config } = require("dotenv");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube("AIzaSyDRzH6PP1AR3FR5CYB6riNei4BSEdJqLf8");
const Levels = require("discord-xp");
Levels.setURL(
  "mongodb+srv://admin:LmVUsNQeLiYCsJfr@manager.hd8gy.mongodb.net/<DataBase505>?retryWrites=true&w=majority"
);
const Canvas = require("canvas");
const queue = new Map();

// COMMAND HANDLER
config({
  path: `${__dirname}/.env`,
});

["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
fs.readdir("./events/", (err, files) => {
  if (err) return console.error;
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split(".")[0];
    console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
});
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

/// PREFIX
const x = ">";
/// ALL THE LISTENERS :

client.on("guildCreate", (guild) => {
  let defaultChannel = "";
  guild.channels.cache.forEach((channel) => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  });
  try {
    const MuteROle = guild.roles.cache.find(
      (Role) => Role.name === "Muted"
    );
    if(!MuteROle){
      guild.roles
      .create({
        data: {
          name: "Muted",
          color: "NONE",
          permissions: ["VIEW_CHANNEL"],
        },
        reason: "Automatic Mute Role!",
      })
      .then(console.log())
      .catch(console.error);
    
    }else
   
    guild.channels.cache.forEach((channel) => {
      channel.updateOverwrite(MuteROle, {
        SEND_MESSAGES: false,
      });
    });
    defaultChannel.send({
      embed: {
        title: "List of commands",
        color: "#339295",
        description: '*What\'s new?* Brand new design for Mint. **Update: 2.0.9**',
        fields:[
          {
            name: "**⚙️ Configuration**",
            value:
              "`>help configs` - Update Mint's settings to your preference.",
          },
          {
            name: "**:sleeping: Moderation**",
            value:
              " `>help Moderation  ` - Help's moderating the server better with powerful commands.",
          },
          {
            name: "**🛠️ Utilities **",
            value:
              "`>help Utilities ` - Commands that are uncategorized.",
          },
          {
            name: "**🏷️ Description**",
            value:
              "`>help description` - Mint's unique category! Add a description for your role.",
          },
         {
            name: "**💌 Profile**",
            value:
              "``>help profile` - You can customize your rank card with these commands.",
          },
          {
            name: "**🤩 Fun **",
            value:
              "`>help fun` - Fun commands to bring in a bit of joy.",
          },
          {
            name: "🎵 Music ",
            value:
              "`>help music` - Listen to music through Mint.",
          },
        ],
      },
    });
  } catch {
    return console.log(`I didnt have permission.`);
  }
});
client.on('ready', () => {
  client.user.setActivity({name: '>help'})
})
client.on("guildMemberAdd", async (member) => {
  const cache = {};
  let data = cache[member.guild.id];
  const LoggingSchema = require("./commands/model/LoggingSchema");
  if (!data) {
    try {
      const result = await LoggingSchema.findOne({
        guildID: member.guild.id,
      });
      if (!result) return;
      cache[member.guild.id] = data = [result.channel];
    } catch (er) {
      console.log(er);
    }
  }

  const WelcomeMessageSchema = require("./commands/model/welcome-message");
  const cacheing = {};
  let datas = cacheing[member.guild.id];

  if (!datas) {
    try {
      const resulted = await WelcomeMessageSchema.findOne({
        guildID: member.guild.id,
      });
      if (!resulted) return;
      cacheing[member.guild.id] = datas = [resulted.message];
    } catch (er) {
      console.log(er);
    }
  }

  try {
    const WelcomeEmbed = new Discord.MessageEmbed()
      .setAuthor(`${member.guild.name}`, member.guild.iconURL())
      .setDescription(datas)
      .setTimestamp()
      .setColor("#339295");

    member.send(WelcomeEmbed);
  } catch {
    console.log(`I cant DM THE USER!>.`);
  }

  const Channel = member.guild.channels.cache.find(
    (channel) => data[0] === channel.id
  );
  if (!Channel) return;
  if (!member.guild.me.hasPermission("SEND_MESSAGES")) return;
  if (!member.guild.me.hasPermission("MANAGE_CHANNELS")) return;
  if (!member.guild.me.hasPermission("VIEW_CHANNEL")) return;

  const canvas = Canvas.createCanvas(506, 218);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage("BLACK-KARD-NOT-RACIST.png");

  let x = 0;
  let y = 0;
  ctx.drawImage(background, x, y);

  const pfp = await Canvas.loadImage(
    member.user.displayAvatarURL({
      format: "png",
    })
  );
  x = canvas.width / 2 - pfp.width / 2;
  y = 10;
  ctx.strokeStyle = "WHITE";
  ctx.drawImage(pfp, x, y);

  ctx.fillStyle = "#ffffff";
  ctx.font = `25px sans-serif`;
  let text = `Welcome ${member.user.tag}`;
  x = canvas.width / 2 - ctx.measureText(text).width / 2;
  ctx.fillText(text, x, 45 + pfp.height);
  ctx.fillStyle = "#ffffff";
  ctx.font = "20px sans-serif";
  text = `${member.guild.memberCount}th member!`;
  x = canvas.width / 2 - ctx.measureText(text).width / 2;
  ctx.fillText(text, x, 80 + pfp.height);
  const attachment = new Discord.MessageAttachment(canvas.toBuffer());
  try {
    const AutoRoleSchema2 = require("../commands/model/AutoRole");
    const cache2 = {};
    let data2 = cache2[member.guild.id];

    if (!data2) {
      try {
        const result2 = await AutoRoleSchema2.findOne({
          _id: member.guild.id,
        });
        if (!result2) return;
        cache2[member.guild.id] = data2 = [result2.autorole];
      } catch (er) {
        console.log(er);
      }
    }
    const actualrole = member.guild.roles.cache.find(
      (role) => data2[0] === role.id
    );
    if (!actualrole) return;
    member.roles.add(actualrole);

    Channel.send(
      `Hey ${member}, welcome to **${member.guild.name}**`,
      attachment
    );
  } catch (er) {
    console.warn(`Error : ${er}`);
  }
});
client.on("guildMemberRemove", async (member) => {
  const LoggingSchema = require("./commands/model/LoggingSchema");
  const cache = {};
  let data = cache[member.guild.id];

  if (!data) {
    try {
      const result = await LoggingSchema.findOne({
        guildID: member.guild.id,
      });
      if (!result) return;
      cache[member.guild.id] = data = [result.channel];
    } catch (er) {
      console.log(er);
    }
  }

  const Channel = member.guild.channels.cache.find(
    (channel) => data[0] === channel.id
  );
  if (!Channel) return;

  if (!member.guild.me.hasPermission("SEND_MESSAGES")) return;
  if (!member.guild.me.hasPermission("MANAGE_CHANNELS")) return;
  if (!member.guild.me.hasPermission("VIEW_CHANNEL")) return;

  const canvas = Canvas.createCanvas(506, 218);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage("BLACK-KARD-NOT-RACIST.png");

  let x = 0;
  let y = 0;
  ctx.drawImage(background, x, y);

  const pfp = await Canvas.loadImage(
    member.user.displayAvatarURL({
      format: "png",
    })
  );
  x = canvas.width / 2 - pfp.width / 2;
  y = 10;
  ctx.strokeStyle = "WHITE";
  ctx.drawImage(pfp, x, y);

  ctx.fillStyle = "#ffffff";
  ctx.font = `25px sans-serif`;
  let text = `${member.user.tag} just left the group.`;
  x = canvas.width / 2 - ctx.measureText(text).width / 2;
  ctx.fillText(text, x, 45 + pfp.height);

  ctx.font = "20px sans-serif";
  text = `${member.guild.memberCount} members!`;
  x = canvas.width / 2 - ctx.measureText(text).width / 2;
  ctx.fillText(text, x, 80 + pfp.height);
  const attachment = new Discord.MessageAttachment(canvas.toBuffer());

  try {
    Channel.send(`Bye ${member}, we will miss you!`, attachment);
  } catch (er) {
    console.warn(`An error occured : ${er}`);
  }
});
client.on("inviteCreate", async (invite) => {
  if (!invite.guild.me.hasPermission("SEND_MESSAGES")) return;
  if (!invite.guild.me.hasPermission("MANAGE_CHANNELS")) return;
  if (!invite.guild.me.hasPermission("VIEW_CHANNEL")) return;
  const LoggingSchema = require("./commands/model/LoggingSchema");
  const cache = {};
  let data = cache[invite.guild.id];

  if (!data) {
    try {
      const result = await LoggingSchema.findOne({
        guildID: invite.guild.id,
      });
      if (!result) return;
      cache[invite.guild.id] = data = [result.channel];
    } catch (er) {
      console.log(er);
    }
  }

  const Channel = invite.guild.channels.cache.find(
    (channel) => data[0] === channel.id
  );
  if (!Channel) return;
  const MessageEmbed2 = new Discord.MessageEmbed()
    .setAuthor(`Invite`, invite.guild.me.user.displayAvatarURL())
    .setTimestamp()
    .setDescription(
      `[Created](${invite.url}) by *${invite.inviter}* in *${invite.channel}*.`
    )
    .setFooter(`Mint detected an invite link.`)
    .setColor("#339295");

  Channel.send(MessageEmbed2);
});
client.on("inviteDelete", async (invite) => {
  if (!invite.guild.me.hasPermission("SEND_MESSAGES")) return;
  if (!invite.guild.me.hasPermission("MANAGE_CHANNELS")) return;
  if (!invite.guild.me.hasPermission("VIEW_CHANNEL")) return;
  const LoggingSchema = require("./commands/model/LoggingSchema");
  const cache = {};
  let data = cache[invite.guild.id];

  if (!data) {
    try {
      const result = await LoggingSchema.findOne({
        guildID: invite.guild.id,
      });
      if (!result) return;
      cache[invite.guild.id] = data = [result.channel];
    } catch (er) {
      console.log(er);
    }
  }

  const Channel = invite.guild.channels.cache.find(
    (channel) => data[0] === channel.id
  );
  if (!Channel) return;
  const MessageEmbed2 = new Discord.MessageEmbed()
    .setAuthor(`Invite`, invite.guild.me.user.displayAvatarURL())
    .setTimestamp()
    .setDescription(`An [invite](${invite.url}) has been deleted.`)
    .setFooter(`Mint detected a deleted invite.`)
    .setColor("#339295");

  Channel.send(MessageEmbed2);
});
client.on("messageDelete", async (message) => {
  const LoggingSchema = require("./commands/model/LoggingSchema");
  const cache = {};
  let data = cache[message.guild.id];

  if (!data) {
    try {
      const result = await LoggingSchema.findOne({
        guildID: message.guild.id,
      });
      if (!result)return;
      cache[message.guild.id] = data = [result.channel];
    } catch (er) {
      console.log(er);
    }
  }

  const Channel = message.guild.channels.cache.find(
    (channel) => data[0] === channel.id
  );
  if (!Channel) return;

  if (!message.guild.me.hasPermission("SEND_MESSAGES")) return;
  if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return;
  if (!message.guild.me.hasPermission("VIEW_CHANNEL")) return;
  if (message.author.bot) return;
  try {
    const MessageEmbed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
      .setDescription(`"${message.content}"`)

      .setTimestamp()
      .setFooter(`Mint detected a deleted message.`)

      .setColor("#339295");

    Channel.send(MessageEmbed);
  } catch (er) {
    return;
  }
});

client.on("roleDelete", async (Role) => {
  if (!Role.guild.me.hasPermission("SEND_MESSAGES")) return;
  if (!Role.guild.me.hasPermission("MANAGE_CHANNELS")) return;
  if (!Role.guild.me.hasPermission("VIEW_CHANNEL")) return;
  const LoggingSchema = require("./commands/model/LoggingSchema");
  const cache = {};
  let data = cache[Role.guild.id];

  if (!data) {
    try {
      const result = await LoggingSchema.findOne({ guildID: Role.guild.id });
      if (!result) return;
      cache[Role.guild.id] = data = [result.channel];
    } catch (er) {
      console.log(er);
    }
  }

  const Channel = Role.guild.channels.cache.find(
    (channel) => data[0] === channel.id
  );
  if (!Channel) return;

  const ROleInfo = new Discord.MessageEmbed()
    .setAuthor(`Role `, Role.guild.me.user.displayAvatarURL())
    .setDescription(`**${Role.name}** was deleted.`)
    .setTimestamp()
    .setFooter(`Mint detected a deleted role.`)

    .setColor("#339295");
  Channel.send(ROleInfo);
});
client.on("emojiCreate", async (emoji) => {
  if (!emoji.guild.me.hasPermission("SEND_MESSAGES")) return;
  if (!emoji.guild.me.hasPermission("MANAGE_CHANNELS")) return;
  if (!emoji.guild.me.hasPermission("VIEW_CHANNEL")) return;

  const LoggingSchema = require("./commands/model/LoggingSchema");
  const cache = {};
  let data = cache[emoji.guild.id];

  if (!data) {
    try {
      const result = await LoggingSchema.findOne({
        guildID: emoji.guild.id,
      });
      if (!result) return;
      cache[emoji.guild.id] = data = [result.channel];
    } catch (er) {
      console.log(er);
    }
  }

  const Channel = emoji.guild.channels.cache.find(
    (channel) => data[0] === channel.id
  );
  if (!Channel) return;

  const MessageEmbed2 = new Discord.MessageEmbed()
    .setAuthor(`Emoji`, emoji.url)
    .setTimestamp()
    .setDescription(`**${emoji.name}** has been created.`)
    .setFooter("Mint detected an emoji.")
    .setColor("#339295");

  Channel.send(MessageEmbed2);
});

client.on("emojiDelete", async (emoji) => {
  if (!emoji.guild.me.hasPermission("SEND_MESSAGES")) return;
  if (!emoji.guild.me.hasPermission("MANAGE_CHANNELS")) return;
  if (!emoji.guild.me.hasPermission("VIEW_CHANNEL")) return;

  const LoggingSchema = require("./commands/model/LoggingSchema");
  const cache = {};
  let data = cache[emoji.guild.id];

  if (!data) {
    try {
      const result = await LoggingSchema.findOne({
        guildID: emoji.guild.id,
      });
      if (!result) return;
      cache[emoji.guild.id] = data = [result.channel];
    } catch (er) {
      console.log(er);
    }
  }

  const Channel = emoji.guild.channels.cache.find(
    (channel) => data[0] === channel.id
  );
  if (!Channel) return;

  const MessageEmbed2 = new Discord.MessageEmbed()
    .setAuthor(`Emoji`, emoji.guild.me.user.displayAvatarURL())
    .setTimestamp()
    .setDescription(`**${emoji.name}** has been deleted.`)
    .setFooter(`Mint detected an emoji.`)
    .setColor("#339295");
  Channel.send(MessageEmbed2);
});
/// ALL THE COMMANDS HANDLER!

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const serverQueue = queue.get(message.guild.id);

  const randomXp = Math.floor(Math.random() * 15) + 1;
  const hasLeveledUp = await Levels.appendXp(
    message.author.id,
    message.guild.id,
    randomXp
  );
  if (hasLeveledUp) {
    const LevelsSchema = require("./commands/model/levels");
    const cache = {};
    let data = cache[message.guild.id];

    if (!data) {
      try {
        const result = await LevelsSchema.findOne({
          guildID: message.guild.id,
        });
        if (!result) return;
        cache[message.guild.id] = data = [result.levels];
      } catch (er) {
        console.log(er);
      }
    }

    if (data[0] === "disable") return;
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message.channel.send(
      `Congratulations <@${message.member.user.id}>, you just reached level ${user.level}.`
    );
  }

  if (message.content.toLowerCase().includes(x + "play".toLowerCase())) {
    
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      try {
        execute(message, serverQueue);
      } catch {
        message.channel.send(
          `Something went wrong, try making sure I have all the permissions & that I could join your voice channel.`
        );
      }
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  if (message.content.toLowerCase().includes(x + "lyrics".toLowerCase())) {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      try {
        lyrics(message, serverQueue);
      } catch (err) {
        console.log(err);
      }
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  } else if (message.content.toLowerCase().includes(x + "skip".toLowerCase())) {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      skip(message, serverQueue);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  } else if (message.content.toLowerCase().includes(x + "stop".toLowerCase())) {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      stop(message, serverQueue);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  } else if (
    message.content.toLowerCase().includes(x + "volume".toLowerCase())
  ) {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      volume(message, serverQueue);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  } else if (message.content.toLowerCase().includes(x + "np".toLowerCase())) {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      np(message, serverQueue);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  } else if (
    message.content.toLowerCase().includes(x + "queue".toLowerCase())
  ) {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      Queue(message, serverQueue);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  } else if (
    message.content.toLowerCase().includes(x + "pause".toLowerCase())
  ) {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      pause(message, serverQueue);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  } else if (
    message.content.toLowerCase().includes(x + "resume".toLowerCase())
  ) {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      resume(message, serverQueue);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  } else if (message.content.toLowerCase().includes(x + "loop".toLowerCase())) {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      loop(message, serverQueue);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  } else if (message.content.toLowerCase().includes(x + "shuffle")) {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      shuffle(message, serverQueue);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  } else if (message.content.toLowerCase().includes(x + "leave")) {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      leave(message, serverQueue);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  } else if (message.content.toLowerCase().includes(x + "join".toLowerCase())) {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      join(message, serverQueue);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  async function execute(message, serverQueue) {
    const args = message.content.slice(5);
    const searchString = message.content.slice(5);
    if (!args) {
      const Kick = new Discord.MessageEmbed()
        .setTitle("What are you playing?")
        .setDescription(
          "You need to enter an URL or a track title."
        )

        .setColor("#339295")
        
      return message.channel.send(Kick);
    }
    const url = args ? args.replace(/<(.+)>/g, "$1") : "";
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("Voice Channel..")
      .setDescription("You need to be in a voice channel to play music!")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined
    }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (
      !permissions.has("CONNECT") ||
      !permissions.has("SPEAK") ||
      !permissions.has("VIEW_CHANNEL")
    ) {
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("An error...")
      .setDescription("I need the following permissionsin your voice channel. [`CONNECT`, `SPEAK`, `VIEW_CHANNEL`]")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined
    
    }
    try {
      var video = await youtube.getVideoByID(url);
    } catch {
      try {
        var videos = await youtube.searchVideos(searchString, 1);
        var video = await youtube.getVideoByID(videos[0].id);
      } catch {
        const VoiceNee = new Discord.MessageEmbed()
        .setTitle("What is that?")
        .setDescription(" I couldn't find any search results")
        .setColor("#339295")
        message.channel.send(VoiceNee)
        return undefined
       
      }
    }

    const song = {
      id: video.id,
      title: Util.escapeMarkdown(video.title),
      url: `https://www.youtube.com/watch?v=${video.id}`,
      author: video.channel.title,
      channelURL: video.channel.url,
      minutes: video.duration.minutes,
      seconds: video.duration.seconds,
      hours: video.duration.hours,
      thumbnail: video.thumbnails,
    };
    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 2,
        playing: true,
        loop: false,
        queueloop: false,
        shuffle: false,
      };

      queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();

        connection.voice.setSelfDeaf(true);
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      try {
        if (!message.guild.me.voice.channel) {
          const VoiceNee = new Discord.MessageEmbed()
        .setTitle("What is that?")
        .setDescription("Something went wrong ;-; Use the `>join` command & use the `play` command as normal.")
        .setColor("#339295")
        message.channel.send(VoiceNee)
        return undefined
         
       
        } else if (message.guild.me.voice.channel) {
          const QueueAdded = new MessageEmbed()
            .setAuthor(
              `Added to queue`,
              `https://www.freeiconspng.com/uploads/youtube-logo-png-hd-14.png`
            )
            .setDescription(
              `> [${song.title}](${serverQueue.songs[0].url}) by [${song.author}](${serverQueue.songs[0].url})`
            )
            .setColor("#339295")
            .setTimestamp();

          serverQueue.songs.push(song);
          return message.channel.send(QueueAdded);
        }
      } catch (er) {
        message.channel.send(
          `An error occured : ${er}, **contact us if it happens again!**`
        );
      }
    }
  }
  // QUEUE
  function Queue(message, serverQueue) {
    if (!serverQueue) return message.channel.send(`The queue is empty!`);
    const QueueEmbed = new MessageEmbed()
      .setDescription(
        `
        ${serverQueue.songs
          .map(
            (song) =>
              `  **[${song.title}](${serverQueue.songs[0].url}) by [${song.author}](${serverQueue.songs[0].url})**`
          )
          .join(`\n`)}`
      )
      .setColor("#339295")
      .setTimestamp()
      .setAuthor(`Queue`);

    message.channel.send(QueueEmbed);
    return undefined;
  }

  // LYRICS FINDER (DISMISSED PROJECT.)
  async function lyrics(message, serverQueue) {
    if (!message.member.voice.channel){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("You need to be in a VC!")
      .setDescription("You are not connected to a voice channel.")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
  }
    if (!message.guild.me.voice.channel){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("I need to be in a VC!")
      .setDescription("I am not in a voice channel")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }
    if (message.guild.me.voice.channel !== message.member.voice.channel){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("No Tracks...")
      .setDescription(`You are not connected to the same Voice Channel as me. `)
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    } 
    if (!serverQueue){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("No Tracks...")
      .setDescription('`**0** Track Listed in Queue!`')
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }

    let artist = serverQueue.songs[0].author;
    let songName = serverQueue.songs[0].title;
    let pages = [];
    let currentPage = 0;

    const reactionFilter = (reaction, user) =>
      ["⬅️", "➡️"].includes(reaction.emoji.name) &&
      message.author.id === user.id;

    await finder(artist, songName, message, pages);

    const lyricEmbed = await message.channel.send(
      `Lyrics page: ${currentPage + 1}/${pages.length}`,
      pages[currentPage]
    );
    await lyricEmbed.react("⬅️");
    await lyricEmbed.react("➡️");

    const collector = lyricEmbed.createReactionCollector(reactionFilter);

    collector.on("collect", (reaction, user) => {
      if (reaction.emoji.name === "➡️") {
        if (currentPage < pages.length - 1) {
          currentPage += 1;
          lyricEmbed.edit(
            `Lyrics page: ${currentPage + 1}/${pages.length}`,
            pages[currentPage]
          );
          message.reactions.resolve(reaction).users.remove(user);
        }
      } else if (reaction.emoji.name === "⬅️") {
        if (currentPage !== 0) {
          currentPage -= 1;
          lyricEmbed.edit(
            `Lyrics page: ${currentPage + 1}/${pages.length}`,
            pages[currentPage]
          );
          message.reactions.resolve(reaction).users.remove(user);
        }
      }
    });
  }

  async function finder(artist, songName, message, pages) {
    const lyrics = require("music-lyrics");
    let fullLyrics = (await lyrics.search(songName + artist)) || "Not found";

    for (let i = 0; i < fullLyrics.length; i += 2048) {
      const lyric = fullLyrics.substring(
        i,
        Math.min(fullLyrics.length, i + 2048)
      );
      const msg = new Discord.MessageEmbed()
        .setDescription(lyric)
        .setColor("#339295");
      pages.push(msg);
    }
  }

  // SKIP

  function skip(message, serverQueue) {
    if (!message.member.voice.channel){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("You need to be in a VC!")
      .setDescription("You are not connected to a voice channel.")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }
    if (!message.guild.me.voice){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("I need to be in a VC!")
      .setDescription("I am not in a voice channel")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }
    if (!serverQueue){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("No Tracks...")
      .setDescription('`**0** Track Listed in Queue!`')
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }
    serverQueue.connection.dispatcher.end();
  }
  // LOOP
  function loop(message, serverQueue) {
    const LoopType = message.content.slice(5);
    if (!message.member.voice.channel){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("You need to be in a VC!")
      .setDescription("You are not connected to a voice channel.")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }
    if (!serverQueue){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("No Tracks...")
      .setDescription('`**0** Track Listed in Queue!`')
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }
    if (!LoopType) {
      serverQueue.loop = !serverQueue.loop;
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("Looping: queue")
      .setDescription(  `${
        serverQueue.queueloop ? `**✅Enabled**` : `**✅Disabled**`
      } looping **queue**.`)
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    
    }
    // LOOP THE WHOLE QUEUE
    else if (LoopType) {
      if (LoopType.toLowerCase().includes("queue".toLowerCase())) {
        serverQueue.queueloop = !serverQueue.queueloop;
        const VoiceNee = new Discord.MessageEmbed()
        .setTitle("Looping: queue")
        .setDescription(  `${
          serverQueue.queueloop ? `**✅Enabled**` : `**✅Disabled**`
        } looping **queue**.`)
        .setColor("#339295")
        message.channel.send(VoiceNee)
        return undefined 
    
        // INVALID COMMAND
      } else message.channel.send(`"${LoopType}" is an invalid loop type.`);
    }
  }
  // STOP
  function stop(message, serverQueue) {
    if (!message.member.voice.channel){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("You need to be in a VC!")
      .setDescription("You are not connected to a voice channel.")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }
    if (!serverQueue){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("No Tracks...")
      .setDescription('`**0** Track Listed in Queue!`')
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }

    serverQueue.songs = [];
    const VoiceNee = new Discord.MessageEmbed()
    .setTitle("Sucessfully done..")
    .setDescription("Stopped the current music.")
    .setColor("#339295")
    message.channel.send(VoiceNee)
  
    serverQueue.connection.dispatcher.end();
  }

  function leave(message, serverQueue) {
    if (!message.member.voice.channel){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("You need to be in a VC!")
      .setDescription("You are not connected to a voice channel.")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }
    if (!message.guild.me.voice.channel){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("I need to be in a VC!")
      .setDescription("I am not in a voice channel")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }
    else queue.delete(message.guild.id);
    message.member.voice.channel.leave();
    const VoiceNee = new Discord.MessageEmbed()
    .setTitle("I left the VC..")
    .setDescription("I just left the current voice channel I was connected to.")
    .setColor("#339295")
    message.channel.send(VoiceNee)
    
   
  }
  function join(message, serverQueue) {
    if (!message.member.voice.channel){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("You need to be in a VC!")
      .setDescription("You are not connected to a voice channel.")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined
    }
    if (message.guild.me.voice.channel){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("I am already in a channel..")
      .setDescription("I was already connected to an channel.")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined
    }
    else message.member.voice.channel.join();
    const VoiceNee = new Discord.MessageEmbed()
    .setTitle("Trying to join..")
    .setDescription("Im possibly trying to join the channel!")
    .setColor("#339295")
    message.channel.send(VoiceNee)
    queue.delete(message.guild.id);
  }

  // VOLUME
  function volume(message, serverQueue) {
    const volumeArgs = message.content.slice(7);
    const Playing = new MessageEmbed()
      .setAuthor(`Volume`)
      .setDescription(
        `🎵✅Successfully changed the volume to **${volumeArgs}**!`
      )
      .setColor("#339295")
      .setTimestamp();

    if (!message.member.voice.channel){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("You need to be in a VC!")
      .setDescription("You are not connected to a voice channel.")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }
    if (!serverQueue){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("No Tracks...")
      .setDescription('`**0** Track Listed in Queue!`')
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }

    if (!volumeArgs)
      return message.channel.send(
        `The current volume is **${serverQueue.volume}0%**!`
      );
    if (isNaN(volumeArgs)){
      const NumberNeeded = new Discord.MessageEmbed()
      .setTitle("LETTERS?!!?")
      .setDescription("You gotta enter a number man...")
      .setColor("#339295");
      message.channel.send(NumberNeeded)
      return undefined
    }
    if (volumeArgs > 5) return message.channel.send(`The maximum volume is 50%!`);
    serverQueue.volume = volumeArgs;
    serverQueue.connection.dispatcher.setVolumeLogarithmic(volumeArgs / 5);
    message.channel.send(Playing);
    return undefined;
  }

  // NOW PLAYING
  function np(message, serverQueue) {
    const disabled = false;
    if (disabled)
      return message.channel.send(
        "Embed version containing duration is no longer supported due to an error."
      );
    if (!serverQueue){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("No Tracks...")
      .setDescription('`**0** Track Listed in Queue!`')
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined
    }
    if (!serverQueue.songs[1])
      return message.channel.send(
        `Currently playing **${serverQueue.songs[0].title}** by **${serverQueue.songs[0].author}**`
      );
    const NowPlayingHours = new MessageEmbed()
      .setAuthor(`Currently Playing`)
      .setDescription(
        `**Currently playing** **[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**`
      )
      .setColor("#339295")
      .addFields(
        { name: `Duration`, value: `Disabled`, inline: true },
        {
          name: `Coming Next`,
          value: `[${serverQueue.songs[1].title || "No"}](${serverQueue.songs[1].url || "Tracks"})`,
          inline: true,
        },
        { name: `Looping`, value: serverQueue.loop, inline: true },
        { name: `Queue Looping`, value: serverQueue.queueloop, inline: true }
      )
      .setTimestamp();
    message.channel.send(NowPlayingHours);
  }

  // RESUME
  function resume(message, serverQueue) {
    if (!message.member.voice.channel){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("You need to be in a VC!")
      .setDescription("You are not connected to a voice channel.")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }
    if (!serverQueue){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("No Tracks...")
      .setDescription('`**0** Track Listed in Queue!`')
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined
    }
    if (serverQueue.playing){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("Already resumed")
      .setDescription(`The music is already playing!`)
      .setColor("#339295")
      message.channel.send(VoiceNee)
  return undefined
    }
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    const VoiceNee = new Discord.MessageEmbed()
    .setTitle("There!")
    .setDescription(`I have resumed the music for you!`)
    .setColor("#339295")
    message.channel.send(VoiceNee)

  }

  // PAUSE
  function pause(message, serverQueue) {
    if (!message.member.voice.channel){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("You need to be in a VC!")
      .setDescription("You are not connected to a voice channel.")
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined 
    }
    if (!serverQueue){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("No Tracks...")
      .setDescription('`**0** Track Listed in Queue!`')
      .setColor("#339295")
      message.channel.send(VoiceNee)
      return undefined
    }
    if (!serverQueue.playing){
      const VoiceNee = new Discord.MessageEmbed()
      .setTitle("Already paused")
      .setDescription(`The music is already paused!`)
      .setColor("#339295")
      message.channel.send(VoiceNee)
  return undefined
    }
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
    const VoiceNee = new Discord.MessageEmbed()
    .setTitle("There!")
    .setDescription(`I have paused the music for you!`)
    .setColor("#339295")
    message.channel.send(VoiceNee)
    return undefined;
  }
  // PLAY
  function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
if(serverQueue.loop === false){
  const Playing = new MessageEmbed()
  .setAuthor(
    `Now Playing`,
    `https://www.freeiconspng.com/uploads/youtube-logo-png-hd-14.png`
  )
  .setDescription(
    `> [${song.title}](${serverQueue.songs[0].url}) by [${song.author}](${serverQueue.songs[0].url})!`
  )
  .setThumbnail(serverQueue.songs[0].thumbnail.url)
  .setColor("#339295")
  .setFooter(message.author.tag, message.author.displayAvatarURL());
  serverQueue.textChannel.send(Playing);

}

   

    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        if (serverQueue.queueloop === true) {
          serverQueue.songs.push(serverQueue.songs.shift());
        } else if (!serverQueue.loop) {
          serverQueue.songs.shift();
        } else if (serverQueue.loop) {
          if (serverQueue.queueloop) {
            serverQueue.queueloop = !serverQueue.queueloop;
            message.channel.send(
              "I have disabled queue looping due to loop being enabled."
            );
          }
        } else if (serverQueue.queueloop) {
          if (serverQueue.loop) {
            serverQueue.loop = !serverQueue.loop;
            message.channel.send(
              "I have disabled track looping due to queue loop being enabled."
            );
          }
        }

        play(guild, serverQueue.songs[0]);
      })
      .on("error", (error) => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
   
  }

  const args = message.content.slice(x.length).split(/ +/);
  if (!message.content.startsWith(x) || message.author.bot) return;
  const command = args.shift().toLowerCase();

  //KICK COMMAND
  if (command === "kick") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("kick").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on my role to perform that command."
      );
  }

  // LOCK COMMAND
  if (command === "lock") {
    client.commands.get("lock").execute(message, args);
  }
  // ANNUNCE COMMAND

  if (command === "announce") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("announce").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  // AVATAR COMMAND

  if (command === "avatar") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("avatar").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  // SAY COMMAND

  if (command === "say") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("say").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  // INVITE COMMAND

  if (command === "invite") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("invite").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  // GUILD COMMAND

  if (command === "guild") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("guild").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  // HELP COMMAND

  if (command === "help") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("help").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  // BAN COMMAND

  if (command === "ban") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("ban").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  // REPORT COMMAND

  if (command === "report") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("report").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  // EVAL COMMAND

  if (command === "eval") {
    client.commands.get("eval").execute(message, args);
  }
  // CREDIT COMMAND

  if (command === "credit") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("credit").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  // MEMBERCOUNT COMMNAD
  if (command === "membercount") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("membercount").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  // RULE_ADD COMMAND

  if (command === "rule_add") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("rule_add").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "nick") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("nick").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "gaymeter") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("gaymeter").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "simpmeter") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("simpmeter").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "dogwater") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("dogwater").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "bot_nick") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("bot_nick").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "searchid") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("searchid").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }



  if (command === "clear") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("clear").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "verify") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("verify").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "8ball") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("8ball").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "slowmode") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("slowmode").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "autorole_remove") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("autorole_remove").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "loggings") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("loggings").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "mute") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("mute").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "unmute") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("unmute").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "giverole") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("giverole").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "karen") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("karen").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "autorole_add") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("autorole_add").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "levels") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("levels").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }

  if (command === "welcome-message-set") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("welcome-message-set").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  if (command === "welcome-message-remove") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("welcome-message-remove").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  if (command === "role_description_add") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("role_description_add").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  if (command === "role_description") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("role_description").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  if (command === "role_description_remove") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("role_description_remove").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  if (command === "premium") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("premium").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  if (command === "report_channel_add") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("report_channel_add").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  if (command === "credits") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("credits").execute(message, args, client);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  if (command === "rank") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("rank").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  if (command === "leaderboard") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("leaderboard").execute(message, args, client);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  if (command === "report_channel_remove") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("report_channel_remove").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  if (command === "info") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("info").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  if (command === "listeners") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("listeners").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
  if (command === "profile") {
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      client.commands.get("profile").execute(message, args);
    } else
      message.member.send(
        "I need `SEND_MESSAGE` permissions on the channel or in my role."
      );
  }
});
DButton(client)
client.mongoose.init();
client.login(process.env.token);
