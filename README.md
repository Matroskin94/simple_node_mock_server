# Quara mock-server

## Basic description
Simple nodeJS mock-server, developed for replacing real back-end while it develops.

## Usage
Before first start need to run `npm i` command in terminal. Then run `npm run start` command, it runs server on `localhost:3002`. Server respond to requests, using data from localy stored files.
Server runs useing `nodemon`, so it reflects on each code change.

## Adding mocks
For creating mock for request at first you need to add url to `src/endpoints/enpoints.json` file property, where request url is a key. Object for url can store method, this property links to specific file which relates to this request. Also you can add delay property (number), it's amout in miliseconds, for response delay.

Then you need to create folder with service name, which you want to mock and add file with response.

**Mock naming**
Each mock should be created in folder with service name for this request. File should be named: **serviceName.action.httpMethod.json**
Example: `endpoints/customer/customer.create.post.json`

**Mock content**
File should contain "data" property, it stores data for response and "status", it stores response http status.

After creating of mock, push it to repository, but push responses only with success statuses. If you need to test errors, do it localy, but not push it to repo.