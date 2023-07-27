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

let guilds = getGuilds();

client.on("ready", (bot) => {
  console.log(`${bot.user.tag} ready!`);

  client.guilds.fetch().then(
    client.guilds.cache.forEach(guild => {
      guild.members.cache.forEach(member => {
        members.fetch();
      });
    })
  );
  

  let zach = getUserByUsername("chompskii");
  console.log(zach);
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

function getGuilds(){
  return client.guilds.cache.map(guild => guild.id);
}

//will only be accessible via secret in github action. testing on a local machine is impossible rn
client.login(process.env.BOT_TOKEN);



