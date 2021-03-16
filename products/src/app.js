import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import v1Router from 'routes';
import cookieParser from 'cookie-parser';
import path from 'path';
import fetch from 'node-fetch';

global.fetch = fetch;

export default async () => {
  const app = express();

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, Content-Type,Authorization, Access-Control-Request-Headers'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') return res.status(200).json({});
    return next();
  });
  // if (app.get('env') === 'production') sessionConfig.cookie.secure = true;

  // view engine setup
  app.use(logger('dev'));
  app.use(express.json({
    type: [
      'application/json',
      'text/plain', // AWS sends this content-type for its messages/notifications
    ],
  }));

  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use('/api/v1', v1Router);

  if (process.env.NODE_ENV === 'production') {
    // serve any static files
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    // Handle React routing, resturn all requests to React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    });
  }


  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message || (err.error ? err.error.details : null);
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    return res.json({
      success: false,
      message: err.message || (err.error ? err.error.details : null),
    });
  });
  return app;
};
