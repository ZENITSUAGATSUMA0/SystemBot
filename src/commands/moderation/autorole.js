const { MessageEmbed } = require('discord.js');
const Data = require('../../models/autoroles');

module.exports = {
    name: 'autorole',
    description: 'Add/rewmove role from autoroles',
    category: 'Moderation',
    permissions: {
        bot: 'MANAGE_GUILD',
        user: 'MANAGE_GUILD'
    },
    options: [
        {
            name: 'add',
            description: 'Add a role',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'role',
                    description: 'The role that will added',
                    type: 'ROLE',
                    required: true
                }
            ]
        },
        {
            name: 'remove',
            description: 'Remove a role',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'role',
                    description: 'The role that will removed',
                    type: 'ROLE',
                    required: true
                }
            ]
        },
        {
            name: 'remove_all',
            description: 'Remove all roles',
            type: 'SUB_COMMAND'
        },
        {
            name: 'list',
            description: 'Autoroles list',
            type: 'SUB_COMMAND'
        }
    ],
    run: async function (client, interaction, args) {

        let role = interaction.guild.roles.cache.get(args[1]);

        if (role && (role.tags?.botId || role.tags?.premiumSubscriberRole)) return interaction.followUp(`:x: - You've enter an wrong role`);

        if (role && (role.position >= interaction.member.roles.highest.position) && interaction.user.id !== interaction.guild.ownerId) return interaction.followUp(`:x: - The role position is higher than __your__ position`);
        if (role && (role.position >= interaction.guild.me.roles.highest.position)) return interaction.followUp(`:x: - The role position is higher than __my__ position`);

        let data = await Data.findOne({ guildId: interaction.guild.id })
        if (!data) {
            await Data.create({
                guildId: interaction.guild.id,
                roles: []
            })
            data = await Data.findOne({ guildId: interaction.guild.id })
        }

        if (args[0] == 'add') {

            if (data.roles[0] && data.roles.includes(args[1])) return interaction.followUp(`:x: - This role is actually on the list`)

            await Data.findOneAndUpdate({ guildId: interaction.guild.id }, {
                $push: {
                    roles: args[1]
                }
            })

            interaction.followUp(`:white_check_mark: - Added ${role} to the autoroles list`)

        } else if (args[0] == 'remove') {

            if (data.roles[0] && !data.roles.includes(args[1])) return interaction.followUp(`:x: - This role is not on the list`)

            await Data.findOneAndUpdate({ guildId: interaction.guild.id }, {
                $pull: {
                    roles: args[1]
                }
            })

            interaction.followUp(`:white_check_mark: - Removed ${role} from the autoroles list`)

        } else if (args[0] == 'remove_all') {

            if (!data.roles[0]) return interaction.followUp(`:x: - There is no roles on your autoroles`)

            interaction.followUp(`:white_check_mark: - Removed \`${data.roles.length}\` roles from the autoroles list`)

            await Data.findOneAndUpdate({ guildId: interaction.guild.id }, {
                $set: {
                    roles: []
                }
            })

        } else if (args[0] == 'list') {

            if (!data.roles[0]) return interaction.followUp(`:x: - There is no roles on your autoroles`)

            let roles = data.roles.map((x, index) => `${index + 1}-<@&${x}>`)

            let embed = new MessageEmbed()
                .setAuthor({ name: `${client.user.tag} | By Layer Coding`, iconURL: `${client.user.displayAvatarURL()}` })
                .setFooter({ text: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
                .setColor(client.config.Embed.color)
                .setTitle('Server Autoroles')
                .setURL('https://discord.gg/RjNPebdKNr')
                .setDescription(`${roles.join('\n')}`)
            interaction.followUp({ embeds: [embed] })
        }

    }
}
// Layer Coding : !                  Marquis#9999
