import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { universitiesAPI } from '../services/api';

// FIX: Added tabs for Intake (FR-07), Language (FR-08), Scholarships (FR-09) — all were missing
const TABS = [
  { key: 'Overview', label: '🏛 Overview' },
  { key: 'Programs', label: '📚 Programs' },
  { key: 'Intake', label: '📅 Intake' },
  { key: 'Language', label: '📝 Language' },
  { key: 'Scholarships', label: '🎁 Scholarships' },
];

const UniversityDetails = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const res = await universitiesAPI.getById(id);
        setUniversity(res.data);
      } catch (err) {
        setError('University not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    fetchUniversity();
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  if (error) return <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-4">{error}</div>;
  if (!university) return null;

  return (
    <div>
      <Link to="/universities" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
        ← Back to Universities
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">{university.Name}</h1>
        <p className="text-blue-600 font-semibold">{university.countries?.name}</p>
        {university.city && <p className="text-gray-500 text-sm mt-1">📍 {university.city}</p>}
        {university.type && <p className="text-gray-400 text-sm mt-0.5">🎓 {university.type}</p>}
        {university.website && (
          <a href={university.website} target="_blank" rel="noopener noreferrer"
            className="text-blue-500 text-sm hover:underline mt-1 inline-block">🌐 {university.website}</a>
        )}
      </div>

      {/* Tab Nav */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map(({ key, label }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === key
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}>
            {label}
          </button>
        ))}
      </div>

      {/* FR-05: Overview */}
      {activeTab === 'Overview' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">About</h2>
          <p className="text-gray-600 leading-relaxed">{university.description || 'No description available.'}</p>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-xs text-blue-500 font-semibold uppercase mb-1">City</p>
              <p className="text-gray-800 font-medium">{university.city || '—'}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-xs text-purple-500 font-semibold uppercase mb-1">Type</p>
              <p className="text-gray-800 font-medium capitalize">{university.type || '—'}</p>
            </div>
          </div>
        </div>
      )}

      {/* FR-06: Programs */}
      {activeTab === 'Programs' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Academic Programs</h2>
          {!university.programs?.length ? (
            <p className="text-gray-500">No program information available.</p>
          ) : (
            <div className="space-y-3">
              {university.programs.map((p) => (
                <div key={p.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                  <h3 className="font-semibold text-gray-800">{p.degree} — {p.field}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {p.degree && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{p.degree}</span>}
                    {p.field && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{p.field}</span>}
                    {p.duration_years && <span className="text-xs text-gray-500">⏱ {p.duration_years} yrs</span>}
                    {p.tuition_per_year && <span className="text-xs text-gray-500">💰 ${Number(p.tuition_per_year).toLocaleString()}/yr</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FR-07: Intake */}
      {activeTab === 'Intake' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Intake Schedule</h2>
          {!university.intakes?.length ? (
            <p className="text-gray-500">No intake information available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="py-2 px-4 font-semibold text-gray-600 rounded-tl-lg">Intake Name</th>
                    <th className="py-2 px-4 font-semibold text-gray-600 rounded-tr-lg">Start Month</th>
                  </tr>
                </thead>
                <tbody>
                  {university.intakes.map((intake) => (
                    <tr key={intake.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{intake.intake_name}</td>
                      <td className="py-3 px-4 text-gray-600">{intake.start_month || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* FR-08: Language Requirements */}
      {activeTab === 'Language' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Language Requirements</h2>
          {!university.language_requirements?.length ? (
            <p className="text-gray-500">No language requirement data available.</p>
          ) : (
            <div className="space-y-3">
              {university.language_requirements.map((req) => (
                <div key={req.id} className="flex items-start gap-4 bg-yellow-50 border border-yellow-100 rounded-xl p-4">
                  <span className="text-2xl">📝</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">{req.test_name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Minimum Score: <strong className="text-gray-800">{req.min_score}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FR-09: Scholarships */}
      {activeTab === 'Scholarships' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Scholarship Eligibility</h2>
          {!university.scholarship_eligibility?.length ? (
            <p className="text-gray-500">No scholarship information available.</p>
          ) : (
            <div className="space-y-4">
              {university.scholarship_eligibility.map((s) => (
                <div key={s.id} className="bg-green-50 border border-green-100 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-800 mb-2">🎁 Scholarship #{s.id}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <strong>Basis:</strong> {s.eligibility_basis}
                  </p>
                  {s.minimum_gpa && (
                    <p className="text-sm font-semibold text-green-700 mt-2">
                      Minimum GPA: {s.minimum_gpa}
                    </p>
                  )}
                  {s.additional_notes && (
                    <p className="text-xs text-gray-400 mt-2">{s.additional_notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UniversityDetails;
