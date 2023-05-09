import chai, { assert, expect } from "chai";
import chatHttp from "chai-http";
import server from "../app.js";
import { validRegistrationData, notFound, unvalidSearch, validSearch, unvalidProfile, invalidLoginPassword, validProfile, alreadyExistEmail, invalidRegistrationData, validLoginData, invalidLoginData, unmatchedCredentials } from './testCredential.js'
chai.use(chatHttp);
chai.should();

describe("signup", () => {
  it("should return response 422 when body does not gets validated", (done) => {
    chai
      .request(server)
      .post("/app/user/signup")
      .send(invalidRegistrationData())
      .end((req, res) => {
        expect(res.status).to.be.equal(422);
        done();
      });
  });
  it("should return response 201 when gets valid response from service", (done) => {
    chai
      .request(server)
      .post("/app/user/signup")
      .send(validRegistrationData())
      .end((req, res) => {
        expect(res.status).to.be.equal(201);
        done();
      });
  });
  it("should return response 409 when email already exists", (done) => {
    chai
      .request(server)
      .post("/app/user/signup")
      .send(alreadyExistEmail())
      .end((req, res) => {
        expect(res.status).to.be.equal(409);
        done();
      });
  });
});


describe("signin", () => {
  it("should return response 200 when controller is called from routes", async () => {
    const res = await chai
      .request(server)
      .post("/app/user/signin")
      .send(validLoginData());
    assert.equal(res.status, 200);
  });
  it("should return response 404 when user does not exist", (done) => {
    chai
      .request(server)
      .post("/app/user/signin")
      .send(invalidLoginData())
      .end((req, res) => {
        assert.equal(res.status, 404);
        done();
      })
  });
  it("should return response 422 when data does not gets validated", (done) => {
    chai
      .request(server)
      .post("/app/user/signin")
      .send(unmatchedCredentials())
      .end((req, res) => {
        expect(res.status).to.be.equal(422);
        done();
      });
  });
  it("should return response 400 when password is wrong", (done) => {
    chai
      .request(server)
      .post("/app/user/signin")
      .send(invalidLoginPassword())
      .end((req, res) => {
        expect(res.status).to.be.equal(400);
        done();
      });
  });
});

describe("Profile", () => {
  it("should return response 201 when controller is called from routes", async () => {
    const bearerToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhRm9yVG9rZW4iOnsiaWQiOiI2MjQxMzlmNTYzMTk1MmZhNzM3YzgzODAiLCJwaG9uZU5vIjoiNjU2NjU3MzIyNzgiLCJlbWFpbCI6InV0a2Fyc2hrcjA4NUBnbWFpbC5jb20ifSwiaWF0IjoxNjQ5MDU0Nzg5LCJleHAiOjE2NDkxNDExODl9.AJA_7CJZklJEs491hFMxATfBIqSHkQUjs_cZE5olV5o"
    const res = await chai
      .request(server)
      .post("/app/profile/profile")
      .set({ authorization: bearerToken })
      .send(validProfile());
    assert.equal(res.status, 201);
  });

  it("should return response 500 when body doesnot get validated", async () => {
    const bearerToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhRm9yVG9rZW4iOnsiaWQiOiI2MjRhOTdiODRlNjY5ZGNmM2JmYWI2M2MiLCJwaG9uZU5vIjoiODE4MTg1MDc1MCIsImVtYWlsIjoidXRrYXJzaGtyODkwNUBnbWFpbC5jb20ifSwiaWF0IjoxNjQ5MDYxNjc1LCJleHAiOjE2NDkxNDgwNzV9.PQN46gz_vLl1qyhyrQJdlRTripPNtKaVtH4Q6brm81w"
    const res = await chai
      .request(server)
      .post("/app/profile/profile")
      .set({ authorization: bearerToken })
      .send(unvalidProfile());
    assert.equal(res.status, 500);
  });

  it("should return response 409 when profile is already exist", async () => {
    const bearerToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhRm9yVG9rZW4iOnsiaWQiOiI2MjQxMzlmNTYzMTk1MmZhNzM3YzgzODAiLCJwaG9uZU5vIjoiNjU2NjU3MzIyNzgiLCJlbWFpbCI6InV0a2Fyc2hrcjA4NUBnbWFpbC5jb20ifSwiaWF0IjoxNjQ5MDU0Nzg5LCJleHAiOjE2NDkxNDExODl9.AJA_7CJZklJEs491hFMxATfBIqSHkQUjs_cZE5olV5o"
    const res = await chai
      .request(server)
      .post("/app/profile/profile")
      .set({ authorization: bearerToken })
      .send(validProfile());
    assert.equal(res.status, 409);
  });
});

describe("Search", () => {
  it("should return response 200 when controller is called from routes", async () => {
    const bearerToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhRm9yVG9rZW4iOnsiaWQiOiI2MjQxMzlmNTYzMTk1MmZhNzM3YzgzODAiLCJwaG9uZU5vIjoiNjU2NjU3MzIyNzgiLCJlbWFpbCI6InV0a2Fyc2hrcjA4NUBnbWFpbC5jb20ifSwiaWF0IjoxNjQ5MDU0Nzg5LCJleHAiOjE2NDkxNDExODl9.AJA_7CJZklJEs491hFMxATfBIqSHkQUjs_cZE5olV5o"
    const res = await chai
      .request(server)
      .post("/app/profile/search")
      .set({ authorization: bearerToken })
      .send(validSearch());
    assert.equal(res.status, 200);
  });

  it("should return response 422 when body doesnot get validated", async () => {
    const bearerToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhRm9yVG9rZW4iOnsiaWQiOiI2MjRhOTdiODRlNjY5ZGNmM2JmYWI2M2MiLCJwaG9uZU5vIjoiODE4MTg1MDc1MCIsImVtYWlsIjoidXRrYXJzaGtyODkwNUBnbWFpbC5jb20ifSwiaWF0IjoxNjQ5MDYxNjc1LCJleHAiOjE2NDkxNDgwNzV9.PQN46gz_vLl1qyhyrQJdlRTripPNtKaVtH4Q6brm81w"
    const res = await chai
      .request(server)
      .post("/app/profile/search")
      .set({ authorization: bearerToken })
      .send(unvalidSearch());
    assert.equal(res.status, 422);
  });

  it("should return response 404 when interest is not found", async () => {
    const bearerToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhRm9yVG9rZW4iOnsiaWQiOiI2MjQxMzlmNTYzMTk1MmZhNzM3YzgzODAiLCJwaG9uZU5vIjoiNjU2NjU3MzIyNzgiLCJlbWFpbCI6InV0a2Fyc2hrcjA4NUBnbWFpbC5jb20ifSwiaWF0IjoxNjQ5MDU0Nzg5LCJleHAiOjE2NDkxNDExODl9.AJA_7CJZklJEs491hFMxATfBIqSHkQUjs_cZE5olV5o"
    const res = await chai
      .request(server)
      .post("/app/profile/search")
      .set({ authorization: bearerToken })
      .send(notFound());
    assert.equal(res.status, 404);
  });
});

describe("Add Contact", () => {
  it("should return response 201 when controller is called from routes", async () => {
    const bearerToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhRm9yVG9rZW4iOnsiaWQiOiI2MjRhOTdiODRlNjY5ZGNmM2JmYWI2M2MiLCJwaG9uZU5vIjoiODE4MTg1MDc1MCIsImVtYWlsIjoidXRrYXJzaGtyODkwNUBnbWFpbC5jb20ifSwiaWF0IjoxNjQ5MDYxNjc1LCJleHAiOjE2NDkxNDgwNzV9.PQN46gz_vLl1qyhyrQJdlRTripPNtKaVtH4Q6brm81w"
    const res = await chai
      .request(server)
      .put("/app/contact/contact/623320ce706521a15a2194bc")
      .set({ authorization: bearerToken })
    assert.equal(res.status, 201);
  });
  it("should return response 500 when profile id is not valid", async () => {
    const bearerToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhRm9yVG9rZW4iOnsiaWQiOiI2MjRhOTdiODRlNjY5ZGNmM2JmYWI2M2MiLCJwaG9uZU5vIjoiODE4MTg1MDc1MCIsImVtYWlsIjoidXRrYXJzaGtyODkwNUBnbWFpbC5jb20ifSwiaWF0IjoxNjQ5MDYxNjc1LCJleHAiOjE2NDkxNDgwNzV9.PQN46gz_vLl1qyhyrQJdlRTripPNtKaVtH4Q6brm81w"
    const res = await chai
      .request(server)
      .put("/app/contact/contact/623320ce706521a15a214bc")
      .set({ authorization: bearerToken })
    assert.equal(res.status, 500);
  });
});






