const chakram = require('chakram'),
    expect = chakram.expect;
const config = require('./../config.js');

describe("Search for city San Francisco", function() {
    const city = "San Francisco";
    var response;

    before(function () {
        response = chakram.get(config.app.host + config.endpoint.location_search + city);
        return chakram.wait();
    });

    it("Verify 200 on success", function () {
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it("Verify content type header", function () {
        expect(response).to.have.header("content-type", 'application/json');
        return chakram.wait();
    });

    it("Verify single result", function () {
        expect(response).to.have.schema({minItems: 1, maxItems: 1});
        return chakram.wait();
    });

    it("Verify includes title, location type, woeid and lat/long", function () {
        expect(response).to.have.schema('[0]', {
            "required": [
                "title",
                "location_type",
                "woeid",
                "latt_long"
            ]
        });
        return chakram.wait();
    });

    it("Verify result for San Francisco", function () {
        expect(response).to.have.json('[0].title', 'San Francisco');
        return chakram.wait();
    });

    it("Verify correct woeid", function () {
        expect(response).to.have.json('[0].woeid', 2487956);
        return chakram.wait();
    });

    it("Verify correct lat/long", function () {
        expect(response).to.have.json('[0].latt_long', '37.777119, -122.41964');
        return chakram.wait();
    });
});
