import config from 'config';
import { v4 as uuidv4 } from 'uuid';
import amqp from 'amqp-connection-manager';
const {
  eventBus: {
    exchangeName,
    exchangeType,
    url,
    queueForConsumer,
    routingKey
  }
} = config;

let channelWrapper;
const setupConnection = async () => {
  const connection = await amqp.connect([url]);
  channelWrapper = connection.createChannel({
    json: true,
    setup: function (channel) {
      return Promise.all([
        channel.assertExchange(exchangeName, exchangeType, { durable: false, autoDelete: true }),
        channel.assertQueue(queueForConsumer, { exclusive: true }),
        channel.bindQueue(queueForConsumer, exchangeName, ""),
      ]);
    }
  });
  return connection;
};


export const publishMessage = (data) => {
  const msg = {};
  msg.senderId = 'product-service';
  msg.id = uuidv4();
  msg.creationDate = Date.now();
  msg.data = data;
  return channelWrapper.publish(exchangeName, '', msg);
}

/*
* Services should be able to subscribe to multiple event.
* all services that subscribe to the same event should get the event.
*/

export default setupConnection;
