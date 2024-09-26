exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('ManageMessages') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){//اسم الرتبه
        return message.reply(':x: You need to have the manage messages permissions to reroll giveaways.');
    }


    if(!args[0]){
        return message.reply(':x: You have to specify a valid message ID!');
    }


    let giveaway = 

    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||

    client.giveawaysManager.giveaways.find((g) => g.messageId == args[0]);


    if(!giveaway){
        return message.reply('لم اجد الجيف `'+ args.join(' ') + '`.');
    }


  client.giveawaysManager.end(giveaway.messageId)

    .then(() => {

        message.reply('Giveaway Ended.');
    }).catch((e) => {
            message.reply({
                content: e
            });
    })

};
