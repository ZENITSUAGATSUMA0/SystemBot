const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'server',
    description: 'Get server information',
    category: 'Public',
    run: async function (client, interaction, args) {

        let func = () => {
            let bots = interaction.guild.members.cache.filter(c => c.user.bot).size
            let nbots = interaction.guild.members.cache.filter(c => !c.user.bot).size
            let online = interaction.guild.members.cache.filter(c => c.presence?.status == 'online').size + interaction.guild.members.cache.filter(c => c.presence?.status == 'dnd').size + interaction.guild.members.cache.filter(c => c.presence?.status == 'idle').size
            let offline = interaction.guild.members.cache.size - online
            return `🤖: ${bots} | 👨: ${nbots}\nONLINE: ${online}\nOFFLINE: ${offline}`
        }

        let boost = () => {
            let bst = interaction.guild.premiumSubscriptionCount
            return bst < 2 ? `${bst}/2` : bst < 7 ? `${bst}/7` : bst < 14 ? `${bst}/14` : 'FULL'
        }

        let embed = new MessageEmbed()
            .setColor(client.config.Embed.color)
            .setAuthor({ name: `${interaction.guild.name} | By Layer Coding`, iconURL: `${interaction.guild.iconURL({ dynamic: true })}` })
            .setFooter({ text: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
            .addField('Owner', `<@!${interaction.guild.ownerId}>`, true)
            .addField('Created At', `<t:${parseInt(interaction.guild.createdAt / 1000)}:R>`, true)
            .addField('Verfication Level', `${interaction.guild.verificationLevel}`, true)
            .addField('Boosts', `${boost()}`, true)
            .addField('Roles', `${interaction.guild.roles.cache.size}`, true)
            .addField('Members', `${func()}`, true)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        interaction.followUp({ embeds: [embed] })

    }
}
// Layer Coding : !                  Marquis#9999
