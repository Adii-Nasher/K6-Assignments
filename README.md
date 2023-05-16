# K6-Assignment-3

## Overview:-

```python
1- The task requires the installation of the k6 and Postman plugins.

2- The Postman collection created in the previous assignment needs to be converted to a k6 script.

3- The converted script should be executed to simulate any load.

4- In addition to the execution, a k6 HTML report also needs to be generated.

5- The load simulation can be based on any desired load pattern or scenario.
```

## Tools used to perform the task:-

```python
IDE - VS Code

Performace Testing Tool - K6 (without K6 recorder)

Language Used - JavaScript

HTML Report - K6 HTML REPORT EXPORTER V2
```

## Commands to convert postman.json to k6.js 

On Terminal
```python
npm install -g @apideck/postman-to-k6
```

```python
postman-to-k6 [YourPostmanCollectionName].json -o [NameYouWantToGiveToYourK6Script].js
```

Additionally if your Postman collection have Environment Variable Support
```python
postman-to-k6 [YourPostmanCollectionName].json -e [YourPostmanCollectionEnvironmentName].json -o [NameYouWantToGiveToYourK6Script].js
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

On Terminal
```python
git fetch

git checkout feature/K6/Assignment3

git pull origin feature/K6/Assignment3

k6 run Assignment3.js
```
