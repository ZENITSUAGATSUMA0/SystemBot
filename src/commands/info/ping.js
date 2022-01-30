module.exports = {
    name: 'ping',
    category: 'Public',
    description: 'View bot ping',
    run: async function (client, interaction, args) {

        interaction.followUp('Pong 🏓').then(() => {

            let respone = Date.now() - interaction.createdTimestamp;

            interaction.editReply(`Respone time ${respone}ms\nAPI Latency ${client.ws.ping}ms`)
        })

    }
}
// Layer Coding : !                  Marquis#9999
