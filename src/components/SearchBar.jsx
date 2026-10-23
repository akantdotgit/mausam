import { Search } from 'lucide-react';
import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!city.trim()) return;
    onSearch(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-lg flex gap-3'>
      <div tabIndex={0} className='w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg hover:bg-neutral-700 bg-neutral-800 text-neutral-0 placeholder:text-neutral-300 tracking-wide text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-neutral-0 transition'>
        <Search size={18} />
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Search for a place...' aria-required='true' className='w-full rounded-sm placeholder:text-slate-200 focus:outline-none transition' />
      </div>
      <button type='submit' className='cursor-pointer px-4.5 py-2.5 bg-blue-500 text-neutral-0 text-[15px] border-none tracking-wide rounded-lg hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 focus-visible:ring-blue-500 transition'>
        Search
      </button>
    </form>
  )
}

export default SearchBar;