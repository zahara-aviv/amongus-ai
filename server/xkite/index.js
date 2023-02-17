const path = require('path');
const compose = require('docker-compose');
const ymlGenerator = require('./ymlGenerator');
const zipper = require('zip-local');
const defaultCfg = {
  numOfClusters: 2,
  dataSource: 'postgresql',
  sink: 'jupyter',
};

module.exports = class Kite {
  constructor(config = defaultCfg) {
    this.config = config;
    // launch configuration
    try {
      this.setup = ymlGenerator(config);
      zipper.sync
        .zip(path.join(__dirname, './config/download/'))
        .compress()
        .save(path.join(__dirname, './config/download/pipeline.zip'));
      compose
        .upAll({
          cwd: path.join(__dirname, './config/download/'),
          log: true,
        })
        .then(
          () => {
            console.log('Clusters successfully built');
          },
          (err) => {
            console.log('Something went wrong:', err.message);
            throw err;
          }
        );
    } catch (err) {
      console.log(`KITE failed to initialize: ${err}\nConfiguration ${config}`);
    }
  }
  /*
   * returns an object with the following formatting.
   * {
   * dataSetup: {
   *  dbSrc: String,
   *  env: {
   *    username: String,
   *    password: String,
   *    dbName: String,
   *    URI: String
   *  },
   * },
   * kafkaSetup: {
   *  brokers: Array[String],
   *  ssl: Boolean,
   * }}
   */
  getSetup() {
    return this.config;
  }
};
