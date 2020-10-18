const { connections, startSession } = require('mongoose');

module.exports = { 
    name: 'play',
    description: 'PLAYS A NMUSDC',
    execute(message, args){
       const number = message.content.slice("5")

            const streamOptions = { seek: 0, volume: 1 }
            
        
        const ytdl = require('ytdl-core');
      
        const MusicName = [
           "https://www.youtube.com/watch?v=PXGycbkbtW0",
           "https://www.youtube.com/watch?v=dIzgiclddlM",
           "https://www.youtube.com/watch?v=iI34LYmJ1Fs"
        ]

        var voiceChannel = message.member.voice.channel.join()
        
                voiceChannel.then(connection => {
                    console.log("joined channel");
                    const stream = ytdl((MusicName[Math.floor(Math.random() * MusicName.length)]), { filter : 'audioonly' });
                    const dispatcher = connection.play(stream, streamOptions)
                    message.channel.send("I have joined your current channel.")
                    dispatcher.on("end", end => {
                        message.member.voice.channel.leave()
                        message.member.voice.channel.join()
                        connection.play(stream, streamOptions)
                   
                    });
                   
                }).catch(err => console.log(err))
    }
}