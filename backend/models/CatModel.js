const mongoose = require('mongoose');
const Schema=mongoose.Schema


const catSchema = new Schema({
  profileImage: String, // Store image URL (can be stored in cloud storage like Cloudinary)
  name: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, enum: ['stray', 'surrender'], required: true },
  microchip: { type: Boolean, default: false },
  neutered: { type: Boolean, default: false },
  medicalHistory: { type: String, default: 'No medical history available' },
  adoptionStatus: { type: String, enum: ['in rescue', 'adopted'], default: 'in rescue' },
  profileDetails: { type: String, default: '' }
}, { timestamps: true });

const ModelCat=mongoose.model('cats',catSchema)
module.exports = ModelCat;
