import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ApiService from '../services/api';
import AuthContext from '../context/AuthContext';

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { isAuthenticated } = useContext(AuthContext);
  
  const [challenge, setChallenge] = useState(null);
  const [flag, setFlag] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const data = await ApiService.getChallenge(id);
        setChallenge(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch challenge');
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError('You must be logged in to submit flags');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const data = await ApiService.submitFlag(id, flag);
      setResult(data.detail.includes('Correct') ? 'correct' : 'incorrect');
      setSubmitting(false);
    } catch (err) {
      setResult('incorrect');
      setSubmitting(false);
    }
  };

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
      <button 
        onClick={() => history.goBack()}
        className="mb-4 flex items-center text-cyber-primary hover:text-cyber-secondary"
      >
        ← Back to Challenges
      </button>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{challenge.title}</h1>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  {challenge.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
                <span className="px-3 py-1 bg-cyber-primary rounded-full text-sm">
                  {challenge.points} points
                </span>
              </div>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-300 whitespace-pre-line">{challenge.description}</p>
          </div>
          
          {challenge.files && challenge.files.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Files</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challenge.files.map((file, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
                    <span>{file.name}</span>
                    <span className="text-gray-400 text-sm">{file.size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-700 pt-6">
            <h2 className="text-xl font-semibold mb-4">Submit Flag</h2>
            {!isAuthenticated ? (
              <div className="bg-yellow-900 text-yellow-400 p-4 rounded-lg mb-4">
                You must be logged in to submit flags. <Link to="/login" className="text-cyber-primary hover:underline">Login here</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    placeholder="flag{...}"
                    className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-cyber-primary"
                    required
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 bg-cyber-primary hover:bg-cyber-secondary rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
            
            {result === 'correct' && (
              <div className="mt-4 p-4 bg-green-900 text-green-400 rounded-lg">
                Congratulations! You solved the challenge and earned {challenge.points} points.
              </div>
            )}
            
            {result === 'incorrect' && (
              <div className="mt-4 p-4 bg-red-900 text-red-400 rounded-lg">
                Incorrect flag. Please try again.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailPage;