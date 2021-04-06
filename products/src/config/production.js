
/* eslint-disable max-len */
export const config = {
  host: '',
  Port: process.env.PORT,
  public: '../public/',
  API_V: '/api/v1',
  API_URL: '',
  database: {
    connect: {
      DATABASE: process.env.DATABASE,
      DATABASE_USER: process.env.DATABASE_USER,
      DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
      DATABASE_HOST: process.env.DATABASE_HOST,
    }
  },
  authentication: {
    secret: process.env.SECRET,
    tokenMaxAge: {
      string: '30d',
      number: 2592000000,
    },
  },
  sessionConfig: {
    secret: '',
    resave: true,
    saveUninitialized: false,
    cookie: {
      path: '/', httpOnly: false, secure: false
    }
  },
  eventBus: {
    exchangeName: 'Events',
    exchangeType: 'fanout',
    url: 'amqp://localhost',
    queueForConsumer: '', // docker-compose service name
    // isAutoDelete = false, durable = true
  },
};

