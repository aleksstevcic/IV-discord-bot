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
  client.guilds.fetch().then(guilds => {
    guilds.forEach(guild => {
      let asdf = client.guilds.cache.get(guild.id).members.fetch();
    })
  });

});
  

  

//zach is cringe lmao
client.on("messageCreate", (message) => {
  //if message is not by a bot
  if (!message.author.bot) {
    //if message contains the keyword "cringe"
    if (message.content.indexOf("cringe") > -1) {

      //get user of specific username
      let zach = getUserByUsername("chompskii");
      //reply
      message.reply("<@" + zach.user.id + "> is cringe");


      //this will send a message to that channel
      //message.channel.send();
    }
    
  }
});

//this took me way too long holy shit
function getUserByUsername(username = ""){
  if(username==="") return;
  
  //get guilds
  let guilds = client.guilds.cache;
  
  //its a map, so we assign the key-value pair on each iteration
  for(let [key, value] of guilds){
    
    //assign guild variable to the currently selected guild
    let guild = value;

    //get all members
    let members = guild.members.cache;
    
    //same as before, but now for members, since it is also a map
    for(let [mkey, mvalue] of members){

      //if the username matches, then return the entire user object
      if(mvalue.user.username == username){
        return mvalue;
      }
    }
  }
}

//will only be accessible via secret in github action. testing on a local machine is impossible rn
client.login(process.env.BOT_TOKEN);



