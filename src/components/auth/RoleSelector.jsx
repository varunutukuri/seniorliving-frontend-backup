export default function RoleSelector({ onSelect }) {
  const roles = [
    { id: "senior", label: "Senior Citizen" },
    { id: "family", label: "Family / Caregiver" },
    { id: "builder", label: "Builder / Company" },
    { id: "owner", label: "Property Owner" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">
        Welcome 👋
      </h2>
      <p className="text-slate-500 mb-6">
        Please tell us who you are
      </p>

      <div className="grid grid-cols-1 gap-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onSelect(role.id)}
            className="border border-slate-300 rounded-xl px-4 py-3 text-left hover:border-[#1F8F6A] hover:bg-[#F3FBF7] transition"
          >
            {role.label}
          </button>
        ))}
      </div>
    </div>
  );
}
