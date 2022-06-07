const Discord = require("discord.js");
const client = new Discord.Client(
    { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING", "GUILD_SCHEDULED_EVENTS"]}
)

client.login(process.eventNames.token);

client.on("ready", () => {
    console.log("Z17_Gamer");
})

client.on('ready', () => {

    client.user.setActivity('Z17_Gamer', { type: 'WATCHING' }); 

    client.user.setStatus('online') 
})

//INFO
client.on("messageCreate", message => {
    if (message.content == "!insta") {
        const embed = new Discord.MessageEmbed()
            .setTitle("LINK SOCIAL") 
            .setColor("ORANGE") 
            .setDescription("**Ecco a voi il mio instagram \n - https://www.instagram.com/z17_gamer_official/ \n \n Ecco a voi il mio canale youtube \n - https://www.youtube.com/channel/UCRA-65R849GRQrzENyj3UPw \n \n Ecco a voi il mio canale twitch \n - https://www.twitch.tv/z17_gamer \n \n Ecco il mio tik tok \n https://vm.tiktok.com/ZMNRR2mG1/ ** ") 
            message.delete()
        message.channel.send({embeds: [embed]})
    }
})


//CLEAR
client.on("messageCreate", message => {
    if (message.content.startsWith("!clear")) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.channel.send('Non hai il permesso');
        }
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            return message.channel.send('Non ho il permesso');
        }
        var count = parseInt(message.content.split(/\s+/)[1]);
        if (!count) {
            return message.channel.send("Inserisci un numero valido")
        }
        if (count > 1000) {
            return message.channel.send("Non puoi cancellare più di 1000 messaggi")
        }
        message.channel.bulkDelete(count, true)
        message.channel.send(count + " messaggi eliminati").then(msg => {
            setTimeout(() => msg.delete(), 5000)
        })
    }
})