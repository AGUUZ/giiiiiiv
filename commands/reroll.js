const ms = require('ms');
module.exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('ManageMessages') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.reply(':x: You need to have the manage messages permissions to reroll giveaways.');
    }


    if(!args[0]){
        return message.reply(':x: ابدي او الجائزه!');
    }


    let giveaway = 

    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||

    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);


    if(!giveaway){
        return message.reply('لم اجد الجيف`'+ args.join(' ') +'`.');
    }


    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {

        message.reply('Giveaway rerolled!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
            message.reply('لم ينتهي بعد !');
        } else {
            console.error(e);
            message.reply(e);
        }
    });

};
