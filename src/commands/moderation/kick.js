module.exports = {
    name: 'kick',
    description: 'To kick someone from the server',
    category: 'Moderation',
    permissions: {
        bot: 'KICK_MEMBERS',
        user: 'KICK_MEMBERS'
    },
    options: [
        {
            name: 'user',
            description: 'The user that will be kicked',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'The kick reason',
            type: 'STRING'
        }
    ],
    run: async function (client, interaction, args) {

        let mentioned = interaction.guild.members.cache.get(args[0]);

        if (!mentioned) return interaction.followUp(`:x: - I can't find this member`);

        if (interaction.guild.me.roles.highest.position <= mentioned.roles.highest.position) return interaction.followUp(`:x: - I can't kick this member`);

        if ((interaction.member.roles.highest.position <= mentioned.roles.highest.position && interaction.user.id !== interaction.guild.ownerId) || mentioned.id == interaction.guild.ownerId) return interaction.followUp(`:x: - You can't kick this member`);

        let reason = args[1] || 'None';

        mentioned.kick(reason)
            .then(() => {
                interaction.followUp(`:white_check_mark: - ${mentioned} Got kicked successfully!`);
            })
            .catch((err) => {
                interaction.followUp(`:x: - I couldn't kick this member, error: ${err}`);
            })

    }
}
// Layer Coding : !                  Marquis#9999
