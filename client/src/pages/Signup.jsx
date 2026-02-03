import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Organizer" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // Placeholder for real signup flow
    localStorage.setItem("pd_token", "demo-token");
    navigate("/find", { replace: true });
    setMessage("Account created (demo). Hook to real auth API.");
  };

  return (
    <div className="space-y-8">
      <section className="hero-band p-6 sm:p-8">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <span className="pill bg-white/15 text-white border-white/20">Create account</span>
            <h1 className="text-3xl sm:text-4xl font-display font-semibold leading-tight">Join the PulseDrop network</h1>
            <p className="text-white/80 max-w-xl">Organize donor drives, manage outreach, and keep verified donor lists in one place.</p>
            <div className="flex flex-wrap gap-3">
              <Link className="ghost-btn bg-white/10 text-white border-white/30" to="/find">Browse donors</Link>
              <Link className="primary-btn" to="/login">Have an account? Login</Link>
            </div>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white shadow-lg">
            <p className="text-lg font-display">Account types</p>
            <ul className="mt-3 space-y-2 text-white/85 text-sm list-disc list-inside">
              <li>Organizer: run drives, coordinate donors.</li>
              <li>Hospital: request donors and contact quickly.</li>
              <li>Volunteer: help maintain up-to-date records.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-card p-5 sm:p-6 space-y-4 max-w-3xl">
        <div className="space-y-1">
          <p className="section-title">Sign up</p>
          <p className="subtext">Basic details to set up your workspace.</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              Full name
              <input
                required
                className="section-card px-3 py-2 rounded-lg border border-slate-200"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              Email
              <input
                type="email"
                required
                className="section-card px-3 py-2 rounded-lg border border-slate-200"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              Password
              <input
                type="password"
                required
                className="section-card px-3 py-2 rounded-lg border border-slate-200"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-700">
              Role
              <select
                className="section-card px-3 py-2 rounded-lg border border-slate-200"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              >
                <option>Organizer</option>
                <option>Hospital</option>
                <option>Volunteer</option>
              </select>
            </label>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <button type="submit" className="primary-btn w-full sm:w-auto">Create account</button>
            <Link className="ghost-btn w-full sm:w-auto text-center" to="/login">Back to login</Link>
          </div>
          {message && <p className="text-sm text-primary">{message}</p>}
        </form>
      </section>
    </div>
  );
}
