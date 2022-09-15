const profileModel = require('../src/profile_schema');
const { units } = require('../src/unit_list');


async function createProfileAndStore(interaction, unitName, imageLink) {
    const result = await profileModel.create({
        'userID': interaction.user,
        'builds': [{
            'unit': unitName,
            'image': imageLink
        }]
    });
    console.log(result);
};


async function storeIntoDB(interaction, unitName, imageLink) {
    const duplicate = await profileModel.findOne( {userID: interaction.user} ).exec();
    if (duplicate) {
        profileModel.findOne({
            userID: interaction.user,
            'builds.unit': unitName
        },
        async function(error, result) {
            if (error) {
                console.log(`Error retrieving unit ${ unitName } from ${ interaction.user }.`);
            }
            if (!result) {
                await profileModel.findOneAndUpdate(
                    { userID: interaction.user },
                    { $push: { builds: { unit: unitName, image: imageLink }}}
                )
                console.log('Added to database!');
            }
            else {
                await profileModel.findOneAndUpdate( { 
                     userID: interaction.user, 
                     'builds.unit': unitName 
                 },
                 { $set: {
                     'builds.$.image': imageLink
                     }
                 });
                console.log('Updated!');
            };
        }
        )
    }
    else {
        createProfileAndStore(interaction, unitName, imageLink);
    };
};


// Checks if unit name is in all units database.
function storeUnitToDB(interaction, unitName, imageLink) {
    firstLetter = unitName.toUpperCase()[0];
    if (firstLetter in units && unitName.toUpperCase() in units[firstLetter]) {
        correctName = units[firstLetter][unitName.toUpperCase()];

        storeIntoDB(interaction, correctName, imageLink);

        interaction.reply(`${ correctName } has been stored.\n${ imageLink }`)
        .then(console.log(`${ correctName } has been stored.`))
        .catch(console.error);
    }
    else
    {
        interaction.reply(`"${ unitName }" is not a valid character name.`)
        .then(console.log(`"${ unitName }" is not a valid character name.`))
        .catch(console.error);
    }
};


module.exports = {
    storeBuild: function(interaction)
    {
        unitName = interaction.options.getString('unitname');
        imageLink = interaction.options.getString('imagelink');
        storeUnitToDB(interaction, unitName, imageLink);
    }
};
