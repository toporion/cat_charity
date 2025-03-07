const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    cat: { type: mongoose.Schema.Types.ObjectId, ref: 'cats', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },

    // New fields for additional questions
    homeType: { type: String, required: true }, // Apartment, House, etc.
    hasPets: { type: Boolean, required: true }, // Do they have other pets?
    experienceWithPets: { type: String, required: true }, // Describe experience
    adoptionReason: { type: String, required: true }, // Why do they want to adopt?
});

const AdoptionModel = mongoose.model('adoptions', adoptionSchema);
module.exports = AdoptionModel;
