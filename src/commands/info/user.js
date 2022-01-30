const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'user',
    description: 'Get users information',
    category: 'Public',
    options: [
        {
            name: 'user',
            type: 'USER',
            description: 'The requested user'
        }
    ],
    run: async function (client, interaction, args) {

        let user = interaction.guild.members.cache.get(args[0]);

        if(!user && !args[0]) user = interaction.member
        else if(!user && args[0]) return interaction.followUp(`:x: - I couldn't find \`${args[0]}\` member`)

        let embed = new MessageEmbed()
            .setColor(client.config.Embed.color)
            .setAuthor({ name: `${user.user.tag} | By Layer Coding`, iconURL: `${user.user.displayAvatarURL()}` })
            .setFooter({ text: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
            .addField('Created At', `<t:${parseInt(user.user.createdAt / 1000)}:R>`, true)
            .addField('Joined At', `<t:${parseInt(user.joinedAt / 1000)}:R>`, true)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        interaction.followUp({ embeds: [embed] })

    }
}
// Layer Coding : !                  Marquis#9999
