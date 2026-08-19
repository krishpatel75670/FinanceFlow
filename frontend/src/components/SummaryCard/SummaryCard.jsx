import "./SummaryCard.css";

function SummaryCard({ label, value, type }) {
    const formattedValue = typeof value === "number" ? value.toFixed(2) : Number(value || 0).toFixed(2);

    return (
        <div className={`stat-card ${type}`}>
            <div className="stat-label">{label}</div>
            <div className="stat-value">₹{formattedValue}</div>
        </div>
    );
}

export default SummaryCard;
