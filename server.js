const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://shivarthdrona:Academic1234@students.3rfbz.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Schema and Model
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    parentMobile: { type: String, required: true },
    email: { type: String, required: true },
    college: { type: String, required: true },
    course: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    duration: { type: String, required: true },
    year: { type: String, required: true },
    department: { type: String, required: true },
    serial: { type: Number, required: true },
    roll: { type: String, required: true },
    certification: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

// Routes

// Add a new student
app.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({ message: 'Student added successfully', student });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
