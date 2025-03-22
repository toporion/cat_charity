const AdoptionModel = require("../models/AdoptionModel");
const ModelCat = require("../models/CatModel");

const requestAdoption = async (req, res) => {
  try {
    const { userId, catId, notes, homeType, hasPets, experienceWithPets, adoptionReason } = req.body;

    // Check if the cat exists
    const cat = await ModelCat.findById(catId);
    if (!cat) {
      return res.status(404).json({ success: false, message: "Cat not found" });
    }
    if (cat.adoptionStatus === 'adopted') {
      return res.status(400).json({ success: false, message: "Cat is already adopted" });
    }

    // Check if the user already requested this cat
    const existingRequest = await AdoptionModel.findOne({ user: userId, cat: catId });
    if (existingRequest) {
      return res.status(400).json({ success: false, message: "You have already requested to adopt this cat." });
    }

    // Create new adoption request
    const adoptionRequest = new AdoptionModel({
      user: userId,
      cat: catId,
      notes,
      homeType,
      hasPets,
      experienceWithPets,
      adoptionReason
    });

    await adoptionRequest.save();

    res.status(200).json({ success: true, message: "Adoption request submitted", data: adoptionRequest });
  } catch (error) {
    console.log('Adoption request error:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



// 🔵 Get All Adoption Requests (Admin)

const getAdoptionRequests = async (req, res) => {
  try {
    const requests = await AdoptionModel.find().populate('user', 'name eamil').populate('cat', 'name')
    res.status(200).json(requests)
  } catch (error) {
    console.log("see the error", error)
    res.status(500).json({ message: 'Server Error', error });
  }
}

const deleteAdoptionRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteRequest = await AdoptionModel.deleteOne({ _id: id })
    res.status(200).json({ success: true, message: "Successfully delete request" })

  } catch (error) {
    console.log('see the error where', error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}
const updateAdoptionStatus = async (req, res) => {
  try {
    const { id } = req.params; // Adoption request ID
    const { status } = req.body; // New status: 'approved' or 'rejected'

    // Check if adoption request exists
    const adoptionRequest = await AdoptionModel.findById(id);
    if (!adoptionRequest) {
      return res.status(404).json({ success: false, message: "Adoption request not found" });
    }

    // Validate status (only allow 'approved' or 'rejected')
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status. Use 'approved' or 'rejected'." });
    }

    // If approved, update the cat's adoption status
    if (status === 'approved') {
      const cat = await ModelCat.findById(adoptionRequest.cat);
      if (cat) {
        cat.adoptionStatus = 'adopted';
        await cat.save();
      }
    }

    // Use findByIdAndUpdate to update only the status field,
    // bypassing full document validation
    const updatedAdoptionRequest = await AdoptionModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: false }
    );

    res.status(200).json({
      success: true,
      message: `Adoption request ${status}`,
      adoptionRequest: updatedAdoptionRequest
    });

  } catch (error) {
    console.error("Error updating adoption status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



module.exports = {
  requestAdoption,
  getAdoptionRequests,
  updateAdoptionStatus,
  deleteAdoptionRequest
}