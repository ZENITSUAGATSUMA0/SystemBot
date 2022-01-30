module.exports = {
    name: 'unlock',
    category: 'Moderation',
    description: 'Unlock the channels',
    permissions: {
        bot: 'MANAGE_CHANNELS',
        user: 'MANAGE_CHANNELS'
    },
    options: [
        {
            name: 'channel',
            description: 'The channel that will be locked',
            type: 'CHANNEL'
        }
    ],
    run: async function (client, interaction, args) {

        let channel = interaction.guild.channels.cache.get(args[0]) || interaction.channel

        if(channel.type == 'GUILD_TEXT') {
            channel.permissionOverwrites.edit(interaction.guild.id, {
                SEND_MESSAGES: true
            })
        }
        
        else if(channel.type == 'GUILD_VOICE') {
            channel.permissionOverwrites.edit(interaction.guild.id, {
                CONNECT: true
            })
        }
        
        interaction.followUp(`:white_check_mark: - ${channel} has beeb unlocked`)

    }
}
// Layer Coding : !                  Marquis#9999
