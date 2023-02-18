const { Kafka } = require('kafkajs');
const Kite = require('../xkite');

module.exports = {
  setup: async (req, res, next) => {
    const kite = new Kite();
    await kite.build();
    console.log(kite.getSetup());
    const { dbSetup, kafkaSetup } = kite.getSetup();
    console.log(kafkaSetup);
    const topic = 'messages';
    const kafka = new Kafka({
      clientId: 'chat-gui',
      ...kafkaSetup,
      // brokers: ['localhost:9091'],
      // ssl: false,
    });
    const admin = kafka.admin();

    try {
      console.log(`connect to kafka...`);
      await admin.connect();
      // create topic
      console.log(`creating topic...`);
      const resp = await admin.createTopics({
        // validateOnly: <boolean>,
        waitForLeaders: false,
        // timeout: <Number>,
        topics: [
          {
            topic,
            numPartitions: 3,
            replicationFactor: kafkaSetup.brokers.length, // less than number of brokers..
          },
        ],
      });
      console.log(`Created topics...${JSON.stringify(resp)}`);
      await admin.disconnect();
      return next();
    } catch (err) {
      return next({
        log: `kafkaController.setup  ERROR: ${
          typeof err === 'object' ? JSON.stringify(err) : err
        }`,
        message: {
          err: `Error occurred in kafkaController.setup Check server logs for more details.`,
        },
      });
    }
  },
};
