import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (e) => {
    e.preventDefault();
    // Placeholder auth flow; hook up to real API when ready.
    localStorage.setItem("pd_token", "demo-token");
    const from = location.state?.from?.pathname || "/find";
    navigate(from, { replace: true });
    setMessage("Logged in (demo). Replace with real auth.");
  };

  return (
    <div className="space-y-8">
      <section className="hero-band p-6 sm:p-8">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <span className="pill bg-white/15 text-white border-white/20">Welcome back</span>
            <h1 className="text-3xl sm:text-4xl font-display font-semibold leading-tight">Access your PulseDrop workspace</h1>
            <p className="text-white/80 max-w-xl">Track donor outreach, refresh lists, and manage registrations with your account.</p>
            <div className="flex flex-wrap gap-3">
              <Link className="ghost-btn bg-white/10 text-white border-white/30" to="/find">Browse donors</Link>
              <Link className="primary-btn" to="/signup">Need an account? Sign up</Link>
            </div>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white shadow-lg">
            <p className="text-lg font-display">Security tips</p>
            <ul className="mt-3 space-y-2 text-white/85 text-sm list-disc list-inside">
              <li>Only share your account with trusted team members.</li>
              <li>Use strong passwords and enable MFA when available.</li>
              <li>Keep donor contact info confidential.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-card p-5 sm:p-6 space-y-4 max-w-3xl">
        <div className="space-y-1">
          <p className="section-title">Login</p>
          <p className="subtext">Use your registered email and password.</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
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
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <button type="submit" className="primary-btn w-full sm:w-auto">Login</button>
            <Link className="ghost-btn w-full sm:w-auto text-center" to="/signup">Create account</Link>
          </div>
          {message && <p className="text-sm text-primary">{message}</p>}
        </form>
      </section>
    </div>
  );
}
