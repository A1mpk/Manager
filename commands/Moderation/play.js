const { connections, startSession } = require('mongoose');
const Discord = require('discord.js')
const ytdl = require('ytdl-core');
module.exports = { 
    name: 'play',
    description: 'PLAYS A NMUSDC',
    execute(message, args){
        var servers = {};
        const LOL = new Discord.MessageEmbed()
        .setColor(3066993)
        .setAuthor('PLAY - MUSIC')
        .setDescription(`Plays a music. Only if provided with a youtube link!`)
        .addField('USAGE : `play <yt.link>`', "** **")
        .setTimestamp()
      const argforplay = message.content.slice(6)
      function play(connection, message){
          var server = servers[message.guild.id];
          server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));
          server.queue.shift();
        
          server.dispatcher.on("end", function(){
              if(server.queue[0]){
                  play(connection, message)
              }else {
                  connection.disconnect();
              }
          })
      }
      if(!argforplay.match("https://www.you")) return message.channel.send(LOL)
      if(!argforplay) return message.channel.send(LOL)
      if(!message.member.voice.channel) return message.channel.send(`Make sure to be connected to an voice channel.`)
      if(!servers[message.guild.id]) servers[message.guild.id] = {
          queue: []
      }
      var server = servers[message.guild.id];
      server.queue.push(argforplay);
      if(message.guild.me.voice.channel) return message.channel.send(`Disconnect me to play another song.`)
      if(!message.guild.me.voice.channel) message.member.voice.channel.join().then(function(connection){
          play(connection, message);
          message.channel.send(`Now Playing : ${argforplay}.`)
      })
    }
} 