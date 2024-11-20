## E2E Frontend Automation
Tests E2E using WebdriverIO
## Dependencies
- NodeJS: https://nodejs.org/en/download
- npm
## Initial setup
- npm install
- npm run wdio

## Aditional informations:
When execute this command npm init wdio return error:  Missing script: "wdio"
It is necessary to execute this command to allowed to run the tests: 
In prompt command like "administrator" execute this command: 
- Get-ExecutionPolicy
 
- Set-ExecutionPolicy RemoteSigned

## Setup allure reports
- npm install -g allure-commandline --save-dev
- npm install @wdio/allure-reporter --save-dev
- allure generate allure-results && allure open

