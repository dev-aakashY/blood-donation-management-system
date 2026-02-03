import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DonorCard from "../components/DonorCard.jsx";
import { API_URL, BLOOD_GROUPS } from "../lib/config.js";

function BloodGroupChip({ group, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`chip chip-red ${selected ? "chip-filled" : ""}`}
    >
      🩸 {group}
    </button>
  );
}

function ActivityCard({ icon, label, count }) {
  return (
    <div className="activity-item">
      <span className="blood-drop">{icon}</span>
      <div className="flex-1">
        <p className="text-sm text-slate-600">{label}</p>
        <p className="text-lg font-semibold text-primary">{count}</p>
      </div>
    </div>
  );
}

function ContributionBox({ number, label, color }) {
  const colorClass = color === "crimson" ? "border-crimson text-crimson" : color === "rose" ? "border-rose text-rose" : "border-primary text-primary";
  return (
    <div className={`stat-box border-2 ${colorClass}`}>
      <p className="text-2xl font-bold">{number}</p>
      <p className="text-xs text-slate-600">{label}</p>
    </div>
  );
}

export default function FindDonor() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [filters, setFilters] = useState({ q: "", bloodGroup: "", city: "", state: "", available: "all" });
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

  const filteredCount = useMemo(() => donors.length, [donors]);

  const fetchDonors = async (customFilters = null) => {
    setLoading(true);
    setMessage("");
    try {
      const currentFilters = customFilters || filters;
      const currentBloodGroup = customFilters?.bloodGroup || selectedBloodGroup;
      
      const params = {
        q: currentFilters.q || undefined,
        bloodGroup: currentBloodGroup || currentFilters.bloodGroup || undefined,
        city: currentFilters.city || undefined,
        state: currentFilters.state || undefined,
      };
      if (currentFilters.available !== "all") params.available = currentFilters.available === "yes";
      const res = await axios.get(`${API_URL}/donors`, { params });
      setDonors(res.data || []);
    } catch (err) {
      console.error(err);
      setMessage("Could not load donors. Please ensure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    const resetFilters = { q: "", bloodGroup: "", city: "", state: "", available: "all" };
    setFilters(resetFilters);
    setSelectedBloodGroup("");
    fetchDonors(resetFilters);
  };

  useEffect(() => {
    fetchDonors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-refetch when blood group chip changes
  useEffect(() => {
    if (selectedBloodGroup !== "") {
      fetchDonors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBloodGroup]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchDonors();
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero with greeting */}
      <section className="hero-band p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-1">
            <p className="text-white/80">Welcome</p>
            <h1 className="text-2xl sm:text-3xl font-display font-semibold">Find Blood Donors</h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-white/20 text-white font-semibold flex items-center justify-center">🔔</button>
        </div>
        <div className="bg-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
          <span>🔍</span>
          <input
            className="bg-transparent text-white placeholder:text-white/60 outline-none flex-1"
            placeholder="Search blood type..."
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            onKeyDown={handleKeyDown}
          />
        </div>
      </section>

      {/* Blood Group Selector */}
      <section className="section-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="section-title">Blood Group</p>
          <button className="text-primary text-sm font-semibold hover:underline" onClick={clearFilters}>
            Clear
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {BLOOD_GROUPS.map((g) => (
            <BloodGroupChip
              key={g}
              group={g}
              selected={selectedBloodGroup === g}
              onClick={() => setSelectedBloodGroup(selectedBloodGroup === g ? "" : g)}
            />
          ))}
        </div>
      </section>

      {/* Activity Feed */}
      <section className="section-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="section-title">Activity</p>
          <span className="text-slate-400 text-sm">Live</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <ActivityCard icon="🩸" label="Blood Donor" count="120 Post" />
          <ActivityCard icon="📝" label="Create Post" count="Donate Now!" />
          <ActivityCard icon="🩸" label="Blood Given" count="1 Step Away!" />
          <ActivityCard icon="👥" label="Blood Donor" count="120 Post" />
        </div>
      </section>

      {/* Our Contribution */}
      <section className="section-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="section-title">Our Contribution</p>
          <button className="text-primary text-sm font-semibold hover:underline" onClick={fetchDonors}>
            Refresh
          </button>
        </div>
        <div className="grid sm:grid-cols-3 gap-2">
          <ContributionBox number="5K+" label="Blood Donor" color="primary" />
          <ContributionBox number="50" label="Post Daily" color="crimson" />
          <ContributionBox number="50" label="Join Daily" color="rose" />
          <ContributionBox number="5K+" label="Blood Donor" color="primary" />
          <ContributionBox number="5K+" label="Blood Posts" color="rust" />
          <ContributionBox number="50" label="Blood Posts" color="rose" />
        </div>
      </section>

      {/* Search & Filter */}
      <section className="section-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <p className="section-title">Donor List</p>
          <div className="pill">{filteredCount} donors</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <label className="flex flex-col gap-1 text-sm text-slate-700">
            Availability
            <select
              className="section-card px-3 py-2 rounded-lg border border-slate-200"
              value={filters.available}
              onChange={(e) => setFilters((f) => ({ ...f, available: e.target.value }))}
              onKeyDown={handleKeyDown}
            >
              <option value="all">Any</option>
              <option value="yes">Available</option>
              <option value="no">Unavailable</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm text-slate-700">
            City
            <input
              className="section-card px-3 py-2 rounded-lg border border-slate-200"
              placeholder="e.g. Delhi"
              value={filters.city}
              onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
              onKeyDown={handleKeyDown}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-slate-700">
            State
            <input
              className="section-card px-3 py-2 rounded-lg border border-slate-200"
              placeholder="e.g. Maharashtra"
              value={filters.state}
              onChange={(e) => setFilters((f) => ({ ...f, state: e.target.value }))}
              onKeyDown={handleKeyDown}
            />
          </label>
          <div className="flex flex-col gap-1 justify-end">
            <button className="primary-btn w-full" onClick={fetchDonors} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
        <div className="grid gap-3 max-h-[540px] overflow-auto pr-1">
          {loading && <p className="subtext">Loading donors...</p>}
          {!loading && donors.length === 0 && <p className="subtext">No donors found yet. Try adjusting filters.</p>}
          {!loading && donors.map((donor) => (
            <DonorCard key={donor._id || donor.id || donor.phone} donor={donor} />
          ))}
        </div>
        {message && <p className="text-sm text-rose-600">{message}</p>}
      </section>
    </div>
  );
}
