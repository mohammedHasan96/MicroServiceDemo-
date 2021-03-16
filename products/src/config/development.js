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
  s3OurBucket: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    bucketNameOur: process.env.BUCKET_NAME_OUR,
    bucketPublic: process.env.BUCKET_PUBLIC
  },
  test: {
    secret: ''
  },
  mailgun: {
    apiKey: process.env.DEV_MAILGUN_api_key,
    domain: process.env.DEV_MAILGUN_DOMAIN,
  },
  paypal: {
    clientId: process.env.DEV_PAYPAL_CLIENT_ID,
    clientSecret: process.env.DEV_PAYPAL_CLIENT_SECRET
  },
  ayrshare: {
    ayrshareApiKey: process.env.AYRSHARE_API_KEY,
  },
  mailchimp: {
    mailchimpApiKey: process.env.AYRSHARE_API_KEY,
  }
};

