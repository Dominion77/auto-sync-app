require('dotenv').config();
const { listenToChanges } = require('./kafka/consumer');
const { handleChangeEvent } = require('./services/syncService');

(async () => {
  try {
    console.log(" Starting PostgreSQL → Salesforce sync service...");
    await listenToChanges(handleChangeEvent);
  } catch (err) {
    console.error(" Failed to start service:", err.message);
  }
})();
