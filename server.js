const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error(err));

// Schema and Model
const studentSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    parentMobile: String,
    email: String,
    college: String,
    course: String,
    startDate: String,
    endDate: String,
    duration: String,
    year: String,
    department: String,
    serial: Number,
    roll: String,
    certification: String,
});

const Student = mongoose.model('Student', studentSchema);

// Routes
app.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
