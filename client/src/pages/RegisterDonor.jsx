import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, BLOOD_GROUPS } from "../lib/config.js";

const emptyForm = {
  name: "",
  bloodGroup: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  available: true,
  lastDonationDate: "",
};

export default function RegisterDonor() {
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const payload = { ...form };
      if (!payload.lastDonationDate) delete payload.lastDonationDate;
      await axios.post(`${API_URL}/donors`, payload);
      setMessage("Donor saved successfully.");
      setForm(emptyForm);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Could not save donor.";
      setMessage(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="hero-band p-6 sm:p-8">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <span className="pill bg-white/15 text-white border-white/20">Register a donor</span>
            <h1 className="text-3xl sm:text-4xl font-display font-semibold leading-tight">List your availability to help patients sooner</h1>
            <p className="text-white/80 max-w-xl">Share your blood group, city, and best contact. Hospitals and organizers can reach you when every minute matters.</p>
            <div className="flex flex-wrap gap-3">
              <Link className="ghost-btn bg-white/10 text-white border-white/30" to="/find">View donor list</Link>
              <a className="primary-btn" href="tel:+91112">Emergency contact</a>
            </div>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white shadow-lg">
            <p className="text-lg font-display">Why register?</p>
            <ul className="mt-3 space-y-2 text-white/85 text-sm list-disc list-inside">
              <li>Be discoverable by hospitals and NGOs instantly.</li>
              <li>Indicate availability and update anytime.</li>
              <li>Help build a verified community of donors.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-card p-5 sm:p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="section-title">Donor details</p>
            <p className="subtext">Fields marked * are required.</p>
          </div>
          <div className="pill">Approx. 5 min</div>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              Full name*
              <input
                required
                className="section-card px-3 py-2 rounded-lg border border-slate-200"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              Phone*
              <input
                required
                className="section-card px-3 py-2 rounded-lg border border-slate-200"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              Email
              <input
                type="email"
                className="section-card px-3 py-2 rounded-lg border border-slate-200"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              Blood group*
              <select
                required
                className="section-card px-3 py-2 rounded-lg border border-slate-200"
                value={form.bloodGroup}
                onChange={(e) => setForm((f) => ({ ...f, bloodGroup: e.target.value }))}
              >
                <option value="">Select</option>
                {BLOOD_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              City*
              <input
                required
                className="section-card px-3 py-2 rounded-lg border border-slate-200"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              State*
              <input
                required
                className="section-card px-3 py-2 rounded-lg border border-slate-200"
                value={form.state}
                onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              Last donation date
              <input
                type="date"
                className="section-card px-3 py-2 rounded-lg border border-slate-200"
                value={form.lastDonationDate}
                onChange={(e) => setForm((f) => ({ ...f, lastDonationDate: e.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              Availability
              <select
                className="section-card px-3 py-2 rounded-lg border border-slate-200"
                value={form.available ? "yes" : "no"}
                onChange={(e) => setForm((f) => ({ ...f, available: e.target.value === "yes" }))}
              >
                <option value="yes">Available now</option>
                <option value="no">Temporarily unavailable</option>
              </select>
            </label>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <button type="submit" className="primary-btn w-full sm:w-auto" disabled={saving}>
              {saving ? "Saving..." : "Save donor"}
            </button>
            <Link className="ghost-btn w-full sm:w-auto text-center" to="/find">Back to finder</Link>
          </div>
          {message && <p className="text-sm text-rose-600">{message}</p>}
        </form>
      </section>
    </div>
  );
}
