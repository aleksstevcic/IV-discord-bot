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
});

client.on("messageCreate", (message) => {
  if (!message.author.bot) {
    if (message.content == "cringe") {
      message.reply("zach is cringe");
    }
  }
});

//will only be accessible via secret in github action. testing on a local machine is impossible rn
client.login(process.env.BOT_TOKEN);
