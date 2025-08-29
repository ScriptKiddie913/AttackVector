import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const ScoreboardPage = () => {
  const [scoreboard, setScoreboard] = useState([]);
  const [timeFrame, setTimeFrame] = useState('all-time');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScoreboard = async () => {
      try {
        // In a real application, you would fetch the scoreboard from the API
        // For now, we'll use mock data
        const mockScoreboard = [
          { rank: 1, username: 'hacker_pro', score: 2450, challenges: 18 },
          { rank: 2, username: 'cyber_ninja', score: 2100, challenges: 15 },
          { rank: 3, username: 'security_expert', score: 1950, challenges: 14 },
          { rank: 4, username: 'code_breaker', score: 1800, challenges: 13 },
          { rank: 5, username: 'digital_sleuth', score: 1650, challenges: 12 },
          { rank: 6, username: 'network_wizard', score: 1500, challenges: 11 },
          { rank: 7, username: 'crypto_master', score: 1400, challenges: 10 },
          { rank: 8, username: 'forensics_fan', score: 1300, challenges: 9 },
          { rank: 9, username: 'reverse_engineer', score: 1200, challenges: 8 },
          { rank: 10, username: 'osint_specialist', score: 1100, challenges: 7 }
        ];
        
        setScoreboard(mockScoreboard);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch scoreboard');
        setLoading(false);
      }
    };

    fetchScoreboard();
  }, []);

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Scoreboard</h1>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setTimeFrame('all-time')}
            className={`px-4 py-2 rounded-lg ${timeFrame === 'all-time' ? 'bg-cyber-primary' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            All Time
          </button>
          <button
            onClick={() => setTimeFrame('monthly')}
            className={`px-4 py-2 rounded-lg ${timeFrame === 'monthly' ? 'bg-cyber-primary' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeFrame('weekly')}
            className={`px-4 py-2 rounded-lg ${timeFrame === 'weekly' ? 'bg-cyber-primary' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            This Week
          </button>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-4 px-6 text-left">Rank</th>
                <th className="py-4 px-6 text-left">User</th>
                <th className="py-4 px-6 text-left">Score</th>
                <th className="py-4 px-6 text-left">Challenges Solved</th>
              </tr>
            </thead>
            <tbody>
              {scoreboard.map((user, index) => (
                <tr 
                  key={index} 
                  className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}
                >
                  <td className="py-4 px-6">
                    {user.rank === 1 ? (
                      <span className="text-yellow-400 font-bold">#{user.rank}</span>
                    ) : user.rank === 2 ? (
                      <span className="text-gray-300 font-bold">#{user.rank}</span>
                    ) : user.rank === 3 ? (
                      <span className="text-amber-600 font-bold">#{user.rank}</span>
                    ) : (
                      <span className="font-bold">#{user.rank}</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-cyber-primary flex items-center justify-center mr-3">
                        <span className="font-bold">{user.username.charAt(0).toUpperCase()}</span>
                      </div>
                      {user.username}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold">{user.score}</td>
                  <td className="py-4 px-6">{user.challenges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-400">
        <p>Scoreboard updates every 5 minutes</p>
      </div>
    </div>
  );
};

export default ScoreboardPage;