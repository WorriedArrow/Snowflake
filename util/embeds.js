const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
const { version } = require("discord.js/package.json");

module.exports.create = function(name, description) {
    return new EmbedBuilder({
        title: name,
        description: description,
        footer: {
            text: "Snowflake · " + moment().format("MMMM D[,] yyyy") + " · Discord.JS " + version
        }
    })
}