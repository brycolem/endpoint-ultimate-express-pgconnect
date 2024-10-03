import express from 'ultimate-express';
import { ApplicationController } from './app.controller.js';
import 'reflect-metadata';

const app = express();
const applicationController = new ApplicationController();

app.get('/application', (req, res) => applicationController.getApplications(req, res));
app.get('/application/:id', (req, res) => applicationController.getApplication(req, res));

app.listen(8001, () => {
  console.log('Server is running on port 8001');
});
