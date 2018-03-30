const Eris = require("eris");
const client = new Eris(""); //token here
const userid = "260556119955472384"; //user id of the person to spy
const channelid = "428941779027623936"; //channel id of the channel to send the results to
const guildid = "331460650591191040"; //id of the guild the user is in (THE BOT HAS TO BE IN THE SAME GUILD)
let guild;
let user;
let channel;

client.on("ready", () => {
  guild = client.guilds.get(guildid);
  if (!guild) {
    console.log("ERROR! Could not find guild with ID " + guildid + "!");
    process.exit();
  }
  user = guild.members.get(userid);
  if (!user) {
    console.log("ERROR! Could not find user in " + guild.name + " with the ID " + userid + "!");
  }
  channel = guild.channels.get(channelid);
  if (!channel) {
    console.log("ERROR! Could not find channel in " + guild.name + " with the ID " + channelid + "!");
  }
  let status = user.status;
  console.log("Watching for " + user.username + " in " + guild.name + " and posting results in " + channel.name + "! Their current status is " + status + ".");
  setInterval(() => {
    let user = guild.members.get(userid);
    if (user.status !== status) {
      channel.createMessage(user.username + " is now " + user.status + "! It's " + Date() + ".");
      status = user.status;
    }
  }, 60000);
});

client.connect();
