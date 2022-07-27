import express from "express";
import fs from "fs";
import path from "path";

const endpointConfigs = require('./endpoints/endpoints.json');
import {responseModifiers} from './responseModifiers'

const endpointsRouter = express.Router();

endpointsRouter.options('/*', (request, response) => {
  response.set({
    'Allow': 'OPTIONS, GET, POST, PATCH, HEAD, DELETE',
  }).status(204).send();
});

endpointsRouter.use((request, response, next) => {
  const requestConfig = endpointConfigs[request.baseUrl];
  const filePath = endpointConfigs[request.baseUrl] && endpointConfigs[request.baseUrl][request.method.toLowerCase()];

  if (!endpointConfigs[request.baseUrl]) {
    response.status(405).send(`[MOCK-SERVER] Response mock not configured for url ${request.baseUrl}`);

    return;
  } else if (!endpointConfigs[request.baseUrl][request.method.toLowerCase()]) {
    response.status(405).send(`[MOCK-SERVER] Response mock not configured for method ${request.method}`);

    return;
  }

  const preparedPath = filePath && path.join(__dirname, 'endpoints', path.normalize(filePath));

  if (preparedPath && fs.existsSync(preparedPath)) {
    const mockResponse = require(preparedPath);
    const identity = d => d
    // adding modifier to request
    const modifier:(data:any) => any = responseModifiers[request.baseUrl] || identity

    setTimeout(() => response.status(mockResponse.status).send(modifier(mockResponse.data)), requestConfig.delay || 0);
  }
});

export { endpointsRouter }