const config = require('../config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "<a:rs_s121:1278105532229615657> Giveaway By 𝙍𝙎 𝙋𝙚𝙖𝙧𝙡𝙨. <a:rs_s119:1278105505553842176>",//رساله عند الجبف
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **انتهى الجيف** 🎉",//رساله عند انتهاء الجيف
  drawing:  `الوقت: **{timestamp}**`,
  inviteToParticipate: `اضغط الرياكشن <a:rs_s45:1277298995840155678><للمشاركه ! `,// داخل ايمبد الجيف
  winMessage: "الفائز, {winners}! \n الجائزة** {this.prize}** !",//لما بفوز
  embedFooter: "{this.winnerCount} winner(s)",// فوتر
  //noWinner: "Giveaway cancelled, no valid participations.",//اذا مافي عدد
  hostedBy: "الجائزة من: {this.hostedBy}",//الجائزه من 
  winners: "winner(s)",//الفائز
  endedAt: "Ended at"//انتهت قبل 
}
