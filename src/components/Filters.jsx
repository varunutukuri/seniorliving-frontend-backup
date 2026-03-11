export default function Filters({
  variant = "family",
  mode,
  filters,
  setFilters,
  onApply,
  onClear,
}) {
  const isSenior = variant === "senior";

  const rentBudgets = [
    "Under ₹15,000",
    "₹15,000 – ₹25,000",
    "₹25,000+",
  ];

  const buyBudgets = [
    "Under ₹50 Lakhs",
    "₹50 – ₹75 Lakhs",
    "₹75 Lakhs+",
  ];

  return (
    <div className={`bg-white border rounded-2xl ${isSenior ? "p-6" : "p-4"}`}>
      <h3
        className={`font-semibold text-slate-800 ${
          isSenior ? "text-2xl mb-4" : "text-lg mb-3"
        }`}
      >
        Filters
      </h3>

      <div
        className={`grid ${
          isSenior
            ? "grid-cols-1 md:grid-cols-3 gap-5"
            : "grid-cols-3 gap-4"
        }`}
      >
        {/* CITY */}
        <FilterSelect
          label="City"
          value={filters.city}
          onChange={(v) => setFilters({ ...filters, city: v })}
          options={["Pune", "Bangalore", "Chennai"]}
          large={isSenior}
        />

        {/* BUDGET */}
        <FilterSelect
          label="Budget"
          value={filters.budget}
          onChange={(v) => setFilters({ ...filters, budget: v })}
          options={mode === "buy" ? buyBudgets : rentBudgets}
          large={isSenior}
        />

        {/* PROPERTY TYPE */}
        <FilterSelect
          label="Property Type"
          value={filters.type}
          onChange={(v) => setFilters({ ...filters, type: v })}
          options={[
            "1 BHK",
            "2 BHK",
            "3 BHK",
            "Independent House",
          ]}
          large={isSenior}
        />
      </div>

      <div className={`mt-5 ${isSenior ? "text-lg" : "text-sm"}`}>
        <button
          onClick={onApply}
          className={`bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl ${
            isSenior ? "px-8 py-3" : "px-5 py-2"
          }`}
        >
          Apply Filters
        </button>

        <button
          onClick={onClear}
          className={`ml-3 text-slate-600 underline ${
            isSenior ? "text-lg" : "text-sm"
          }`}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

/* ---------- SUB COMPONENT ---------- */

function FilterSelect({ label, options, value, onChange, large }) {
  return (
    <div>
      <label
        className={`block font-medium text-slate-700 mb-1 ${
          large ? "text-lg" : "text-sm"
        }`}
      >
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border rounded-xl ${
          large ? "px-4 py-3 text-lg" : "px-3 py-2 text-sm"
        }`}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
 