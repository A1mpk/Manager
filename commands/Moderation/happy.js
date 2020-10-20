const Discord = require('discord.js');
module.exports = {
    name: 'happy',
    description: "Announdces a rule or a normal announcement",
    execute(message, args){
  const happy = [
      "If you want to be happy, do not dwell in the past, do not worry about the future, focus on living fully in the present.",
      "Don’t waste your time in anger, regrets, worries, and grudges. Life is too short to be unhappy.",
      "Do not set aside your happiness. Do not wait to be happy in the future. The best time to be happy is always now.",
      "I am both happy and sad at the same time, and I'm still trying to figure out how that could be.",
      "The real things haven't changed. It is still best to be honest and truthful; to make the most of what we have; to be happy with simple pleasures; and have courage when things go wrong.",
      "Happiness depends on your mindset and attitude."
      
  ]
  message.channel.send((happy[Math.floor(Math.random() * happy.length)]))
    }

};