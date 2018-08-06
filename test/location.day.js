const chakram = require('chakram'),
    expect = chakram.expect;
const config = require('./../config.js');

describe("Search by woeid of Bucharest for the date of 17-05-2017", function() {
    const woeid = 868274;
    const date = "2017/5/17"
    var response;

    before(function () {
        response = chakram.get(config.app.host + config.endpoint.location + woeid + '/' + date);
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
        expect(response).to.have.schema('[0]', {
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
});
