module.exports = {
    name: 'unban',
    description: 'unban member',
    category: 'Moderation',
    permissions: {
        bot: 'MANAGE_MEMBERS',
        user: 'MANAGE_MEMBERS'
    },
    options: [
        {
            name: 'user_id',
            description: 'The banned user id',
            type: 'STRING',
            required: true
        }
    ],
    run: async function (client, interaction, args) {

        let member = await client.users.fetch(args[0]).catch(() => null)

        if (!member) return interaction.followUp(`:x: - I can\'t find this member`)

        interaction.guild.bans.fetch().then(bans => {

            if (bans.size == 0) return interaction.followUp(`:x: - I can't find any banned members`)

            const user = bans.find(ban => ban.user.id === member.id);

            if (!user) return interaction.followUp(`:x: - ${member} Is not banned`)

            interaction.guild.members.unban(member.id)
                .then(() => {
                    interaction.followUp(`:white_check_mark: - I've unban ${member} (\`${member.tag} | ${member.id}\`)`)
                })
                .catch(() => {
                    return interaction.followUp(`:x: - An error has occurred`)
                })

        })

    }
}
// Layer Coding : !                  Marquis#9999
