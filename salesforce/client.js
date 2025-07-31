const jsforce = require('jsforce');

const connectToSalesforce = async () => {
  const conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL,
  });

  await conn.login(
    process.env.SF_USERNAME,
    process.env.SF_PASSWORD + process.env.SF_TOKEN
  );

  return conn;
};

module.exports = { connectToSalesforce };
