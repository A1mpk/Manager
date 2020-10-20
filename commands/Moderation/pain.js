const Discord = require('discord.js');
module.exports = {
    name: 'pain',
    description: "Announces a rule or a normal announcement",
    execute(message, args){
  const pain = [
      "Depression is like a war. You either win or you die.",
      "You don’t understand how much I hate myself.",
      "I want to sleep but my brain won’t stop talking to itself.",
      "You get depressed because you know that you are not what you should be.",
      "I am feeling so lonely and depressed, and even more i can’t explain my feelings.",
      "Depression is about as close as you get to somewhere between dead and alive, and its the worst."
      
  ]
  message.channel.send((pain[Math.floor(Math.random() * pain.length)]))
    }

};