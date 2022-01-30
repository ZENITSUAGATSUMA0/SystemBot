const { findOne } = require('../models/autoroles');
const Data = require('../models/autoroles')

module.exports = async (client, member) => {

    let data = await Data.findOne({ guildId: member.guild.id });

    if (!data) {

        await Data.create({ guildId: member.guild.id, roles: [] });

    } else {

        if(!data.roles[0]) return;

        data.roles.forEach(async role => {

            let r = member.guild.roles.cache.get(role)

            if(!r) {

                await Data.findOneAndUpdate({ guildId: member.guild.id }, {
                    $pull: {
                        roles: role
                    }
                });
                return;

            } else {

                member.roles.add(r)

            }

        })

    }

}
// Layer Coding : !                  Marquis#9999
