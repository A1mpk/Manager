const Discord = require("discord.js");
const mongoose = require("mongoose");
module.exports = async (client, guild) => {
  const RPC = require("discord-rpc");
  const { mapReduce } = require("./commands/model/LoggingSchema");
  const e = require("express");
  const { exec } = require("child_process");
  const { type } = require("os");
  const { Video } = require("simple-youtube-api");
  const { ServerResponse } = require("http");
  const rpc = new RPC.Client({ transport: "ipc" });
  rpc.on("ready", () => {
    rpc.request("SET_ACTIVITY", {
      pid: process.pid,
      activity: {
        details: "Watching I love my step bro...",
        assets: {
          large_image: "noa",
          large_text: Date.now,
          small_image: "e39",
          small_text: "Bratty Sis",
        },

        buttons: [
          {
            label: "Invite",
            url: "https://discord.com/api/oauth2/authorize?client_id=725787532008095744&permissions=8&scope=bot",
          },
          {
            label: "Website",
            url: "https://sites.google.com/view/newsforgamers/home",
          },
        ],
      },
    });
  });
  rpc.login({
    clientId: "816732886870523935a",
    clientSecret: "t5tp_u5YfKJC4BQVTXwj82wRc3kORXxh",
  });
};
