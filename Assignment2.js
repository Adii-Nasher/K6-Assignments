import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";

export let options = {
    executor: 'ramping-vus',
    stages: [
        { duration: '20s', target: 50 }, // Ramp up to 50 virtual users over 20 seconds
        { duration: '30s', target: 60 }, 
        { duration: '20s', target: 0 }, // Ramp down to 0 virtual users over 20 seconds
      ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 1sec
    http_req_failed: ['rate<0.01'] // http errors should be less than 1%
  },
};


export default function() {
 
  console.log(`[VU: ${__VU}, iteration: ${__ITER}] Starting iteration...`); //printing iterations on Console

  // GET request
  let getReq = {
    method: 'GET',
    url: 'https://reqres.in/api/users',
    tags: {
      name: 'get-users'
    }
  };

  // POST request
  let postReq = {
    method: 'POST',
    url: 'https://reqres.in/api/users',
    body: JSON.stringify({
      name: 'Aditya Kumar Singh',
      job: 'Test Automation Studio',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    tags: {
      name: 'create-user'
    }
  };

  let responses = http.batch([  //Initiating Parallel request
    getReq,
    postReq
  ]);

  check(responses[0], {
    'GET request response time is within acceptable limits': (res) => res.timings.duration < 1000,
    'GET request is successful': (res) => res.status === 200,
    'response contains users': (r) => r.json().data.length > 0,
  });

  check(responses[1], {
    'POST request response time is within acceptable limits': (res) => res.timings.duration < 1000,
    'POST request is successful': (res) => res.status === 201,
    'response contains new user data': (res) => {
        const responseBody = res.json()
        return responseBody.hasOwnProperty('id');
    }
  });
  
  

}

export function handleSummary(data) {
    return {
      "Result.html": htmlReport(data),
    };
  }
  
    
export function teardown() {
   console.log("Assertions and Checks are implemented sucessfully")
}
