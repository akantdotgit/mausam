import { Ban, RefreshCw } from 'lucide-react';

const APIerror = ({ onRetry }) => {
    return (
        <div className="flex flex-col items-center text-center">
            <Ban size={28} color="#b3b3b3" />
            <h1 className="text-[35px] font-primary font-semibold text-neutral-0 mt-3 mb-2">Something went wrong</h1>
            <p className="mb-5 font-normal text-neutral-200 max-w-sm text-sm">We couldn't connect to the server (API error). Please try again in a few moments.</p>
            <button onClick={onRetry} className="flex items-center text-sm gap-1.5 px-2.5 py-2 bg-neutral-800 rounded-md hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-neutral-0 transition">
                <RefreshCw size={16} /> Retry
            </button>
        </div>
    )
}

export default APIerror;