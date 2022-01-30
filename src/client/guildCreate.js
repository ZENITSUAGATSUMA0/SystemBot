module.exports = async (client, guild) => {
    try {
        await guild.commands.set(client.slash)
    } catch (err) { console.log('GuildCreate_Error: Cannot create slash commands on', guild.name, guild.id) }
}
// Layer Coding : !                  Marquis#9999