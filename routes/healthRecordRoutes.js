const express = require('express');
const router = express.Router();
const healthRecordController = require('../controllers/healthRecordController');

router.post('/', healthRecordController.createHealthRecord);
router.get('/', healthRecordController.getAllHealthRecords);
router.get('/:patientId', healthRecordController.getHealthRecordByPatientId);
router.put('/:patientId', healthRecordController.updateHealthRecord);
router.delete('/:patientId', healthRecordController.deleteHealthRecord);

module.exports = router;
