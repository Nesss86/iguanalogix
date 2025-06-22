export default function MessageFilter({ filters, onChange }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        name="patient"
        placeholder="Search by Patient"
        value={filters.patient}
        onChange={onChange}
      />
      <input
        type="text"
        name="messageId"
        placeholder="Search by Message ID"
        value={filters.messageId}
        onChange={onChange}
      />
      <select name="status" value={filters.status} onChange={onChange}>
        <option value="">All</option>
        <option value="Open">Open</option>
        <option value="Pending">Pending</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
}
