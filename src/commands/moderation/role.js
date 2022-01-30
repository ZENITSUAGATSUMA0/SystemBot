module.exports = {
    name: 'role',
    description: 'To add/remove role from someone om the server',
    category: 'Moderation',
    permissions: {
        bot: 'MANAGE_MEMBERS',
        user: 'MANAGE_MEMBERS'
    },
    options: [
        {
            name: 'user',
            description: 'The user that will be roled',
            type: 'USER',
            required: true,
        },
        {
            name: 'role',
            description: 'The role',
            type: 'ROLE',
            required: true,
        }
    ],
    run: async function (client, interaction, args) {

        let mentioned = interaction.guild.members.cache.get(args[0]);
        let role = interaction.guild.roles.cache.get(args[1]);

        if (!mentioned) return interaction.followUp(`:x: - I can't find this member`);
        if (!role) return interaction.followUp(`:x: - I can't find this role`);

        if (interaction.guild.me.roles.highest.position <= role.position) return interaction.followUp(`:x: - I can't give this role`);

        if ((interaction.member.roles.highest.position <= role.position && interaction.user.id !== interaction.guild.ownerId)) return interaction.followUp(`:x: - You can't give this role`);

        if (mentioned.roles.cache.get(role.id)) {

            mentioned.roles.remove(role)

            interaction.followUp(`:no_entry: - Changed ${mentioned} roles, -${role}`)

        } else if (!mentioned.roles.cache.get(role.id)) {

            mentioned.roles.add(role)

            interaction.followUp(`:white_check_mark: - Changed ${mentioned} roles, +${role}`)

        }

    }
}
// Layer Coding : !                  Marquis#9999
