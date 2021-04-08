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
        channel.assertExchange(exchangeName, exchangeType, { durable: false, autoDelete: false }),
        // channel.assertQueue(queueForConsumer, { exclusive: true }),
        // channel.bindQueue(queueForConsumer, exchangeName, ""),
      ]);
    }
  });
  return connection;
};


export const publishMessage = (data, route) => {
  const msg = {};
  msg.senderId = 'product-service';
  msg.id = uuidv4();
  msg.creationDate = new Date();
  msg.productId = data.id;
  delete data.id;
  const publishedData = { ...msg, ...data };
  return channelWrapper.publish(exchangeName, route, publishedData);
}

export default setupConnection;
