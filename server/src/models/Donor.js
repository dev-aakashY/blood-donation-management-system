import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    bloodGroup: { type: String, required: true, uppercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    available: { type: Boolean, default: true },
    lastDonationDate: { type: Date }
  },
  { timestamps: true }
);

export const Donor = mongoose.model("Donor", donorSchema);
