const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    category: 'Public',
    description: 'View bot commands',
    run: async function (client, interaction, args) {

        let public = client.commands.filter(c => c.category == 'Public').map((c) => `**/${c.name}** \n> \`${c.description}\``);
        let moderation = client.commands.filter(c => c.category == 'Moderation').map((c) => `**/${c.name}** \n> \`${c.description}\``);

        const embed = new MessageEmbed()
            .setTitle('LayerSystem help list')
            .setURL('https://discord.gg/RjNPebdKNr')
            .setColor(client.config.Embed.color)
            .addField('Public', `${public.join('\n') || 'None'}`, true)
            .addField('Moderation', `${moderation.join('\n') || 'None'}`, true)
            .setAuthor({ name: `${client.user.tag} | By Layer Coding`, iconURL: `${client.user.displayAvatarURL()}` })
            .setFooter({ text: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })

        interaction.followUp({ embeds: [embed] })
    }
}
// Layer Coding : !                  Marquis#9999
