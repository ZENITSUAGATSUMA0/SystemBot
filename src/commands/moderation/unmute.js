const ms = require('ms')

module.exports = {
    name: 'unmute',
    description: 'To unmute someone on the server',
    category: 'Moderation',
    permissions: {
        bot: 'TIMEOUT_MEMBERS',
        user: 'TIMEOUT_MEMBERS'
    },
    options: [
        {
            name: 'user',
            description: 'The user that will be unmuted',
            type: 'USER',
            required: true,
        }
    ],
    run: async function (client, interaction, args) {

        let mentioned = interaction.guild.members.cache.get(args[0]);

        if (!mentioned) return interaction.followUp(`:x: - I can't find this member`);

        if (interaction.guild.me.roles.highest.position <= mentioned.roles.highest.position) return interaction.followUp(`:x: - I can't unmute this member`);

        if ((interaction.member.roles.highest.position <= mentioned.roles.highest.position && interaction.user.id !== interaction.guild.ownerId) || mentioned.id == interaction.guild.ownerId) return interaction.followUp(`:x: - You can't unmute this member`);

        mentioned.timeout(null)
            .then(() => {
                interaction.followUp(`:white_check_mark: - ${mentioned} Has unmuted successfully!`);
            })
            .catch((err) => {
                interaction.followUp(`:x: - I couldn't unmute this member, error: ${err}`);
            })

    }
}
// Layer Coding : !                  Marquis#9999
