const token = "ENTER YOUR BOT TOKEN HERE"
const Discord = require('discord.js')  // Make sure you installed node's module : discord.js // npm install discord.js
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
    if (!message) return
    if (!message.author) return
    if (message.author.bot) return
    if (message.channel.type === "dm") return
    if (message.channel.type === "unknown") return
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commande = args.shift();
    
    if (commande === "unbanall") {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.guild.fetchBans().then(bans => {
                if (bans.size == 0) {message.channel.send({embed:{
                        title: ":white_check_mark: All members are unbanned!",
                        description: "Thank you! I finally unbanned all the members.",
                        color: 4301312,
                        footer: {
                          text: "Powered by NANO | nano-ck.cf"
                        }
                      }
                  }); throw "No members to unban."};
                bans.forEach(ban => {
                    message.channel.send("Unbanned "+ban.user.tag)
                    message.guild.members.unban(ban.user.id).catch(function(error){
                        message.channel.send("Attempt to unban "+ban.user.tag+" failed")
                    })
                });
            }).then(() => message.channel.send("finished")).catch(e => console.log(e))
        } else {message.reply("You do not have enough permissions for this command.")}
    }
    message.channel.send("unknown command")
})
