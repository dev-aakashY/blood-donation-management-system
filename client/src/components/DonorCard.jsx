export default function DonorCard({ donor }) {
  return (
    <div className="section-card p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="card-title">{donor.name}</p>
          <p className="card-sub">{donor.city}, {donor.state}</p>
        </div>
        <span className="pill uppercase">{donor.bloodGroup}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
        <p><span className="text-slate-500">Phone:</span> {donor.phone}</p>
        {donor.email && <p><span className="text-slate-500">Email:</span> {donor.email}</p>}
        <p><span className="text-slate-500">Availability:</span> {donor.available ? "Available" : "Unavailable"}</p>
        {donor.lastDonationDate && (
          <p><span className="text-slate-500">Last donation:</span> {new Date(donor.lastDonationDate).toLocaleDateString()}</p>
        )}
      </div>
      <div className="flex gap-2">
        <a className="primary-btn" href={`tel:${donor.phone}`}>Call</a>
        {donor.email && (
          <a className="ghost-btn" href={`mailto:${donor.email}`}>Email</a>
        )}
      </div>
    </div>
  );
}
