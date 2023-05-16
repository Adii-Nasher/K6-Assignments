import "./libs/shim/core.js";
import "./libs/shim/urijs.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";

export let options = { 
  maxRedirects: 4,
  duration: '1m',
  vus: 100 
};

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options,
  collection: {
    url: "https://reqres.in"
  }
});

export default function() {
  postman[Request]({
    name: "Create User",
    id: "afa0d073-23ca-43b1-a3d8-c602d8a6dc5c",
    method: "POST",
    address: "{{url}}/api/users",
    data:
      '{\n    "name": "Aditya Kumar Singh",\n    "job": "Software Engineer",\n    "id": "1850"\n}',
    post(response) {
      pm.test("Creation successfull and Status code is 201", function() {
        pm.response.to.have.status(201);
      });
    }
  });

  postman[Request]({
    name: "Read User",
    id: "919a1d31-91e2-478c-8741-33a0f331cf23",
    method: "GET",
    address: "{{url}}/api/users/5",
    post(response) {
      pm.test("Retrieval successfull and Status code is 200", function() {
        pm.response.to.have.status(200);
      });
    }
  });

  postman[Request]({
    name: "Update User",
    id: "7a3c0898-efba-4379-853c-7dce7e8673a2",
    method: "PUT",
    address: "{{url}}/api/users/1850",
    data:
      '{\n    "name": "Robin Singh",\n    "job": "Test Automation Studio",\n    "id": "1850"\n}',
    post(response) {
      pm.test("Updation successfull and Status code is 200", function() {
        pm.response.to.have.status(200);
      });
    }
  });

  postman[Request]({
    name: "Delete User",
    id: "c855c15b-3e20-4fb5-8da9-cb97075c26c3",
    method: "DELETE",
    address: "{{url}}/api/users/1850",
    data:
      '{\n    "name": "Robin Singh",\n    "job": "Test Automation Studio",\n    "id": "1850"\n}',
    post(response) {
      pm.test("Deletion successfull and Status code is 204", function() {
        pm.response.to.have.status(204);
      });
    }
  });
}

export function handleSummary(data) {
  return {
    "Result.html": htmlReport(data),
  };
}
