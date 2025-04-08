require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const MONGO_URL = process.env.MONGO_URI;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const formDataSchema = new mongoose.Schema({
  fullName: String,
  gender: String,
  country: String,
  newsletter: Boolean,
  workExperience: [
    {
      company: String,
      role: String,
      years: Number,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      field: String,
      startYear: Number,
      endYear: Number,
    },
  ],
  submissionDate: { type: Date, default: Date.now },
});

const FormDataModel = mongoose.model('FormData', formDataSchema);

app.post('/api/submit', async (req, res) => {
  try {
    const formData = new FormDataModel(req.body);
    const savedData = await formData.save();
    console.log('Form data saved:', savedData);
    res.status(201).json({ message: 'Form data saved successfully!', data: savedData });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Failed to save form data.', error: error.message });
  }
});

app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});