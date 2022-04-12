const token = "INSERT TOKEN HERE (get it from Discord developer portal)"



/*
Add the bot using this link : https://discord.com/oauth2/authorize?client_id=INSERT_CLIENT_ID_HERE&scope=bot&permissions=8

Modules required:
  discord.js@12.2.0 // npm i discord.js@12.2.0
*/

const Discord = require('discord.js')
const client = new Discord.Client()

const prefix = "!"
const emojis = { // You can put your own custom emojis by following the format <:name:ID>
  "yes": "✅",
  "no": "❌",
  "error": "❗",
}

client.login(token)

client.on('ready', () => {
    console.log(`Bot is now loaded as ${client.user.tag}`)
    client.user.setPresence({
        activity: {
            name: "with members", // It will display: "Playing with members"
        },
        status: "dnd"
    });
})

client.on('message', async message => {
    if (!message || !message.author || message.author.bot || message.channel.type === "dm" || message.channel.type === "unknown" || !message.content.startsWith(prefix)) return

    if (message.content.startsWith(prefix+"ban")) {
        if(message.mentions.members.first()) {
            if(message.mentions.members.first().bannable) { // Checks if we can ban user so we don't get any error
                message.mentions.members.first().ban()
                message.react(emojis.yes)
            } else { // Bot doesn't have the permission to ban user
                message.react(emojis.error)
            }
        } else { // No member mentionned, we don't know who to ban
            message.react(emojis.no)
        }
    }
})
