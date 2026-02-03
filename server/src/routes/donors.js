import express from "express";
import { Donor } from "../models/Donor.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { q, bloodGroup, city, state, available } = req.query;
    const filters = {};

    // Only use $or if q is provided AND no city/state filters are set
    if (q && !city && !state) {
      filters.$or = [
        { name: new RegExp(q, "i") },
        { city: new RegExp(q, "i") },
        { state: new RegExp(q, "i") },
        { bloodGroup: new RegExp(q, "i") }
      ];
    } else if (q) {
      // If q is provided with city or state, only search in name and bloodGroup
      filters.$or = [
        { name: new RegExp(q, "i") },
        { bloodGroup: new RegExp(q, "i") }
      ];
    }

    // Apply city, state, and bloodGroup filters (these should always be respected)
    if (bloodGroup) filters.bloodGroup = bloodGroup.toUpperCase();
    if (city) filters.city = new RegExp(city, "i");
    if (state) filters.state = new RegExp(state, "i");
    if (available !== undefined) filters.available = available === "true";

    const donors = await Donor.find(filters).sort({ createdAt: -1 }).limit(200);
    res.json(donors);
  } catch (err) {
    console.error("GET /donors error", err);
    res.status(500).json({ message: "Failed to fetch donors" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, bloodGroup, phone, email, city, state, available, lastDonationDate } = req.body;
    if (!name || !bloodGroup || !phone || !city || !state) {
      return res.status(400).json({ message: "name, bloodGroup, phone, city, and state are required" });
    }

    const donor = await Donor.create({
      name,
      bloodGroup: bloodGroup.toUpperCase(),
      phone,
      email,
      city,
      state,
      available: available ?? true,
      lastDonationDate
    });

    res.status(201).json(donor);
  } catch (err) {
    console.error("POST /donors error", err);
    res.status(500).json({ message: "Failed to create donor" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const donor = await Donor.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.json(donor);
  } catch (err) {
    console.error("PUT /donors/:id error", err);
    res.status(500).json({ message: "Failed to update donor" });
  }
});

export default router;
