const mongoose = require('mongoose');

const HealthRecordSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  prescriptions: [
    {
      medication: String,
      dosage: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  labResults: [
    {
      testName: String,
      result: String,
      date: Date,
    },
  ],
  medicalHistory: [String],
});

module.exports = mongoose.model('HealthRecord', HealthRecordSchema);
