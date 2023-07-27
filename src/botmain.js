//dotenv is generated during build action. all secrets should be stored in github secrets
require('dotenv').config();


const { Client, IntentsBitField } = require("discord.js");

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
  console.log(client.guilds.cache.users);
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
      //let zach = getUserByUsername("chompskii");
      //message.reply("<@" + zach + "> is cringe");


      //this will send a message to that channel
      //message.channel.send();
    }

    console.log(message.author);
  }
});

function getUserByUsername(username = ""){
  if(username==="") return;
  
  for(let user in client.guilds.cache.users){
    if(user.username === username) return user.id;
  }

  return;
}

//will only be accessible via secret in github action. testing on a local machine is impossible rn
client.login(process.env.BOT_TOKEN);
