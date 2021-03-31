/*
Script made by NANO#1039 || Do not copy without the credits || nano-ck.cf

Must be running with node js
Must have the discord.js module installed || npm install discord.js
*/
const token = "ENTER YOUR BOT TOKEN HERE"
const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = "!" // Change this to any prefix you want
client.login(token)
client.on('ready', () => {
    console.log(`Bot in now loaded as ${client.user.tag}`)
    client.user.setPresence({
        activity: {
            type: "WATCHING",
            name: "nano-ck.cf",
        },
        status: "dnd"
    })
})
client.on("message", async message => {
    if (!message || !message.author || message.author.bot || message.channel.type === "dm" || message.channel.type === "unknown" || !message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commande = args.shift();
    
    if (commande === "unbanall") {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.guild.fetchBans().then(bans => {
                if (bans.size == 0) {message.channel.send({embed:{
                        title: ":white_check_mark: All members are unbanned!",
                        description: "Thank you! All the members are unbanned!",
                        color: 4301312,
                        footer: {
                          text: "Powered by NANO | nano-ck.cf"
                        }
                      }
                  })};
                bans.forEach(ban => {
                    message.guild.members.unban(ban.user.id).catch(function(error){
                        message.channel.send("Attempt to unban "+ban.user.tag+" failed")
                    })
                });
            }).then(() => message.channel.send({embed:{
                title: ":white_check_mark: All members are unbanned!",
                description: "I just finished unbanning all the members",
                color: 4301312,
                footer: {
                  text: "Powered by NANO | nano-ck.cf"
                }
              }
          })).catch(e => console.log(e))
        } else {message.reply("You do not have enough permissions for this command.")}
    }
    message.channel.send("unknown command")
})
