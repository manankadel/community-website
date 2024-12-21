const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection string
const dbURI = 'mongodb+srv://manankadel:12345677@communitycluster.aqifs.mongodb.net/community?retryWrites=true&w=majority&appName=CommunityCluster';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Define schema and model
const memberSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    address: String,
    education: String,
    mobile: String,
    married: Boolean,
    spouse: {
        name: String,
        dob: Date,
        age: Number,
        gotra: String,
    },
    kids: [{
        name: String,
        dob: Date,
        education: String,
        marital_status: String,
    }],
    occupation: {
        company_name: String,
        position: String,
        experience: Number,
        package: Number,
    },
});

const Member = mongoose.model('Member', memberSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/submit', (req, res) => {
    try {
        const {
            name, dob, address, education, mobile, married,
            spouse_name, spouse_dob, spouse_age, spouse_gotra,
            number_of_kids, company_name, position, experience, package
        } = req.body;

        // Parsing kids information
        const kids = [];
        if (number_of_kids) {
            for (let i = 0; i < number_of_kids; i++) {
                kids.push({
                    name: req.body[`kid_name_${i}`],
                    dob: req.body[`kid_dob_${i}`],
                    education: req.body[`kid_education_${i}`],
                    marital_status: req.body[`kid_marital_status_${i}`],
                });
            }
        }

        const newMember = new Member({
            name,
            dob,
            address,
            education,
            mobile,
            married: married === 'yes',
            spouse: married === 'yes' ? {
                name: spouse_name,
                dob: spouse_dob,
                age: spouse_age,
                gotra: spouse_gotra,
            } : null,
            kids,
            occupation: {
                company_name,
                position,
                experience,
                package,
            },
        });

        newMember.save()
            .then(() => res.send(`<h1>Welcome, ${name}! Your data has been saved.</h1>`))
            .catch(err => res.status(500).send('Error storing data'));
    } catch (err) {
        res.status(500).send('An unexpected error occurred.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
