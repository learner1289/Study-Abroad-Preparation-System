import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { universitiesAPI } from '../services/api';

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    country_id: searchParams.get('country_id') || '',
  });

  const fetchUniversities = async (f) => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (f.country_id) params.country_id = f.country_id;
      const res = await universitiesAPI.getAll(params);
      setUniversities(res.data);
    } catch (err) {
      setError('Failed to load universities.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUniversities(filters); }, []);

  const handleFilter = (e) => { e.preventDefault(); fetchUniversities(filters); };
  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const clearFilters = () => {
    const cleared = { country_id: '' };
    setFilters(cleared);
    fetchUniversities(cleared);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Universities 🎓</h1>

      {/* Filter Panel */}
      <form onSubmit={handleFilter}
        className="bg-white border border-gray-200 rounded-xl p-5 mb-6 flex flex-wrap gap-4 items-end shadow-sm">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Country ID</label>
          <input type="number" name="country_id" value={filters.country_id} onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-44 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="e.g. 1" min="1" />
        </div>
        <button type="submit"
          className="bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
          Filter
        </button>
        <button type="button" onClick={clearFilters}
          className="text-gray-400 hover:text-gray-600 text-sm underline">
          Clear
        </button>
      </form>

      {error && <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-4 mb-6">{error}</div>}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : universities.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No universities found matching your criteria.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <Link key={uni.id} to={`/universities/${uni.id}`}
              className="block bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{uni.Name}</h3>
              <p className="text-sm text-blue-600 font-medium mb-1">{uni.countries?.name}</p>
              {uni.city && <p className="text-xs text-gray-400 mb-2">📍 {uni.city}</p>}
              {uni.type && <p className="text-xs text-gray-500 mb-3">🎓 {uni.type}</p>}
              {uni.website && (
                <p className="text-xs text-blue-400 mb-3 truncate">🌐 {uni.website}</p>
              )}
              <span className="mt-3 inline-block text-blue-600 text-sm font-medium">View Details →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Universities;
