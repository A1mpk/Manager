const Discord = require("discord.js");
module.exports = {
  name: "spotify",
  description: "Spotify",
  disabled: false,
  execute(message, args) {
    if (this.disabled === true)
      return message.channel.send(
        `This command has been disabled for further investigation.`
      );
    if (message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
      let user;

      if (message.mentions.users.first()) {
        user = message.mentions.users.first();
      } else {
        user = message.author;
      }

      let convert = require("parse-ms");

      let status = user.presence.activities[0];

      if (
        user.presence.activities.length === 0 ||
        (status.name !== "Spotify" && status.type !== "LISTENING")
      )
        return message.channel.send("This user isn't listening the Spotify.");

      if (
        status !== null &&
        status.type === "LISTENING" &&
        status.name === "Spotify" &&
        status.assets !== null
      ) {
        let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(
            8
          )}`,
          url = `https://open.spotify.com/track/${status.syncID}`,
          name = status.details,
          artist = status.state,
          album = status.assets.largeText,
          timeStart = status.timestamps.start,
          timeEnd = status.timestamps.end,
          timeConvert = convert(timeEnd - timeStart);

        let minutes =
          timeConvert.minutes < 10
            ? `0${timeConvert.minutes}`
            : timeConvert.minutes;
        let seconds =
          timeConvert.seconds < 10
            ? `0${timeConvert.seconds}`
            : timeConvert.seconds;

        let time = `${minutes}:${seconds}`;
        const embed = new Discord.MessageEmbed()
          .setAuthor(
            "Spotify",
            "https://th.bing.com/th/id/R51a2b615791a987a46af18beed1ac882?rik=ihrJdQVay12aqA&riu=http%3a%2f%2fmedia.idownloadblog.com%2fwp-content%2fuploads%2f2016%2f02%2fSpotify-App-Icon-Large.png&ehk=69W%2bQrgPsZ2wP0g5JEZQs47EbsdD%2fNOV6VgsVsRHgIQ%3d&risl=&pid=ImgRaw"
          )
          .setColor("BLUE")
          .setThumbnail(image)
          .addField("Name:", name)
          .addField("Album:", album)
          .addField("Artist:", artist)
          .addField("Duration:", time)
          .addField(
            "Listen on Spotify",
            `[\`${artist} - ${name}\`](${url})`,
            false
          );

        message.channel.send(embed);
      } else
        message.member.send(
          "I need `SEND_MESSAGE` permissions on the channel or in my role."
        );
    }
  },
};
