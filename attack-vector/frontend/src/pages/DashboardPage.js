import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  // Mock data for demonstration
  const user = {
    username: 'ctf_player',
    rank: 42,
    score: 1250,
    challengesSolved: 8
  };

  const recentChallenges = [
    { id: 1, title: 'SQL Injection Basics', category: 'Web', points: 100, solved: true },
    { id: 2, title: 'Crypto 101', category: 'Crypto', points: 150, solved: true },
    { id: 3, title: 'Steganography Challenge', category: 'Forensics', points: 200, solved: false },
    { id: 4, title: 'Reverse Engineering 101', category: 'Reverse Engineering', points: 250, solved: false }
  ];

  const categories = [
    { name: 'Web', count: 12, color: 'bg-red-500' },
    { name: 'Crypto', count: 8, color: 'bg-green-500' },
    { name: 'Forensics', count: 10, color: 'bg-blue-500' },
    { name: 'OSINT', count: 5, color: 'bg-yellow-500' },
    { name: 'Reverse Engineering', count: 7, color: 'bg-purple-500' },
    { name: 'Pwn', count: 6, color: 'bg-pink-500' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Welcome back, {user.username}!</h3>
          <p className="text-gray-400">Ready to solve some challenges today?</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Your Rank</h3>
          <p className="text-3xl font-bold text-cyber-primary">#{user.rank}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Points</h3>
          <p className="text-3xl font-bold text-cyber-accent">{user.score}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Challenge Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg flex items-center">
                <div className={`w-4 h-4 rounded-full ${category.color} mr-3`}></div>
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-gray-400 text-sm">{category.count} challenges</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Challenges</h2>
          <div className="space-y-4">
            {recentChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{challenge.title}</h3>
                  <p className="text-gray-400 text-sm">{challenge.category} • {challenge.points} points</p>
                </div>
                <div>
                  {challenge.solved ? (
                    <span className="px-3 py-1 bg-green-900 text-green-400 rounded-full text-sm">Solved</span>
                  ) : (
                    <Link to={`/challenges/${challenge.id}`} className="px-3 py-1 bg-cyber-primary hover:bg-cyber-secondary rounded-full text-sm transition-colors">
                      Solve
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;