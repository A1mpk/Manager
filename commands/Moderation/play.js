const { connections } = require('mongoose');

module.exports = { 
    name: 'play',
    description: 'PLAYS A NMUSDC',
    execute(message, args){
        const ytdl = require('ytdl-core');
        const streamOptions = { seek: 0, volume: 0.5 }
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