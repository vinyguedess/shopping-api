import { expect } from "chai";
import Axios from "axios";
import { app } from "./../../src/app/bootstrap";


describe("Test/Integration/v1/HomeTest", (): void =>
{

    const server = { http: null }
    before((done): void => server.http = app.listen(3001, done));

    describe("Login", (): void =>
    {
        it("Should make login without trouble", (done): void =>
        {
            Axios.get("http://127.0.0.1:3001/")
                .then(({ data, status }) =>
                {
                    expect(status).to.be.equal(200);
                    expect(data.status).to.be.equal("Success");
                })
                .then(done);
        });
    });

    after((): void => server.http.close());

});