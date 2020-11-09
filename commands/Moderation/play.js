const { connections, startSession } = require('mongoose');
const ytdl = require('ytdl-core');
module.exports = { 
    name: 'play',
    description: 'PLAYS A NMUSDC',
    execute(message, args){
        var servers = {};
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
     
      if(!argforplay) return message.channel.send(`This command works only with links.`)
      if(!message.member.voice.channel) return message.channel.send(`Join a channel bruh.`)
      if(!servers[message.guild.id]) servers[message.guild.id] = {
          queue: []
      }
      var server = servers[message.guild.id];
      server.queue.push(argforplay);
      if(message.guild.me.voice.channel) return message.channel.send(`I am in a channel, please disconnect me if you would like to play an song in another channel.`)
      if(!message.guild.me.voice.channel) message.member.voice.channel.join().then(function(connection){
          play(connection, message);
          message.channel.send(`Now Playing : ${argforplay}.`)
      })
    }
} 