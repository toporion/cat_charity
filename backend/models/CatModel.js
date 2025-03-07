const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
  profileImage: String, // Store profile image URL
  medicalHistoryFile: String, // Store medical history file URL
  name: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, enum: ['stray', 'surrender'], required: true },
  microchip: { type: String, default: false },
  neutered: { type: String, default: false },
  medicalHistory: { type: String, default: 'No medical history available' },
  adoptionStatus: { type: String, enum: ['in rescue', 'adopted'], default: 'in rescue' },
  profileDetails: { type: String, default: '' },
  rescueDate: { type: Date, required: true }
}, { timestamps: true });

const ModelCat = mongoose.model('cats', catSchema);
module.exports = ModelCat;
