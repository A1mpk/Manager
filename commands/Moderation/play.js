const { connections, startSession } = require('mongoose');

module.exports = { 
    name: 'play',
    description: 'PLAYS A NMUSDC',
    execute(message, args){


            const streamOptions = { seek: 0, volume: 1, limit: 1 }
            
        
        const ytdl = require('ytdl-core');
      
        const MusicName = [
          "https://www.youtube.com/watch?v=vwkV6qkw_LI",
          "https://www.youtube.com/watch?v=6AQw8oy5dzo",
          "https://www.youtube.com/watch?v=5Di20x6vVVU",
          "https://www.youtube.com/watch?v=HoOgOKl9VYE",
          "https://www.youtube.com/watch?v=iI34LYmJ1Fs",
          "https://www.youtube.com/watch?v=HlSAEO7iWnk",
          "https://www.youtube.com/watch?v=0aCF0kd-d0Q",
          "https://www.youtube.com/watch?v=ra-XCs6LHAM"
        ]

        var voiceChannel = message.member.voice.channel.join()
        
                voiceChannel.then(connection => {
                    console.log("joined channel");
                    const stream = ytdl((MusicName[Math.floor(Math.random() * MusicName.length)]), { filter : 'audioonly' });
                    const dispatcher = connection.play(stream, streamOptions)
                    message.channel.send("I have joined your current channel.")
                    dispatcher.on("end", end => {
                  message.channel.send(`The music has ended.`)
                  message.member.voice.channel.leave()
                    });
                   
                }).catch(err => console.log(err))
    }
}