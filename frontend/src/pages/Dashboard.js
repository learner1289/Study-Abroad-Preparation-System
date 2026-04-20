import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student';

  const cards = [
    { title: 'Countries', desc: 'Browse study destinations worldwide', link: '/countries', icon: '🌍', bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700' },
    { title: 'Universities', desc: 'Explore universities and filter by budget', link: '/universities', icon: '🎓', bg: 'bg-green-50 border-green-200', text: 'text-green-700' },
    { title: 'Programs', desc: 'Find programs by field and degree level', link: '/programs', icon: '📚', bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700' },
    { title: 'My Profile', desc: 'Manage your academic preferences', link: '/profile', icon: '👤', bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700' },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {name} 👋</h1>
        <p className="text-gray-500 mt-1">Start exploring your study abroad options below.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ title, desc, link, icon, bg, text }) => (
          <Link key={title} to={link}
            className={`block border-2 rounded-xl p-6 hover:shadow-lg transition-all ${bg} ${text}`}>
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-1">{title}</h3>
            <p className="text-sm opacity-75">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
