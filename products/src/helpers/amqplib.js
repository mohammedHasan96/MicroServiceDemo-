const amqp = require('amqplib');

export const publishEvent = (message) => {
  amqp.connect('amqp://localhost').then(function (conn) {
    console.log('here')
    return conn.createChannel().then(function (ch) {
      const ex = 'logs';
      const ok = ch.assertExchange(ex, 'fanout', { durable: false });
      return ok.then(function () {
        ch.publish(ex, '', Buffer.from(message));
        console.log(" [x] Sent '%s'", message);
        return ch.close();
      });
    }).finally(function () { conn.close(); });
  }).catch(console.warn);
};

/*
* publish => exchange => queue => consumes => consumer
*
*/
