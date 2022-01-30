const ms = require('ms')

module.exports = {
    name: 'mute',
    description: 'To mute someone on the server',
    category: 'Moderation',
    permissions: {
        bot: 'TIMEOUT_MEMBERS',
        user: 'TIMEOUT_MEMBERS'
    },
    options: [
        {
            name: 'user',
            description: 'The user that will be muted',
            type: 'USER',
            required: true,
        },
        {
            name: 'time',
            description: 'The mute time, ex: 5d',
            type: 'STRING'
        },
        {
            name: 'reason',
            description: 'The mute reason',
            type: 'STRING'
        }
    ],
    run: async function (client, interaction, args) {

        let mentioned = interaction.guild.members.cache.get(args[0]);

        if (!mentioned) return interaction.followUp(`:x: - I can't find this member`);

        if (interaction.guild.me.roles.highest.position <= mentioned.roles.highest.position) return interaction.followUp(`:x: - I can't mute this member`);

        if ((interaction.member.roles.highest.position <= mentioned.roles.highest.position && interaction.user.id !== interaction.guild.ownerId) || mentioned.id == interaction.guild.ownerId) return interaction.followUp(`:x: - You can't mute this member`);

        let time

        try {
            time = ms(args[1])
        } catch(e) { time = 86400000 }

        let reason = args[2] || 'None';

        mentioned.timeout(time, reason)
            .then(() => {
                interaction.followUp(`:white_check_mark: - ${mentioned} Got muted successfully!`);
            })
            .catch((err) => {
                interaction.followUp(`:x: - I couldn't mute this member, error: ${err}`);
            })

    }
}
// Layer Coding : !                  Marquis#9999
