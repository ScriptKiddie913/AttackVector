import React, { useState, useEffect, useContext } from 'react';
import ApiService from '../services/api';
import AuthContext from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // In a real application, you would fetch the user profile from the API
        // For now, we'll use mock data based on the authenticated user
        const mockProfile = {
          username: user?.username || 'ctf_player',
          email: user?.email || 'player@example.com',
          joinDate: '2023-01-15',
          rank: 42,
          score: 1250,
          challengesSolved: 8,
          categories: {
            web: 3,
            crypto: 2,
            forensics: 2,
            osint: 1
          }
        };
        
        setProfile(mockProfile);
        setUsername(mockProfile.username);
        setEmail(mockProfile.email);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch profile');
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleSave = () => {
    // In a real application, you would make an API call here
    setEditing(false);
  };

  // Mock data for solved challenges
  const solvedChallenges = [
    { id: 1, title: 'SQL Injection Basics', category: 'Web', points: 100, date: '2023-06-15' },
    { id: 2, title: 'Crypto 101', category: 'Crypto', points: 150, date: '2023-06-10' },
    { id: 3, title: 'File Analysis', category: 'Forensics', points: 200, date: '2023-06-05' },
    { id: 4, title: 'Web Recon', category: 'OSINT', points: 175, date: '2023-05-28' },
    { id: 5, title: 'Hash Cracking', category: 'Crypto', points: 125, date: '2023-05-20' },
    { id: 6, title: 'Network Traffic', category: 'Forensics', points: 150, date: '2023-05-15' },
    { id: 7, title: 'Steganography', category: 'Forensics', points: 100, date: '2023-05-10' },
    { id: 8, title: 'Social Media Hunt', category: 'OSINT', points: 150, date: '2023-05-05' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-red-500 text-white p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-yellow-500 text-white p-4 rounded-lg">
          You must be logged in to view your profile. <a href="/login" className="text-cyber-primary hover:underline">Login here</a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-cyber-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold">{profile.username.charAt(0).toUpperCase()}</span>
              </div>
              {editing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyber-primary"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyber-primary"
                  />
                </div>
              ) : (
                <h2 className="text-2xl font-bold">{profile.username}</h2>
              )}
              <p className="text-gray-400">{profile.email}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Member since</span>
                <span>{new Date(profile.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Rank</span>
                <span className="font-bold text-cyber-primary">#{profile.rank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Points</span>
                <span className="font-bold">{profile.score}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Challenges Solved</span>
                <span className="font-bold">{profile.challengesSolved}</span>
              </div>
            </div>
            
            <div className="mt-6">
              {editing ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex-1 py-2 bg-cyber-primary hover:bg-cyber-secondary rounded-lg font-semibold transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg mt-8">
            <h3 className="text-xl font-bold mb-4">Category Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Web</span>
                  <span>{profile.categories.web}/5</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${(profile.categories.web / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Crypto</span>
                  <span>{profile.categories.crypto}/4</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(profile.categories.crypto / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Forensics</span>
                  <span>{profile.categories.forensics}/6</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(profile.categories.forensics / 6) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>OSINT</span>
                  <span>{profile.categories.osint}/3</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${(profile.categories.osint / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Solved Challenges</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4 text-left">Challenge</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Points</th>
                    <th className="py-3 px-4 text-left">Date Solved</th>
                  </tr>
                </thead>
                <tbody>
                  {solvedChallenges.map((challenge, index) => (
                    <tr 
                      key={index} 
                      className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}
                    >
                      <td className="py-3 px-4">{challenge.title}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-gray-700 rounded-full text-sm">
                          {challenge.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold">{challenge.points}</td>
                      <td className="py-3 px-4">{new Date(challenge.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;