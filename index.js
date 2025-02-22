const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('ok'))

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
);
const Discord = require("discord.js");
const client = new Discord.Client();

var prefix = "."; //Bots Prefix
var statuses = [`Cash Money Comeback`]; //Bot Status
var timers = 2;
const owners = ["978710115966406778",""]; //Bot  owners
client.login(`token`);//bot token here
client.on("ready", () => {
  console.log(`Signed in : ${client.user.tag}`);
client.user.setStatus("dnd");
  var timeing = Math.floor(timers * 1000);
  setInterval(function() {
    var lengthesof = statuses.length;
    var amounter = Math.floor(Math.random() * lengthesof);
    client.user.setActivity(statuses[amounter], { type: "" });
  }, timeing);
});

client.on("message", message => {
  if (message.content.toLowerCase().startsWith(prefix + "help".toLowerCase())) {
    message.react("✔");
    let help = new Discord.MessageEmbed()
      .setTimestamp()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setFooter(`Developed by Mattér#1000 `, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(
        `> **${client.user.username} Help Commands\n> Active Commands : " 6 " Prefix\n> Prefix : \`${prefix}\`**\n> **Language : English**`
      )
      .addFields(
        {
          name: "admins",
          value: `\`${prefix}bc\` , \`${prefix}obc\`, \`${prefix}ping\``
        },
        {
          name: "Owners",
          value: `\`${prefix}setname\` , \`${prefix}setavatar\` `
        },
        {
          name: "Extra",
          value: `\`invite\` , \`help\``
        }
      );
    message.channel.send(help);
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "bc")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    message.delete();
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let noargs = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addField(`Error :x:`, `Enter a valid message !`)
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    if (!args) return message.channel.send(message.author, noargs);
    message.guild.members.cache
      .filter(m => m.presence.status !== "everyone")
      .forEach(m => {
        if (m.user.bot) return;
        m.send(`${args}\n ${m}`)
          .then(() => {
            console.log(`
I sent this : ${m.user.tag} ✅`);
          })
          .catch(function() {
            console.log(`blocked : ${m.user.tag} ❌ `);
          });
      });
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `📬 : Messages are being sent... : \`${
          message.guild.members.cache.filter(
            m => m.presence.status !== "online"
          ).size
        }\` `
      )
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.channel
      .send(`Message everyone...`)
      .then(me => {
        me.edit(message.author, embed);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "obc")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;

    message.delete();
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let noargs = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addField(`Error :x:`, `Please enter a valid message !`)
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    if (!args) return message.channel.send(message.author, noargs);
    message.guild.members.cache
      .filter(m => m.presence.status !== "offline")
      .forEach(m => {
        if (m.user.bot) return;
        m.send(`${args}\n ${m}`)
          .then(() => {
            console.log(`I was able to send : ${m.user.tag} ✅`);
          })
          .catch(function() {
            console.log(`done : ${m.user.tag} ❌ `);
          });
      });
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `📬 : Messages are being sent : \`${
          message.guild.members.cache.filter(
            m => m.presence.status !== "offline"
          ).size
        }\` `
      )
      .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.channel
      .send(`Messages are being sent...`)
      .then(me => {
        me.edit(message.author, embed);
      });
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("Ping..").then(m => {
      m.edit(
        `\`\`\`javascript\nDiscord API : ${Math.round(
          client.ws.ping
        )} ms\n\`\`\` `
      );
    });
  }
   if (message.content.startsWith(prefix + "invite")) {
    message.channel.send("Generating invite link...").then(m => {
      let embed = new Discord.MessageEmbed()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTitle(`Invite Here`)
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
       .setTimestamp()
      .setFooter(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
      m.edit(embed
      );
    });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "setname")) {
    let args = message.content.split(" ");
    let botnameee = args.slice(1).join(" ");
    if (!owners.includes(message.author.id))
      return message.channel.send(
        `** :x: Only bot owners can use this command **`
      );
    if (!botnameee)
      return message.channel.send(
        `** :x: Specify a name !**`
      );
    client.user.setUsername(`${botnameee}`);
    message.channel.send(`Changing the bots name ...`).then(me => {
      me.edit(` Done !`);
    });
  }
  if (message.content.startsWith(prefix + "setavatar")) {
    let args = message.content.split(" ");
    let botnameee = args.slice(1).join(" ");
    if (!owners.includes(message.author.id))
      return message.channel.send(
        `** :x: Only bot owners can use this command **`
      );
    if (!botnameee)
      return message.channel.send(
        `** :x: Please select a valid profile picture !**`
      );
    client.user.setAvatar(`${botnameee}`);
    message.channel.send(`Bots profile picture  changing ...`).then(me => {
      me.edit(` Done!`);
    });
  }
});

