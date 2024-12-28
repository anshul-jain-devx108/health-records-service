const HealthRecord = require('../models/healthRecord');

// Create a new health record
exports.createHealthRecord = async (req, res) => {
  try {
    const newRecord = new HealthRecord(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all health records
exports.getAllHealthRecords = async (req, res) => {
  try {
    const records = await HealthRecord.find();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a health record by patient ID
exports.getHealthRecordByPatientId = async (req, res) => {
  try {
    const record = await HealthRecord.findOne({ patientId: req.params.patientId });
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a health record by patient ID
exports.updateHealthRecord = async (req, res) => {
  try {
    const updatedRecord = await HealthRecord.findOneAndUpdate(
      { patientId: req.params.patientId },
      req.body,
      { new: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(updatedRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a health record by patient ID
exports.deleteHealthRecord = async (req, res) => {
  try {
    const deletedRecord = await HealthRecord.findOneAndDelete({ patientId: req.params.patientId });
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
