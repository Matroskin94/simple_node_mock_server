import express from "express";
import morgan from 'morgan';
import cors from "cors";
import 'dotenv/config';

import { endpointsRouter } from "./endpointsRouter";

const endpointConfigs = require('./endpoints/endpoints.json');
const endpoints = Object.keys(endpointConfigs);

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

if (endpoints.length) {
  app.use(endpoints, endpointsRouter);
}

app.listen(port, () => {
  console.log("SERVER IS RUNNING ON PORT: " + port);
});