const { connections } = require('mongoose');

module.exports = { 
    name: 'play',
    description: 'PLAYS A NMUSDC',
    execute(message, args){
        const ytdl = require('ytdl-core');
        const streamOptions = { seek: 0, volume: 0.5 }
        const MusicName = [
            "https://www.youtube.com/watch?v=6XLN_NfBNPc",
            "https://youtu.be/N00r4U2--eM",
            "https://www.youtube.com/watch?v=YjbXw20z3Cg",
            "https://www.youtube.com/watch?v=PalpNZO4wiQ",
            "https://www.youtube.com/watch?v=0RWcOQo1tjU",
            "https://www.youtube.com/watch?v=Gr90CuXHYWw",
            "https://www.youtube.com/watch?v=D0eagnSZ1C4",
            "https://www.youtube.com/watch?v=enf0k1LkSo4",
            "https://www.youtube.com/watch?v=RMGKe1tuRwI",
            "https://www.youtube.com/watch?v=3Ytegl-v9A4",
            "https://www.youtube.com/watch?v=2gRkHMWdBSE",
            "https://www.youtube.com/watch?v=nRWa-0Mz59I",
            "https://www.youtube.com/watch?v=Jsn15aFS_WE",
            "https://www.youtube.com/watch?v=8uQqaauS5UA"
            
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