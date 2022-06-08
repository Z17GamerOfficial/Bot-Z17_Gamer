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

//AVATAR
client.on("messageCreate", message => {
    if (message.content.startsWith("a!avatar")) {
        if (message.content.trim() == "!avatar") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }
        if (!utente) {
            return message.channel.send("Utente non trovato")
        }
        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("**Ecco l'avatar di questo utente!!**")
            .setColor("#0cff00")
            .setImage(utente.user.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 512
            }))
        message.channel.send({ embeds: [embed] })
    }
})
//CLEAR
client.on("messageCreate", message => {
    if (message.content.startsWith("z!clear")) {
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
        if (count > 100) {
            return message.channel.send("Non puoi cancellare più di 100 messaggi")
        }
        message.channel.bulkDelete(count, true)
        message.channel.send(count + " messaggi eliminati").then(msg => {
            setTimeout(() => msg.delete(), 5000)
        })
    }
})
//ROLEINFO
client.on("messageCreate", message => {
    if (message.content.startsWith("z!roleinfo")) {
        var ruolo = message.mentions.roles.first()
        if (!ruolo) {
            return message.channel.send("Non ho trovato questo ruolo")
        }
        var memberCount = message.guild.members.cache.filter(member => member.roles.cache.find(role => role == ruolo)).size;
        var permessiRuolo = new Discord.Permissions(ruolo.permissions.bitfield);
        var elencoPermessi = "";
        if (permessiRuolo.has("ADMINISTRATOR")) {
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS"]
            for (var i = 0; i < permessi.length; i++) {
                if (permessiRuolo.has(permessi[i])) {
                    elencoPermessi += `- ${permessi[i]}\r`
                }
            }
        }
        var embed = new Discord.MessageEmbed()
            .setTitle(ruolo.name)
            .setDescription(`**${message.author.toString()} Ecco a te tutte le statistiche di questo ruolo!!**`)
            .setColor("#0cff00")
            .addField("Ruolo ID", ruolo.id, true)
            .addField("Membri", memberCount.toString(), true)
            .addField("ID Colore", ruolo.hexColor, true)
        message.channel.send({ embeds: [embed] })
    }
})
//KICK
client.on("messageCreate", message => {
    if (message.content.startsWith("z!kick")) {
        var utente = message.mentions.members.first();
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }
        if (!utente.kickable) {
            return message.channel.send('Io non ho il permesso');
        }
        utente.kick()
            .then(() => {
                var embed = new Discord.MessageEmbed()
                    .setTitle(`${utente.user.username} kickato`)
                    .setDescription(`Utente kickato da ${message.author.toString()}`)
                    .setColor("#ff0000")

                message.channel.send({ embeds: [embed] })
            })
    }
})
//USERINFO
client.on("messageCreate", message => {
    if (message.content.startsWith("z!userinfo")) {
        if (message.content == "!userinfo") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }
        if (!utente) {
            return message.channel.send("Non ho trovato questo utente")
        }
        var elencoPermessi = "";
        if (utente.permissions.has("ADMINISTRATOR")) {
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS_AND_STICKERS", "USE_APPLICATION_COMMANDS", "REQUEST_TO_SPEAK", "MANAGE_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "USE_EXTERNAL_STICKERS", "SEND_MESSAGES_IN_THREADS", "START_EMBEDDED_ACTIVITIES"]
            for (var i = 0; i < permessi.length; i++)
                if (utente.permissions.has(permessi[i]))
                    elencoPermessi += `- ${permessi[i]}\r`
        }
        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription(`${message.author.toString()} Ecco tutte le info di questo utente!`)
            .setColor("#0cff00")
            .setThumbnail(utente.user.displayAvatarURL())
            .addField("ID User", utente.user.id, true)
            .addField("User è un bot?", utente.user.bot ? "Si" : "No", true)
            .addField("Account Creato a:", utente.user.createdAt.toDateString(), true)
            .addField("E‵ entrato:", utente.joinedAt.toDateString(), true)
        message.channel.send({ embeds: [embed] })
    }
})
//SERVERINFO
client.on("messageCreate", message => {
    if (message.content == "z!serverinfo") {
        var server = message.guild;
        var embed = new Discord.MessageEmbed()
            .setTitle(server.name)
            .setDescription(`${message.author.toString()} Ecco tutte le info su questo server!`)
            .setThumbnail(server.iconURL())
            .setColor("#0cff00")
            .addField("Proprietario", client.users.cache.get(server.ownerId).username, true)
            .addField("ID Server", server.id, true)
            .addField("Membri Totali", server.memberCount.toString(), false)
            .addField("Canali", server.channels.cache.size.toString(), false)
            .addField("Ruoli", server.roles.cache.size.toString(), false)
            .addField("Livello Boost", "Levello " + (server.premiumTier != "NONE" ? server.premiumTier : 0) + " (Boost: " + server.premiumSubscriptionCount + ")", true)
        message.channel.send({ embeds: [embed] })
    }
})