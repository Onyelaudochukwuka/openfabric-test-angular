/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import logger from 'jet-logger';

import EnvVars from '@src/constants/EnvVars';
import server from './server';
import mongoose from 'mongoose';


// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

mongoose.connect(EnvVars.MONGO_URI, {}).then(() => {
  logger.info('MongoDB connected');
  server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
});