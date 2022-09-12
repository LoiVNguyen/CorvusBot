const profileModel = require('../src/profile_schema');

module.exports = {
    storeBuild: function(interaction)
    {
        console.log(interaction.options.getString('unitname'));
        console.log(interaction.options.getString('imagelink'));
    }
}