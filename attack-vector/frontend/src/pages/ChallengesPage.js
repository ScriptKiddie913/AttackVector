import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../services/api';

const ChallengesPage = () => {
  const [categories, setCategories] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real application, you would fetch categories and challenges from the API
        // For now, we'll use mock data
        const mockCategories = [
          { id: 1, name: 'Web', count: 12 },
          { id: 2, name: 'Crypto', count: 8 },
          { id: 3, name: 'Forensics', count: 10 },
          { id: 4, name: 'OSINT', count: 5 },
          { id: 5, name: 'Reverse Engineering', count: 7 },
          { id: 6, name: 'Pwn', count: 6 }
        ];
        
        const mockChallenges = [
          { id: 1, title: 'SQL Injection Basics', category: 'Web', difficulty: 'Easy', points: 100, solved: true },
          { id: 2, title: 'Crypto 101', category: 'Crypto', difficulty: 'Easy', points: 150, solved: true },
          { id: 3, title: 'Steganography Challenge', category: 'Forensics', difficulty: 'Medium', points: 200, solved: false },
          { id: 4, title: 'Reverse Engineering 101', category: 'Reverse Engineering', difficulty: 'Hard', points: 250, solved: false },
          { id: 5, title: 'OSINT Investigation', category: 'OSINT', difficulty: 'Medium', points: 175, solved: false },
          { id: 6, title: 'Buffer Overflow', category: 'Pwn', difficulty: 'Hard', points: 300, solved: false }
        ];
        
        setCategories(mockCategories);
        setChallenges(mockChallenges);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'All' || challenge.category === selectedCategory;
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      case 'Insane': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

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
      <h1 className="text-3xl font-bold mb-8">Challenges</h1>
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-lg ${selectedCategory === 'All' ? 'bg-cyber-primary' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-lg ${selectedCategory === category.name ? 'bg-cyber-primary' : 'bg-gray-800 hover:bg-gray-700'}`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyber-primary w-full md:w-64"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map(challenge => (
          <div key={challenge.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{challenge.title}</h3>
                {challenge.solved && (
                  <span className="px-2 py-1 bg-green-900 text-green-400 rounded text-sm">Solved</span>
                )}
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  {challenge.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Test your skills with this {challenge.difficulty.toLowerCase()} challenge worth {challenge.points} points.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-semibold">{challenge.points} points</span>
                <Link 
                  to={`/challenges/${challenge.id}`} 
                  className="px-4 py-2 bg-cyber-primary hover:bg-cyber-secondary rounded-lg transition-colors"
                >
                  {challenge.solved ? 'Review' : 'Solve'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredChallenges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No challenges found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ChallengesPage;