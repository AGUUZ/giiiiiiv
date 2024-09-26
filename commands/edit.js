module.exports.run = async (client, message) => {
    const Discord = require("discord.js");
    const ms = require("ms");

  if (
    !message.member.permissions.has("ManageMessages") &&
    !message.member.roles.cache.some(r => r.name === "Giveaways")//اسم الرتبه
  ) {
    return message.reply(
      ":x: You need to have the manage messages permissions to start giveaways."
    );
  }
  
    let time = "";
    let winnersCount;
    let prize = "";
    let giveawayx = "";
    let embed = new Discord.EmbedBuilder()
      .setTitle("Edit A Giveaway!")
      .setColor('#2F3136')
      .setFooter({ 
        text: `${client.user.username}`, 
        iconURL: client.user.displayAvatarURL() 
      })
      .setTimestamp();
    const msg = await message.reply({
      embeds:
        [embed.setDescription(
          "Which Giveaway Would You Like To Edit?\nProvide The Giveaway Message's ID\n **Must Reply within 30 seconds!**"
        )]
    }
    );
    let xembed = new Discord.EmbedBuilder()
      .setTitle("انتهر الوفت ")
      .setColor("#FF0000")
      .setDescription('💥 انتهى الوقت !\nYou لقد اخذت الكثير من الوقت !\nاستخدم ``edit`` للتعديل مره اخرى !\nعليك القيام بها خلال اقل من ٣٠ ثانيه!')
      .setFooter({ 
        text: `${client.user.username}`, 
        iconURL: client.user.displayAvatarURL() 
      })
      .setTimestamp();
  
    const filter = m => m.author.id === message.author.id && !m.author.bot;
    const collector = await message.channel.createMessageCollector(filter, {
      max: 3,
      time: 30000
    });
  
    collector.on("collect", async collect => {
  
      const response = collect.content;
      let gid = response;


      
      await collect.delete()
        if (!client.giveawaysManager.giveaways.find((g) => g.messageID === gid)) {
           return msg.edit({
                embeds: [
                  embed.setDescription(
                    "Uh-Oh! ايدي الرساله غلط!\n**مره اخرى?**\n مثال: ``677813783523098627``"
                  )]
              }
              );
        }
      else {
        collector.stop(
          msg.edit({
            embeds: [
              embed.setDescription(
                `حلوو! الحين, ما الوقت الجديد للجيف اواي\n** عليك الاجابه خلال ٣٠ ثانيه !**`
              )]
          }
          )
        );
      }
      const collector2 = await message.channel.createMessageCollector(filter, {
        max: 3,
        time: 30000
      });
      collector2.on("collect", async collect2 => {
  
        let mss = ms(collect2.content);
        await collect2.delete()
        if (!mss) {
          return msg.edit({
            embeds: [
              embed.setDescription(
                "الوقت غلط \n**مره اخرى ?**\n مثال: ``-10 minutes``,``-10m``,``-10``\n **ملاحظه استخدم- اذا تريد تقليل الوقت**"
              )]
          }
          );
        } else {
          time = mss;
          collector2.stop(
            msg.edit({
              embeds: [
                embed.setDescription(
                  `عدد الفائزين ؟\n**خلال ٣٠ ثانيه عليك الاجابه .**`
                )]
            }
            )
          );
        }
        const collector3 = await message.channel.createMessageCollector(filter, {
          max: 3,
          time: 30000,
          errors: ['time']
        });
        collector3.on("collect", async collect3 => {
  
          const response3 = collect3.content.toLowerCase();
          await collect3.delete()
          if (parseInt(response3) < 1 || isNaN(parseInt(response3))) {
            return msg.edit({
              embeds: [
                embed.setDescription(
                  "اكثر من واحد !\n**مره اخرى ?**\n مثال ``1``,``10``, ."
                )]
            }
            );
          } else {
            winnersCount = parseInt(response3);
            collector3.stop(
              msg.edit({
                embeds: [
                  embed.setDescription(
                    `الجائزه?\n**خلال ٣٠ ثانيه !**`
                  )]
              })
            )
          }
          const collector4 = await message.channel.createMessageCollector(filter, {
          max: 3,
          time: 30000,
          errors: ['time']
        });
          collector4.on("collect", async collect4 => {
  
            const response4 = collect4.content.toLowerCase();
            prize = response4;
            await collect4.delete()
            collector4.stop(
              console.log(giveawayx),
              msg.edit({
                embeds: [
                  embed.setDescription(
                    `Edited`
                  )]
              }
              )
            );
            client.giveawaysManager.edit(gid, {
              newWinnerCount: winnersCount,
              newPrize: prize,
              addTime: time
            })
          });
        });
      });
    });
    collector.on('end', (collected, reason) => {
      if (reason == 'time') {
        message.reply({ embeds: [xembed] });
      }
    })
    try {
      collector2.on('end', (collected, reason) => {
        if (reason == 'time') {
  
          message.reply({ embeds: [xembed] });
        }
      });
      collector3.on('end', (collected, reason) => {
        if (reason == 'time') {
          message.reply({ embeds: [xembed] });
  
        }
      })
      collector4.on('end', (collected, reason) => {
        if (reason == 'time') {
  
          message.reply({ embeds: [xembed] });
        }
      })
    } catch (e) { }
  }
