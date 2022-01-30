module.exports = {
    name: 'clear',
    description: 'Bulk delete channel messages',
    category: 'Moderation',
    permissions: {
        bot: 'DLETE_MESSAGES',
        user: 'DLETE_MESSAGES'
    },
    options: [
        {
            name: 'count',
            description: 'The count of messages',
            type: 'INTEGER',
            required: true
        }
    ],
    run: async function (client, interaction, args) {

        if (!args[0] || args[0] < 1) return interaction.followUp(':x: - You\'ve enter an wrong number')

        let count = args[0] / 100
        let numbers = args[0]
        let deleted = 0;

        if (count > 1) {
            for (let i = 0; i < count; i++) {


                interaction.channel.bulkDelete(numbers > 100 ? 100 : numbers, true).then(msgs => {

                    numbers = numbers - 100

                    deleted = deleted + msgs.size

                }).catch(() => { })

            }
        } else if (count <= 1) {

            interaction.channel.bulkDelete(numbers, true).then((msgs) => {

                deleted = deleted + msgs.size

            }).catch(() => { })


        }

        setTimeout(() => {
            interaction.channel.send(`:white_check_mark: - Successfully clear messages`).then((m) => {
                setTimeout(() => {
                    m.delete()
                }, 3000)
            })
        }, 1000)

    }
}
// Layer Coding : !                  Marquis#9999
