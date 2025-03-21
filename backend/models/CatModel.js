const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
  profileImage: String, // Store profile image URL
  medicalHistoryFile: String, // Store medical history file URL
  name: { type: String, required: true },
  sex: { type: String, enum: ['Male', 'Female'], required: true }, // New field
  birthDate: { type: Date }, // New field
  age: { type: Number, required: true },
  microchip: { type: Boolean, default: false }, // Changed to Boolean
  chipNo: { type: String, default: "" }, // New field for microchip number
  remarks: { type: String, default: "" }, // New field for remarks
  species: { type: String, default: "cat" }, // New field
  breed: { type: String, default: "" }, // New field
  color: { type: String, default: "" }, // New field
  weight: { type: String, default: "" }, // New field
  status: { type: String, enum: ['Stray', 'Surrender'], required: true },
  neutered: { type: Boolean, default: false }, // Changed to Boolean
  intakeDate: { type: Date, required: true }, // Renamed from rescueDate
  adoptionStatus: { type: String, enum: ['in rescue', 'adopted'], default: 'in rescue' },
  note: { type: String, default: '' },
  treatment: { type: String, required: true },
  mediDate: { type: Date, required: true },
  medicalHistory: { type: String, default: 'No medical history available' },


}, { timestamps: true });

const ModelCat = mongoose.model('cats', catSchema);
module.exports = ModelCat;
