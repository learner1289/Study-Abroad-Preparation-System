import React, { useState, useEffect } from 'react';
import { profileAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

// Real user_profiles schema:
// user_id, date_of_birth, phone, current_education_level,
// field_of_interest, preferred_countries, budget_range, target_intake

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    date_of_birth: '',
    phone: '',
    current_education_level: '',
    field_of_interest: '',
    preferred_countries: '',
    budget_range: '',
    target_intake: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileAPI.get();
        const p = res.data;
        if (p && Object.keys(p).length > 0) {
          setFormData({
            date_of_birth: p.date_of_birth || '',
            phone: p.phone || '',
            current_education_level: p.current_education_level || '',
            field_of_interest: p.field_of_interest || '',
            // preferred_countries is TEXT[] in DB — join to string for the input
            preferred_countries: Array.isArray(p.preferred_countries)
              ? p.preferred_countries.join(', ')
              : (p.preferred_countries || ''),
            budget_range: p.budget_range || '',
            target_intake: p.target_intake || '',
          });
        }
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed to load profile.' });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await profileAPI.update(formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const textFields = [
    { label: 'Phone', name: 'phone', type: 'text', placeholder: 'e.g. +880 1700-000000' },
    { label: 'Date of Birth', name: 'date_of_birth', type: 'date', placeholder: '' },
    { label: 'Field of Interest', name: 'field_of_interest', type: 'text', placeholder: 'e.g. Computer Science, Business' },
    { label: 'Preferred Countries', name: 'preferred_countries', type: 'text', placeholder: 'e.g. Canada, UK, Australia' },
    { label: 'Budget Range', name: 'budget_range', type: 'text', placeholder: 'e.g. $10,000–$20,000/yr' },
    { label: 'Target Intake', name: 'target_intake', type: 'text', placeholder: 'e.g. Fall 2025, Spring 2026' },
  ];

  const educationLevels = ['High School', 'Diploma', 'Bachelor', 'Master', 'PhD'];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile 👤</h1>
      <p className="text-gray-500 mb-6">Logged in as: <span className="font-medium text-blue-600">{user?.email}</span></p>

      {message.text && (
        <div className={`rounded-lg p-4 mb-6 text-sm border ${
          message.type === 'success'
            ? 'bg-green-50 text-green-700 border-green-200'
            : 'bg-red-50 text-red-600 border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {textFields.map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input type={type} name={name} value={formData[name]} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder={placeholder} />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Education Level</label>
            <select name="current_education_level" value={formData.current_education_level} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option value="">Select level</option>
              {educationLevels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <button type="submit" disabled={saving}
            className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50 transition-colors">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
