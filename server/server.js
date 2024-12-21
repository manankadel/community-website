const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace <password> with your actual MongoDB password
const dbURI = 'mongodb+srv://manankadel:12345677@communitycluster.aqifs.mongodb.net/community?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a schema and model for storing data
const memberSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    address: String,
    education: String,
    mobile: String,
    spouse_name: String,
    spouse_dob: Date,
    spouse_age: Number,
    spouse_gotra: String,
    kids: Array,
    occupation: {
        company_name: String,
        position: String,
        experience: Number,
        package: Number
    }
});

const Member = mongoose.model('Member', memberSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.post('/submit', (req, res) => {
    const memberData = req.body;
    const newMember = new Member(memberData);

    newMember.save()
        .then(() => res.send(`Welcome, ${memberData.name}!`))
        .catch(err => res.status(500).send('Error storing data'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
