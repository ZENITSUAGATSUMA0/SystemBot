const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'ban',
    description: 'To ban someone from the server',
    category: 'Moderation',
    permissions: {
        bot: 'BAN_MEMBERS',
        user: 'BAN_MEMBERS'
    },
    options: [
        {
            name: 'user',
            description: 'The user that will be banned',
            type: 'USER',
            required: true,
        },
        {
            name: 'delete_messages',
            description: 'Delete all user messages in',
            type: 'STRING',
            choices: [
                {
                    name: '0-days',
                    value: '0'
                },
                {
                    name: '1-days',
                    value: '1'
                },
                {
                    name: '7-days',
                    value: '7'
                }
            ],
            required: true,
        },
        {
            name: 'reason',
            description: 'The ban reason',
            type: 'STRING'
        }
    ],
    run: async function (client, interaction, args) {

        let mentioned = interaction.guild.members.cache.get(args[0]);

        if (!mentioned) return interaction.followUp(`:x: - I can't find this member`);

        if (interaction.guild.me.roles.highest.position <= mentioned.roles.highest.position) return interaction.followUp(`:x: - I can't ban this member`);

        if ((interaction.member.roles.highest.position <= mentioned.roles.highest.position && interaction.user.id !== interaction.guild.ownerId) || mentioned.id == interaction.guild.ownerId) return interaction.followUp(`:x: - You can't ban this member`);

        let days = Math.floor(args[1]);
        let reason = args[2] || 'None';

        mentioned.ban({ days: days, reason: `${reason}` })
            .then(() => {
                interaction.followUp(`:white_check_mark: - ${mentioned} Got banned successfully!`);
            })
            .catch((err) => {
                interaction.followUp(`:x: - I couldn't ban this member, error: ${err}`);
            })
    }
}
// Layer Coding : !                  Marquis#9999
