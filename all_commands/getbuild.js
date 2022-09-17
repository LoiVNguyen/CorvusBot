const profileModel = require('../src/profile_schema');
const { units } = require('../src/unit_list');


// Replies with unit from specified user.
async function getUnitFromDB(interaction, unitName) {
    userInfo = interaction.options.getUser('userhandle');
    if (!userInfo) {
        userInfo = interaction.user;
    };
    const duplicate = await profileModel.find( 
        { userID: userInfo }, 
        { builds: { $elemMatch: {unit: unitName }}}
    );   
    
    if (duplicate.length >= 1 && duplicate[0].builds.length == 1) {
        interaction.reply(duplicate[0].builds[0].image);
    }
    else {
        interaction.reply(`Could not find ${ unitName } from user ${ userInfo.username }.`);
    }
};  


module.exports = {
    getBuild: function(interaction)
    {
        unitName = interaction.options.getString('unitname');
        firstLetter = unitName.toUpperCase()[0];
        if (firstLetter in units && unitName.toUpperCase() in units[firstLetter]) {
            correctName = units[firstLetter][unitName.toUpperCase()];

            getUnitFromDB(interaction, correctName);
        }
        else {
            interaction.reply(`"${ unitName }" is not a valid character name.`)
            .then(console.log(`"${ unitName }" is not a valid character name.`))
            .catch(console.error);
        }
        
    }
};
