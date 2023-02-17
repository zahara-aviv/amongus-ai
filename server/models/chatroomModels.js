require('dotenv').config();
const { Pool } = require('pg');
const PG_URI = process.env.DB_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    // console.log(`executed query`, text);
    return pool.query(text, params, callback);
  },
};

/*
 CREATE TABLE users (
     user_id SERIAL PRIMARY KEY,
    username character varying(50),
     password character varying(100),
     email character varying(255),
     first_name character varying(50),
     last_name character varying(50),
     avatar character varying(255),
    oath_token character varying (255),
    points integer,
   ssid character varying(255)
)

CREATE TABLE messages (
     message_id SERIAL PRIMARY KEY,
    sender_id integer,
     time TIMESTAMP NOT NULL DEFAULT NOW(),
     message character varying(5000),
   FOREIGN KEY (sender_id) REFERENCES users(user_id)
)

*/
// class PostgresSourceSelect {
//   async init() {
//       // TODO: Create your postgres credential
//       // More info at https://yepcode.io/docs/integrations/postgres/#credential-configuration
//       this.postgresPool = yepcode.integration.postgres(
//           "your-postgres-credential-name"
//       );
//   }

//   async fetch(publish, done) {
//       // TODO: Customize your sql query
//       const {
//           rows
//       } = await this.postgresPool.query(
//           "SELECT * FROM your_schema.your_table LIMIT 10"
//       );
//       for (const row of rows) {
//           await publish(row);
//       }
//       done();
//   }

//   async close() {
//       await this.postgresPool.end();
//   }
// }

// class KafkaTargetSendMessage {
//   async init() {
//       // TODO: Create your kafka credential
//       // More info at https://yepcode.io/docs/integrations/kafkajs/#credential-configuration
//       const kafka = yepcode.integration.kafkajs("your-kafka-credential-name");
//       this.producer = kafka.producer();
//       await this.producer.connect();
//   }

//   async consume(item) {
//       // TODO: customize your message and topic
//       const message = `Your message content ${item.name}`;
//       await this.producer.send({
//           topic: "your-topic",
//           messages: [{
//               value: message
//           }],
//       });
//   }

//   async close() {
//       await this.producer.disconnect();
//   }
// }
