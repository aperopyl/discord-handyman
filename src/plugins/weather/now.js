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
        .then(data => new Promise((resolve, reject) => {
            if (data && data.length) {
                const first = data[0];

                const req = getRequestURL(
                    `/currentconditions/v1/${first.Key}`
                );

                console.log(`Requesting weather data... ${req}`);

                axios.default.get(req)
                    .then(resp => resolve({
                        location: first,
                        current: resp.data
                    }))
                    .catch(error => reject(error));
            } else {
                reject(new Error("No locations found!"));
            }
        }))
        .then(location => {
            // Got the data
            // https://developer.accuweather.com/accuweather-current-conditions-api/apis/get/currentconditions/v1/%7BlocationKey%7D
            const local = location.location;
            const currentConditions = location.current;

            if (currentConditions && currentConditions.length) {
                const {
                    WeatherText: status,
                    Temperature: temperature
                } = currentConditions[0];
                const messages = [];

                messages.push(`It is currently **${status}** in **${local.LocalizedName}**!`);
                messages.push(`Current Temperature: **${temperature.Imperial.Value} F**`);

                message.channel.send(messages.join("\n"));
            }
        })
        .catch(error => {
            message.channel.send(`Weather data **${loc}** was not found!`);
        });

    return true;
};

module.exports = weatherRightNow;
