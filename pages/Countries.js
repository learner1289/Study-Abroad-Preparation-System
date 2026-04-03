import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { countriesAPI } from '../services/api';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await countriesAPI.getAll();
        setCountries(res.data);
      } catch (err) {
        setError('Failed to load countries. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Study Destinations 🌍</h1>

      {error && <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-4 mb-6">{error}</div>}

      {countries.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No countries available yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Link
              key={country.id}
              to={`/universities?country_id=${country.id}`}
              className="block bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🏳️</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{country.name}</h3>
                  {country.code && <span className="text-xs text-gray-400 uppercase tracking-wider">{country.code}</span>}
                </div>
              </div>
              {country.description && (
                <p className="text-gray-500 text-sm line-clamp-2 mb-3">{country.description}</p>
              )}
              <span className="text-blue-600 text-sm font-medium">View Universities →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Countries;
