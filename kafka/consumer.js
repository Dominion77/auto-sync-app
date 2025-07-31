const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'pg-sync-service',
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: 'pg-sync-group' });

const listenToChanges = async (onMessage) => {
  await consumer.connect();
  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const payload = JSON.parse(message.value.toString());
      console.log('Received from Kafka:', payload);
      await onMessage(payload);
    },
  });
};

module.exports = { listenToChanges };
