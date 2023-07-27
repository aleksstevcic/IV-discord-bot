//dotenv is generated during build action. all secrets should be stored in github secrets
require('dotenv').config();


const { Client, IntentsBitField } = require("discord.js");

//globals
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildPresences
  ]
});

const leagueAppID = "401518684763586560";
const leagueTimeoutTime = 30*60*1000;

let timers = {};

//events
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

    
    //if the message has the word "weed" in it
    if (message.content.indexOf("weed") > -1) {

      //get user of specific username
      let zach = getUserByUsername("chompskii");

      //reply
      if(message.author.id === zach.user.id) message.reply("brooooo you love weed? damn thats sick yodie fam");
      else message.reply("weed? yo i heard <@" + zach.user.id + "> smokes weed");


      //this will send a message to that channel
      //message.channel.send();
    }
    
  }
});

client.on('presenceUpdate', (oldpresence, newpresence) => {
  
  if("activities" in oldpresence && "activities" in newpresence){
    //this is such an inefficient function lil bro i dont care
    leaguememes(oldpresence, newpresence);
  }
});

function leaguememes(oldpresence, newpresence){


  for(let newactivity of newpresence.activities){

    let stillPlayingLeague = false;

    //only if the new activity has league of legends, then comb through the old activities
    if(newactivity.applicationId == leagueAppID){

      for(let oldactivity of oldpresence.activities){
        if(oldactivity.applicationId == newactivity.applicationId){
          stillPlayingLeague = true;
          break;
        }
      }

      if(!stillPlayingLeague){
        timers[newpresence.userId] = setTimeout(leagueTimeout, leagueTimeoutTime, newpresence.userId);
      }

    }

  }

  //two nearly identical for loops! LOL! im such a good programmer!
  for(let oldactivity of oldpresence.activities){

    let closedLeague = true;

    //only if the old activity has league of legends, then go through the new ones
    if(oldactivity.applicationId == leagueAppID){

      for(let newactivity of newpresence.activities){
        if(oldactivity.applicationId == newactivity.applicationId){
          closedLeague = false;
          break;
        }
      }

      //clear the timer
      if(closedLeague){
        clearTimeout(timers[oldpresence.userId]);
        delete timers[oldpresence.userId];
      }

    }

  }

}



function leagueTimeout(userID){
  console.log(getUserByUserID(userID) + " is playing too much league");
}

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

function getUserByUserID(userid = ""){
  if(userid==="") return;
  
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
      if(mvalue.user.id == userid){
        return mvalue.user.username;
      }
    }
  }
}

function weed(){

}

//will only be accessible via secret in github action. testing on a local machine is impossible rn
client.login(process.env.BOT_TOKEN);



