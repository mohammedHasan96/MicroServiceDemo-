#!/usr/bin/env node
/**
 * Module dependencies.
 *
 * @format
 */

import debug from 'debug';
import http from 'http';
import config from 'config';
import logger from 'logger';
import initializeDatabase from 'database';
import migrations from '../../migrations';
console.log('inti, inti', migrations);
import serverBoot from '../app';
serverBoot().then((app) => {
  const { Port } = config;

  debug('scopal:server');
  /**
   * Get port from environment and store in Express.
   */
  /**
   * Normalize a port into a number, string, or false.
   */

  const normalizePort = (val) => {
    // eslint-disable-next-line radix
    const serverPort = parseInt(val, 10);

    if (Number.isNaN(serverPort)) {
      // named pipe
      return val;
    }

    if (serverPort >= 0) {
      // port number
      return serverPort;
    }

    return false;
  };

  const port = normalizePort(process.env.PORT || Port);
  app.set('port', port);

  /**
   * Create HTTP server.
   */

  const server = http.createServer(app);

  /**
   * Event listener for HTTP server "error" event.
   */

  const onError = (error) => {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        logger.error(`${bind} requires elevated privileges`);
        throw new Error();
      case 'EADDRINUSE':
        logger.error(`${bind} is already in use`);
        throw new Error();
      default:
        throw error;
    }
  };
  /**
   * Event listener for HTTP server "listening" event.
   */
  const force = false;
  const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
    logger.info(`Listening on ${bind}`);
  };
  logger.info(`force ${force}`);
  migrations().then(() =>
    initializeDatabase.sequelize.sync({ force })
  )
    .then(() => {
      server.listen(port);
      server.on('error', onError);
      server.on('listening', onListening);
    })
    .catch((err) => {
      debug(`error can't access the database : ${err}`);
      logger.error(`can't access the database :${err}`);
    });
});
