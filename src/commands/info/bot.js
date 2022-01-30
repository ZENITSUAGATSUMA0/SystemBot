const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'bot',
    category: 'Public',
    description: 'View bot information',
    run: async function (client, interaction, args) {

        let embed = new MessageEmbed()
            .setColor(client.config.Embed.color)
            .addField('Guilds', `${client.guilds.cache.size}`, true)
            .addField('Users', `${client.users.cache.size}`, true)
            .addField('API Latency', `${client.ws.ping}ms`, true)
            .setAuthor({ name: `${client.user.tag} | By Layer Coding`, iconURL: `${client.user.displayAvatarURL()}` })
            .setFooter({ text: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
            .setTitle('Bot Information')
            .setURL('https://discord.gg/RjNPebdKNr')
        interaction.followUp({ embeds: [embed] })

    }
}
// Layer Coding : !                  Marquis#9999
