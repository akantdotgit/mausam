import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!city.trim()) return;
    onSearch(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-2 w-full max-w-md'>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Search for a place...' aria-required='true' className='flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-2 focus:outline-offset-2 focus:outline-blue-400' />
      <button type='submit' className='cursor-pointer px-4 py-2 bg-blue-500 text-white border-none rounded-lg hover:bg-blue-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'>
        Search
      </button>
    </form>
  )
}

export default SearchBar