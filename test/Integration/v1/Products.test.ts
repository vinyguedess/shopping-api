import { expect } from "chai";
import Axios from "axios";
import User from "../../../src/app/Core/Models/User";
import { app } from "../../../src/app/bootstrap";


describe("Test/Integration/v1/ProductsTest", () =>
{

    const server = { http: null, tokens: { refresh_token: null, access_token: null } }
    before((done): void =>
    {
        User.create({
            name: "Vinicius",
            user: "vguedes",
            pass: "vg321@123"
        }).then(() => server.http = app.listen(3001, done));
    });

    describe("Listing", () =>
    {
        it("Should list products", done =>
        {
            Axios.get("http://127.0.0.1:3001/v1/products")
                .then(({ status, data }) =>
                {
                    expect(status).to.be.equal(200);
                    console.log(data);
                })
                .then(done);
        })
    });

    after((): void =>
    {
        User.destroy({
            where: { user: "vguedes" }
        });

        server.http.close()
    });

});