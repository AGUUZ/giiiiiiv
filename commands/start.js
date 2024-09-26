const ms = require("ms");
const messages = require("../utils/message");
module.exports.run = async (client, message, args) => {

  if (
    !message.member.permissions.has("ManageMessages") 
  ) {
    return message.reply(
      ":x: ليس لديك صلاحية."
    );
  }

let giveawayChannel = message.channel;


let giveawayDuration = args[0];

if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
  return message.reply(":x: ضع الوقت!");
}


let giveawayNumberWinners = parseInt(args[1]);

if (isNaN(giveawayNumberWinners) || giveawayNumberWinners <= 0) {
  return message.reply(":x: ضع عدد الفائزين!");
}


let giveawayPrize = args.slice(2).join(" ");

if (!giveawayPrize) {
  return message.reply(":x: ضع الجائزه!");
}


await client.giveawaysManager.start(giveawayChannel, {

  duration: ms(giveawayDuration),
 
  prize: giveawayPrize,
  winnerCount: giveawayNumberWinners,
  hostedBy: client.config.hostedBy ? message.author : null,
  image: "https://media.discordapp.net/attachments/1277220262034538507/1278078697433206895/GIF_20240827_221155_304.gif?ex=66d027cb&is=66ced64b&hm=ad2a0e2c890c9c38f00dc256ed30208749b1cc9ff7af310e31dc31e452e5f041&=&width=447&height=250",
  messages
});


await message.delete();

}
