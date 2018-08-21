const { RichEmbed } = require("discord.js");
const axios = require("axios");

const { getRequestURL } = require("./env");

const weatherRightNow = (args, message) => {
    if (!args || args.length <= 1) {
        message.channel.send("Hey, you didn't tell me where to look for the weather!");

        return false;
    }

    args.shift();

    const loc = args.join(" ");
    const resolveLocation = getRequestURL(
        "/locations/v1/cities/autocomplete",
        {
            q: loc
        }
    );

    axios.default.get(resolveLocation)
        .then(resp => resp.data)
        .then(data => {
            if (!data || !data.length) {
                throw new Error("No locations found!");
            }

            const firstResult = data[0];

            return Promise.all([
                new Promise((resolve, reject) => {
                    // Request for current conditions

                    const req = getRequestURL(
                        `/currentconditions/v1/${firstResult.Key}`
                    );

                    console.log(`Requesting weather data... ${req}`);

                    axios.default.get(req)
                        .then(resp => resolve({
                            location: firstResult,
                            current: resp.data
                        }))
                        .catch(error => reject(error));
                }),
                new Promise((resolve, reject) => {
                    // Request for the next 12 hours

                    const req = getRequestURL(
                        `/forecasts/v1/hourly/12hour/${firstResult.key}`
                    );

                    axios.default.get(req)
                        .then(resp => resolve({
                            data: resp.data
                        }))
                        .catch(error => reject(error));
                })
            ]);
        })
        .then(([location, hourly]) => {
            // Got the data
            // https://developer.accuweather.com/accuweather-current-conditions-api/apis/get/currentconditions/v1/%7BlocationKey%7D
            const local = location.location;
            const currentConditions = location.current;

            console.log("HOURLY:", hourly);

            if (currentConditions && currentConditions.length) {
                const {
                    WeatherText: status,
                    Temperature: temperature
                } = currentConditions[0];
                const embed = new RichEmbed();
                embed
                    .setTitle(`Current weather for **${local.LocalizedName}**`)
                    .addField(
                        "Condition",
                        `**${status} °F**`
                    )
                    .addField(
                        "Temperature",
                        `**${temperature.Imperial.Value}**`
                    );

                message.channel.send(embed);
            }
        })
        .catch(error => {
            message.channel.send(`Weather data **${loc}** was not found!`);
            console.error(error);
        });

    return true;
};

module.exports = weatherRightNow;
