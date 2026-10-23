import { useEffect, useState, useRef } from "react";
import { Settings, ChevronDown, Check } from "lucide-react";

function UnitToggle({ units, onToggle }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    const handleSelect = (selected) => {
        if (selected !== units) onToggle();
        setIsOpen(false);
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen((prev) => !prev)} className="flex items-center gap-1.5 bg-neutral-800 text-neutral-0 text-sm px-2.5 py-2 rounded-[7px] cursor-pointer hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-neutral-0 transition">
                <Settings size={16} />
                <span>Units</span>
                <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className=" absolute right-0 mt-2 w-40 p-1.5 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-10 border border-neutral-600">
                    <button onClick={() => { onToggle(); setIsOpen(false) }} className="w-full text-left p-1.5 text-sm rounded-md cursor-pointer hover:bg-neutral-700 hover:rounded-md focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-950 focus-visible:ring-white transition">
                        Switch to {units === 'metric' ? 'Imperial' : 'Metric'}
                    </button>
                    <button onClick={() => handleSelect('metric')} className="w-full p-1.5 flex items-center justify-between text-sm cursor-pointer hover:bg-neutral-700 rounded-md focus:outline-none focus-visible:bg-neutral-700 transition ">
                        Metric {units === 'metric' && <Check size={16} />}
                    </button>
                    <button onClick={() => handleSelect('imperial')} className="w-full p-1.5 flex items-center justify-between text-sm cursor-pointer hover:bg-neutral-700 rounded-md focus:outline-none focus-visible:bg-neutral-700 transition ">
                        Imperial {units === 'imperial' && <Check size={16} />}
                    </button>
                </div>
            )}
        </div>
    )
}

export default UnitToggle;