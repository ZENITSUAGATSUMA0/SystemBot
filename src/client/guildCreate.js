module.exports = async (client, guild) => {
    try {
        await guild.commands.set(client.slash)
    } catch (err) { console.log('GuildCreate_Error: Cannot create slash commands on', guild.name, guild.id);console.log(`Supported Invite Link: https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`) }
}
// Layer Coding : !                  Marquis#9999
