import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Link to the User model
      required: true,
    },
    bio: {
      type: String,
      default: '',
    },
   
  },
  {
    timestamps: true,  // Will add createdAt and updatedAt fields automatically
  }
);

// Ensure the model is only registered once
const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);

export default Profile;
