'use client';

interface FilterChipsProps {
  filters: {
    region: string;
    city: string;
    profession: string;
  };
  onRemove: (key: 'region' | 'city' | 'profession') => void;
  onClear: () => void;
}

export default function FilterChips({ filters, onRemove, onClear }: FilterChipsProps) {
  const activeFilters = Object.entries(filters).filter(([, value]) => value);

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
      <span className="text-sm text-gray-500">Faol filterlar:</span>
      
      {activeFilters.map(([key, value]) => (
        <span 
          key={key} 
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
        >
          {value}
          <button
            onClick={() => onRemove(key as 'region' | 'city' | 'profession')}
            className="w-5 h-5 flex items-center justify-center rounded-full bg-primary-100 hover:bg-primary-200 transition-colors"
            aria-label={`${value} filterni olib tashlash`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </span>
      ))}
      
      <button
        onClick={onClear}
        className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
        </svg>
        Tozalash
      </button>
    </div>
  );
}
