import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/constants/EnvVars';
import server from './server';
import mongoose, { mongo } from 'mongoose';


// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

mongoose.connect(EnvVars.MONGO_URI, {}).then(() => {
  logger.info('MongoDB connected');
  server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
});