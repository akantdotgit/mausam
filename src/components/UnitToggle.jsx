function UnitToggle({ units, onToggle }) {
    return (
        <button onClick={onToggle} className="h-fit bg-slate-800 text-white text-sm p-2 rounded-lg hover:bg-slate-700 transition">
            {units === 'metric' ? 'Switch to Imperial' : 'Switch to Metric'}
        </button>
    )
}

export default UnitToggle;