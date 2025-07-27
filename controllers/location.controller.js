const { State, City } = require('../models');

exports.getStates = async (req, res) => {
  try {
    const states = await State.findAll();
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCitiesByState = async (req, res) => {
  try {
    const { stateId } = req.params;
    const cities = await City.findAll({ where: { stateId } });
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
