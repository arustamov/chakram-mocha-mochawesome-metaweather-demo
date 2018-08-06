const chakram = require('chakram'),
    expect = chakram.expect;
const config = require('./../config.js');

describe("Search by woeid of San Francisco", function() {
    const woeid = 2487956;
    var response;

    before(function () {
        response = chakram.get(config.app.host + config.endpoint.location + woeid);
        return chakram.wait();
    });

    it("Verify 200 on success", function () {
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("Verify content type header", function () {
        expect(response).to.have.header('content-type', 'application/json');
        return chakram.wait();
    });

    it("Verify includes weather state, wind speed and temperature", function () {
        expect(response).to.have.schema('consolidated_weather[0]', {
            type: "object",
            properties: {
                weather_state_name: {
                    type: "string"
                },
                the_temp: {
                    type: "number"
                },
                wind_speed: {
                        type: "number"
                    }
            }
        });
        return chakram.wait();
    });

    it("Verify result for San Francisco", function () {
        expect(response).to.have.json('title', 'San Francisco');
        return chakram.wait();
    });

    it("Verify correct woeid", function () {
        expect(response).to.have.json('woeid', 2487956);
        return chakram.wait();
    });
});
