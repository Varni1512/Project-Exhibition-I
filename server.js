const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3000;

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/students');
const db = mongoose.connection;
db.once('open', () => {
    console.log('mongoose is connected successfully');
});

const userSchema = new mongoose.Schema({
    ticket_subject: String,
    ticket_category: String,
    contact_number: String,
    subcategory: String,
    building: String,
    floor: String,
    location: String,
    hostel_block: String,
    room_number: String,
});

const Users = mongoose.model('data', userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Home.html'));
});

// New route to fetch all complaints data
app.get('/getComplaints', async (req, res) => {
    try {
        const complaints = await Users.find({});
        res.json(complaints); // Send all complaints as JSON
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).send('Error fetching complaints');
    }
});

app.post('/post', async (req, res) => {
    const { ticket_subject, ticket_category, contact_number, subcategory, building, floor, location, hostel_block, room_number } = req.body;
    const user = new Users({
        ticket_subject,
        ticket_category,
        contact_number,
        subcategory,
        building,
        floor,
        location,
        hostel_block,
        room_number,
    });
    await user.save();
    res.send('Ticket is created Successfully');
});

app.listen(port, () => {
    console.log('Server Started');
});
