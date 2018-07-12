import { expect } from "chai";
import Axios from "axios";
import { app } from "./../../src/app/bootstrap";
import User from "../../src/app/Core/Models/User";


describe("Test/Integration/v1/AuthTest", (): void =>
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

    describe("Login", (): void =>
    {
        it("Should make login without trouble", (done): void =>
        {
            Axios.post("http://127.0.0.1:3001/auth/login", {
                user: "vguedes",
                pass: "vg321@123"
            })
                .then(({ data, status }) =>
                {
                    expect(data.access_token).to.be.a("string");
                    expect(data.refresh_token).to.be.a("string");
                    expect(status).to.be.equal(200);

                    server.tokens = data;
                })
                .then(done);
        });

        it("Should return error in case there's a problem on login", (done): void => 
        {
            Axios.post("http://127.0.0.1:3001/auth/login", {
                user: "unknown",
                pass: "wrong"
            })
                .catch(err => err.response)
                .then(({ data, status }) =>
                {
                    expect(data.errors).to.be.an("object");
                    expect(status).to.be.equal(403);
                })
                .then(done);
        });
    });

    describe("Refresh", () =>
    {
        it("Should revalidate token without trouble", (done): void =>
        {
            Axios.post("http://127.0.0.1:3001/auth/refresh", {
                refresh_token: server.tokens.refresh_token
            }, {
                    headers: {
                        "Authorization": `Bearer ${server.tokens.access_token}`
                    }
                })
                .catch(err => err.response)
                .then(({ data, status }) =>
                {
                    expect(data.access_token).to.be.a("string");
                    expect(data.refresh_token).to.be.a("string");
                    expect(status).to.be.equal(200);
                })
                .then(done);
        });

        it("Should return error in case problem with refresh token", (done): void =>
        {
            Axios.post("http://127.0.0.1:3001/auth/refresh", {
                refresh_token: "9392384029384023"
            }, {
                    headers: {
                        "Authorization": `Bearer ${server.tokens.access_token}`
                    }
                })
                .catch(err => err.response)
                .then(({ data, status }) =>
                {
                    expect(data.errors).to.be.a("object");
                    expect(status).to.be.equal(403);
                })
                .then(done);
        });

        it("Should return error in case it's not a valid refresh token", (done): void => 
        {
            Axios.post("http://127.0.0.1:3001/auth/refresh", {
                refresh_token: server.tokens.access_token
            }, {
                    headers: {
                        "Authorization": `Bearer ${server.tokens.access_token}`
                    }
                })
                .catch(err => err.response)
                .then(({ data, status }) =>
                {
                    expect(data.errors).to.be.a("object");
                    expect(status).to.be.equal(403);
                })
                .then(done);
        });
    });

    after((): void =>
    {
        User.destroy({
            where: { user: "vguedes" }
        });

        server.http.close()
    });

});