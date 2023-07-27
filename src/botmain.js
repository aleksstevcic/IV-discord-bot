//dotenv is generated during build action. all secrets should be stored in github secrets
require('dotenv').config();


const { Client, IntentsBitField } = require("discord.js");

//globals
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
});

client.on("ready", (bot) => {
  console.log(`${bot.user.tag} ready!`);

  //load and cache all guilds and members
  client.guilds.fetch().then((guilds) => {
    console.log(guilds);
    guilds.forEach(guild => {
      let asdf = client.guilds.cache.get(guild.id).members.fetch();
      console.log(asdf);
    })
  });

  //let zach = getUserByUsername("chompskii");
  //console.log(zach);
});
  

  

//zach is cringe lmao
client.on("messageCreate", (message) => {
  //if message is not by a bot
  if (!message.author.bot) {
    //if message contains the keyword "cringe"
    if (message.content.indexOf("cringe") > -1) {
      //get user of specific username
      //let user = client.users.fetch("id");
      
      //reply
      
      //message.reply("<@" + zach + "> is cringe");


      //this will send a message to that channel
      //message.channel.send();
    }
    
    console.log(message.author);
  }
});

function getUserByUsername(username = ""){
  if(username==="") return;
  
  client.guilds.cache.forEach(guild => {
    guild.members.cache.forEach(member => {
      console.log(member);
      members.fetch();
      if(member.username === username) return member.id;
    });
  });

  return;
}

//will only be accessible via secret in github action. testing on a local machine is impossible rn
client.login(process.env.BOT_TOKEN);



