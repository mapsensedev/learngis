const { couch } = require('../app');

const dbname = 'routeplanner';

async function getAllDatabases(req, res) {
  try {
    const list = await couch.listDatabases();

    await res.status(200).json({
      type: 'success',
      data: list,
    });
  } catch (error) {
    await res.status(500).json({
      type: 'failure',
      message: error,
    });
  }
}

async function createLocations(req, res) {
  try {
    const id = new String(await couch.uniqid(1));

    const { data, headers, status } = await couch.insert(dbname, {
      _id: id,
      ...req.body,
    });

    await res.status(200).json({
      type: 'success',
      message: `locations successfully added to database ${dbname}`,
    });
  } catch (error) {
    await res.status(500).json({
      type: 'failure',
      message: error,
    });
  }
}

module.exports = {
  createLocations,
};
