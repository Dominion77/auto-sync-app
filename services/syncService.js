const { connectToSalesforce } = require('../salesforce/client');

const handleChangeEvent = async (payload) => {
  const conn = await connectToSalesforce();

  const { operation, table, data } = payload;

  if (table === 'leads') {
    try {
      if (operation === 'INSERT' || operation === 'UPDATE') {
        await conn.sobject("Lead").upsert({
          Id: data.id,
          FirstName: data.first_name,
          LastName: data.last_name,
          Company: data.company
        }, 'Id');
        console.log(`[SYNCED] ${operation} lead: ${data.id}`);
      } else if (operation === 'DELETE') {
        await conn.sobject("Lead").delete(data.id);
        console.log(`[DELETED] lead: ${data.id}`);
      }
    } catch (err) {
      console.error('Salesforce sync failed:', err.message);
    }
  }
};

module.exports = { handleChangeEvent };
