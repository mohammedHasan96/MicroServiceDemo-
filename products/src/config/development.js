/* eslint-disable max-len */
export const config = {
  host: 'localhost',
  Port: '3000',
  public: '../public/',
  API_V: '/api/v1',
  API_URL: 'http://localhost:3000/api/v1/',
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
  eventBus: {
    exchangeName: 'Events',
    exchangeType: 'direct',
    url: 'amqp://rabbitmq3',
    queueForConsumer: '', // docker-compose service name
    // isAutoDelete = false, durable = true
  },
};

