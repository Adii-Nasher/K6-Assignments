# Gatling Assignment

## Overview:-

```python
1- The task involves creating a performance test script for an API using k6, a load testing tool. The first step is to install and configure k6 on a local machine. 

2- Next, a performance test script needs to be written for an API, which can be any available dummy API i.e https://reqres.in/api/users.

3- The load profile needs to be created in a ramp-up and ramp-down fashion. This means that the number of virtual users will gradually increase to a maximum, then 
   stay at that level for a certain period of time before gradually decreasing back to zero.

4- In addition to the built-in metrics provided by k6, a new trend needs to be created that logs some sort of statistics. This can be accomplished using the `Trend` 
   function in k6.

5- Once the script has been written and the load profile configured, the script can be run using the `k6 run` command, and the results can be analyzed to identify any 
   performance issues with the API.
```

## Tools used to perform the task:-

```python
IDE - VS Code

Performace Testing Tool - K6 (without K6 recorder)

Language Used - JavaScript

HTML Report - K6 HTML REPORT EXPORTER V2
```

## Running the test

clone the repository in your local system
```python
git clone https://github.com/Adii-knolder/K6-Assignments.git
```

Navigate to project root directory
```python
cd K6-Assignments
```

On terminal
```python
k6 run Assignment1.js
```
