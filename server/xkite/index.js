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
  /**
   * constructor()
   * @param {Object} config : takes the configuration
   *                 for KITE standalone servers.
   */
  constructor(config = defaultCfg) {
    this.config = JSON.parse(JSON.stringify(config));
    // launch configuration
    try {
      this.setup = ymlGenerator(config);
      zipper.sync
        .zip(path.join(__dirname, './download/'))
        .compress()
        .save(path.join(__dirname, './download/pipeline.zip'));
      // console.log('done zipping...');
    } catch (err) {
      console.log(`KITE failed to initialize: ${err}\nConfiguration ${config}`);
    }
  }
  /**
   * build():
   * @returns {Promise} from docker-compose
   */
  async build() {
    // console.log('building...');
    return compose.upAll({
      cwd: path.join(__dirname, './download/'),
      log: true,
    });
  }
  /**
   *
   * @returns {Object} setup with the following formatting.
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
    return this.setup;
  }
};