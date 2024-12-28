const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
const HealthRecord = require('./models/healthRecord');

// Connect to MongoDB
mongoose.connect('mongodb+srv://amanMonoFirst:amanGoFirst@cluster0.6qudb.mongodb.net/HospitalManagementSystem?retryWrites=true&w=majority&appName=Cluster0')
  .then(async () => {
    console.log('Connected to MongoDB');

    // Clear existing records
    await HealthRecord.deleteMany();

    // Generate dummy data
    const records = Array.from({ length: 10 }, () => ({
      patientId: uuidv4(),
      name: faker.person.fullName(),
      dateOfBirth: faker.date.past(30, '2000-01-01'),
      prescriptions: Array.from({ length: 2 }, () => ({
        medication: faker.commerce.productName(),
        dosage: `${faker.number.int({ min: 1, max: 3 })} ${faker.helpers.arrayElement(['mg', 'ml', 'g'])}`,
        startDate: faker.date.past(1),
        endDate: faker.date.future(1),
      })),
      labResults: Array.from({ length: 2 }, () => ({
        testName: faker.commerce.productName(),
        result: faker.helpers.arrayElement(['Normal', 'Abnormal']),
        date: faker.date.past(1),
      })),
      medicalHistory: Array.from({ length: 3 }, () => faker.lorem.word()),
    }));

    // Insert dummy data into the database
    await HealthRecord.insertMany(records);
    console.log('Dummy data inserted');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    mongoose.connection.close();
  });
