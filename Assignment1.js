import http from 'k6/http';
import { check } from 'k6';
import { Trend } from 'k6/metrics';
import { Counter, Rate } from "k6/metrics";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";

var ErrorCounter = new Counter("Error_Counter_metrics"); //In-Built metrices
var CreatedUsersTrend = new Trend('created_users'); // Custom Trend
var totalTimeTrend = new Trend('total_time'); // Custom Trend
var httpSuccessRate = new Rate('http_success_rate'); //In-Built metrices

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

  let startTime = Date.now();

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

let endTime = Date.now();
let duration = endTime - startTime;
totalTimeTrend.add(duration);

httpSuccessRate.add(responses[0].status < 400 && responses[1].status < 400); //Success rate

const errorStatusCodes = [400, 404, 500];
if (errorStatusCodes.includes(responses[0].status) || errorStatusCodes.includes(responses[1].status)) {
    ErrorCounter.add(1);
}

if (responses[1].status === 201) {
  CreatedUsersTrend.add(1);
}
}

export function handleSummary(data) {
    return {
      "Result.html": htmlReport(data),
    };
  }
  
    
export function teardown() {
   console.log("Load profile with ramp-up and ramp-down fashion is successful")
}
